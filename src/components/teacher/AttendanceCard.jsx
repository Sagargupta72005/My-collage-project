import React, { useState } from "react";

function AttendanceCard({ tasks = [], setTasks, storageKey }) {
  const totalStudents = 50;

  const [attendanceInput, setAttendanceInput] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [nextDate, setNextDate] = useState("");

  let totalAttendance = 0;
  let count = 0;

  const subjectAttendance = {};

  tasks.forEach(t => {
    if (typeof t.attendance === "number") {
      totalAttendance += t.attendance;
      count++;

      if (t.subject) {
        if (!subjectAttendance[t.subject]) {
          subjectAttendance[t.subject] = { total: 0, count: 0 };
        }

        subjectAttendance[t.subject].total += t.attendance;
        subjectAttendance[t.subject].count++;
      }
    }
  });

  const avg = count ? Math.round(totalAttendance / count) : 0;
  const percentage = count
    ? Math.round((avg / totalStudents) * 100)
    : 0;

  const isLow = percentage < 60;

  // ✅ Add class
  const handleAddAttendance = () => {
    if (!setTasks || !storageKey) {
      alert("System not connected properly");
      return;
    }

    const attendanceValue = Number(attendanceInput);

    if (!subject.trim()) {
      alert("Enter subject");
      return;
    }

    if (isNaN(attendanceValue)) {
      alert("Enter valid attendance");
      return;
    }

    if (attendanceValue < 0 || attendanceValue > totalStudents) {
      alert(`Attendance must be between 0 and ${totalStudents}`);
      return;
    }

    const newTask = {
      id: Date.now(),
      subject: subject.trim(),
      topic: topic.trim(),
      attendance: attendanceValue,
      date: nextDate || new Date().toISOString(),
      done: true
    };

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    localStorage.setItem(storageKey, JSON.stringify(updatedTasks));

    // reset
    setAttendanceInput("");
    setSubject("");
    setTopic("");
    setNextDate("");
  };

  const isDisabled =
    !subject.trim() ||
    attendanceInput === "" ||
    Number(attendanceInput) < 0 ||
    Number(attendanceInput) > totalStudents;

  return (
    <div className="bg-(--secondary-gradient) text-white p-4 rounded space-y-4">

      {/* 📊 Average */}
      <div>
        <h2 className="font-semibold">Average Attendance</h2>
        <p className="text-xl">
          {avg} / {totalStudents} ({percentage}%)
        </p>

        {isLow && count > 0 && (
          <p className="text-red-600 text-sm mt-1">
            ⚠️ Attendance is low ({percentage}%)
          </p>
        )}
      </div>

      {/* 📚 Subject-wise */}
      <div>
        <h3 className="font-medium mb-1">Subject Attendance</h3>

        {Object.keys(subjectAttendance).length === 0 ? (
          <p className="text-sm text-gray-500">No data</p>
        ) : (
          Object.keys(subjectAttendance).map((sub, i) => {
            const data = subjectAttendance[sub];
            const avgSub = Math.round(data.total / data.count);

            return (
              <div key={i} className="text-sm flex justify-between">
                <span>{sub}</span>
                <span>{avgSub}</span>
              </div>
            );
          })
        )}
      </div>

      {/* ✍️ Input */}
      <div className="space-y-2">

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          value={nextDate}
          onChange={(e) => setNextDate(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Attendance"
          value={attendanceInput}
          onChange={(e) => setAttendanceInput(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleAddAttendance}
          disabled={isDisabled}
          className={`px-4 py-2 rounded w-full ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 text-white"
          }`}
        >
          Add Class
        </button>

      </div>

    </div>
  );
}

export default AttendanceCard;