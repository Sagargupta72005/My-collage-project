import { Link, useLocation } from "react-router-dom";

function Sidebar({ open, setOpen }) {
  const role = localStorage.getItem("role") || "user";
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: `/${role}/dashboard` },
    { name: "Tasks", path: `/${role}/tasks` },
    { name: "Profile", path: `/${role}/profile` },
  ];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="selection:none fixed  inset-0 bg-black/50 z-40 md:hidden "
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 border-r
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex md:flex-col`}
        style={{
          background:
            "var(--fourth-gradient)", // 🔥 dark clean gradient
        }}
      >
        {/* Close button */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            className="text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* Logo */}
        <div className="px-5 py-4 border-b">
          <h2 className="text-2xl font-bold text-orange-300">
            Limitless
          </h2>
          <p className="text-xs text-orange-200 mt-1">
            {role.toUpperCase()} PANEL
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
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                    ${
                      isActive
                        ? "bg-orange-400 text-white shadow"
                        : "text-gray-300 hover:bg-white/10 hover:text-orange-300"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? "bg-white" : "bg-gray-500"
                      }`}
                    />

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
        <div className="p-4 border-t border-white/10 text-xs text-gray-400">
          © {new Date().getFullYear()} Smart Dashboard
        </div>
      </aside>
    </>
  );
}

export default Sidebar;