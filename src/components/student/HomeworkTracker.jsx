function HomeworkTracker({ tasks = [] }) {
  const homeworkTasks = tasks.filter(
    (task) => task.category === "homework"
  );

  const getStatus = (task) => {
    if (task.done) {
      return {
        text: "Completed",
        className:
          "bg-green-100 text-green-700",
      };
    }

    if (task.dueDate) {
      const due = new Date(task.dueDate);
      const now = new Date();

      const isToday =
        due.toDateString() ===
        now.toDateString();

      if (due < now && !isToday) {
        return {
          text: "Overdue",
          className:
            "bg-red-100 text-red-700",
        };
      }

      if (isToday) {
        return {
          text: "Due Today",
          className:
            "bg-yellow-100 text-yellow-700",
        };
      }
    }

    return {
      text: "Pending",
      className:
        "bg-orange-100 text-orange-700",
    };
  };

  return (
    <div className="space-y-4">
      {homeworkTasks.length > 0 ? (
        homeworkTasks.map((task) => {
          const status = getStatus(task);

          return (
            <div
              key={task.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-semibold text-lg">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    {task.subject ||
                      "Homework"}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${status.className}`}
                >
                  {status.text}
                </span>
              </div>

              {/* CONTENT */}
              <p className="text-sm text-gray-300 mt-3">
                {task.description ||
                  "No description provided."}
              </p>

              {/* META */}
              <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">
                    Due Date
                  </p>
                  <p>
                    {task.dueDate
                      ? new Date(
                          task.dueDate
                        ).toLocaleDateString()
                      : "Not set"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Status
                  </p>
                  <p
                    className={
                      task.done
                        ? "text-green-400"
                        : "text-orange-400"
                    }
                  >
                    {task.done
                      ? "Completed"
                      : "In Progress"}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12 bg-white/5 border border-dashed border-white/10 rounded-2xl">
          <h3 className="font-semibold">
            No Homework Tasks
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            Your assignments will appear here once
            added.
          </p>
        </div>
      )}
    </div>
  );
}

export default HomeworkTracker;