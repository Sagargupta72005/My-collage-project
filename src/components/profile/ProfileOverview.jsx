import { useEffect, useState } from "react";

function ProfileOverview() {
  const [tasks, setTasks] = useState([]);

  // USER DATA
  const name = localStorage.getItem("userName") || "User";
  const email = localStorage.getItem("userEmail") || "Not set";
  const role = localStorage.getItem("role") || "Guest";

  useEffect(() => {
    const savedTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    setTasks(savedTasks);
  }, []);

  // TASK STATS
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    totalTasks - completedTasks;

  const today = new Date();

  const overdueTasks = tasks.filter(
    (task) =>
      !task.completed &&
      task.dueDate &&
      new Date(task.dueDate).setHours(
        0,
        0,
        0,
        0
      ) < today.setHours(0, 0, 0, 0)
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  // MOTIVATION MESSAGE
  const motivation =
    completionRate === 100
      ? "Excellent work!"
      : completionRate >= 70
      ? "You are doing great."
      : completionRate >= 40
      ? "Keep going."
      : "Start completing your tasks today.";

  // PROFILE INITIAL
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className=" p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* PAGE TITLE */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Profile Overview
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your profile and task progress.
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-5 border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
            {initial}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {name}
            </h2>

            <p className="text-gray-500 text-sm">
              {email}
            </p>

            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border">
              {role}
            </span>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl shadow p-5 border border-gray-200">
            <p className="text-sm text-gray-500">
              Total Tasks
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {totalTasks}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 border border-gray-200">
            <p className="text-sm text-gray-500">
              Completed
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {completedTasks}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 border border-gray-200">
            <p className="text-sm text-gray-500">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
              {pendingTasks}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 border border-gray-200">
            <p className="text-sm text-gray-500">
              Overdue
            </p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {overdueTasks}
            </h2>
          </div>
        </div>

        {/* PROGRESS SECTION */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Task Progress
            </h3>

            <span className="text-sm font-medium text-gray-600">
              {completionRate}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <p className="text-sm text-gray-500 mt-3">
            {completedTasks} out of {totalTasks} tasks completed.
          </p>
        </div>

        {/* MOTIVATION SECTION */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Daily Motivation
          </h3>

          <p className="text-gray-600 leading-relaxed">
            {motivation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileOverview;
