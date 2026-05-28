import MainLayout from "../layouts/MainLayout";

export default function AnalyticsOverlay() {
  const stats = [
    {
      title: "Active Users",
      value: "0.1K",
      change: "+12.4%",
    },
    {
      title: "Revenue",
      value: "$0.3K",
      change: "+8.1%",
    },
    {
      title: "Server Load",
      value: "100%",
      change: "Stable",
    },
    {
      title: "Global Traffic",
      value: "1 Countries",
      change: "+18 New",
    },
  ];

  const countries = [
    {
      country: "India",
      users: "0.1K",
      growth: "+22%",
    },
  ];

  return (
    <MainLayout>
    <div className="space-y-6">
      {/* HERO */}
      <div
        className="
          relative overflow-hidden
          rounded-[32px]
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-3xl

          shadow-[0_8px_40px_rgba(0,0,0,0.4)]
          p-6 md:p-8
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute -top-20 -right-20
            w-[280px] h-[280px]
            bg-orange-500/10
            blur-[120px]
            rounded-full
          "
        />

        <div
          className="
            relative z-10

            flex flex-col
            xl:flex-row
            xl:items-center
            xl:justify-between

            gap-6
          "
        >
          <div>
            <p
              className="
                text-orange-300
                text-xs
                tracking-[0.25em]
                uppercase
                mb-3
              "
            >
              Smart Analytics
            </p>

            <h1
              className="
                text-4xl
                md:text-6xl
                font-black
                leading-tight
                text-(--text)
                max-w-4xl
              "
            >
              Real-Time Analytics
              <br />
              Dashboard System
            </h1>

            <p
              className="
                mt-5
                text-(--text)/60
                max-w-2xl
                text-sm md:text-base
              "
            >
              Monitor users, engagement, traffic, and worldwide server
              performance with live dashboard insights.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              className="
                px-6 py-3

                rounded-2xl

                bg-gradient-to-r
                from-orange-400
                to-orange-500

                text-(--text)
                font-semibold

                shadow-[0_0_25px_rgba(251,146,60,0.45)]

                hover:scale-105
                transition-all
                duration-300
              "
            >
              Live Monitoring
            </button>

            <button
              className="
                px-6 py-3

                rounded-2xl

                bg-white/10
                hover:bg-white/15

                border border-white/10

                text-(--text)/80

                transition-all
                duration-300
              "
            >
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-5
        "
      >
        {stats.map((item, index) => (
          <div
            key={index}
            className="
              relative overflow-hidden

              rounded-[28px]

              border border-white/10

              bg-white/[0.04]
              backdrop-blur-3xl

              shadow-[0_8px_40px_rgba(0,0,0,0.35)]

              p-5
            "
          >
            {/* CARD GLOW */}
            <div
              className="
                absolute top-0 right-0
                w-40 h-40
                bg-orange-400/10
                rounded-full
                blur-3xl
              "
            />

            <div className="relative z-10">
              <p className="text-sm text-(--text)/50">{item.title}</p>

              <h2
                className="
                  text-4xl
                  font-black
                  mt-4
                  text-(--text)
                "
              >
                {item.value}
              </h2>

              <div
                className="
                  mt-5

                  inline-flex
                  items-center

                  rounded-full

                  px-3 py-1.5

                  bg-orange-500/15
                  border border-orange-400/10

                  text-orange-200
                  text-xs
                  font-medium
                "
              >
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[1.7fr_0.8fr]
          gap-6
        "
      >
        {/* MAP */}
        <div
          className="
            relative overflow-hidden

            rounded-[32px]

            border border-white/10

            bg-white/[0.04]
            backdrop-blur-3xl

            min-h-[620px]

            shadow-[0_8px_40px_rgba(0,0,0,0.4)]
          "
        >
          {/* MAP GLOW */}
          <div
            className="
              absolute top-10 left-10
              w-[260px] h-[260px]
              bg-orange-400/10
              blur-[120px]
              rounded-full
            "
          />

          {/* MAP */}
          <div
            className="
              absolute inset-0

              flex items-center
              justify-center
            "
          >
            <div
              className="
                relative
                w-[88%]
                h-[88%]
                bg-black rounded-2xl
              "
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
                alt="World Map"
                className="
                  w-full
                  h-full
                  object-contain
                  opacity-[0.14]
                  pointer-events-none
                  select-none
                  invert
                "
              />

              {/* DOT 1 */}
              <div className="absolute top-[42%] left-[65%]">
                <div className="relative flex items-center justify-center">
                  <span
                    className="
                      absolute
                      w-6 h-6
                      rounded-full
                      bg-orange-400/40
                      animate-ping
                    "
                  />

                  <span
                    className="
                      relative
                      w-3 h-3
                      rounded-full
                      bg-orange-300
                    "
                  />
                </div>
              </div>

              {/* DOT 2 */}
              {/* <div className="absolute top-[45%] left-[30%]">
                <div className="relative flex items-center justify-center">
                  <span
                    className="
                      absolute
                      w-6 h-6
                      rounded-full
                      bg-pink-400/40
                      animate-ping
                    "
                  />

                  <span
                    className="
                      relative
                      w-3 h-3
                      rounded-full
                      bg-pink-300
                    "
                  />
                </div>
              </div> */}

              {/* DOT 3 */}
              {/* <div className="absolute top-[54%] left-[49%]">
                <div className="relative flex items-center justify-center">
                  <span
                    className="
                      absolute
                      w-6 h-6
                      rounded-full
                      bg-emerald-400/40
                      animate-ping
                    "
                  />

                  <span
                    className="
                      relative
                      w-3 h-3
                      rounded-full
                      bg-emerald-300
                    "
                  />
                </div>
              </div> */}
            </div>
          </div>

          {/* STATUS */}
          <div
            className="
              absolute top-5 left-5
              rounded-2xl
              bg-(--third-gradient)/50
              backdrop-blur-2xl
              border border-white/10
              px-4 py-3
            "
          >
            <p className="text-sm text-(--text)/50">Network Status</p>
            <h3
              className="
                text-lg
                font-bold
                text-emerald-400
                mt-1
             "
            >
              Online
            </h3>
          </div>
          {/* LIVE SESSIONS */}
          <div
            className="
              absolute bottom-5 right-5
              rounded-2xl
              bg-(--third-gradient)/50
              backdrop-blur-2xl
              border border-white/10
              px-5 py-4
            "
          >
            <p className="text-sm text-(--text)">Live Sessions</p>

            <h2
              className="
                text-4xl
                font-black
                text-(--text)
                mt-1
              "
            >
              1
            </h2>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* COUNTRIES */}
          <div
            className="
              rounded-[32px]

              border border-white/10

              bg-white/[0.04]
              backdrop-blur-3xl

              shadow-[0_8px_40px_rgba(0,0,0,0.35)]

              p-5
            "
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="
                  text-xl
                  font-bold
                  text-(--text)
                "
              >
                Top Countries
              </h2>

              <span className="text-xs text-(--text)/40">LIVE</span>
            </div>

            <div className="space-y-4">
              {countries.map((item, index) => (
                <div
                  key={index}
                  className="
                    flex items-center justify-between

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.03]

                    hover:bg-white/[0.06]

                    px-4 py-4

                    transition-all duration-300
                  "
                >
                  <div>
                    <h3
                      className="
                        font-semibold
                        text-(--text)
                      "
                    >
                      {item.country}
                    </h3>

                    <p
                      className="
                        text-xs
                        text-(--text)/40
                        mt-1
                      "
                    >
                      {item.users} active users
                    </p>
                  </div>

                  <span
                    className="
                      text-orange-300
                      text-sm
                      font-semibold
                    "
                  >
                    {item.growth}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SERVER HEALTH */}
          <div
            className="
              rounded-[32px]

              border border-white/10

              bg-white/[0.04]
              backdrop-blur-3xl

              shadow-[0_8px_40px_rgba(0,0,0,0.35)]

              p-5
            "
          >
            <p className="text-sm text-(--text)/40">Server Health</p>

            <h2
              className="
                text-6xl
                font-black
                text-(--text)
                mt-3
              "
            >
              98%
            </h2>

            <div
              className="
                mt-6

                h-3
                rounded-full

                overflow-hidden

                bg-white/10
              "
            >
              <div
                className="
                  h-full
                  w-[98%]

                  rounded-full

                  bg-gradient-to-r
                  from-cyan-400
                  to-blue-500
                "
              />
            </div>

            <p className="text-xs text-(--text)/40 mt-3">
              All systems operational
            </p>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
}
