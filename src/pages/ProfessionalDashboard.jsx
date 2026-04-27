import { useState, useEffect } from "react";

import MainLayout from "../components/layouts/MainLayout";
import StatsCards from "../components/StatsCards";
import WeeklyChart from "../components/WeeklyChart";

function ProfessionalDashboard() {
  const role = localStorage.getItem("role");
  const storageKey = `Work Tasks_${role}`;

  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Load Tasks
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
    return () => window.removeEventListener("storage", loadTasks);
  }, [storageKey]);

  // Save helper
  const saveTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  // Notifications
  useEffect(() => {
    const notes = [];
    const today = new Date();

    tasks.forEach((t) => {
      if (!t.dueDate || t.done) return;

      const due = new Date(t.dueDate);

      if (due < today) {
        notes.push(`⚠️ "${t.title}" is overdue`);
      } else if (due.toDateString() === today.toDateString()) {
        notes.push(`⏰ "${t.title}" is due today`);
      }
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotifications(notes);
  }, [tasks]);

  // Add Task
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      done: false,
      dueDate: newDate || null,
    };

    saveTasks([...tasks, task]);
    setNewTask("");
    setNewDate("");
  };

  // Delete
  const handleDelete = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  };

  // Toggle complete
  const toggleComplete = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    saveTasks(updated);
  };

  // Start edit
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  // Save edit
  const saveEdit = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, title: editText } : t
    );
    saveTasks(updated);
    setEditingId(null);
  };

  const today = new Date();

  return (
    <MainLayout>
      <h1 className="text-xl sm:text-2xl text-white font-bold mb-6 ">
        Professional Dashboard
      </h1>

      {/* Add Task */}
      <div className="flex flex-col sm:flex-row bg-(--secondary-gradient) p-4 sm:p-5 text-white shadow rounded-xl gap-2 mb-6">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border  p-2 flex-1 rounded-xl"
          placeholder="Task title..."
        />

        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="border  p-2 rounded-xl w-full sm:w-auto"
        />

        <button
          onClick={handleAddTask}
          className="bg-(--third-gradient) text-white px-4 py-2 rounded-xl w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      <StatsCards tasks={tasks} />

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="mb-6 space-y-2">
          {notifications.map((n, i) => (
            <div key={i} className="bg-(--secondary-gradient) text-red-600 p-3 rounded">
              {n}
            </div>
          ))}
        </div>
      )}

      {/* Task List */}
      <div className="p-3 sm:p-4 bg-(--secondary-gradient) text-white shadow rounded mb-6 max-h-100 overflow-y-auto">
        <h2 className="font-bold mb-3">All Tasks</h2>

        {tasks.map((t) => {
          const isOverdue =
            t.dueDate && !t.done && new Date(t.dueDate) < today;

          return (
            <div
              key={t.id}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between border-b py-3 gap-2 ${
                t.done ? "opacity-50 line-through" : ""
              }`}
            >
              {/* Left */}
              <div className="flex items-start sm:items-center gap-2 flex-wrap">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleComplete(t.id)}
                />

                {editingId === t.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border px-2"
                  />
                ) : (
                  <span className="wrap-break-word">{t.title}</span>
                )}

                {t.dueDate && (
                  <span
                    className={`text-xs ${
                      isOverdue ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    ({t.dueDate})
                  </span>
                )}
              </div>

              {/* Right Actions */}
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                {editingId === t.id ? (
                  <button
                    onClick={() => saveEdit(t.id)}
                    className="text-green-200"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(t)}
                    className="text-blue-200"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <WeeklyChart tasks={tasks} />
    </MainLayout>
  );
}

export default ProfessionalDashboard;