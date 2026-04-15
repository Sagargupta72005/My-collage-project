import { useEffect, useState } from "react";

function ProfileOverview() {
  const name = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email") || "Not set";
  const role = localStorage.getItem("role") || "Guest";

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const today = new Date();
  const overdueTasks = tasks.filter(
    (t) =>
      !t.completed &&
      new Date(t.dueDate).setHours(0, 0, 0, 0) <
        new Date(today).setHours(0, 0, 0, 0)
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const motivation =
    completionRate === 100
      ? "You're unstoppable 🚀"
      : completionRate > 60
      ? "You're doing great 💪"
      : completionRate > 30
      ? "Keep pushing ⚡"
      : "Start small. Start now.";

  const initial = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <div className="space-y-8">

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white rounded-xl shadow flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xl font-bold">
          {initial}
        </div>

        <div>
          <h1 className="text-xl font-semibold">{name}</h1>
          <p className="text-sm text-white/80">{email}</p>
          <span className="text-xs bg-white/20 px-2 py-1 rounded mt-1 inline-block">
            {role}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Tasks</p>
          <h2 className="text-gray-800 text-xl font-bold">{totalTasks}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Completed</p>
          <h2 className="text-green-600 text-xl font-bold">
            {completedTasks}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-yellow-500 text-xl font-bold">
            {pendingTasks}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Overdue</p>
          <h2 className="text-red-500 text-xl font-bold">
            {overdueTasks}
          </h2>
        </div>

      </div>

      {/* Progress Section */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-3 text-gray-700">Progress</h3>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {completionRate}% tasks completed
        </p>
      </div>

      {/* Motivation Card */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-5 rounded-xl shadow">
        <h3 className="font-semibold text-lg mb-1">
          Daily Motivation
        </h3>
        <p className="text-sm text-white/90">{motivation}</p>
      </div>

    </div>
  );
}

export default ProfileOverview;