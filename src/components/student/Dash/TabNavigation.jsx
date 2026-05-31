import {
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
} from "lucide-react";

const tabs = [
  {
    id: "notes",
    label: "Notes",
    icon: FileText,
  },
  {
    id: "classes",
    label: "Classes",
    icon: GraduationCap,
  },
  {
    id: "revision",
    label: "Revision",
    icon: BookOpen,
  },
  {
    id: "homework",
    label: "Homework",
    icon: ClipboardList,
  },
];

export default function TabNavigation({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl shadow  transition ${
              activeTab === tab.id
                ? "bg-(--third-gradient) text-black"
                : "bg-white/5"
            }`}
          >
            <Icon size={18} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}