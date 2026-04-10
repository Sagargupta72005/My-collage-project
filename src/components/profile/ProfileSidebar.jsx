function ProfileSidebar({ activeTab, setActiveTab, open, setOpen }) {
  const menu = [
    { key: "overview", label: "Overview", icon: "🏠" },
    { key: "edit", label: "Edit Profile", icon: "✏️" },
    { key: "preferences", label: "Preferences", icon: "⚙️" },
    { key: "security", label: "Security", icon: "🔐" },
  ];

  return (
    <>
      {/* 🔥 Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex md:flex-col`}
      >
        {/* ❌ Close (mobile only) */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Profile Settings
          </h2>
          <p className="text-xs text-gray-400">
            Manage your account
          </p>
        </div>

        {/* Menu */}
        <div className="p-4 space-y-1 flex-1">
          {menu.map((item) => {
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setOpen(false); // 🔥 close on mobile click
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>

                {isActive && (
                  <span className="ml-auto w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t text-xs text-gray-400">
          v1.0 • Still pretending to be enterprise
        </div>
      </aside>
    </>
  );
}

export default ProfileSidebar;