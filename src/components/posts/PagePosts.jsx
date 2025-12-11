import { useEffect, useRef, useState } from "react";
import {
  deletePost,
  fetchAllPosts,
  fetchPageDetail,
  updateMediaPost,
  updatePost,
} from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faSpinner } from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { DropDown } from "./DropDown";
import { Comments } from "./Comments";
import { toast } from "react-toastify";
import { Loading } from "./Loading";

export function PagePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState(null);
  const [open, setOpen] = useState(null);
  const menuRef = useRef(null);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (document.querySelector(".modal-open")) return;
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
    setLoading(true);
    try {
      const { posts: initialPost, paging: initialPage } = await fetchAllPosts();
      setPosts(initialPost);
      setPaging(initialPage);
    } catch (err) {
      console.error("Posts failed to load", err);
      toast.error("Posts failed to load");
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
      toast.error("Page information failed to load");
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
      const { posts: newPosts, paging: newPaging } = await fetchAllPosts(
        paging.cursors.after
      );
      setPosts((prev) => [...prev, ...newPosts]);
      setPaging(newPaging);
    } catch (err) {
      console.log("Failed to fetch more posts", err);
      toast.error("Failed to fetch more Posts");
    }
  };

  const handleUpdatePosts = async (id, newMessage, file) => {
    try {
      if (file) {
        await updateMediaPost(id, newMessage, file);
        setPosts((prev) =>
          prev.map((post) =>
            post.id === id
              ? { ...post, message: newMessage, attachments: file }
              : post
          )
        );
        await getPosts();
      } else {
        await updatePost(id, newMessage);
        setPosts((prev) =>
          prev.map((post) =>
            post.id === id ? { ...post, message: newMessage } : post
          )
        );
      }
    } catch (error) {
      console.log("Error updating a post", error);
      toast.error(
        <div>
          <strong>Update Post</strong> {error.message}
        </div>
      );
    }
  };
  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };
  // if (loading) {
  //   return (
  //     <div className="text-center mt-10">
  //       <FontAwesomeIcon
  //         icon={faSpinner}
  //         spin
  //         size="lg"
  //         className="text-blue-700"
  //       />
  //       <p className="mt-2 text-gray-600">Loading Posts...</p>
  //     </div>
  //   );
  // }

  return (
    <div
    >
      <button
        onClick={() => getPosts()}
        className="p-2  mb-3 mr-4 rounded text-white bg-blue-600 "
      >
        Refresh
      </button>
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
              className="bg-white p-4 rounded-lg shadow mb-4 relative border-t border-gray-400"
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
                        posts.length > 1 &&
                        posts.indexOf(post) === posts.length - 1
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
              <Comments postId={post.id} pageName={pageInfo?.data.name} />
            </div>
          ))
        ) : (
          // <div className="text-center mt-10">
          //   <FontAwesomeIcon
          //     icon={faSpinner}
          //     spin
          //     size="lg"
          //     className="text-blue-700"
          //   />
          //   <p className="mt-2 text-gray-600">Loading Posts...</p>
          // </div>
          <Loading />
        )}
      </InfiniteScroll>
    </div>
  );
}
