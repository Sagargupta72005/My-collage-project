import { useState } from "react";

function ClassTracker({ tasks = [], setTasks }) {
  /* ================= INTERNAL FALLBACK STATE ================= */
  const [localTasks, setLocalTasks] = useState([]);

  const effectiveTasks = tasks.length ? tasks : localTasks;
  const updateTasks = setTasks || setLocalTasks;

  /* ================= DEMO DATA ================= */
  const demoClasses = [
    {
      id: crypto.randomUUID(),
      title: "Mathematics Lecture",
      subject: "Algebra",
      teacher: "Mr. Sharma",
      room: "Room 101",
      dueDate: new Date().toISOString(),
      done: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Physics Class",
      subject: "Mechanics",
      teacher: "Dr. Verma",
      room: "Lab 2",
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      done: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Chemistry Revision Class",
      subject: "Organic Chemistry",
      teacher: "Ms. Singh",
      room: "Room 305",
      dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
      done: true,
    },
  ];

  const loadDemoClasses = () => {
    updateTasks((prev) => [...demoClasses, ...prev]);
  };

  /* ================= STATUS ================= */
  const getStatus = (task) => {
    if (task.done) {
      return {
        text: "Completed",
        className: "bg-green-100 text-green-700",
      };
    }

    return {
      text: "Upcoming",
      className: "bg-blue-100 text-blue-700",
    };
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Class Tracker
        </h2>

        <button
          onClick={loadDemoClasses}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Load Demo Classes
        </button>
      </div>

      {/* CONTENT */}
      {effectiveTasks.length > 0 ? (
        effectiveTasks.map((task) => {
          const status = getStatus(task);

          return (
            <div
              key={task.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    {task.subject || "General Class"}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${status.className}`}
                >
                  {status.text}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">Teacher</p>
                  <p>{task.teacher || "Not Assigned"}</p>
                </div>

                <div>
                  <p className="text-gray-500">Date</p>
                  <p>
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "Not Scheduled"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Room</p>
                  <p>{task.room || "TBA"}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12 bg-white/5 border border-dashed border-white/10 rounded-2xl">
          <h3 className="font-semibold">No Classes Found</h3>
          <p className="text-sm text-gray-400 mt-2">
            Click “Load Demo Classes” to generate sample data.
          </p>
        </div>
      )}
    </div>
  );
}

export default ClassTracker;