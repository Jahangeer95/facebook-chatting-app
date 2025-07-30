import React, { useEffect, useState, useRef } from "react";
import { Sidebar, ChatList, ChatInput, ChatHeader } from "../components";
import {
  fetchConversationsWithParticipants,
  fetchMessages,
  sendMessage,
} from "../api/MessengerApi";
import { io } from "socket.io-client";

const pageID = "750201798171865";
const socket = io("https://a86d1d4bce35.ngrok-free.app", {
  transports: ["websocket"],
});

export const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const selectedRef = useRef(null);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    const loadConversations = async () => {
      const convs = await fetchConversationsWithParticipants();
      const enriched = convs.map((conv) => {
        const user = conv.participants.find((p) => p.id !== pageID);
        const updatedAt = conv.messages?.data?.slice(-1)[0]?.created_time || "";
        return {
          ...conv,
          displayName: user?.name || "Unknown",
          updatedAt,
        };
      });
      setConversations(
        enriched.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      );
    };
    loadConversations();
  }, []);



  //to load chat history
  useEffect(() => {
    if (selected?.id) {
      fetchMessages(selected.id).then((fetched) => {
        setMessages(
          fetched.map((msg) => ({
            ...msg,
            status: msg.status || "sent",
          }))
        );

        const last = fetched[fetched.length - 1];
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selected.id
              ? {
                  ...conv,
                  lastMessage: last?.message || "",
                  updatedAt: last?.created_time || "",
                }
              : conv
          )
        );
      });
    }
  }, [selected]);

  useEffect(() => {
    window.socket = socket;

    //to check socket connection 
    socket.on("connect", () => console.log("Connected:", socket.id));
    socket.on("disconnect", () => console.log("Disconnected"));

    socket.on("message_from_user", (data) => {
      const { senderId, message, attachments, id } = data;

      const formatted = {
        id: id || Date.now().toString(), 
        message: typeof message === "string" ? message : "",
        attachments: attachments  
          ? {
              data: [
                {
                  image_data: {
                    url: attachments.url,
                  },
                },
              ],
            }
          : null,
        from: {
          id: senderId,
          name:
            selectedRef.current?.participants.find((p) => p.id === senderId)
              ?.name || "User",
        },
        created_time: new Date().toISOString(),
        status: "sent",
      };

      setMessages((prevMessages) => {
        const exists = prevMessages.some((msg) => msg.id === formatted.id);
        if (!exists) return [...prevMessages, formatted];
        return prevMessages;
      });
    });
//to set latest message to delivered
    socket.on("message_delivered", () => {
      setMessages((prev) => {
        const updated = [...prev];
        for (let i = updated.length - 1; i >= 0; i--) {
          const msg = updated[i];
          const isSentByMe = msg.from?.id === pageID;
          if (isSentByMe && !msg.delivered) {
            updated[i] = { ...msg, delivered: true };
            break;
          }
        }
        return updated;
      });
    });

    socket.on("message_read", () => {
      setMessages((prev) => {
        return prev.map((msg) => {
          const isSentByMe = msg.from?.id === pageID;
          if (isSentByMe) {
            return { ...msg, read: true };
          }
          return msg;
        });
      });
    });

  socket.onAny((ev, ...args) => console.log("Event:", ev, args));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message_from_user");
      socket.off("message_delivered");
      socket.off("message_read");
      socket.offAny();
    };
  }, []);

  const handleSendMessage = async ({ text, file, type }) => {
    if (!selected) return;

    const recipient = selected.participants.find((p) => p.id !== pageID);
    if (!recipient) return;

    //get last message timestamp to handle 24 hours window
    const lastUserMsg = messages
      .filter((m) => m.from?.id !== pageID)
      .sort((a, b) => new Date(b.created_time) - new Date(a.created_time))[0];
    const lastTime = lastUserMsg?.created_time;

    const localId = Date.now().toString();

    const newMsg = {
      id: localId,
      message: text,
      from: { id: pageID, name: "Next-Gen Coders" },
      created_time: new Date().toISOString(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMsg]);

    try {
      await sendMessage({
        recipientId: recipient.id,
        text,
        file,
        type,
        lastUserMessageTime: lastTime,
        onOutOfWindow: () => setShowDialog(true),
      });

      const updated = await fetchMessages(selected.id);
      setMessages(
        updated.map((msg) => ({
          ...msg,
          status: msg.status || "sent",
        }))
      );
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  const selectedUser = selected?.participants?.find((p) => p.id !== pageID);

  return (
    <div className="flex h-screen">
      <Sidebar
        users={conversations}
        onSelect={setSelected}
        selectedId={selected?.id}
        pageID={pageID}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatHeader user={selectedUser} />
        <ChatList messages={messages} />
        <ChatInput onSend={handleSendMessage} disabled={!selected} />
        {/* Alert of 24 hours window  */}
        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <p className="text-lg font-semibold text-gray-700 mb-4">
                The 24 hour messaging window has expired.
              </p>
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
