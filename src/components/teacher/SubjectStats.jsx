import React from "react";

function SubjectStats({ tasks = [] }) {
  const subjectStats = {};

  tasks.forEach(t => {
    if (!t.subject) return;

    if (!subjectStats[t.subject]) {
      subjectStats[t.subject] = { total: 0, completed: 0 };
    }

    subjectStats[t.subject].total++;

    if (t.done) {
      subjectStats[t.subject].completed++;
    }
  });

  return (
    <div className="bg-(--secondary-gradient) p-4 w-full mt-6 rounded shadow">
      <h2 className="font-semibold text-white mb-3">Subject Progress</h2>

      {Object.keys(subjectStats).length === 0 ? (
        <p className="text-white text-sm">No subject data available</p>
      ) : (
        Object.keys(subjectStats).map((sub, i) => {
          const data = subjectStats[sub];
          const percent = Math.round(
            (data.completed / data.total) * 100
          );

          return (
            <div key={i} className="mb-4">

              <div className="flex justify-between">
                <p className="font-medium">{sub}</p>
                <p className="text-sm text-gray-600">
                  {data.completed}/{data.total} ({percent}%)
                </p>
              </div>

              <div className="w-full bg-gray-200 h-5 rounded mt-1">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

            </div>
          );
        })
      )}
    </div>
  );
}

export default SubjectStats;