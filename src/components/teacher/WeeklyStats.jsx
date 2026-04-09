import React from "react";

function WeeklyStats({ tasks }) {
  const weeklyStats = {};

  tasks.forEach(t => {
    if (!t.date) return;

    const date = new Date(t.date);
    const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;

    if (!weeklyStats[week]) {
      weeklyStats[week] = 0;
    }

    weeklyStats[week]++;
  });

  return (
    <div className="bg-white p-4 w-full rounded shadow">
      <h2 className="font-semibold mb-3">Classes Per Week</h2>

      {Object.keys(weeklyStats).length === 0 ? (
        <p className="text-gray-500 text-sm">No weekly data available</p>
      ) : (
        Object.keys(weeklyStats).map((week, i) => (
          <div key={i} className="mb-2 flex justify-between">
            <span>{week}</span>
            <span className="font-medium">{weeklyStats[week]} classes</span>
          </div>
        ))
      )}
    </div>
  );
}

export default WeeklyStats;