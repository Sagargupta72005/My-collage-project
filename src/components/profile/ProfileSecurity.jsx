import { useNavigate } from "react-router-dom";

function ProfileSecurity() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* 🔥 Header */}
      <div>
        <h1 className="text-2xl  font-semibold text-gray-100">
          Security Settings
        </h1>
        <p className="text-sm text-gray-200">
          Manage your account security and sessions
        </p>
      </div>

      {/* 🔐 Card */}
      <div className="bg-white/90 rounded-xl shadow-md border p-5 space-y-5">

        {/* Password Section (placeholder) */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-1">
            Password
          </h2>
          <p className="text-xs text-gray-500 mb-3">
            Update your password regularly to keep your account secure.
          </p>

          <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-900 transition">
            Change Password
          </button>
        </div>

        {/* Divider */}
        <div className="border-t"></div>

        {/* Logout Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-1">
            Logout
          </h2>
          <p className="text-xs text-gray-500 mb-3">
            Sign out from your current session
          </p>

          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProfileSecurity;