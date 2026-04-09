import React from "react";

function OverallStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const pending = total - completed;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded">
        <h2 className="font-semibold">Total Classes</h2>
        <p className="text-xl">{total}</p>
      </div>

      <div className="bg-white p-4 rounded">
        <h2 className="font-semibold">Pending Classes</h2>
        <p className="text-xl">{pending}</p>
      </div>
      
      <div className="bg-white p-4 rounded">
        <h2 className="font-semibold">Completed Classes</h2>
        <p className="text-xl">{completed}</p>
      </div>

    </div>
  );
}

export default OverallStats;