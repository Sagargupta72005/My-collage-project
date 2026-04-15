import { useState } from "react";

function ProfileEdit() {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initial = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 space-y-6">

      {/* 🔥 Title */}
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
        Public Profile
      </h1>

      {/* 🔥 Card */}
      <div className="bg-white rounded-xl shadow-md border overflow-hidden">

        {/* 🔥 Avatar Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl sm:text-3xl font-bold">
              {initial}
            </div>

            <div>
              <p className="font-semibold text-sm sm:text-base">
                {name || "Your Name"}
              </p>
              <p className="text-xs sm:text-sm text-white/80">
                Profile picture
              </p>
            </div>
          </div>

          <button className="bg-white/20 hover:bg-white/30 px-3 py-1.5 text-xs sm:text-sm rounded-md transition">
            Change
          </button>
        </div>

        {/* 🔥 Form Section */}
        <div className="p-5 space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md px-3 py-2 bg-gray-100 focus:bg-white border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md px-3 py-2 bg-gray-100 focus:bg-white border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bio
            </label>
            <textarea
              placeholder="Tell something about yourself..."
              rows={3}
              className="w-full rounded-md px-3 py-2 bg-gray-100 focus:bg-white border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>

          {/* 🔥 Save Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t">

            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-md text-sm hover:opacity-90 transition w-full sm:w-auto"
            >
              Update Profile
            </button>

            {saved && (
              <span className="text-sm text-green-600 font-medium">
                ✔ Changes saved
              </span>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;