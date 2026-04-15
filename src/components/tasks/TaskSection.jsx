import { useState, useEffect } from "react";
import DailyPlanner from "./planner/DailyPlanner";
import HabitTracker from "./habits/HabitTracker";
import NotesSection from "../NotesSection";
import NotesCalculator from "../NotesCalculator";
import MainLayout from "../layouts/MainLayout";
import PomodoroTimer from "./pomodoro/PomodoroTimer";
import Dashboard from "./analytics/Dashboard";

const TaskSection = () => {
  const role = localStorage.getItem("role");
  const storageKey = `Assignments_${role}`;

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setTasks(saved);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
    window.dispatchEvent(new Event("storage"));
  }, [tasks, storageKey]);

  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      title: task,
      dueDate: new Date(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const updateTask = (id) => {
    const newText = prompt("Edit task:");
    if (!newText) return;

    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title: newText } : t
      )
    );
  };

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <MainLayout>
      <div className="flex-1 p-3 sm:p-4 md:p-6 ">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 mb-6">

          {/* TASKS */}
          <div className="bg-(--secondary-gradient) text-white p-2 sm:p-5 rounded-xl shadow w-full">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Tasks
            </h2>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border p-2 w-full rounded-lg text-sm"
                placeholder="Enter task..."
              />
              <button
                onClick={addTask}
                className="bg-(--third-gradient) text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto"
              >
                Add
              </button>
            </div>

            <h3 className="text-xs sm:text-sm font-medium mb-2 text-gray-200">
              Pending
            </h3>

            <div className="space-y-2 max-h-10 sm:max-h-20 overflow-y-auto mb-4">
              {pendingTasks.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center bg-(--secondary-gradient) p-2 rounded-lg text-xs sm:text-sm"
                >
                  <span
                    onClick={() => toggleTask(t.id)}
                    className="cursor-pointer break-words"
                  >
                    {t.title}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateTask(t.id)}
                      className="text-yellow-500 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="text-red-400 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xs sm:text-sm font-medium mb-2 text-green-600">
              Completed
            </h3>

            <div className="space-y-2 max-h-10 sm:max-h-15 overflow-y-auto">
              {completedTasks.length === 0 ? (
                <p className="text-xs text-gray-400">
                  No completed tasks
                </p>
              ) : (
                completedTasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center bg-(--secondary-gradient) p-2 rounded-lg text-xs sm:text-sm"
                  >
                    <span
                      onClick={() => toggleTask(t.id)}
                      className="line-through text-gray-400 cursor-pointer break-words"
                    >
                      {t.title}
                    </span>

                    <button
                      onClick={() => deleteTask(t.id)}
                      className="text-red-400 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>

            {completedTasks.length > 0 && (
              <button
                onClick={() =>
                  setTasks(tasks.filter((t) => !t.completed))
                }
                className="text-xs text-red-500 mt-3"
              >
                Clear Completed
              </button>
            )}
          </div>

          {/* HABITS */}
          <div className="w-full">
            <HabitTracker />
          </div>

          {/* PLANNER */}
          <div className="w-full">
            <DailyPlanner />
          </div>
        </div>

        {/* POMODORO */}
        <div className="mb-6">
          <PomodoroTimer />
        </div>

        {/* DASHBOARD */}
        <div className="bg-(--secondary-gradient)  p-4 sm:p-5 rounded-xl shadow mb-6">
          <Dashboard tasks={tasks} />
        </div>

        {/* NOTES + CALCULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-(--secondary-gradient) rounded-xl shadow">
            <NotesSection />
          </div>

          <div className="bg-(--secondary-gradient) p-4 rounded-xl shadow">
            <h2 className="text-base sm:text-lg font-semibold mb-3">
              Quick Calculator
            </h2>
            <NotesCalculator />
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default TaskSection;