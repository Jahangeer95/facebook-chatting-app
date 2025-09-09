import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

export function CommentInput({
  value,
  setValue,
  onSubmit,
  onKeyDown,
  loading,
  type,
}) {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const emojiRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiOpen(false);
        console.log(emojiRef.current);
      }
    };
    if (emojiOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [emojiOpen]);

  const handleEmoji = (emojiObject) => {
    setValue((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="flex items-center gap-2 mt-3 relative">
      {emojiOpen && (
        <div
          className="absolute bottom-10 left-5 z-50 w-72 h-72 overflow-y-auto bg-white shadow-lg rounded"
          ref={emojiRef}
        >
          <EmojiPicker onEmojiClick={handleEmoji} width="100%" height="100%" />
        </div>
      )}

      {/* emoji button */}
      <button
        type="button"
        className="cursor-pointer p-2 rounded-full hover:bg-gray-300 text-white bg-blue-600 w-10 h-10 flex items-center justify-center"
        onClick={() => setEmojiOpen((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faSmile} className="text-white" />
      </button>

      {/* input */}
      <input
        placeholder="Type a comment"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border w-full rounded-full p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onKeyDown={onKeyDown}
      />

      {/* send button */}
      <button
        className="px-4 py-2 rounded-full text-white bg-blue-600 "
        onClick={onSubmit}
      >
        {loading ? "Posting...." : type === "Comment" ? "Comment" : "Reply"}
      </button>
    </div>
  );
}
