import React from "react";
import { ChatPage } from "./pages/ChatPage";
import { Posts } from "./pages/Posts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { ToastContainer } from "react-toastify";
// const App = () => <ChatPage />;
// export default App;

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "messenger",
          element: <ChatPage />,
        },
        {
          path: "posts",
          element: <Posts />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};
export default App;
