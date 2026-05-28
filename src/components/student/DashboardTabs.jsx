import { useMemo, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  Search,
  Trash2,
} from "lucide-react";

import ClassTracker from "./ClassTracker";
import RevisionTracker from "./RevisionTracker";
import HomeworkTracker from "./HomeworkTracker";

const TAB_CONFIG = [
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

function DashboardTabs({ tasks = [] }) {
  const [activeTab, setActiveTab] = useState("notes");
  const [searchQuery, setSearchQuery] = useState("");

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Physics Formula Revision",
      content: "Revise motion equations and derivations before Friday.",
    },
    {
      id: 2,
      title: "Math Practice",
      content: "Complete integration worksheet and solve PYQs.",
    },
  ]);

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.filter((task) => !task.completed).length,
    };
  }, [tasks]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
    };

    setNotes((prev) => [note, ...prev]);

    setNewNote({
      title: "",
      content: "",
    });
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="mt-6 space-y-6 text-(--text)">
      {/* HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10 shadow-lg">
          <p className="text-sm text-gray-500">Total Tasks</p>
          <h2 className="text-3xl font-bold mt-2">{stats.total}</h2>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10 shadow-lg">
          <p className="text-sm text-gray-500">Completed</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {stats.completed}
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10 shadow-lg">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold mt-2 text-orange-500">
            {stats.pending}
          </h2>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

        <input
          type="text"
          placeholder="Search notes or tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/10 border border-white/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-gray-400"
        />
      </div>

      {/* TAB BUTTONS */}
      <div className="flex flex-wrap gap-3">
        {TAB_CONFIG.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-orange-300 text-black border-orange-200 shadow-lg scale-105"
                  : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-lg min-h-[420px] shadow-2xl">
        {activeTab === "classes" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Class Schedule</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Track your daily classes and progress.
                </p>
              </div>
            </div>

            <ClassTracker tasks={tasks} />
          </div>
        )}

        {activeTab === "revision" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">Revision Planner</h2>
              <p className="text-gray-400 text-sm mt-1">
                Organize your study revisions and test preparation.
              </p>
            </div>

            <RevisionTracker tasks={tasks} />
          </div>
        )}

        {activeTab === "homework" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">Homework Tracker</h2>
              <p className="text-gray-400 text-sm mt-1">
                Keep all assignments and deadlines in one place.
              </p>
            </div>

            <HomeworkTracker tasks={tasks} />
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Study Notes</h2>
              <p className="text-gray-400 text-sm mt-1">
                Save important concepts, formulas, and reminders.
              </p>
            </div>

            {/* ADD NOTE */}
            <div className="grid gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
              <input
                type="text"
                placeholder="Note title"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
              />

              <textarea
                rows={4}
                placeholder="Write your note here..."
                value={newNote.content}
                onChange={(e) =>
                  setNewNote((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300 resize-none"
              />

              <button
                onClick={addNote}
                className="bg-orange-300 text-black font-semibold rounded-xl py-3 hover:opacity-90 transition"
              >
                Add Note
              </button>
            </div>

            {/* NOTES LIST */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-lg">{note.title}</h3>

                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-8 text-center text-gray-400 col-span-full">
                  No notes found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardTabs;
