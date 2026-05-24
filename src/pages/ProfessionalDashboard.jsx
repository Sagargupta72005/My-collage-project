import { useState, useEffect, useMemo } from "react";

import MainLayout from "../components/layouts/MainLayout";
import StatsCards from "../components/StatsCards";
import WeeklyChart from "../components/WeeklyChart";

function ProfessionalDashboard() {
  const role = localStorage.getItem("role") || "user";
  const storageKey = `WorkTasks_${role}`;

  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // SAVE STATUS
  const [saveMessage, setSaveMessage] = useState("");
  const [lastSaved, setLastSaved] = useState(null);

  // LOAD TASKS
  useEffect(() => {
    const loadTasks = () => {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
        setTasks(saved);
      } catch {
        setTasks([]);
      }
    };

    loadTasks();

    window.addEventListener("storage", loadTasks);

    return () => {
      window.removeEventListener("storage", loadTasks);
    };
  }, [storageKey]);

  // SAVE TASKS
  const saveTasks = (updated) => {
    localStorage.setItem(storageKey, JSON.stringify(updated));

    setTasks(updated);

    const now = new Date();

    setLastSaved(now.toLocaleTimeString());

    setSaveMessage("✅ Tasks saved successfully");

    setTimeout(() => {
      setSaveMessage("");
    }, 2000);
  };

  // NOTIFICATIONS
  useEffect(() => {
    const today = new Date();

    const notes = tasks
      .filter((t) => t.dueDate && !t.done)
      .map((t) => {
        const due = new Date(t.dueDate);

        if (due < today) {
          return `⚠️ "${t.title}" is overdue`;
        }

        if (due.toDateString() === today.toDateString()) {
          return `⏰ "${t.title}" is due today`;
        }

        return null;
      })
      .filter(Boolean);

    setNotifications(notes);
  }, [tasks]);

  // ADD TASK
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      done: false,
      dueDate: newDate || null,
      priority,
      category,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    saveTasks([...tasks, task]);

    setNewTask("");
    setNewDate("");
    setPriority("Medium");
    setCategory("General");
  };

  // DELETE TASK
  const handleDelete = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  };

  // TOGGLE COMPLETE
  const toggleComplete = (id) => {
    const updated = tasks.map((t) =>
      t.id === id
        ? {
            ...t,
            done: !t.done,
            completedAt: !t.done
              ? new Date().toLocaleString()
              : null,
          }
        : t
    );

    saveTasks(updated);
  };

  // ✅ MARK ALL DONE / UNMARK ALL
  const allDone = tasks.length > 0 && tasks.every((t) => t.done);

  const handleMarkAllDone = () => {
    if (tasks.length === 0) return;

    const now = new Date().toLocaleString();

    const updated = tasks.map((t) => ({
      ...t,
      done: !allDone,
      completedAt: !allDone ? (t.completedAt || now) : null,
    }));

    saveTasks(updated);
  };

  // START EDIT
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  // SAVE EDIT
  const saveEdit = (id) => {
    const updated = tasks.map((t) =>
      t.id === id
        ? {
            ...t,
            title: editText,
          }
        : t
    );

    saveTasks(updated);

    setEditingId(null);
  };

  // FILTER + SEARCH
  const filteredTasks = useMemo(() => {
    let updated = [...tasks];

    if (filter === "completed") {
      updated = updated.filter((t) => t.done);
    }

    if (filter === "pending") {
      updated = updated.filter((t) => !t.done);
    }

    if (search.trim()) {
      updated = updated.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // SORT OVERDUE FIRST
    updated.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    return updated;
  }, [tasks, search, filter]);

  const today = new Date();

  // COMPLETED COUNT
  const completedTasks = tasks.filter((t) => t.done).length;

  return (
    <MainLayout>
      <h1 className="text-2xl text-white font-bold mb-6">
        Professional Dashboard
      </h1>

      {/* SAVE STATUS */}
      <div className="mb-4">
        {saveMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded-xl">
            {saveMessage}
          </div>
        )}

        {lastSaved && (
          <p className="text-sm text-gray-400 mt-2">
            Last Saved: {lastSaved}
          </p>
        )}
      </div>

      {/* ADD TASK */}
      <div className="bg-(--secondary-gradient) p-5 rounded-xl mb-6 text-white space-y-3">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          placeholder="Enter task..."
          className="border p-2 rounded-xl w-full"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="border p-2 rounded-xl"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border p-2 rounded-xl text-black"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded-xl text-black"
          >
            <option>General</option>
            <option>Work</option>
            <option>Study</option>
            <option>Personal</option>
          </select>

          <button
            onClick={handleAddTask}
            className="bg-(--third-gradient) px-4 py-2 rounded-xl"
          >
            Add Task
          </button>

          {/* BACKUP BUTTON */}
          <button
            onClick={() => {
              const dataStr = JSON.stringify(tasks, null, 2);

              const blob = new Blob([dataStr], {
                type: "application/json",
              });

              const url = URL.createObjectURL(blob);

              const a = document.createElement("a");

              a.href = url;
              a.download = "tasks-backup.json";

              a.click();

              URL.revokeObjectURL(url);
            }}
            className="bg-blue-500 px-4 py-2 rounded-xl text-white"
          >
            Backup
          </button>
        </div>
      </div>

      <StatsCards tasks={tasks} />

      {/* COMPLETED HIGHLIGHT + MARK ALL DONE */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-green-100 text-green-700 p-4 rounded-xl font-semibold">
        <span>
          ✅ {completedTasks} task
          {completedTasks !== 1 ? "s" : ""} completed
        </span>

        {/* ✅ MARK ALL DONE BUTTON */}
        <button
          onClick={handleMarkAllDone}
          disabled={tasks.length === 0}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
            ${
              allDone
                ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
        >
          {allDone ? "↩️ Unmark All" : "✅ Mark All Done"}
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-xl flex-1"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-xl"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* NOTIFICATIONS */}
      {notifications.length > 0 && (
        <div className="space-y-2 mb-6">
          {notifications.map((n, i) => (
            <div
              key={i}
              className="bg-red-100 text-red-600 p-3 rounded-xl"
            >
              {n}
            </div>
          ))}
        </div>
      )}

      {/* TASK LIST */}
      <div className="bg-(--secondary-gradient) p-4 rounded-xl text-white">
        <h2 className="font-bold mb-4">All Tasks</h2>

        {filteredTasks.length === 0 ? (
          <p className="text-gray-300">No tasks found.</p>
        ) : (
          filteredTasks.map((t) => {
            const isOverdue =
              t.dueDate &&
              !t.done &&
              new Date(t.dueDate) < today;

            return (
              <div
                key={t.id}
                className={`border-b py-4 flex flex-col gap-3 rounded-xl px-3 transition-all duration-300 ${
                  t.done
                    ? "bg-green-500/20 border border-green-400 shadow-lg scale-[0.99]"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleComplete(t.id)}
                  />

                  <div className="flex-1">
                    {editingId === t.id ? (
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="border px-2 rounded text-black"
                      />
                    ) : (
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className={`font-semibold break-words ${
                            t.done
                              ? "line-through text-green-300"
                              : ""
                          }`}
                        >
                          {t.title}
                        </h3>

                        {t.done && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                            Completed
                          </span>
                        )}
                      </div>
                    )}

                    <div className="text-sm text-gray-300 flex flex-wrap gap-3 mt-1">
                      <span>📂 {t.category}</span>

                      <span>🔥 {t.priority}</span>

                      {t.dueDate && (
                        <span
                          className={
                            isOverdue
                              ? "text-red-400"
                              : "text-gray-300"
                          }
                        >
                          📅 {t.dueDate}
                        </span>
                      )}

                      {t.done && t.completedAt && (
                        <span className="text-green-300 text-xs">
                          ✅ Finished: {t.completedAt}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {editingId === t.id ? (
                    <button
                      onClick={() => saveEdit(t.id)}
                      className="text-green-300"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(t)}
                      className="text-blue-300"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6">
        <WeeklyChart tasks={tasks} />
      </div>
    </MainLayout>
  );
}

export default ProfessionalDashboard;