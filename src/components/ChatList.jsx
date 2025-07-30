import React, { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";

export const ChatList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" }); //auto scroll to the bottom
    }
  }, [messages]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    return date.toDateString();
  };

  const groupMessagesByDate = () => {
    const groups = {};

    messages.forEach((msg) => {
      const dateLabel = formatDate(msg.created_time);

      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }

      groups[dateLabel].push(msg);
    });

    return groups;
  };

  const groupedMessages = groupMessagesByDate();

  return (
    <div className="flex-1 overflow-auto p-4 bg-white">
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date}>
          <div className="text-center text-sm text-gray-500 my-2">{date}</div>
          {msgs.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
