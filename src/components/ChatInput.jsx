
import React, { useState } from "react";

export const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (!text && !file) return;

    const type = file ? "image" : "text";

    onSend({
      text,
      file,
      type,
    });

    setText("");
    setFile(null);
  };

  return (
    <div className="flex items-center p-4 bg-gray-100 border-t gap-2">
      {/*for image */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        disabled={disabled}
        className="w-36 text-sm"
      />

      {/* for text  */}
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        className="flex-1 p-2 border border-gray-300 rounded disabled:bg-gray-200"
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={disabled || (!text && !file)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
};














