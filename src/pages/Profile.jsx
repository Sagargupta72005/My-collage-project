import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileEdit from "../components/profile/ProfileEdit";
import ProfileOverview from "../components/profile/ProfileOverview";
import ProfileSecurity from "../components/profile/ProfileSecurity";
import ProfilePreferences from "../components/profile/ProfilePreferences";

function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* 🔥 HEADER */}
        <div className="bg-white px-6 py-4.5 border-b">
          <h1 className="text-xl font-semibold text-gray-800">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-500">
            Manage your account and preferences
          </p>
        </div>

        {/* 🔥 TABS (better UI) */}
        <div className="flex gap-3 px-6 py-3 bg-white border-b">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  activeTab === tab.key
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ✅ CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* 🔥 Content Card Wrapper */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              {renderContent()}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfileDashboard;