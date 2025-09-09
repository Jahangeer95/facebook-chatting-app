import { useState } from "react";
import { CommentInput } from "./CommentInput";
import { replyComment } from "../../api";
import { CommentRepliesList } from "./CommentRepliesList";
import { toast } from "react-toastify";

export function CommentList({ comment, postId }) {
  const [openReply, setOpenReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    setLoading(true);
    try {
      await replyComment(postId, replyMessage, comment.id);
      setLoading(false);
      setReplyMessage("");
    } catch {
      toast.error("Failed to send");
    } finally {
      setLoading(false);
    }
  };

  const handleRepliesKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReplySubmit(e, postId);
    }
  };

  return (
    <div className="relative p-6 m-3 rounded-lg shadow bg-white">
      {comment?.from?.name && <p className="font-bold">{comment.from.name}</p>}
      <p className="text-gray-500 text-xs mb-2">
        {new Date(comment.created_time).toLocaleString()}
      </p>
      <p className="text-gray-700">{comment.message}</p>

      <button
        className="text-xs text-blue-500 mr-3"
        onClick={() => setOpenReply(!openReply)}
      >
        {openReply ? "Hide Replies" : "View Replies"}
      </button>

      {openReply && (
        <div
          className="ml-6 mt-3 border-l pl-4 overflow-auto h-[250px]"
          id="scrollcommentsreplies"
        >
          <CommentRepliesList commentId={comment.id} />
        </div>
      )}
      {openReply && (
        <CommentInput
          value={replyMessage}
          setValue={setReplyMessage}
          onSubmit={handleReplySubmit}
          onKeyDown={handleRepliesKeyDown}
          loading={loading}
          type={"Reply"}
        />
      )}
    </div>
  );
}
