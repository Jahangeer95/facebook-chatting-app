
// export const baseURL = "https://a86d1d4bce35.ngrok-free.app";

import axios from "axios";

// export const baseURL = "https://backend-whatsapp-chat-production.up.railway.app/";
// export const pageID = "796037320257871";
// export const accessToken="EAAKoMbXdYFABPXJv8f1eMaXnVqLa6dHIrysFtHqEZCyVAegPGqg6B9ZAEpCaAgVeZBZCJ9JYTIkCyjhkhGIBsOp2qwbi3KdZCqYzsHoYFhWZCJfwZCPGcJdkizDTcPrWkMYy5gNO76y01jWhIxTZAJgcX0yclUVk0oiZCZCXoPvhw7PfBuzgEIbVhMnX4aZAzlN3LlY1hkjzhByjozjttQblEzZBJewalQZDZD"

export const baseURL = "https://backend-whatsapp-chat-production.up.railway.app/";
// export const pageID = "750201798171865";
// export const accessToken="EAAH6cPpiKYUBPGtdS3riAZBGNcCv4HePVbxxbTNNwDh4ujrvUZA8N4awh90XvNJP6pyNip1vwK4spfz87x2l9IOkJ1h5oUYbPXcSbo23ZBHBvuCg9MCLV0lycYUYqV3ghj8Q6eMTaPs6ILhBTwIXy0NSIIZCLjdfuxkTPaIe3mZCyiXZBgVXU9bVZAcDZB8QBwVU6wmd0AZDZD "
export const Api=axios.create({
    baseURL:baseURL,
    headers:{
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
        Accept:"application/json,text",
        // FB_PAGE_ID:pageID,
        // FB_ACCESS_TOKEN:accessToken,
    },
    timeout:30000
})

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {

      if (error.response.status === 401) {
          // redirect to login
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

Api.interceptors.request.use(
  (request) => {
    console.log(request)
    const token = localStorage.getItem("user_auth_token");
    if (token) {
      request.headers["user_auth_token"] = token;
    }
    const pageID = sessionStorage.getItem("fb_page_id");
    if (pageID) {
      request.headers["fb_page_id"] = pageID;
    }
    const accessToken = sessionStorage.getItem("fb_access_token");
    if (accessToken) {
      request.headers["fb_access_token"] = accessToken;
    }
    const adTokenId=sessionStorage.getItem("fb_ad_account_id");
    if (adTokenId) {
      request.headers["fb_ad_account_id"] = adTokenId;
    }else{
      request.headers["fb_ad_account_id"] = "";
    }
    console.log("request header:", request.headers);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);