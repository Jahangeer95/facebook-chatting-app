import { Api } from "../config";

// fetch conversations
export const fetchConversations = async () => {
  try {
    const res = await Api.get(`/fb/conversations`);

    const data = res.data;
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

// fetch messages for a conversation
export const fetchMessages = async (conversationId, afterCursor = "") => {
  try {
    const params = {};
    if (afterCursor) params.after = afterCursor;
    const res = await Api.get(`/fb/messages/${conversationId}`, { params });

    const data = res.data;
    console.log("Fetched messages:", {
      messages: data.messages,
      paging: data.paging,
      type: typeof data.messages,
    });
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    // return { messages: [], paging: null };
    throw new Error(error?.response?.data?.message);
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
    if (onOutOfWindow && typeof onOutOfWindow === "function") {
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
  try {
    const res = await Api.post(`/fb/send-message`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error in sending:", error);
  }
};

// for getting participants
export const fetchAllParticipants = async (after = "") => {
  try {
    const params = {};
    if (after) params.after = after;
    const res = await Api.get("/fb/participants", { params });
    const data = res.data;
    const participants = data?.data?.participants || [];
    const paging = data?.data?.paging || null;

    return { participants, paging };
  } catch (error) {
    console.error("Error fetching participants:", error);
    return { participants: [], paging: null };
  }
};
