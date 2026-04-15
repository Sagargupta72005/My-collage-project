import { useState } from "react";

function Navbar({ onMenuClick }) {
  const [search, setSearch] = useState("");
  const name = localStorage.getItem("name");

  return (
    <div className=" py-5.25  bg-(--primary-gradient) border-b flex items-center justify-between px-4 md:px-6">

      {/* 🔥 Left (Hamburger + Title) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

        <h2 className="hidden sm:block text-lg font-semibold text-orange-300">
          Dashboard
        </h2>
      </div>

      {/* 🔥 Center (Search) */}
      <div className="flex-1 mx-3 md:mx-6 max-w-xs sm:max-w-md">
        <input
          type="text"
          placeholder="Search anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 md:px-4 py-2 text-orange-300  border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 🔥 Right (User) */}
      <div className="whitespace-nowrap">
        <span className="text-sm text-orange-300 font-medium">
          {name ? `Hello, ${name}` : "Guest"}
        </span>
      </div>

    </div>
  );
}

export default Navbar;