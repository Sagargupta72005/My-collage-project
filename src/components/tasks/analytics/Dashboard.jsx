import React from "react";

// Sample tasks (optional default data)
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
    <div className="p-6  h-96">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

      {totalTasks === 0 ? (
        <p className="text-gray-500 text-sm">No tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center shadow-sm">
            <p className="text-gray-500 text-sm">Total Tasks</p>
            <p className="text-3xl font-bold">{totalTasks}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-3xl font-bold">{completedTasks}</p>
          </div>

          <div className="bg-yellow-50 p-4  rounded-lg text-center shadow-sm">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-3xl font-bold">{pendingTasks}</p>
          </div>
        </div>
      )}

      {/* Optional: Task list */}
      {totalTasks > 0 && (
        <div className="mt-6 ">
          <h3 className="text-xl font-semibold mb-3">Task List</h3>
          <ul className="space-y-2 overflow-y-auto h-40">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`p-2 rounded ${
                  task.completed ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {task.title} {task.completed ? "(Completed)" : "(Pending)"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;