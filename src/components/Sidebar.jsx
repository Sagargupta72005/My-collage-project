import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role") || "user";
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: `/${role}/dashboard` },
    { name: "Tasks", path: `/${role}/tasks` },
    { name: "Profile", path: `/${role}/profile` },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">

      {/* Logo / Brand */}
      <div className="px-5 py-4 border-b">
        <h2 className="text-2xl font-bold text-blue-600 tracking-tight">
          limit less
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {(role || "user").toUpperCase()} PANEL
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menu.map((item, i) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <li key={i}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {/* Indicator */}
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-white" : "bg-gray-300"
                    }`}
                  ></span>

                  <span className="text-sm font-medium">
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-xs text-gray-400">
        © {new Date().getFullYear()} Smart Dashboard
      </div>
    </div>
  );
}

export default Sidebar;