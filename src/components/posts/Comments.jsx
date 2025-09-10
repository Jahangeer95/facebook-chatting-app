import { useEffect, useState } from "react";
import { fetchComments, addComment } from "../../api";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import { Insights } from "./Insights";

export function Comments({ postId, pageName }) {
  const [selected, setSelected] = useState(false);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [paging, setPaging] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openInsights, setOpenInsights] = useState(false);

  useEffect(() => {
    if (selected) {
      const getComments = async () => {
        try {
          const { comments, paging } = await fetchComments(postId);
          const sorted = comments.sort(
            (a, b) => new Date(b.created_time) - new Date(a.created_time)
          );
          setComments(sorted);
          setPaging(paging);
        } catch (err) {
          toast.error("Failed to load comments");
        }
      };
      getComments();
    }
  }, [selected, postId]);

  const hasMoreComments = async () => {
    if (!paging?.next) return;

    try {
      const res = await fetch(paging.next);
      const data = await res.json();

      const newComments = data?.data || [];
      const newPaging = data?.paging || null;

      setComments((prev) => {
        const moreComments = [...prev, ...newComments];
        return Array.from(new Map(moreComments.map((c) => [c.id, c])).values());
      });

      setPaging(newPaging);
    } catch (err) {
      console.log("Failed to fetch more comments", err);
      toast.error("Failed to fetch more comments");
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const newComment = {
      id: Date.now().toString(),
      message,
      from: { name: pageName },
      created_time: new Date().toISOString(),
    };
    setLoading(true);
    setComments((prev) => [...prev, newComment]);
    try {
      await addComment(postId, message);
      setLoading(false);
      setMessage("");
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };
  const handleCommentKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment(e, postId);
    }
  };

  return (
    <div className="flex flex-col border-t border-gray-300">
      <div className="flex justify-between mr-5 p-2 text-gray-600">
        <button
          className="text-blue-600 ml-4"
          onClick={() => setOpenInsights(true)}
        >
          Get Insights
        </button>
        <button onClick={() => setSelected(!selected)}>
          {selected ? "Hide" : "Comments"}
        </button>
      </div>
      {openInsights && (
        <Insights postId={postId} setOpenInsights={setOpenInsights} />
      )}
      {selected && (
        <div
          className="p-4 overflow-auto h-[350px] bg-gray-200"
          id="scrollcomments"
        >
          <InfiniteScroll
            dataLength={comments.length}
            next={hasMoreComments}
            hasMore={!!paging?.next}
            loader={
              <div className="text-center p-4 text-sm text-blue-600">
                <p className="text-xs text-blue-500">
                  Loading more comments...
                </p>
                <FontAwesomeIcon icon={faSpinner} spin size="lg" />
              </div>
            }
            scrollableTarget="scrollcomments"
          >
            {comments.length === 0 ? (
              <p className="text-center p-36">No comments</p>
            ) : (
              comments.map((comment) => (
                <CommentList
                  key={comment.id}
                  comment={comment}
                  postId={postId}
                />
              ))
            )}
          </InfiniteScroll>
        </div>
      )}

      {selected && (
        <CommentInput
          value={message}
          setValue={setMessage}
          onSubmit={handleSubmitComment}
          onKeyDown={handleCommentKeyDown}
          loading={loading}
          type={"Comment"}
        />
      )}
    </div>
  );
}
