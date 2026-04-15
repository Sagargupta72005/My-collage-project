import React from "react";

function ClassTracker({ tasks }) {
  const completed = tasks.filter((t) => t.done).length;

  return (
    <div className="bg-gray-600/50 p-4 rounded-xl shadow">
      <h2 className="font-semibold text-white text-lg">📘 Classes Completed</h2>
      <p className="text-3xl mt-2 font-bold text-white">
        {completed}
      </p>
    </div>
  );
}

export default ClassTracker;