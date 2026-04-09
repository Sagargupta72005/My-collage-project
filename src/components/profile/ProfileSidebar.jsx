function ProfileSidebar({ activeTab, setActiveTab }) {
  const menu = [
    { key: "overview", label: "Overview", icon: "🏠" },
    { key: "edit", label: "Edit Profile", icon: "✏️" },
    { key: "preferences", label: "Preferences", icon: "⚙️" },
    { key: "security", label: "Security", icon: "🔐" },
  ];

  return (
    <div className="w-64 bg-white border-r h-full p-4 flex flex-col">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Profile Settings
        </h2>
        <p className="text-xs text-gray-400">
          Manage your account
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-1">
        {menu.map((item) => {
          const isActive = activeTab === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
              
              ${
                isActive
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }
              
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>

              {/* Active Indicator */}
              {isActive && (
                <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom (optional future upgrade) */}
      <div className="mt-auto pt-6 text-xs text-gray-400">
        v1.0 • Still pretending to be enterprise
      </div>

    </div>
  );
}

export default ProfileSidebar;