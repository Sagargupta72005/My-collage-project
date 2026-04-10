import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  const [time, setTime] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [task, setTask] = useState("");
  const [sessionCount, setSessionCount] = useState(0);
  const [mode, setMode] = useState("Work"); // Work / Short Break / Long Break

  // Timer countdown
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    }

    if (time === 0 && isRunning) {
      if (mode === "Work") {
        setSessionCount((c) => c + 1);
        if ((sessionCount + 1) % 4 === 0) {
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

  const progress =
    ((mode === "Work" ? workMinutes * 60 : mode === "Short Break" ? shortBreakMinutes * 60 : longBreakMinutes * 60) -
      time) /
    (mode === "Work" ? workMinutes * 60 : mode === "Short Break" ? shortBreakMinutes * 60 : longBreakMinutes * 60) *
    100;

  const applyCustomTimes = () => {
    if (mode === "Work") setTime(workMinutes * 60);
    else if (mode === "Short Break") setTime(shortBreakMinutes * 60);
    else setTime(longBreakMinutes * 60);
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
      {/* Left Panel: Timer */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="text-5xl font-[font1] text-gray-800">{formatTime()}</div>
        <p className="text-gray-500 text-sm font-medium">{mode}</p>

        <div className="flex justify-center gap-3 mt-2">
          <button
            onClick={() => setIsRunning(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
          >
            Start
          </button>
          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded text-sm"
          >
            Pause
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setMode("Work");
              setTime(workMinutes * 60);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
          >
            Reset
          </button>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-4">
          <div
            className={`h-3 rounded-full transition-all ${
              mode === "Work" ? "bg-green-500" : mode === "Short Break" ? "bg-yellow-400" : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mt-2">Pomodoros completed: <span className="font-medium">{sessionCount}</span></p>
      </div>

      {/* Right Panel: Task & Custom Times */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Task Input */}
        <input
          type="text"
          placeholder="Current task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Custom Times */}
        <div className="flex flex-col gap-2 border px-5 py-5 rounded-lg bg-gray-50">
          <span className="text-gray-600 text-sm font-medium">Custom Times (minutes)</span>
          <div className="flex gap-2 items-center justify-center">
            <input
              type="number"
              min={1}
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
              className="border p-1 font-[font1] rounded w-16 text-sm text-center"
              placeholder="Work"
            />
            <input
              type="number"
              min={1}
              value={shortBreakMinutes}
              onChange={(e) => setShortBreakMinutes(Number(e.target.value))}
              className="border p-1 font-[font1] rounded w-16 text-sm text-center"
              placeholder="Short"
            />
            <input
              type="number"
              min={1}
              value={longBreakMinutes}
              onChange={(e) => setLongBreakMinutes(Number(e.target.value))}
              className="border p-1 font-[font1] rounded w-16 text-sm text-center"
              placeholder="Long"
            />
          </div>
            <button
              onClick={applyCustomTimes}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
            >
              Apply
            </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;