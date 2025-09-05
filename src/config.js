
// export const baseURL = "https://a86d1d4bce35.ngrok-free.app";

import axios from "axios";

export const baseURL = "https://346481425ce7.ngrok-free.app";
export const pageID = "750201798171865";
export const accessToken="EAAH6cPpiKYUBPGtdS3riAZBGNcCv4HePVbxxbTNNwDh4ujrvUZA8N4awh90XvNJP6pyNip1vwK4spfz87x2l9IOkJ1h5oUYbPXcSbo23ZBHBvuCg9MCLV0lycYUYqV3ghj8Q6eMTaPs6ILhBTwIXy0NSIIZCLjdfuxkTPaIe3mZCyiXZBgVXU9bVZAcDZB8QBwVU6wmd0AZDZD "
export const Api=axios.create({
    baseURL:baseURL,
    headers:{
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
        Accept:"application/json,text",
        FB_PAGE_ID:pageID,
        FB_ACCESS_TOKEN:accessToken,
    },
    timeout:30000
})