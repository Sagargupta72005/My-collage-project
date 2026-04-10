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
          className="fixed inset-0 h-screen bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0 " : "-translate-x-full"}
        md:translate-x-0 md:static md:flex md:flex-col`}
      >
        {/* Close button (mobile) */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Logo */}
        <div className="px-5 py-4 border-b">
          <h2 className="text-2xl font-bold text-blue-600">
            Limitless
          </h2>
          <p className="text-xs text-gray-400 mt-1">
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
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? "bg-white" : "bg-gray-300"
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
        <div className="p-4 border-t text-xs text-gray-400">
          © {new Date().getFullYear()} Smart Dashboard
        </div>
      </aside>
    </>
  );
}

export default Sidebar;