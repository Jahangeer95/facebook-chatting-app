import { useState } from "react";
import { createTextPost } from "../../api/PostsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function TextPost({onClose}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [publishTime, setPublishTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Message cannot be empty");
      return;
    }
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
      await createTextPost(message, schedule, schedule ? publishTime : null);
      alert("Post created successfully!");
      setMessage("");
      setSchedule(false);
      setPublishTime("");
      onClose();
    } catch (error) {
      alert("Failed to send post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col p-2  rounded w-96"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
        <h2 className="text-lg font-semibold text-white">
          Post 
        </h2>
        <FontAwesomeIcon
          icon={faTimes}
          className="cursor-pointer text-white"
          onClick={onClose}
        />
      </div>
      <textarea
        className="border p-2 mb-2"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
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
        className="bg-blue-700 text-white  p-2 rounded "
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
