import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");

  // You said you login with name only, so we fetch name
  const name = localStorage.getItem("name");

  return (
    <div className="bg-white shadow px-6 py-5.25 border-b flex justify-between items-center">


      {/* Center - Search Bar */}
      <div className="flex-1 mx-6 max-w-md">
        <input
          type="text"
          placeholder="Search anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Right - User Name */}
      <div>
        <span className="text-sm text-gray-600 font-medium">
          {name ? `Hello, ${name}` : "Guest"}
        </span>
      </div>

    </div>
  );
}

export default Navbar;