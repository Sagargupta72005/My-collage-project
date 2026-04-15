import React from "react";

function RevisionTracker({ tasks }) {
  const revisions = tasks.filter((t) => t.type === "revision");

  return (
    <div className="bg-gray-600/50 p-4 rounded-xl shadow">
      <h2 className="font-semibold text-white text-lg">🔁 Revisions</h2>

      {revisions.length === 0 ? (
        <p className="text-sm text-white mt-2">No revision tasks</p>
      ) : (
        <div className="mt-2 space-y-1">
          {revisions.map((r, i) => (
            <p key={i}>{r.title}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default RevisionTracker;