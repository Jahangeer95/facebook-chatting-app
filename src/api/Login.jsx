import { Api } from "../config";

export const loginUser = async (email, password) => {
  try {
    const body = { email, password };
    const res = await Api.post(`user/login`, body);
console.log({res})
    if(res.status===200){
      
    const token = res.headers['user_auth_token'];
    console.log("User Token:", token);
    console.log("User:", res.data);
    localStorage.setItem("user_auth_token",token)
    return { data: res.data, token };
    }
  } catch (error) {
    console.error("Error :", error);
  }
};
