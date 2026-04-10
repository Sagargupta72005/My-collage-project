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

  // LOAD TASKS
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTasks(saved);
  }, [storageKey]);

  // SAVE TASKS
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
    window.dispatchEvent(new Event("storage"));
  }, [tasks, storageKey]);

  // ADD TASK
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

  // DELETE
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // TOGGLE COMPLETE
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // EDIT
  const updateTask = (id) => {
    const newText = prompt("Edit task:");
    if (!newText) return;

    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title: newText } : t
      )
    );
  };

  // FILTERS
  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <MainLayout>
      <div className="flex-1 p-6 overflow-y-auto">

        {/* TOP GRID: Tasks + Habits + Planner */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">

          {/* TASKS */}
          <div className="bg-white p-5 rounded-xl shadow h-90">
            <h2 className="text-lg font-semibold mb-4">Tasks</h2>

            <div className="flex gap-2 mb-4">
              <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border p-2 w-full rounded-lg text-sm"
                placeholder="Enter task..."
              />
              <button
                onClick={addTask}
                className="bg-blue-600 text-white px-4 rounded-lg text-sm"
              >
                Add
              </button>
            </div>

            {/* PENDING */}
            <h3 className="text-sm font-medium mb-2 text-gray-600">
              Pending
            </h3>
            <div className="space-y-2 max-h-50 overflow-y-auto mb-4">
              {pendingTasks.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-lg text-sm"
                >
                  <span
                    onClick={() => toggleTask(t.id)}
                    className="cursor-pointer"
                  >
                    {t.title}
                  </span>

                  <div className="space-x-2">
                    <button
                      onClick={() => updateTask(t.id)}
                      className="text-yellow-500 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="text-red-500 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* COMPLETED */}
            <h3 className="text-sm font-medium mb-2 text-green-600">
              Completed
            </h3>
            <div className="space-y-2 max-h-30 overflow-y-auto">
              {completedTasks.length === 0 ? (
                <p className="text-xs text-gray-400">
                  No completed tasks
                </p>
              ) : (
                completedTasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center bg-green-50 p-2 rounded-lg text-sm"
                  >
                    <span
                      onClick={() => toggleTask(t.id)}
                      className="line-through text-gray-400 cursor-pointer"
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

            {/* CLEAR COMPLETED */}
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
          <div className=" rounded-xl">
            <HabitTracker />
          </div>

          {/* DAILY PLANNER */}
          <div className="" >
            <DailyPlanner />
          </div>
        </div>

        {/* POMODORO TIMER */}
        <div className="mb-6">
          <PomodoroTimer />
        </div>

        {/* ANALYTICS DASHBOARD */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <Dashboard tasks={tasks} />
        </div>

        {/* NOTES & CALCULATOR */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className=" bg-white rounded-xl shadow">
            <NotesSection />
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3">Quick Calculator</h2>
            <NotesCalculator />
          </div>
        </div>
        
      </div>
    </MainLayout>
  );
};

export default TaskSection;