import React from "react";

const defaultTasks = [
  { id: 1, title: "Design homepage", completed: true },
  { id: 2, title: "Implement login", completed: false },
  { id: 3, title: "Setup database", completed: true },
  { id: 4, title: "Write tests", completed: false },
];

const Dashboard = ({ tasks = defaultTasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="p-4 sm:p-5 md:p-6 h-full ">
      <h2 className="text-lg sm:text-xl md:text-2xl text-white  font-bold mb-4 sm:mb-6">
        Analytics Dashboard
      </h2>

      {totalTasks === 0 ? (
        <p className="text-gray-200 text-sm">No tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          
          <div className="bg-blue-50 p-4 rounded-lg text-center shadow-sm">
            <p className="text-gray-500 text-xs sm:text-sm">Total Tasks</p>
            <p className="text-2xl sm:text-3xl font-bold">{totalTasks}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
            <p className="text-gray-500 text-xs sm:text-sm">Completed</p>
            <p className="text-2xl sm:text-3xl font-bold">{completedTasks}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg text-center shadow-sm">
            <p className="text-gray-500 text-xs sm:text-sm">Pending</p>
            <p className="text-2xl sm:text-3xl font-bold">{pendingTasks}</p>
          </div>

        </div>
      )}

      {/* TASK LIST */}
      {totalTasks > 0 && (
        <div className="mt-5 sm:mt-6">
          <h3 className="text-base text-white sm:text-lg md:text-xl font-semibold mb-3">
            Task List
          </h3>

          {/* KEEP OVERFLOW BUT FIX HEIGHT RESPONSIVE */}
          <ul className="space-y-2 max-h-32 sm:max-h-40 md:max-h-52 overflow-y-scroll pr-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`p-2 rounded text-xs sm:text-sm wrap-break-word ${
                  task.completed ? "bg-green-700 text-black" : "bg-red-500 text-white"
                }`}
              >
                {task.title}{" "}
                <span className="text-[10px] sm:text-xs">
                  {task.completed ? "(Completed)" : "(Pending)"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;