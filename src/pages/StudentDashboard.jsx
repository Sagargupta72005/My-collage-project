import { useEffect, useRef, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import WeeklyChart from "../components/WeeklyChart";
import DashboardTabs from "../components/student/DashboardTabs";

function StudentDashboard() {
  const role = localStorage.getItem("role");
  const storageKey = `Assignments_${role}`;

  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notes, setNotes] = useState([]);

  const notifiedTasks = useRef(new Set());

  // Load tasks
  useEffect(() => {
    const loadTasks = () => {
      try {
        const raw = localStorage.getItem(storageKey);

        setTasks(raw ? JSON.parse(raw) : []);
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

  // Load notes
  useEffect(() => {
    try {
      const raw = localStorage.getItem("student_notes");

      setNotes(raw ? JSON.parse(raw) : []);
    } catch {
      setNotes([]);
    }
  }, []);

  // Save notes
  useEffect(() => {
    localStorage.setItem(
      "student_notes",
      JSON.stringify(notes)
    );
  }, [notes]);

  // Build notifications
  useEffect(() => {
    const today = new Date();
    const reminderNotes = [];

    tasks.forEach((task) => {
      if (!task.dueDate || task.done) return;

      const due = new Date(task.dueDate);

      const todayStr = today.toDateString();
      const dueStr = due.toDateString();

      if (due < today && dueStr !== todayStr) {
        reminderNotes.push({
          type: "overdue",
          text: `${task.title} is overdue`,
        });
      } else if (dueStr === todayStr) {
        reminderNotes.push({
          type: "today",
          text: `${task.title} is due today`,
        });
      }
    });

    setNotifications(reminderNotes);
  }, [tasks]);

  // Ask notification permission
  useEffect(() => {
    if (
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
  }, []);

  // Reminder system
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      tasks.forEach((task) => {
        if (!task.dueDate || task.done) return;

        const due = new Date(task.dueDate);
        const diff = due - now;

        if (
          diff > 0 &&
          diff < 60000 &&
          !notifiedTasks.current.has(task.id)
        ) {
          notifiedTasks.current.add(task.id);

          if (Notification.permission === "granted") {
            new Notification("⏰ Task Reminder", {
              body: `${task.title} is due soon!`,
            });
          }
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <MainLayout>
      <div className="mb-6 bg-(--primary-gradient)">
      {/* Dashboard Tabs */}
      <DashboardTabs
        tasks={tasks}
        notes={notes}
        setNotes={setNotes}
      />
      </div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text)]">
          Student Dashboard
        </h1>

        <p className="text-sm text-[var(--text)]">
          Track your tasks, deadlines, and progress
        </p>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="mb-6 grid gap-3">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-sm font-medium ${
                notification.type === "overdue"
                  ? "bg-red-100 text-red-600 border border-red-200"
                  : "bg-yellow-100 text-yellow-700 border border-yellow-200"
              }`}
            >
              {notification.type === "overdue"
                ? "⚠️"
                : "⏰"}{" "}
              {notification.text}
            </div>
          ))}
        </div>
      )}

      {/* Weekly Progress */}
      <div className="mb-6">
        <WeeklyChart tasks={tasks} />
      </div>

      
    </MainLayout>
  );
}

export default StudentDashboard;