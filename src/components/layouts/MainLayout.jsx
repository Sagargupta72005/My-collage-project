import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex h-screen text-gray-600 w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-900 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-600 transition-colors"
      style={{ background: "var(--primary-gradient)" }}
    >

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Right Side */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <Navbar onMenuClick={() => setOpen(true)} />

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}

export default MainLayout;