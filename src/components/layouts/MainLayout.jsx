import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function MainLayout({ children }) {

  const [open, setOpen] =
    useState(false);

  // SEARCH
  const [search, setSearch] =
    useState("");

  return (
    <div
      className="
        relative flex h-screen w-full overflow-hidden
        text-white
      "
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 35%, #1e1b4b 100%)",
      }}
    >

      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute top-[-100px] left-[-100px]
          w-[320px] h-[320px]
          bg-pink-500/20
          rounded-full blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute bottom-[-120px] right-[-120px]
          w-[350px] h-[350px]
          bg-orange-400/20
          rounded-full blur-3xl
          pointer-events-none
        "
      />

      {/* SIDEBAR */}
      <AnimatePresence>
        <Sidebar
          open={open}
          setOpen={setOpen}
        />
      </AnimatePresence>

      {/* RIGHT SIDE */}
      <motion.div
        initial={{
          opacity: 0,
          x: 40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: 40,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="
          flex-1 flex flex-col overflow-hidden
          relative z-10
        "
      >

        {/* NAVBAR */}
        <motion.div
          initial={{
            y: -30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
            delay: 0.2,
          }}
          className="
            backdrop-blur-xl
            bg-white/5
            border-b border-white/10
            shadow-lg
          "
        >

          <Navbar
            onMenuClick={() =>
              setOpen(true)
            }
            search={search}
            setSearch={setSearch}
          />

        </motion.div>

        {/* MAIN CONTENT */}
        <motion.main
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 30,
          }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="
            flex-1 overflow-y-auto
            p-4 md:p-6

            scrollbar-thin
            scrollbar-thumb-white/20
            scrollbar-track-transparent
          "
        >

          {/* GLASS CONTAINER */}
          <div
            className="
              min-h-full rounded-3xl

              bg-white/5
              backdrop-blur-2xl

              border border-white/10

              shadow-[0_8px_32px_rgba(0,0,0,0.35)]

              p-4 md:p-6
            "
          >

            {children &&
            typeof children === "function"
              ? children({ search })
              : children}

          </div>

        </motion.main>

      </motion.div>

    </div>
  );
}

export default MainLayout;