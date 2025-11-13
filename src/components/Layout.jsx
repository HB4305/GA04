import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-blue-300 font-sans flex flex-col lg:flex-row">
      {/* Header cho Mobile (chứa nút toggle) */}
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`
    flex-1 flex flex-col justify-center items-center text-center p-4 md:p-8 pt-20 md:pt-8
    transition-all duration-300
    ${
      isSidebarOpen
        ? "opacity-50 blur-sm lg:opacity-100 lg:blur-0"
        : "opacity-100 blur-0"
    }
  `}
      >
        <Outlet />
      </main>
    </div>
  );
}
