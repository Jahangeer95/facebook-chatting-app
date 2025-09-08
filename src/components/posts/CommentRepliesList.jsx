import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchCommentsReplies } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export function CommentRepliesList({ commentId }) {
  const [replies, setReplies] = useState([]);
  const [paging, setPaging] = useState(null);

  useEffect(() => {
    const getReplies = async () => {
      const { replies, paging } = await fetchCommentsReplies(commentId);
      setReplies(replies);
      setPaging(paging);
    };
    getReplies();
  }, [commentId]);

  const hasMoreReplies = async () => {
    if (!paging?.next) return;

    try {
      const res = await fetch(paging.next);
      const data = await res.json();

      const newComments = data?.data || [];
      const newPaging = data?.paging || null;

      setReplies((prev) => {
        const newReplies = [...prev, ...newComments];
        return Array.from(new Map(newReplies.map((r) => [r.id, r])).values());
      });

      setPaging(newPaging);
    } catch (err) {
      console.log("Failed to fetch more comments", err);
      toast.error("Failed to fetch more comments");
    }
  };

  return (
    <InfiniteScroll
      dataLength={replies.length}
      next={hasMoreReplies}
      hasMore={!!paging?.next}
      loader={
        <div className="text-center p-4 text-sm text-blue-600">
          <p className="text-xs text-blue-500">Loading more replies...</p>
          <FontAwesomeIcon icon={faSpinner} spin size="lg" />
        </div>
      }
      scrollableTarget="scrollcommentsreplies"
    >
      {replies.length === 0 ? (
        <p className="text-center p-36">No comments</p>
      ) : (
        replies.map((reply) => (
          <div key={reply.id} className="p-2 mb-2 rounded bg-gray-50 shadow">
            <p className="font-bold">{reply.from?.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(reply.created_time).toLocaleString()}
            </p>
            <p className="text-gray-700">{reply.message}</p>
          </div>
        ))
      )}
    </InfiniteScroll>
  );
}
