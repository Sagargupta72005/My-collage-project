import React, { useState } from "react";
import {
  BookOpen,
  Clock3,
  CheckCircle2,
  TrendingUp,
  Trash2,
  Pencil,
} from "lucide-react";

function OverallStats() {
  // TASK DATA
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "React Class",
      done: false,
      category: "Frontend",
    },
    {
      id: 2,
      title: "DSA Practice",
      done: true,
      category: "Programming",
    },
  ]);

  // INPUT STATES
  const [taskInput, setTaskInput] = useState("");
  const [category, setCategory] = useState("General");

  // STATS
  const total = tasks.length;

  const completed = tasks.filter((t) => t.done).length;

  const pending = total - completed;

  const completionRate =
    total > 0
      ? Math.round((completed / total) * 100)
      : 0;

  // ADD TASK
  const addTask = () => {
    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskInput,
      category,
      done: false,
    };

    setTasks((prev) => [newTask, ...prev]);

    setTaskInput("");
    setCategory("General");
  };

  // TOGGLE DONE
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              done: !task.done,
            }
          : task
      )
    );
  };

  // DELETE
  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  // EDIT
  const editTask = (id) => {
    const newText = prompt("Edit task");

    if (!newText?.trim()) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newText,
            }
          : task
      )
    );
  };

  // STATS CARDS
  const stats = [
    {
      title: "Total Classes",
      value: total,
      icon: <BookOpen size={24} />,
      desc: "All scheduled classes",
    },
    {
      title: "Pending Classes",
      value: pending,
      icon: <Clock3 size={24} />,
      desc: "Classes left to finish",
    },
    {
      title: "Completed Classes",
      value: completed,
      icon: <CheckCircle2 size={24} />,
      desc: "Finished successfully",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: <TrendingUp size={24} />,
      desc: "Overall performance",
    },
  ];

  return (
    <div className="space-y-8">

      {/* ADD TASK */}
      <div
        className="
          bg-(--primary-gradient)
          p-5
          rounded-2xl
          shadow-[0_10px_35px_rgba(0,0,0,0.25)]
        "
      >
        <h2 className="text-xl font-semibold mb-4 text-(--text)">
          Add New Class
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* INPUT */}
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter class name..."
            className="
              p-3
              rounded-xl
              border
              outline-none
              text-black
            "
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              p-3
              rounded-xl
              border
              text-black
            "
          >
            <option>General</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Programming</option>
            <option>Design</option>
          </select>

          {/* BUTTON */}
          <button
            onClick={addTask}
            className="
              bg-(--third-gradient)
              hover:bg-(--third-gradient)/90
              text-white
              rounded-xl
              px-5
              py-3
              transition-all
            "
          >
            Add Class
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((item, index) => (
          <div
            key={index}
            className="
              relative
              overflow-hidden
              rounded-2xl
              p-6
              bg-(--primary-gradient)
              text-(--text)
              border border-white/10
              shadow-[0_10px_35px_rgba(0,0,0,0.25)]
              hover:shadow-[0_15px_45px_rgba(0,0,0,0.35)]
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            {/* GLOW */}
            <div
              className="
                absolute
                top-0
                right-0
                w-24
                h-24
                bg-white/10
                blur-3xl
                rounded-full
              "
            />

            {/* ICON */}
            <div
              className="
                w-12
                h-12
                flex
                items-center
                justify-center
                rounded-xl
                bg-white/10
                mb-4
              "
            >
              {item.icon}
            </div>

            {/* TITLE */}
            <h2 className="text-sm opacity-80">
              {item.title}
            </h2>

            {/* VALUE */}
            <p className="text-3xl font-bold mt-2">
              {item.value}
            </p>

            {/* DESC */}
            <p className="text-xs opacity-70 mt-2">
              {item.desc}
            </p>

            {/* PROGRESS */}
            <div className="mt-5 w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/70 rounded-full transition-all duration-500"
                style={{
                  width:
                    item.title === "Completion Rate"
                      ? `${completionRate}%`
                      : total > 0
                      ? `${(item.value / total) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* TASK LIST */}
      <div
        className="
          bg-(--primary-gradient)
          rounded-2xl
          p-5
          shadow-[0_10px_35px_rgba(0,0,0,0.25)]
        "
      >
        <h2 className="text-xl font-semibold mb-5 text-(--text)">
          Classes List
        </h2>

        <div className="space-y-3">

          {tasks.length === 0 ? (
            <p className="text-gray-400">
              No classes added
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  justify-between
                  gap-4
                  p-4
                  rounded-xl
                  bg-white/5
                  border border-white/10
                "
              >

                {/* LEFT */}
                <div>
                  <h3
                    className={`
                      text-lg
                      ${
                        task.done
                          ? "line-through text-gray-400"
                          : "text-(--text)"
                      }
                    `}
                  >
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Category: {task.category}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 flex-wrap">

                  {/* DONE */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`
                      px-4
                      py-2
                      rounded-lg
                      text-sm
                      transition-all
                      ${
                        task.done
                          ? "bg-yellow-500 text-black"
                          : "bg-green-500 text-white"
                      }
                    `}
                  >
                    {task.done ? "Undo" : "Mark Done"}
                  </button>

                  {/* EDIT */}
                  <button
                    onClick={() => editTask(task.id)}
                    className="
                      p-2
                      rounded-lg
                      bg-blue-500
                      text-white
                    "
                  >
                    <Pencil size={18} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="
                      p-2
                      rounded-lg
                      bg-red-500
                      text-white
                    "
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OverallStats;