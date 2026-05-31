import { useMemo, useState } from "react";

import DashboardHeader from "./Dash/DashboardHeader";
import DashboardSearch from "./Dash/DashboardSearch";
import TabNavigation from "./Dash/TabNavigation";
import NotesManager from "./Dash/NotesManager";

import ClassTracker from "./ClassTracker";
import RevisionTracker from "./RevisionTracker";
import HomeworkTracker from "./HomeworkTracker";

export default function DashboardTabs({
  tasks = [],
  setTasks,
  notes = [],
  setNotes,
}) {
  const [activeTab, setActiveTab] = useState("notes");
  const [searchQuery, setSearchQuery] = useState("");

  /* ======================
     TASK ACTIONS (CORE)
  ====================== */

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

  const moveTask = (id, category) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, category } : t
      )
    );
  };

  /* ======================
     STATS
  ====================== */

  const stats = useMemo(
    () => ({
      totalTasks: tasks.length,
      completedTasks: tasks.filter((t) => t.done).length,
      pendingTasks: tasks.filter((t) => !t.done).length,
      totalNotes: notes.length,
      starredNotes: notes.filter((n) => n.starred).length,
    }),
    [tasks, notes]
  );

  /* ======================
     FILTER TASKS
  ====================== */

  const classTasks = tasks.filter(
    (t) => t.category === "classes"
  );

  const revisionTasks = tasks.filter(
    (t) => t.category === "revision"
  );

  const homeworkTasks = tasks.filter(
    (t) => t.category === "homework"
  );

  /* ======================
     RENDER
  ====================== */

  return (
    <div className="space-y-6 mt-6">
      <DashboardHeader stats={stats} />

      <DashboardSearch
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="shadow-2xl rounded-3xl p-5">
        {/* NOTES */}
        {activeTab === "notes" && (
          <NotesManager
            notes={notes}
            setNotes={setNotes}
            searchQuery={searchQuery}
          />
        )}

        {/* CLASSES */}
        {activeTab === "classes" && (
          <ClassTracker
            tasks={classTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onMove={moveTask}
          />
        )}

        {/* REVISION */}
        {activeTab === "revision" && (
          <RevisionTracker
            tasks={revisionTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onMove={moveTask}
          />
        )}

        {/* HOMEWORK */}
        {activeTab === "homework" && (
          <HomeworkTracker
            tasks={homeworkTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onMove={moveTask}
          />
        )}
      </div>
    </div>
  );
}