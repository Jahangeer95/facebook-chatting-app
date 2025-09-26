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
    console.log("Users",{ res });
    console.log("Users:", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Error :", error);
  }
};