import React from "react";
import { ChatPage } from "./pages/ChatPage";
import { Posts } from "./pages/Posts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { ToastContainer } from "react-toastify";
import { Home } from "./components/home/Home";
import { Login } from "./pages/Login";
// const App = () => <ChatPage />;
// export default App;

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element:<Login/> ,
        },
        {
          path: "messenger",
          element: <ChatPage />,
        },
        {
          path: "posts",
          element: <Posts />,
        },
        {
          path: "login",
          element: <Login />,
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
