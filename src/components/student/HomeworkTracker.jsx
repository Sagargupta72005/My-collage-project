import React from "react";

function HomeworkTracker({ tasks }) {
  const homework = tasks.filter((t) => t.type === "homework");

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold text-lg">📝 Homework</h2>

      {homework.length === 0 ? (
        <p className="text-sm text-gray-400 mt-2">No homework</p>
      ) : (
        <div className="mt-2 space-y-1">
          {homework.map((h, i) => (
            <p key={i}>
              {h.title} {h.done ? "✅" : "⏳"}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeworkTracker;