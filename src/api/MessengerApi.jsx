const baseURL = "https://a86d1d4bce35.ngrok-free.app";
const pageID = "750201798171865";

// Fetch conversations from your own backend
export const fetchConversations = async () => {
  try {
    const res = await fetch(`${baseURL}/fb/conversations/${pageID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
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
export const fetchMessages = async (conversationId) => {
  try {
    const url = `${baseURL}/fb/messages/${conversationId}`;
    console.log("Fetching messages from:", url);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    const data = await res.json();
    console.log("Raw message API response:", data);

    
    return Array.isArray(data) ? data.reverse() : [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};
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
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Failed to send message:", data);
    throw new Error(data.error?.message || "Failed to send message");
  }

  return data;
};



//to fetch the name of user
export const fetchConversationsWithParticipants = async () => {
  const headers = {
    'ngrok-skip-browser-warning': 'true',
  };

  try {
    const convRes = await fetch(`${baseURL}/fb/conversations/${pageID}`, {
      headers,
    });

    if (!convRes.ok) {
      throw new Error("Failed to fetch conversations");
    }

    const convData = await convRes.json();
    const conversations = convData?.data || [];

    const participantsRes = await fetch(`${baseURL}/fb/participants/${pageID}`, {
      headers,
    });

    if (!participantsRes.ok) {
      throw new Error("Failed to fetch participants");
    }

    const participantsData = await participantsRes.json();
    const participantsList = participantsData?.data || [];

    const newConversations = conversations.map((conv) => {
      const match = participantsList.find((p) => p.conversationId === conv.id);
      return {
        ...conv,
        participants: match?.participants || [],
      };
    });

    return newConversations;
  } catch (error) {
    console.error("Error fetching conversations or participants:", error.message);
    throw error;
  }
};



