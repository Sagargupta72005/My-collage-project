import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen  bg-gray-100 w-full">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Right Side */}
      <div className="flex-1 flex overflow-y-scroll flex-col">

        {/* Navbar */}
        <Navbar onMenuClick={() => setOpen(true)} />

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 ">
          {children}
        </main>

      </div>
    </div>
  );
}

export default MainLayout;