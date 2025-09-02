import React, { useEffect, useState, useRef } from "react";
import { ChatSidebar, ChatList, ChatInput, ChatHeader } from "../components";
import {
  fetchMessages,
  sendMessage,
  fetchAllParticipants,
} from "../api/MessengerApi";
import { io } from "socket.io-client";
import { pageID, baseURL } from "../config";

const socket = io(baseURL, { transports: ["websocket"] });

export function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [paging, setPaging] = useState(null); //for page information
  const [hasMore, setHasMore] = useState(true);
  const [afterCursor, setAfterCursor] = useState("");

  const selectedRef = useRef(null);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  // load conversations
  async function loadConversations(cursor = "") {
    const { participants, paging } = await fetchAllParticipants(cursor);

    const enriched = participants.map((conv) => {
      const user = conv.participants.find((p) => p.id !== pageID);
      return {
        ...conv,
        conversationId: conv.id || conv.conversationId,
        displayName: user?.name || "Unknown",
        participants: conv.participants,
        updatedAt: conv.updated_time || "",
        unread: conv.unread_count || " ",
      };
    });

    setConversations((prev) => {
      const map = new Map();

      [...prev, ...enriched].forEach((item) => {
        map.set(item.conversationId, item);
      });

      return Array.from(map.values()).sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    });

    if (paging?.next) {
      const next = new URL(paging.next).searchParams.get("after");
      setAfterCursor(next);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (!selected?.conversationId) return;

      const { messages: fetchedMessages, paging } = await fetchMessages(
        selected.conversationId
      );

      setMessages(
        fetchedMessages
          .reverse()
          .sort((a, b) => new Date(a.created_time) - new Date(b.created_time))
      );
      setPaging(paging);
    };

    loadMessages();
  }, [selected]);

  useEffect(() => {
    window.socket = socket;

    //to check socket connection
    socket.on("connect", () => console.log("Connected:", socket.id));
    socket.on("disconnect", () => console.log("Disconnected"));

    //refresh after each incoming or outgoing message
    socket.on("message_from_user", async () => {
      try {
        if (selectedRef.current?.conversationId) {
          const { messages: updatedMessages, paging } = await fetchMessages(
            selectedRef.current.conversationId
          );
          setMessages(
            [...updatedMessages]
              .reverse()
              .sort(
                (a, b) => new Date(a.created_time) - new Date(b.created_time)
              )
          );
          setPaging(paging);
        }
        await loadConversations();
      } catch (err) {
        console.error("Failed to refresh messages:", err);
      }
    });

    socket.on("message_delivered", ({ userId }) => {
      const currentChat = selectedRef.current;
      //checking if the received user id  is in the selected conversation
      const exist = currentChat?.participants?.some((p) => p.id === userId);

      if (!exist) return;

      setMessages((prev) =>
        prev.map((msg) => {
          const isSentByMe = msg.from?.id === pageID;
          if (isSentByMe && !msg.delivered && !msg.read) {
            return { ...msg, delivered: true, status: "delivered" }; //mark message read when event receive
          }
          return msg;
        })
      );
    });

    socket.on("message_read", ({ userId }) => {
      const currentChat = selectedRef.current;

      // checking if the read user exists in selected conversation
      const exist = currentChat?.participants?.some((p) => p.id === userId);

      if (!exist) return;

      setMessages((prev) =>
        prev.map((msg) => {
          const isSentByMe = msg.from?.id === pageID;
          if (isSentByMe && msg.status !== "read") {
            return { ...msg, read: true, status: "read" }; //mark message read when event receive
          }
          return msg;
        })
      );
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

      const updatedResponse = await fetchMessages(selected.conversationId);

      const updated = updatedResponse.messages || [];

      if (Array.isArray(updated)) {
        setMessages(
          updated.map((msg) => ({
            ...msg,
            status: msg.status || "sent",
          }))
        );
        await loadConversations();
      } else {
        console.error("Messages should be an array got:", updated);
      }
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  const handlepreviousMessages = async () => {
    if (!paging?.next || !selected?.conversationId) return;

    const afterCursor = new URL(paging.next).searchParams.get("after");
    if (!afterCursor) return;

    const { messages: olderMessages, paging: newPaging } = await fetchMessages(
      selected.conversationId,
      afterCursor
    );

    setMessages((prev) => {
      const combined = [...olderMessages, ...prev];
      const uniqueMap = new Map();
      combined.forEach((msg) => {
        uniqueMap.set(msg.id, { ...msg, status: msg.status || "sent" });
      });

      return [...uniqueMap.values()].sort(
        (a, b) => new Date(a.created_time) - new Date(b.created_time)
      );
    });

    setPaging(newPaging);
  };

  const selectedUser = selected?.participants?.find((p) => p.id !== pageID);

  return (
    <div className="flex h-screen">
      <ChatSidebar
        users={conversations}
        onSelect={setSelected}
        selectedId={selected?.conversationId}
        onLoadMore={() => loadConversations(afterCursor)}
        hasMore={hasMore}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatHeader user={selectedUser} />
        {selectedUser?.length === 1 ? (
          <ChatList messages={messages} onLoadMore={handlepreviousMessages} />
        ) : (
          <div className="flex flex-1 m-auto pt-60 text-black ">
            Select a user to start conversation
          </div>
        )}
        <ChatInput onSend={handleSendMessage} disabled={!selected} />

        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <p className="text-lg font-semibold text-gray-700 mb-4">
                The 24-hour messaging window has expired.
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
}
