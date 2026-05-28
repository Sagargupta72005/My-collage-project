import { useState } from "react";
import ProfileEdit from "../components/profile/ProfileEdit";
import ProfileOverview from "../components/profile/ProfileOverview";
import ProfileSecurity from "../components/profile/ProfileSecurity";
import ProfilePreferences from "../components/profile/ProfilePreferences";
import MainLayout from "../components/layouts/MainLayout";

function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { key: "overview", label: "Overview" },
    // { key: "edit", label: "Edit Profile" },
    { key: "security", label: "Security" },
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
          <h1 className="text-lg md:text-xl font-semibold text-black">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-600">
            Manage your account and preferences
          </p>
        </div>

        {/* 🔥 Tabs */}
        <div className="flex gap-2 md:gap-3 px-4 md:px-6 py-3 bg-(--primary-gradient) border-b overflow-x-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition
                ${
                  activeTab === tab.key
                    ? "bg-orange-400 text-white shadow"
                    : "text-gray-600 hover:bg-gray-300"
                }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🔥 Content */}
        <main className="flex-1 overflow-y-hidden">
          <div className="max-w-7xl mx-auto">
            <div style={{ background:"var(--primary-gradient)" }} className="rounded-xl shadow-2xl  p-10">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}

export default Profile;