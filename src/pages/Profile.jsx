import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import ProfileEdit from "../components/profile/ProfileEdit";
import ProfileOverview from "../components/profile/ProfileOverview";
import ProfileSecurity from "../components/profile/ProfileSecurity";
import ProfilePreferences from "../components/profile/ProfilePreferences";

function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [open, setOpen] = useState(false); // 🔥 sidebar control

  const tabs = [
    { key: "overview", label: "Overview", icon: "🏠" },
    { key: "edit", label: "Edit Profile", icon: "✏️" },
    { key: "preferences", label: "Preferences", icon: "⚙️" },
    { key: "security", label: "Security", icon: "🔐" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview />;
      case "edit":
        return <ProfileEdit />;
      case "preferences":
        return <ProfilePreferences />;
      case "security":
        return <ProfileSecurity />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <div className="flex  bg-slate-100">

      {/* 🔥 Sidebar (CONNECTED) */}
      <div className="h-screen">
      <Sidebar open={open} setOpen={setOpen} />
      </div>
      <div className="flex-1 flex flex-col">

        {/* 🔥 Navbar */}
        <Navbar onMenuClick={() => setOpen(true)} />

        {/* 🔥 Header */}
        <div className="bg-white px-4 md:px-6 py-3 md:py-4 border-b">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            Profile Settings
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            Manage your account and preferences
          </p>
        </div>

        {/* 🔥 Tabs (scrollable on mobile) */}
        <div className="flex gap-2 md:gap-3 px-4 md:px-6 py-3 bg-white border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition
                ${
                  activeTab === tab.key
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🔥 Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-scroll">
          <div className="max-w-5xl mx-auto">

            <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
              {renderContent()}
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default ProfileDashboard;