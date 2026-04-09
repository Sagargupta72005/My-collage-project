import { useState, useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import StatsCards from "../components/StatsCards";
import WeeklyChart from "../components/WeeklyChart";
import SubjectStats from "../components/teacher/SubjectStats";
import DashboardTabs from "../components/student/DashboardTabs";

function StudentDashboard() {
  const role = localStorage.getItem("role");
  const storageKey = `Assignments_${role}`;

  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load tasks
  useEffect(() => {
    const loadTasks = () => {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
        setTasks(saved);
      } catch (err) {
        setTasks([]);
      }
    };

    loadTasks();
    window.addEventListener("storage", loadTasks);

    return () => window.removeEventListener("storage", loadTasks);
  }, [storageKey]);

  // Notifications logic
  useEffect(() => {
    const notes = [];
    const today = new Date();

    tasks.forEach((t) => {
      if (!t.dueDate || t.done) return;

      const due = new Date(t.dueDate);

      // Normalize dates (fix timezone issues)
      const todayStr = today.toDateString();
      const dueStr = due.toDateString();

      if (due < today && todayStr !== dueStr) {
        notes.push({ type: "overdue", text: `${t.title} is overdue` });
      } else if (dueStr === todayStr) {
        notes.push({ type: "today", text: `${t.title} is due today` });
      }
    });

    setNotifications(notes);
  }, [tasks]);

  // Ask notification permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Reminder system
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      tasks.forEach((t) => {
        if (!t.dueDate || t.done) return;

        const due = new Date(t.dueDate);
        const diff = due - now;

        if (diff > 0 && diff < 60000) {
          if (Notification.permission === "granted") {
            new Notification("⏰ Task Reminder", {
              body: `${t.title} is due soon!`,
            });
          }
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Student Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Track your tasks, deadlines, and progress
        </p>
      </div>

      {/* STATS */}
      <div className="mb-6">
      <DashboardTabs tasks={tasks}/>
        {/* <StatsCards tasks={tasks} /> */}
      </div>

      {/* NOTIFICATIONS */}
      {notifications.length > 0 && (
        <div className="mb-6 grid gap-3">
          {notifications.map((n, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg text-sm font-medium ${
                n.type === "overdue"
                  ? "bg-red-100 text-red-600 border border-red-200"
                  : "bg-yellow-100 text-yellow-700 border border-yellow-200"
              }`}
            >
              {n.type === "overdue" ? "⚠️" : "⏰"} {n.text}
            </div>
          ))}
        </div>
      )}
          <WeeklyChart tasks={tasks} />

        <div className="flex items-center ">
          <SubjectStats tasks={tasks} />
        </div>


    </MainLayout>
  );
}

export default StudentDashboard;