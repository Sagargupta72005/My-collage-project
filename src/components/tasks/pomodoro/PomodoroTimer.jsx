import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  const [time, setTime] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [task, setTask] = useState("");
  const [sessionCount, setSessionCount] = useState(0);
  const [mode, setMode] = useState("Work");

  // 🔗 STORAGE KEY (same pattern as tasks)
  const role = localStorage.getItem("role");
  const storageKey = `Pomodoro_${role}`;

  // LOAD SESSIONS
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || 0;
    setSessionCount(saved);
  }, [storageKey]);

  // SAVE SESSIONS
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(sessionCount));
    window.dispatchEvent(new Event("storage"));
  }, [sessionCount, storageKey]);

  // TIMER
  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    }

    if (time === 0 && isRunning) {
      if (mode === "Work") {
        const newCount = sessionCount + 1;
        setSessionCount(newCount);

        if (newCount % 4 === 0) {
          setMode("Long Break");
          setTime(longBreakMinutes * 60);
        } else {
          setMode("Short Break");
          setTime(shortBreakMinutes * 60);
        }
      } else {
        setMode("Work");
        setTime(workMinutes * 60);
      }

      alert(`${mode} session complete!`);
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, time, mode, sessionCount, workMinutes, shortBreakMinutes, longBreakMinutes]);

  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const totalTime =
    mode === "Work"
      ? workMinutes * 60
      : mode === "Short Break"
      ? shortBreakMinutes * 60
      : longBreakMinutes * 60;

  const progress = ((totalTime - time) / totalTime) * 100;

  const applyCustomTimes = () => {
    if (mode === "Work") setTime(workMinutes * 60);
    else if (mode === "Short Break") setTime(shortBreakMinutes * 60);
    else setTime(longBreakMinutes * 60);
  };

  return (
    <div className="w-full p-4 sm:p-5 md:p-6 bg-white rounded-xl shadow-lg flex flex-col lg:flex-row gap-5 md:gap-6">

      {/* LEFT: TIMER */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-[font1] text-gray-800">
          {formatTime()}
        </div>

        <p className="text-gray-500 text-sm">{mode}</p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-2">
          <button
            onClick={() => setIsRunning(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-1 rounded text-xs sm:text-sm"
          >
            Start
          </button>

          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 sm:px-4 py-1 rounded text-xs sm:text-sm"
          >
            Pause
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setMode("Work");
              setTime(workMinutes * 60);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1 rounded text-xs sm:text-sm"
          >
            Reset
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden mt-3">
          <div
            className={`h-full transition-all ${
              mode === "Work"
                ? "bg-green-500"
                : mode === "Short Break"
                ? "bg-yellow-400"
                : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Pomodoros: <span className="font-medium">{sessionCount}</span>
        </p>
      </div>

      {/* RIGHT: SETTINGS */}
      <div className="flex-1 flex flex-col gap-4">

        {/* TASK */}
        <input
          type="text"
          placeholder="Current task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* CUSTOM TIMES */}
        <div className="flex flex-col gap-3 border p-4 rounded-lg bg-gray-50">
          <span className="text-gray-600 text-sm font-[font1]">
            Custom Times (minutes)
          </span>

          <div className="flex flex-wrap gap-2 justify-center">
            <input
              type="number"
              min={1}
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
              className="border p-1 rounded w-14 sm:w-16 text-xs sm:text-sm text-center"
              placeholder="Work"
            />
            <input
              type="number"
              min={1}
              value={shortBreakMinutes}
              onChange={(e) => setShortBreakMinutes(Number(e.target.value))}
              className="border p-1 rounded w-14 sm:w-16 text-xs sm:text-sm text-center"
              placeholder="Short"
            />
            <input
              type="number"
              min={1}
              value={longBreakMinutes}
              onChange={(e) => setLongBreakMinutes(Number(e.target.value))}
              className="border p-1 rounded w-14 sm:w-16 text-xs sm:text-sm text-center"
              placeholder="Long"
            />
          </div>

          <button
            onClick={applyCustomTimes}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs sm:text-sm w-full sm:w-auto self-center"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;