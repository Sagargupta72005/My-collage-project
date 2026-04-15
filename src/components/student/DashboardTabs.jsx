import { useState } from "react";
import ClassTracker from "./ClassTracker";
import RevisionTracker from "./RevisionTracker";
import HomeworkTracker from "./HomeworkTracker";

function DashboardTabs({ tasks }) {
  const [activeTab, setActiveTab] = useState("classes");

  const tabs = ["classes", "revision", "homework", "notes"];

  return (
    <div className="mt-6 space-y-6">
      {/* TAB BUTTONS */}
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2 rounded-lg text-sm font-medium ${
              activeTab === tab
                ? "bg-orange-300 text-white"
                : "bg-gray-200/20 text-gray-200"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "classes" && <ClassTracker tasks={tasks} />}

      {activeTab === "revision" && <RevisionTracker tasks={tasks} />}

      {activeTab === "homework" && <HomeworkTracker tasks={tasks} />}

      {activeTab === "notes" && (
        <div className="bg-gray-600/50 text-white p-4 rounded-xl shadow">
          <p>Add Subject Notes component here</p>
        </div>
      )}
    </div>
  );
}

export default DashboardTabs;