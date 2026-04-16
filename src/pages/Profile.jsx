import { useState } from "react";
import ProfileEdit from "../components/profile/ProfileEdit";
import ProfileOverview from "../components/profile/ProfileOverview";
import ProfileSecurity from "../components/profile/ProfileSecurity";
import ProfilePreferences from "../components/profile/ProfilePreferences";
import MainLayout from "../components/layouts/MainLayout";

function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { key: "overview", label: "Overview", icon: "🏠" },
    { key: "edit", label: "Edit Profile", icon: "✏️" },
    { key: "security", label: "Security", icon: "🔐" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview />;
      case "edit":
        return <ProfileEdit />;
      case "security":
        return <ProfileSecurity />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen bg-(--primary-gradient)">

        {/* 🔥 Header */}
        <div className="bg-(--primary-gradient) px-4 md:px-6 py-4 border-b">
          <h1 className="text-lg md:text-xl font-semibold text-gray-200">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-200">
            Manage your account and preferences
          </p>
        </div>

        {/* 🔥 Tabs */}
        <div className="flex gap-2 md:gap-3 px-4 md:px-6 py-3 bg-(--primary-gradient) border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition
                ${
                  activeTab === tab.key
                    ? "bg-blue-500 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🔥 Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div style={{ background: "var(--secondary-gradient)" }} className="rounded-xl shadow-sm border p-5 md:p-6">
              {renderContent()}
            </div>
          </div>
        </main>

      </div>
    </MainLayout>
  );
}

export default ProfileDashboard;