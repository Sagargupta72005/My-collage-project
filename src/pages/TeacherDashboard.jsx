import { useState, useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import WeeklyChart from "../components/WeeklyChart";

// Teacher Components
import OverallStats from "../components/teacher/OverallStats";
import ClassStats from "../components/teacher/ClassStats";

function TeacherDashboard() {
  const role = localStorage.getItem("role");
  const storageKey = `Class Tasks_${role}`;

  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load Tasks
  useEffect(() => {
    const loadTasks = () => {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved) setTasks(saved);
    };

    loadTasks();
    window.addEventListener("storage", loadTasks);

    return () => window.removeEventListener("storage", loadTasks);
  }, [storageKey]);

  // Clean Notifications (no duplicates spam)
  useEffect(() => {
    const today = new Date();

    const hasOverdue = tasks.some(t => {
      if (!t.dueDate || t.done) return false;
      return new Date(t.dueDate) < today;
    });

    const hasToday = tasks.some(t => {
      if (!t.dueDate || t.done) return false;
      return new Date(t.dueDate).toDateString() === today.toDateString();
    });

    let notes = [];
    if (hasOverdue) notes.push("⚠️ Some assignments are overdue");
    if (hasToday) notes.push("⏰ Some assignments due today");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotifications(notes);
  }, [tasks]);

  return (
    <MainLayout>

      <h1 className="text-2xl font-bold mb-6 ">
        Teacher Dashboard
      </h1>

      <OverallStats tasks={tasks} />

      <WeeklyChart tasks={tasks} />
      {/* ✅ 2. Detailed Class Insights (attendance + subject) */}
      <ClassStats tasks={tasks} />

      {/* ✅ 4. Chart Visualization */}

      {/* ✅ 5. Notifications */}
      {notifications.length > 0 && (
        <div className="mb-6 space-y-2">
          {notifications.map((n, i) => (
            <div key={i} className="bg-red-100 text-red-600 p-3 rounded">
              {n}
            </div>
          ))}
        </div>
      )}


    </MainLayout>
  );
}

export default TeacherDashboard;