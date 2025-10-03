import { Api } from "../config";

//user login
export const loginUser = async (email, password) => {
  try {
    const body = { email, password };
    const res = await Api.post(`user/login`, body);
    console.log({ res });
    if (res.status === 200) {
      const token = res.headers["user_auth_token"];
      console.log("User Token:", token);
      console.log("User:", res.data);
      localStorage.setItem("user_auth_token", token);
      return { data: res.data, token };
    }
  } catch (error) {
    console.error("Error :", error);
  }
};

//to save details of page in db
export const createPage = async (pageName, pageId, accessToken) => {
  try {
    const body = {
      page_name: pageName,
      page_id: pageId,
      access_token: accessToken,
    };
    const res = await Api.post(`user/pages`, body);
    console.log({ res });
    console.log("Result:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error :", error);
    throw new Error(error.response?.error?.message ||error.response?.data?.message|| error.message);
  }
};

//to fetch pages of user
export const getPages = async () => {
  try {
    const res = await Api.get(`user/pages`);
    console.log({ res });
    console.log("Result:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error :", error);
  }
};

//to fetch users
export const getUsers = async () => {
  try {
    const res = await Api.get(`user`);
    console.log("Users", { res });
    console.log("Users:", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Error :", error);
  }
};

//createUser
export const createUser = async (username, email, password, role) => {
  try {
    const body = { username, email, password, role };
    const res = await Api.post(`user`, body);
    console.log("User created", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Data:", error.response.data?.message);
    }
    console.error("Error :", error);
    throw new Error(error.response?.data?.message);
  }
  
};

//add user
export const addUsersToPage = async (pageId, userId) => {
  try {
    if (!userId) return;
    const res = await Api.post(`/user/pages/${pageId}`, { userId });
    console.log("User added", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Data:", error.response.data);
    }
    console.error("Error :", error.message);
  }
};

//update user role
export const updateUserRole = async (userId,role) => {
  try {
    if (!userId) return;
    const res = await Api.patch(`/user/${userId}`, { role: role });
    console.log("User role updated", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Data:", error.response.data);
    }
    console.error("Error :", error.message);
    console.error("Error :", error);
    throw new Error(error.response?.data);
  }
};

//delete user
export const deleteUser = async (userId) => {
  try {
    if (!userId) return;
    const res = await Api.delete(`/user/${userId}`);
    console.log("User deleted", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Data:", error.response.data);
    }
    // console.error("Error :", error.message);
    console.error("Error :", error);
    throw new Error(error.response?.data?.error);
  }
};

//delete page data
export const deletePageData = async (pageId) => {
  try {
    if (!pageId) return;
    const res = await Api.delete(`/user/pages/${pageId}`);
    console.log("Page data deleted successfully", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Data:", error.response.data);
    }
    console.error("Error :", error.message);
    throw new Error(error.response?.data?.error);
  }
};
