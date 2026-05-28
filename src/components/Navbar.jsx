function Navbar({ onMenuClick, search, setSearch }) {
  // USER DATA
  const name = localStorage.getItem("userName") || "Guest";

  const role = localStorage.getItem("role") || "user";

  // USER INITIAL
  const initial = name ? name.charAt(0).toUpperCase() : "G";

  return (
    <div
      className="
        sticky top-0 z-30
        flex items-center justify-between
        gap-4
        px-6 md:px-6
        py-5

        bg-white/5
        backdrop-blur-2xl

        border-b border-white/10

        shadow-lg
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* MOBILE MENU */}
        <button
          onClick={onMenuClick}
          className="
            md:hidden
            w-11 h-11 rounded-2xl
            bg-white/10
            hover:bg-white/20
            border border-white/10
            text-black text-xl
            transition-all duration-300
          "
        >
          ☰
        </button>

        {/* TITLE */}
        <div>
          <h2
            className="
              text-xl md:text-2xl
              font-bold

              bg-gradient-to-r
              from-orange-300
              to-pink-400

              bg-clip-text
              text-transparent
            "
          >
            Dashboard
          </h2>

          <p className="text-xs text-white/50 uppercase tracking-[2px]">
            {/* {role} */}
             workspace
          </p>
        </div>
      </div>

      {/* CENTER */}
      {/* <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full
              pl-11 pr-4 py-3
              rounded-2xl
              bg-white/10
              backdrop-blur-xl
              border border-white/10

              text-white
              placeholder:text-white/40

              focus:outline-none
              focus:ring-2
              focus:ring-orange-400/50
              focus:border-orange-300/40

              transition-all duration-300
            "
          />
        </div>
      </div> */}

      {/* RIGHT */}
      <div
        className="
          flex items-center gap-3
          px-3 py-2
          rounded-2xl
          bg-(--primary-color)/10
          backdrop-blur-xl
          border border-white/10
        "
      >
        <div className="hidden sm:block text-right">
          <p className="text-sm text-black font-medium">Hey , {name}</p>

          {/* <p className="text-xs text-black/50 capitalize">{role}</p> */}
        </div>

        {/* AVATAR */}
        <div
          className="
            w-11 h-11 rounded-2xl
            bg-gradient-to-br
            from-orange-400
            to-yellow-500
            flex items-center justify-center
            text-white font-bold
            shadow-lg "
        >
          {initial}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
