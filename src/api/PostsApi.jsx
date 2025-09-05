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
