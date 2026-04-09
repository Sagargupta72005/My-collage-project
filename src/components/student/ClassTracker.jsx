import React from "react";

function ClassTracker({ tasks }) {
  const completed = tasks.filter((t) => t.done).length;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold text-lg">📘 Classes Completed</h2>
      <p className="text-3xl mt-2 font-bold text-blue-600">
        {completed}
      </p>
    </div>
  );
}

export default ClassTracker;