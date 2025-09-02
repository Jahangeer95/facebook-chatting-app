import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
      
      <div className="flex-1 bg-white overflow-auto">
      <Outlet />
      </div>
      </div>
    </div>
  );
}
