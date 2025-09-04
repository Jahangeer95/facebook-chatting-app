
import { baseURL,pageID,accessToken } from "../config";

// fetch conversations
export const fetchConversations = async () => {
  try {
    const res = await fetch(`${baseURL}/fb/conversations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        FB_PAGE_ID:pageID,
        FB_ACCESS_TOKEN:accessToken,
      }
    });

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
};

// fetch messages for a conversation
export const fetchMessages = async (conversationId, afterCursor = "") => {
  try {
    const url = new URL(`${baseURL}/fb/messages/${conversationId}`);
    if (afterCursor) {
      url.searchParams.append("after", afterCursor);
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        FB_PAGE_ID:pageID,
        FB_ACCESS_TOKEN:accessToken,
      },
    });

    const data = await res.json();
    console.log("Fetched messages:", {
      messages: data.messages,
      paging: data.paging,
      type: typeof data.messages,
    });
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { messages: [], paging: null };
  }
};

//for sending message
export const sendMessage = async ({
  recipientId,
  text,
  file,
  type = "text",
  lastUserMessageTime,
  onOutOfWindow,
}) => {
  const now = new Date();
  const lastMessageDate = new Date(lastUserMessageTime);
  const diffHours = (now - lastMessageDate) / (1000 * 60 * 60);

  //24 hours window check
  if (diffHours > 24) {
    if (onOutOfWindow && typeof onOutOfWindow === 'function') {
      onOutOfWindow();
    }
    return;
  }

  const formData = new FormData();
  formData.append("recipientId", recipientId);
  formData.append("type", type);

  if (type === "text") {
    formData.append("message", text);
  } else if (type === "image" && file) {
    formData.append("file", file);
    formData.append("message", file.name);
  }

  const res = await fetch(`${baseURL}/fb/send-message`, {
    method: "POST",
    body: formData,
    headers:{
      FB_PAGE_ID:pageID,
      FB_ACCESS_TOKEN:accessToken,
    }
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Failed to send message:", data);
    throw new Error(data.error?.message || "Failed to send message");
  }

  return data;
};

// for getting participants
export const fetchAllParticipants = async (after = "") => {
  const url = new URL(`${baseURL}/fb/participants`);
  if (after) url.searchParams.append("after", after);

  const res = await fetch(url.toString(), {
    headers: {
      "ngrok-skip-browser-warning": "true",
      FB_PAGE_ID:pageID,
      FB_ACCESS_TOKEN:accessToken,
    },
  });

  const data = await res.json();
  const participants = data?.data?.participants || [];
  const paging = data?.data?.paging || null;

  return { participants, paging };
};
