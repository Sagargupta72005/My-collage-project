import { useState, useEffect } from "react";

function TaskManager({ initialTasks = [] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);

  // FILTERED TASKS
  const getFilteredTasks = () => {
    const now = new Date();

    return tasks.filter((t) => {
      if (!t.dueDate) return false;

      const due = new Date(t.dueDate);

      if (filter === "completed") return t.done;
      if (filter === "pending") return !t.done;
      if (filter === "overdue") return !t.done && due < now;

      return true;
    });
  };

  const filteredTasks = getFilteredTasks();

  // NOTIFICATIONS (UI + LOGIC)
  useEffect(() => {
    let notes = [];
    const today = new Date();

    tasks.forEach((t) => {
      if (!t.dueDate || t.done) return;

      const due = new Date(t.dueDate);

      if (due < today) {
        notes.push({ type: "overdue", text: `${t.title} is overdue` });
      } else if (due.toDateString() === today.toDateString()) {
        notes.push({ type: "today", text: `${t.title} is due today` });
      }
    });

    setNotifications(notes);
  }, [tasks]);

  // NOTIFICATION PERMISSION
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // REMINDER SYSTEM (NO SPAM)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const updatedTasks = tasks.map((t) => {
        if (!t.dueDate || t.done || t.notified) return t;

        const due = new Date(t.dueDate);
        const diff = due - now;

        if (diff > 0 && diff < 60000) {
          if (Notification.permission === "granted") {
            new Notification("⏰ Task Reminder", {
              body: `${t.title} is due soon!`,
            });

            return { ...t, notified: true };
          }
        }

        return t;
      });

      setTasks(updatedTasks);
    }, 30000);

    return () => clearInterval(interval);
  }, [tasks]);

  // TOGGLE DONE
  const toggleDone = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="p-4">

      {/* FILTER BUTTONS */}
      <div className="flex gap-2 mb-4">
        {["all", "pending", "completed", "overdue"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-sm ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* NOTIFICATIONS */}
      {notifications.length > 0 && (
        <div className="mb-4 space-y-2">
          {notifications.map((n, i) => (
            <div
              key={i}
              className={`p-2 rounded text-sm ${
                n.type === "overdue"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {n.text}
            </div>
          ))}
        </div>
      )}

      {/* TASK LIST */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-400">No tasks found</p>
        ) : (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className="p-3 bg-gray-100 rounded flex justify-between items-center"
            >
              <div>
                <p className={`${t.done ? "line-through" : ""}`}>{t.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(t.dueDate).toDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleDone(t.id)}
                  className="text-green-600 text-sm"
                >
                  ✔
                </button>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="text-red-600 text-sm"
                >
                  ✖
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskManager;
