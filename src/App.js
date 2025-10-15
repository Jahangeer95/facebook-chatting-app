import React from "react";
import { ChatPage } from "./pages/ChatPage";
import { Posts } from "./pages/Posts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { ToastContainer } from "react-toastify";
import { Home } from "./components/home/Home";
import { Login } from "./pages/Login";
import { Pages } from "./components/page/Pages";
import { Campaigns } from "./components/campaigns/Campaigns";
// const App = () => <ChatPage />;
// export default App;

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "pages",
      element: <Pages />,
    },
    {
      path: "/:pageID",
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
        {
          path: "campaigns",
          element: <Campaigns />,
        },
        {
          path: "home",
          element: <Home />,
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
