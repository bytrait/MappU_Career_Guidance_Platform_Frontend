import { useState } from "react";
import { Outlet } from "react-router-dom";
import CounsellorSidebar from "./CounsellorSidebar";
import Navbar from "../../Navbar";
import CounsellorTopbar from "./CounsellorTopbar";

export default function CounsellorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* Sidebar */}
      <CounsellorSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Top Navbar */}
        <div className="bg-white">
          <CounsellorTopbar setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
