import { useState } from "react";
import { createMediaPost } from "../../api/PostsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function MediaPost({ onClose }) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [publishTime, setPublishTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !message.trim()) {
      return alert("Please enter message and select a file.");
    }
    //schedule time must be at least 15 minutes from now and no more than 30 days from now 
    if (schedule) {
      const selectedTime = new Date(publishTime);
      const minTime = new Date(Date.now() + 15 * 60 * 1000);
      const maxTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      if (selectedTime < minTime) {
        return alert("Schedule time must be 15 min from now.");
      }
      if (selectedTime > maxTime) {
        return alert("Schedule time must be 15 min from now.");
      }
    }
    setLoading(true);
    try {
      await createMediaPost(message, file, schedule ? publishTime : null);
      alert("Media post sent successfully!");
      setMessage("");
      setFile(null);
      setPublishTime("");
      setSchedule(false);
      onClose();
    } catch (error) {
      alert("Failed to send media post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col mt-2 p-2 rounded w-96"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
        <h2 className="text-lg font-semibold text-white">Post</h2>
        <FontAwesomeIcon
          icon={faTimes}
          className="cursor-pointer text-white"
          onClick={onClose}
        />
      </div>
      <textarea
        className="border p-2 mb-2"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <input
        type="file"
        className="mb-2 text-white"
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/*,video/*"
      />
      <label className="mb-2 flex items-center gap-2 text-white">
        <input
          type="checkbox"
          checked={schedule}
          onChange={(e) => setSchedule(e.target.checked)}
        />
        Want to Schedule Post
      </label>
      {schedule && (
        <input
          type="datetime-local"
          value={publishTime}
          onChange={(e) => setPublishTime(e.target.value)}
          required
          className="border p-1 mb-2"
        />
      )}
      <button
        type="submit"
        className="bg-blue-700 text-white p-2 rounded  border-t border-gray-300 mt-2 w-full"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
