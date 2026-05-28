import { useNavigate } from "react-router-dom";

function ProfileSecurity() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* HEADER */}
      <div>

        <h1
          className="
            text-2xl font-semibold
            text-gray-100
          "
        >
          Security Settings
        </h1>

        <p className="text-sm text-gray-200">
          Manage your account security and sessions
        </p>

      </div>

      {/* MAIN CARD */}
      <div
        className="
          bg-white/90
          rounded-2xl
          shadow-xl
          border border-white/30
          p-6
          space-y-6
          backdrop-blur-xl
        "
      >

        {/* PASSWORD */}
        <div>

          <h2
            className="
              text-sm font-semibold
              text-gray-700 mb-1
            "
          >
            Password
          </h2>

          <p
            className="
              text-xs text-gray-500
              mb-3
            "
          >
            Update your password regularly
            to keep your account secure.
          </p>

          <button
            className="
              bg-gray-900
              text-white

              px-4 py-2
              rounded-xl

              text-sm

              hover:bg-black
              transition
            "
          >
            Change Password
          </button>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-200"></div>

        {/* LOGOUT */}
        <div>

          <h2
            className="
              text-sm font-semibold
              text-gray-700 mb-1
            "
          >
            Logout
          </h2>

          <p
            className="
              text-xs text-gray-500
              mb-3
            "
          >
            Sign out from your current session
          </p>

          <button
            onClick={handleLogout}
            className="
              bg-gradient-to-r
              from-red-500
              to-red-600

              text-white

              px-4 py-2
              rounded-xl

              text-sm font-medium

              hover:scale-[1.02]
              active:scale-[0.98]

              transition-all
            "
          >
            Logout
          </button>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-200"></div>

        {/* CONTACT / PROJECT INFO */}
        <div
          className="
            rounded-2xl
            bg-gradient-to-r
            from-slate-900
            to-slate-800

            p-5

            text-white
          "
        >

          <h2
            className="
              text-lg font-semibold
              mb-2
            "
          >
            Project Information
          </h2>

          <p
            className="
              text-sm text-white/70
              leading-relaxed
            "
          >
            This dashboard project was developed
            by <span className="font-semibold text-orange-100">
              Sagar Gupta
            </span>{" "}
            and{" "}
            <span className="font-semibold text-orange-200">
              Utkarsh Gupta
            </span>.
          </p>

          <div
            className="
              mt-4
              flex flex-wrap gap-3
            "
          >

            <button
              className="
                px-4 py-2
                rounded-xl

                bg-white/10
                hover:bg-white/20

                text-sm

                transition
              "
            >
              Contact Us
            </button>

            <button
              className="
                px-4 py-2
                rounded-xl

                bg-orange-500
                hover:bg-orange-600

                text-sm font-medium

                transition
              "
            >
              View Project
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfileSecurity;