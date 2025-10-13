import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header onToggleSidebar={()=>setIsSidebarOpen(!isSidebarOpen)}/>
      <div className="flex flex-1">
        <Sidebar isSidebarOpen={isSidebarOpen}/>
      
      {isSidebarOpen &&(
        <div className="fixed inset-0 bg-black bg-opacity-40 md:hidden" onClick={()=> setIsSidebarOpen(false)}></div>
      )}
      <div className="flex-1 bg-white overflow-auto">
      <Outlet />
      </div>
      </div>
    </div>
  );
}
