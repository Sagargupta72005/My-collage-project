import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar({ open, setOpen }) {

  const navigate = useNavigate();
 
  // USER DATA
  const role =
    localStorage.getItem("role") || "user";

  const userName =
    localStorage.getItem("userName") || "User";

  const userEmail =
    localStorage.getItem("userEmail") || "";

  const location = useLocation();

  // USER INITIAL
  const initial = userName
    ? userName.charAt(0).toUpperCase()
    : "U";

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

      </AnimatePresence>

      {/* SIDEBAR */}
      <AnimatePresence>

        {(open || window.innerWidth >= 768) && (

          <motion.aside
            initial={{
              x: -300,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -300,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 18,
            }}
            className="
              fixed top-0 left-0 h-screen w-72 z-50
              md:static md:flex md:flex-col

              bg-white/10
              backdrop-blur-2xl
              border-r border-white/20
              shadow-2xl
            "
          >

            {/* TOP GLOW */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* MOBILE CLOSE */}
            <div className="md:hidden flex justify-end p-4">

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="
                  w-10 h-10 rounded-full
                  bg-white/10
                  hover:bg-white/20
                  text-white
                  transition
                "
              >
                ✕
              </button>

            </div>

            {/* LOGO */}
            <div className="px-6 py-6 border-b border-white/10">

              <motion.h1
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
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

              <p className="text-xs text-white/60 mt-1 uppercase tracking-[3px]">
                {role} workspace
              </p>

            </div>

            {/* USER CARD */}
            <div className="px-5 py-6">

              <div
                className="
                  bg-white/10
                  border border-white/10
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
                      to-pink-500
                      text-white
                      flex items-center justify-center
                      text-xl font-bold
                      shadow-lg
                    "
                  >
                    {initial}
                  </div>

                  {/* INFO */}
                  <div className="overflow-hidden">

                    <h2 className="text-white font-semibold truncate">
                      {userName}
                    </h2>

                    <p className="text-xs text-white/60 truncate">
                      {userEmail}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* MENU */}
            <nav className="flex-1 px-4 overflow-y-auto">

              <ul className="space-y-3">

                {menu.map((item, i) => {

                  const isActive =
                    location.pathname.startsWith(
                      item.path
                    );

                  return (
                    <motion.li
                      key={i}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          i * 0.1 + 0.2,
                      }}
                    >

                      <Link
                        to={item.path}
                        onClick={() =>
                          setOpen(false)
                        }
                        className={`
                          relative flex items-center gap-4
                          px-5 py-4 rounded-2xl
                          transition-all duration-300
                          overflow-hidden group

                          ${
                            isActive
                              ? `
                                bg-white/20
                                border border-white/20
                                text-white
                                shadow-lg
                                backdrop-blur-xl
                              `
                              : `
                                text-white/70
                                hover:bg-white/10
                                hover:text-white
                              `
                          }
                        `}
                      >

                        {/* ACTIVE GLOW */}
                        {isActive && (
                          <div
                            className="
                              absolute inset-0
                              bg-gradient-to-r
                              from-orange-400/20
                              to-pink-500/20
                            "
                          />
                        )}

                        <span className="relative text-xl">
                          {item.icon}
                        </span>

                        <span className="relative text-sm font-medium">
                          {item.name}
                        </span>

                      </Link>

                    </motion.li>
                  );
                })}

              </ul>

            </nav>

            {/* FOOTER */}
            <div className="p-5 border-t border-white/10">

              <button
                onClick={handleLogout}
                className="
                  w-full py-3 rounded-2xl
                  bg-gradient-to-r
                  from-red-500
                  to-pink-500
                  text-white font-medium
                  shadow-lg
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  transition-all duration-300
                "
              >
                Logout
              </button>

              <p className="text-center text-xs text-white/40 mt-4">
                © {new Date().getFullYear()} Limitless
              </p>

            </div>

          </motion.aside>
        )}

      </AnimatePresence>
    </>
  );
}

export default Sidebar;