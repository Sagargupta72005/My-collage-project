import React, { useState, useEffect } from "react";
import { getData, setData } from "../utils/storage";

const HabitTracker = () => {
  const key = "habits";
  const [habits, setHabits] = useState([]);
  const [input, setInput] = useState("");

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    setHabits(getData(key) || []);
  }, []);

  useEffect(() => {
    setData(key, habits);
  }, [habits]);

  // CREATE
  const addHabit = () => {
    if (!input.trim()) return;

    setHabits([
      ...habits,
      {
        id: Date.now(),
        title: input,
        completedDates: [],
        streak: 0,
      },
    ]);
    setInput("");
  };

  // UPDATE
  const editHabit = (id) => {
    const habit = habits.find((h) => h.id === id);
    const newTitle = prompt("Edit habit:", habit.title);
    if (!newTitle || !newTitle.trim()) return;

    setHabits(
      habits.map((h) =>
        h.id === id ? { ...h, title: newTitle } : h
      )
    );
  };

  // DELETE
  const deleteHabit = (id) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      setHabits(habits.filter((h) => h.id !== id));
    }
  };

  // MARK DONE
  const markDone = (id, date = new Date()) => {
    const today = date.toDateString();
    setHabits(
      habits.map((h) => {
        if (h.id !== id) return h;
        if (!h.completedDates.includes(today)) {
          return {
            ...h,
            completedDates: [...h.completedDates, today],
            streak: h.streak + 1,
          };
        }
        return h;
      })
    );
  };

  // Helper: get last 7 days
  const last7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d);
    }
    return days;
  };

  return (
    <div className="p-5 bg-(--secondary-gradient) text-white overflow-hidden rounded-xl shadow flex flex-col h-95 ">
      <h2 className="text-lg font-semibold mb-4">Habits</h2>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New habit"
          className="flex-1 border p-2 rounded-lg text-sm"
        />
        <button
          onClick={addHabit}
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          Add
        </button>
      </div>

      {/* Habit List */}
      <div className="flex-1 overflow-y-scroll h-50 space-y-4">
        {habits.length === 0 && (
          <p className="text-gray-400 text-sm">No habits added yet.</p>
        )}

        {habits.map((h) => (
          <div
            key={h.id}
            className="border  rounded-lg p-3 bg-gray-50 flex flex-col gap-2"
          >
            {/* Habit title and streak */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">{h.title}  {h.streak}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => editHabit(h.id)}
                  className="border text-black px-2 py-1 rounded-lg text-xs"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteHabit(h.id)}
                  className=" border  text-black px-2 py-1 rounded-lg text-xs"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Weekly calendar */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {last7Days().map((day) => {
                const dayString = day.toDateString();
                const completed = h.completedDates.includes(dayString);
                return (
                  <div
                    key={dayString}
                    className={`p-2 rounded-lg text-xs cursor-pointer ${
                      completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                    title={day.toDateString()}
                    onClick={() => markDone(h.id, day)}
                  >
                    {weekdays[day.getDay()]}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;