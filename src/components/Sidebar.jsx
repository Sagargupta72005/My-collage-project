import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(open || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            className="fixed top-0 left-0 h-full w-69 z-50 border-r
            md:translate-x-0 md:static md:flex md:flex-col"
            style={{
              background: "var(--fourth-gradient)",
            }}
          >
            {/* Close button */}
            <div className="md:hidden flex justify-end p-4">
              <button
                onClick={() => setOpen(false)}
                className="text-white text-lg hover:rotate-90 transition duration-300"
              >
                ✕
              </button>
            </div>

            {/* Logo */}
            <div className="px-5 py-4 border-b">
              <motion.h2
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-orange-300"
              >
                Limitless
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-xs text-orange-200 mt-1"
              >
                {role.toUpperCase()} PANEL
              </motion.p>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-2">
                {menu.map((item, i) => {
                  const isActive =
                    location.pathname.startsWith(item.path);

                  return (
                    <motion.li
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-10 py-6 rounded-lg transition-all duration-300
                        ${
                          isActive
                            ? "bg-orange-400 text-white shadow-lg scale-[1.02]"
                            : "text-gray-300 hover:bg-white/10 hover:text-orange-300 hover:translate-x-2"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-white scale-125"
                              : "bg-gray-500"
                          }`}
                        />

                        <span className="text-sm font-medium">
                          {item.name}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="p-4 border-t border-white/10 text-xs text-gray-400"
            >
              © {new Date().getFullYear()} Smart Dashboard
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;