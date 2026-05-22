import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

  // Search State
  const [search, setSearch] = useState("");

  return (
    <div
      className="flex h-screen text-gray-600 w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-900 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-600 transition-colors overflow-hidden"
      style={{ background: "var(--fourth-gradient)" }}
    >
      {/* Sidebar */}
      <AnimatePresence>
        <Sidebar open={open} setOpen={setOpen} />
      </AnimatePresence>

      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="flex-1 flex flex-col overflow-hidden"
      >
        {/* Navbar */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
          }}
        >
          <Navbar
            onMenuClick={() => setOpen(true)}
            search={search}
            setSearch={setSearch}
          />
        </motion.div>

        {/* Content */}
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="flex-1 p-4 md:p-6 overflow-y-auto"
        >
          {children && typeof children === "function"
            ? children({ search })
            : children}
        </motion.main>
      </motion.div>
    </div>
  );
}

export default MainLayout;