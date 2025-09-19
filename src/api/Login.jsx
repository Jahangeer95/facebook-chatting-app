import { Api } from "../config";

export const loginUser = async (email, password) => {
  try {
    const body = { email, password };
    const res = await Api.post(`user/login`, body);
console.log({res})
    const token = res.headers['User_auth_token' || 'user_auth_token'];
    console.log("User Token:", token);
    console.log("User:", res.data);
    return { data: res.data, token };
  } catch (error) {
    console.error("Error :", error);
  }
};
