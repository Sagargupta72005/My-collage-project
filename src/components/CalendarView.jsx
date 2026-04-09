import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // 🔹 Load tasks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  // 🔹 Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const normalizeDate = (d) => {
    const dateObj = new Date(d);
    dateObj.setHours(0, 0, 0, 0);
    return dateObj.getTime();
  };

  const selectedDateTime = normalizeDate(date);

  const tasksOnDate = tasks.filter(
    (t) => normalizeDate(t.dueDate) === selectedDateTime
  );

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      dueDate: date,
      completed: false,
      reminder: true,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskTitle("");
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const isOverdue = (dueDate) => {
    return normalizeDate(dueDate) < normalizeDate(new Date());
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg  w-full">
      <h2 className="text-xl font-semibold mb-4"> Reiminder set </h2>
      <div className="flex items-center justify-center">
      <Calendar onChange={setDate} value={date} />
      </div>
      {/* Add Task */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Tasks */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-2">
          Tasks on{" "}
          <span className="text-blue-600">
            {date.toDateString()}
          </span>
        </h3>

        {tasksOnDate.length === 0 ? (
          <p className="text-gray-400 italic">
            No tasks. Productivity level: suspiciously calm.
          </p>
        ) : (
          <div className="space-y-2">
            {tasksOnDate.map((t) => (
              <div
                key={t.id}
                className={`p-3 rounded-lg flex justify-between items-center transition
                  ${t.completed ? "bg-green-100 line-through" : "bg-gray-100"}
                  ${isOverdue(t.dueDate) && !t.completed ? "border-l-4 border-red-500" : ""}
                `}
              >
                <div>
                  <p>{t.title}</p>
                  {t.reminder && (
                    <span className="text-xs text-orange-500">
                      ⏰ Reminder
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(t.id)}
                    className="text-green-600 text-sm"
                  >
                    ✔
                  </button>

                  <button
                    onClick={() => deleteTask(t.id)}
                    className="text-red-500 text-sm"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarView;