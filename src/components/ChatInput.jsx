import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function ChatInput ({ onSend, disabled }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //to send with enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  //remove image after selecting
  const handleRemoveImage = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-100 border-t">
      {/* preview image*/}
      {file && (
        <div className="relative w-32">
          <img
            src={URL.createObjectURL(file)}
            alt="Selected"
            className="w-full h-auto rounded"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-1 right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
            title="Remove image"
          >
            {/* icon to remove image */}
            <FontAwesomeIcon icon={faTimes} className="text-xs" />
          </button>
        </div>
      )}

      {/* for image*/}
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          disabled={disabled}
          className="w-36 text-sm"
        />
        {/* for text */}
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
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
    </div>
  );
};
