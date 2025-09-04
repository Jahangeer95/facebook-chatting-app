// // ChatComponent.jsx
// import { useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("https://a86d1d4bce35.ngrok-free.app"); // <-- PORT replace karein apne backend ke port se

// const ChatComponent = () => {
//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected to socket with ID:", socket.id);
//     });

//     socket.on("message_from_user", (data) => {
//       console.log("📨 New message from Facebook user:", data);
//     });

//     socket.on("message_read", (data) => {
//       console.log("📖 User read messages:", data);
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("message_from_user");
//       socket.off("message_read");
//     };
//   }, []);

//   return null; 
// };

// export default ChatComponent;



import { useEffect } from "react";
import { io } from "socket.io-client";

// Replace with your actual backend URL (ngrok)
const socket = io("https://a86d1d4bce35.ngrok-free.app", {
  transports: ["websocket"], // Force WebSocket transport
});

const ChatComponent = () => {
  useEffect(() => {
    // Connected
    socket.on("connect", () => {
      console.log("✅ Connected to socket with ID:", socket.id);
    });

    // New message event
    socket.on("message_from_user", (data) => {
      console.log("📨 New message from Facebook user:", data);
      // Optional: Update state or UI
    });

    // Message read event
    socket.on("message_read", (data) => {
      console.log("📖 User read messages:", data);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
      socket.off("message_from_user");
      socket.off("message_read");
    };
  }, []);

  return null; // No UI needed for this test component
};

export default ChatComponent;
