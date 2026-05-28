import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  // USER DATA
  const role = localStorage.getItem("role") || "user";
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "";

  const location = useLocation();

  // USER INITIAL
  const initial = userName ? userName.charAt(0).toUpperCase() : "U";

  // MENU
  const menu = [
    {
      name: "Dashboard",
      icon: "📊",
      path: `/${role}/dashboard`,
    },
    {
      name: "Tasks",
      icon: "✅",
      path: `/${role}/tasks`,
    },
    {
      name: "Analytics",
      icon: "📈",
      path: `/${role}/analytics`,
    },
    {
      name: "Profile",
      icon: "👤",
      path: `/${role}/profile`,
    },
  ];

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  return (
    <>
      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-(--primary-gradient) backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
            className="
              fixed top-0 left-0 h-screen w-72 z-50
              md:hidden
              backdrop-blur-2xl
              border-r border-black/20
              shadow-2xl
              overflow-hidden
            "
          >
            {/* TOP GLOW */}
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute bottom-0 right-0 w-48 h-48  rounded-full blur-3xl pointer-events-none" />

            {/* MOBILE CLOSE */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setOpen(false)}
                className="
                  w-10 h-10 rounded-full
                  bg-(--primary-gradient)
                  hover:bg-black/20
                  (--text)
                  transition
                "
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <SidebarContent
              menu={menu}
              location={location}
              role={role}
              userName={userName}
              userEmail={userEmail}
              initial={initial}
              setOpen={setOpen}
              handleLogout={handleLogout}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="
          hidden md:flex md:flex-col
          h-screen w-72
          bg-(--primary-gradient)
          backdrop-blur-2xl
          border-r border-black/20
          shadow-2xl
          overflow-hidden
          relative
        "
      >
        {/* TOP GLOW */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <SidebarContent
          menu={menu}
          location={location}
          role={role}
          userName={userName}
          userEmail={userEmail}
          initial={initial}
          setOpen={setOpen}
          handleLogout={handleLogout}
        />
      </aside>
    </>
  );
}

/* ========================= */
/* SIDEBAR CONTENT COMPONENT */
/* ========================= */

function SidebarContent({
  menu,
  location,
  role,
  userName,
  userEmail,
  initial,
  setOpen,
  handleLogout,
}) {
  return (
    <>
      {/* LOGO */}
      <div className="px-6 py-6 border-b border-black/10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            text-3xl font-black
            bg-gradient-to-r
            from-orange-300
            to-pink-400
            bg-clip-text
            text-transparent
          "
        >
          Limitless
        </motion.h1>

        <p className="text-xs (--text)/60 mt-1 uppercase tracking-[3px]">
          {role} workspace
        </p>
      </div>

      {/* USER CARD */}
      <div className="px-5 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="
            bg-black/10
            border border-black/10
            rounded-3xl
            p-4
            backdrop-blur-xl
            shadow-lg
          "
        >
          <div className="flex items-center gap-4">
            {/* AVATAR */}
            <div
              className="
                w-14 h-14 rounded-2xl
                bg-gradient-to-br
                from-orange-400
                to-yellow-500
                text-(--text)
                flex items-center justify-center
                text-xl font-bold
                shadow-lg
              "
            >
              {initial}
            </div>

            {/* INFO */}
            <div className="overflow-hidden">
              <h2 className="text-black font-semibold truncate">
                {userName}
              </h2>
              <p className="text-xs text-black/60 truncate">
                {userEmail}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <ul className="space-y-3">
          {menu.map((item, i) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.08 + 0.15,
                }}
              >
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`
                    relative flex items-center gap-4
                    px-5 py-4 rounded-2xl
                    transition-all duration-300
                    overflow-hidden group

                    ${
                      isActive
                        ? `
                          bg-black/20
                          border border-black/20
                          (--text)
                          shadow-lg
                          backdrop-blur-xl
                        `
                        : `
                          (--text)/70
                          hover:bg-black/10
                          hover:(--text)
                        `
                    }
                  `}
                >
                  {/* ACTIVE GLOW */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="
                        absolute inset-0
                        bg-gradient-to-r
                        from-orange-400/20
                        to-(--third-gradient)
                      "
                    />
                  )}

                  <span className="relative text-xl">{item.icon}</span>

                  <span className="relative text-sm font-medium">
                    {item.name}
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* PROJECT INFO */}
      <div className="rounded-2xl p-5 text-(--text)">
        <h2 className="text-lg font-semibold mb-2">
          Project Information
        </h2>

        <p className="text-md text- (--text)/70 leading-relaxed">
          This dashboard project was developed by{" "}
          <span className="font-semibold text-black">
            Sagar Gupta
          </span>{" "}
          and{" "}
          <span className="font-semibold text-black">
            Utkarsh Gupta
          </span>.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="
              px-4 py-2
              rounded-xl
              bg-black/10
              hover:bg-black/20
              text-sm
              transition
            "
          >
            Contact Us on Gmail
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-5 border-t border-black/10">
        <button
          onClick={handleLogout}
          className="
            w-full py-3 rounded-2xl
            bg-gradient-to-r
            from-red-500
            to-red-400
            (--text) font-medium
            shadow-lg
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all duration-300
          "
        >
          Logout
        </button>

        <p className="text-center text-xs text-(--text)/40 mt-4">
          © {new Date().getFullYear()} Limitless
        </p>
      </div>
    </>
  );
}

export default Sidebar;