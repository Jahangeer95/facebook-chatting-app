import { useEffect, useRef, useState } from "react";
import {
  deletePost,
  fetchAllSchedulePosts,
  fetchPageDetail,
  updatePost,
} from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faSpinner } from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { DropDown } from "./DropDown";

export function SchedulePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState(null);
  const [open, setOpen] = useState(null);
  const menuRef = useRef(null);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(null);
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const getPosts = async () => {
    try {
      const { posts: initialPost, paging: initialPage } =
        await fetchAllSchedulePosts();
      setPosts(initialPost);
      setPaging(initialPage);
    } catch (err) {
      console.error("Posts failed to load", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  const getPageDetails = async () => {
    try {
      const res = await fetchPageDetail();
      setPageInfo(res.data);
      console.log("Page info", res.data);
    } catch (err) {
      console.error("Page information failed to load", err);
    }
  };
  useEffect(() => {
    getPageDetails();
  }, []);
  const hasMorePosts = async () => {
    if (!paging?.cursors?.after) {
      return;
    }
    try {
      const { posts: newPosts, paging: newPaging } =
        await fetchAllSchedulePosts(paging.cursors.after);
      setPosts((prev) => [...prev, ...newPosts]);
      setPaging(newPaging);
    } catch (err) {
      console.log("Failed to fetch more posts", err);
    }
  };

  const handleUpdatePosts = async (id, newMessage) => {
    await updatePost(id, newMessage);
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, message: newMessage } : post
      )
    );
  };
  const handleDeletePost = async (id) => {
    await deletePost(id);
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };
  //   if (loading) {
  //     return (
  //       <div className="text-center mt-10">
  //         <FontAwesomeIcon
  //           icon={faSpinner}
  //           spin
  //           size="lg"
  //           className="text-blue-700"
  //         />
  //         <p className="mt-2 text-gray-600">Loading Posts...</p>
  //       </div>
  //     );
  //   }

  return (
    <div
      className="w-[700px] mx-auto p-4 border overflow-auto h-[600px]"
      id="scrollposts"
    >
      <InfiniteScroll
        dataLength={posts.length}
        next={hasMorePosts}
        hasMore={!!paging?.cursors?.after}
        loader={
          <div className="text-center p-4 text-sm text-gray-600">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              size="lg"
              className="text-blue-700"
            />
          </div>
        }
        scrollableTarget="scrollposts"
      >
        {!loading ? (
          posts.map((post) => (
            <div
              className="bg-white p-4 rounded-lg shadow mb-4 relative"
              key={post.id}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="font-bold text-xl text-black">
                  {pageInfo?.data.name}
                  <p className="text-gray-500 text-xs mb-2">
                    {new Date(post.created_time).toLocaleString()}
                  </p>
                </div>

                <div
                  className="relative"
                  ref={open === post.id ? menuRef : null}
                >
                  <button
                    onClick={() => setOpen(open === post.id ? null : post.id)}
                    className="p-1"
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>
                  {open === post.id && (
                    <div
                    className={`absolute right-0 bg-white border shadow rounded p-2 z-50 ${
                      posts.length > 1 && posts.indexOf(post) === posts.length - 1
                        ? "bottom-full mb-2"
                        : "top-6"
                    }`}
                    >
                      <DropDown
                        postId={post.id}
                        message={post.message}
                        onUpdate={handleUpdatePosts}
                        onDelete={handleDeletePost}
                      />
                    </div>
                  )}
                </div>
              </div>

              <p className="mb-2">{post.message}</p>
              {post.attachments?.data?.map((att, index) => (
                <div
                  key={index}
                  className="mt-4 border-t border-gray-300 justify-items-center"
                >
                  {att.media?.image && (
                    <img
                      src={att.media.image.src}
                      alt={att.title}
                      className="rounded max-w-full mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center mt-10">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              size="lg"
              className="text-blue-700"
            />
            <p className="mt-2 text-gray-600">Loading Posts...</p>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
