import React from "react";

function SubjectStats({ tasks = [] }) {
  const subjectStats = {};

  // Build stats object
  tasks.forEach((task) => {
    if (!task.subject) return;

    if (!subjectStats[task.subject]) {
      subjectStats[task.subject] = {
        total: 0,
        completed: 0,
      };
    }

    subjectStats[task.subject].total += 1;

    if (task.done) {
      subjectStats[task.subject].completed += 1;
    }
  });

  // Total progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const overallPercent =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  return (
    <div className="bg-white dark:bg-zinc-900 p-5 w-full mt-6 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-zinc-800 dark:text-white">
          Subject Progress
        </h2>

        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          {completedTasks}/{totalTasks} Completed
        </span>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-zinc-600 dark:text-zinc-300">
            Overall Progress
          </span>
          <span className="text-sm font-semibold text-zinc-700 dark:text-white">
            {overallPercent}%
          </span>
        </div>

        <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-3 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Empty State */}
      {Object.keys(subjectStats).length === 0 ? (
        <div className="text-center py-6 text-zinc-500 dark:text-zinc-400">
          No subject data available
        </div>
      ) : (
        <div className="space-y-4">
          {Object.keys(subjectStats).map((subject, index) => {
            const data = subjectStats[subject];

            const percent = Math.round(
              (data.completed / data.total) * 100
            );

            // Dynamic color based on completion
            let progressColor = "bg-red-500";

            if (percent >= 80) {
              progressColor = "bg-green-500";
            } else if (percent >= 50) {
              progressColor = "bg-yellow-500";
            }

            return (
              <div
                key={index}
                className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-zinc-800 dark:text-white">
                      {subject}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {data.completed} of {data.total} tasks completed
                    </p>
                  </div>

                  <span className="text-sm font-bold text-zinc-700 dark:text-white">
                    {percent}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-3 rounded-full overflow-hidden">
                  <div
                    className={`${progressColor} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SubjectStats;
