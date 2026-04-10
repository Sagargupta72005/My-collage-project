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
    <div className="max-w-4xl mx-auto px-2 sm:px-4">

      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
        Public profile
      </h1>

      <div className="bg-white border rounded-xl shadow-sm">

        {/* 🔥 Avatar Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-b">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-800 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold">
              {initial}
            </div>

            <div>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {name || "Your Name"}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Profile picture
              </p>
            </div>
          </div>

          <button className="border px-3 py-1.5 text-xs sm:text-sm rounded-md hover:bg-gray-100 w-fit">
            Change
          </button>
        </div>

        {/* 🔥 Form Section */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">

          {/* Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              placeholder="Tell something about yourself..."
              rows={3}
              className="w-full border rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            />
          </div>

          {/* 🔥 Save Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t">

            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 w-full sm:w-auto"
            >
              Update profile
            </button>

            {saved && (
              <span className="text-sm text-green-600">
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