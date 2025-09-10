import { Api } from "../config";

// for getting posts
export const fetchAllPosts = async (after = "") => {
  try {
    const params = {};
    if (after) params.after = after;
    const res = await Api.get("/fb/page-posts", { params });

    const posts = res.data?.posts || [];
    const paging = res.data?.paging || null;

    console.log("Fetched posts:", { posts, paging });

    return { posts, paging };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], paging: null };
  }
};

//to fetch page detail
export const fetchPageDetail = async () => {
  try {
    const res = await Api.get(`fb/page-detail`);
    const data = res.data || [];
    console.log("Page detail", data);
    return { data };
  } catch (error) {
    console.error("Error fetching page detail:", error);
    return { data: [] };
  }
};

//to delete a post
export const deletePost = async (postid) => {
  try {
    const res = await Api.delete(`fb/page-posts/${postid}`);
    const data = res.data || [];
    console.log("Post Delete", postid);
    return { data };
  } catch (error) {
    console.error("Error deleting posts:", error);
    return { data: [] };
  }
};

//to create a text post
export const createTextPost = async (
  message,
  schedule = false,
  publishTime = null
) => {
  try {
    const body = {
      message,
      schedule,
      publishTime,
    };

    const res = await Api.post("fb/page-posts", body);
    console.log("Post created successfully", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in posting:", error);
  }
};

//to create a media post
export const createMediaPost = async (message, file, publishTime = null) => {
  try {
    const formData = new FormData();
    formData.append("message", message);
    formData.append("file", file);
    if (publishTime) {
      formData.append("publishTime", publishTime);
    }
    const res = await Api.post("fb/page-media-posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Post created sucessfully", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in posting:", error);
  }
};

//update post
export const updatePost = async (postid, message) => {
  try {
    const body = { postid, message };
    const res = await Api.post(`fb/page-posts/${postid}`, body);
    console.log("Post updated sucessfully", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in posting:", error);
  }
};

//to get scheduled posts
export const fetchAllSchedulePosts = async (after = "") => {
  try {
    const params = {};
    if (after) params.after = after;
    const res = await Api.get("/fb/page-schedule-posts", { params });

    const posts = res.data?.posts || [];
    const paging = res.data?.paging || null;

    console.log("Fetched posts:", { posts, paging });

    return { posts, paging };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], paging: null };
  }
};

//get comments of post
export const fetchComments = async (postId, after = "") => {
  try {
    const params = {};
    if (after) params.after = after;
    const res = await Api.get(`/fb/page-posts/${postId}/comments`, { params });

    const comments = res.data?.data || [];
    const paging = res.data?.paging || null;

    console.log("Fetched Comments:", { comments, paging });

    return { comments, paging };
  } catch (error) {
    console.error("Error fetching Comments:", error);
    return { comments: [], paging: null };
  }
};

//post a comment
export const addComment = async (postId, message) => {
  try {
    const body = {
      message,
    };

    const res = await Api.post(`fb/page-posts/${postId}/comments`, body);
    console.log("Comment posted successfully", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in posting a comment:", error);
  }
};

//post a comment
export const replyComment = async (postId, replyMessage, commentId) => {
  try {
    const body = {
      message: replyMessage,
      commentId,
    };

    const res = await Api.post(`fb/page-posts/${postId}/comments`, body);
    console.log("Comment posted successfully", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in posting a comment:", error);
  }
};

//get replies of post comments
export const fetchCommentsReplies = async (commentId, after = "") => {
  try {
    const params = {};
    if (after) params.after = after;
    const res = await Api.get(`/fb/page-posts/${commentId}/comments`, {
      params,
    });

    const replies = res.data?.data || [];
    const paging = res.data?.paging || null;

    console.log("Fetched Comment Replies:", { replies, paging });

    return { replies, paging };
  } catch (error) {
    console.error("Error fetching Comments Replies:", error);
    return { replies: [], paging: null };
  }
};

//update media post
export const updateMediaPost = async (postid, message, file) => {
  try {
    const formData = new FormData();
    formData.append("message", message);
    formData.append("file", file);
    const res = await Api.post(`fb/page-media-posts/${postid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Post created sucessfully", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in posting:", error);
  }
};

//fetch insights
export const getPostInsights = async (postId, timePeriod) => {
  try {
    const res = await Api.get(`/fb/page-posts/${postId}/insights`, {
      params: { time_period: timePeriod },
    });

    console.log("Fetched Insights:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching insights:", error);
  }
};
