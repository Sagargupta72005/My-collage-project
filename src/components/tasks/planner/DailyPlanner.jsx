import React, { useState, useEffect } from "react";
import { getData, setData } from "../utils/storage.js";

const DailyPlanner = () => {
  const key = "planner";
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    setPlans(getData(key) || []);
  }, []);

  useEffect(() => {
    setData(key, plans);
  }, [plans]);

  // ADD PLAN
  const addPlan = (taskTitle = title, taskStart = start, taskEnd = end) => {
    if (!taskTitle || !taskStart || !taskEnd) return;

    setPlans([
      ...plans,
      { id: Date.now(), title: taskTitle, start: taskStart, end: taskEnd },
    ]);

    // Reset input only if using manual add
    if (!taskTitle.startsWith("Break")) {
      setTitle("");
      setStart("");
      setEnd("");
    }
  };

  // DELETE PLAN
  const deletePlan = (id) => {
    if (window.confirm("Delete this plan?")) {
      setPlans(plans.filter((p) => p.id !== id));
    }
  };

  // ADD BREAK (default 15 min break from current time)
  const addBreak = () => {
    const now = new Date();
    const startTime = now.toTimeString().slice(0, 5); // HH:MM
    const endDate = new Date(now.getTime() + 15 * 60000); // +15 min
    const endTime = endDate.toTimeString().slice(0, 5);

    addPlan("Break", startTime, endTime);
  };

  return (
    <div className="p-2 h-95 bg-(--secondary-gradient) text-white rounded-xl shadow flex flex-col">
      <h2 className="font-semibold mb-3">Daily Planner</h2>

      {/* Input */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <input
          placeholder="Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border p-2 rounded text-sm"
        />
        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border p-2 rounded text-sm w-24"
        />
        <span className="self-center">→</span>
        <input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border p-2 rounded text-sm w-24"
        />
        <button
          onClick={() => addPlan()}
          className="bg-blue-500  text-black px-4 py-2 rounded text-sm"
        >
          Add
        </button>
        <button
          onClick={addBreak}
          className=" border text-black px-4 py-2 rounded text-sm"
        >
          Break
        </button>
      </div>

      {/* Plan List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {plans.length === 0 && (
          <p className="text-gray-400 text-sm">No plans for today.</p>
        )}

        {plans.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center p-2 bg-gray-200/20 border rounded text-sm"
          >
            <span>{p.start} - {p.end} : {p.title}</span>
            <button
              onClick={() => deletePlan(p.id)}
              className="bg-red-500 text-white px-2 py-1 rounded text-xs"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyPlanner;