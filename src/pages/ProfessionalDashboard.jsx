import { useState, useEffect } from "react";

import MainLayout from "../components/layouts/MainLayout";
import StatsCards from "../components/StatsCards";
import WeeklyChart from "../components/WeeklyChart";
import TaskSection from "../components/TaskSection";

function ProfessionalDashboard() {
  const role = localStorage.getItem("role");
  const storageKey = `Work Tasks_${role}`;

  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadTasks = () => {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved) setTasks(saved);
    };

    loadTasks();
    window.addEventListener("storage", loadTasks);

    return () => window.removeEventListener("storage", loadTasks);
  }, [storageKey]);

  useEffect(() => {
    let notes = [];
    const today = new Date();

    tasks.forEach(t => {
      if (!t.dueDate || t.done) return;

      const due = new Date(t.dueDate);

      if (due < today) {
        notes.push("⚠️ Task overdue");
      } else if (due.toDateString() === today.toDateString()) {
        notes.push("⏰ Task due today");
      }
    });

    setNotifications(notes);
  }, [tasks]);

  return (
    <MainLayout>

      <h1 className="text-2xl font-bold mb-6">
        Professional Dashboard
      </h1>

      <StatsCards tasks={tasks} />

      {notifications.length > 0 && (
        <div className="mb-6 space-y-2">
          {notifications.map((n, i) => (
            <div key={i} className="bg-red-100 text-red-600 p-3 rounded">
              {n}
            </div>
          ))}
        </div>
      )}

      <WeeklyChart tasks={tasks} />

      <TaskSection title="Work Tasks" />

      

    </MainLayout>
  );
}

export default ProfessionalDashboard;