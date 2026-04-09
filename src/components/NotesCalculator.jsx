import React, { useState, useCallback } from "react";

const NotesCalculator = ({ onSaveResult }) => {
  const [calcName, setCalcName] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // ✅ Calculate + Save
  const calculateAndSave = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    try {
      // Allow valid characters
      if (!/^[0-9+\-*/().x\s]+$/i.test(trimmedInput)) {
        throw new Error("Invalid characters");
      }

      const safeInput = trimmedInput.replace(/x/gi, "*");

      // Basic validation
      if (
        /[+\-*/]{3,}/.test(safeInput) ||
        /[*/]{2,}/.test(safeInput) ||
        /^\*/.test(safeInput) ||
        /[+\-*/.]$/.test(safeInput)
      ) {
        throw new Error("Invalid format");
      }

      const res = Function(`"use strict"; return (${safeInput})`)();

      if (typeof res !== "number" || !isFinite(res)) {
        throw new Error("Invalid result");
      }

      setResult(res);
      setIsSaved(true);

      const finalText = calcName
        ? `${calcName} → ${trimmedInput} = ${res}`
        : `${trimmedInput} = ${res}`;

      onSaveResult && onSaveResult(finalText);

      setCalcName("");
      setInput("");

      setTimeout(() => setIsSaved(false), 2000);
    } catch (err) {
      console.log("Calc Error:", err.message);
      setResult("Error");
      setIsSaved(false);
    }
  }, [input, calcName, onSaveResult]);

  // ✅ Enter key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") calculateAndSave();
  };

  // ✅ Clear everything
  const clear = () => {
    setCalcName("");
    setInput("");
    setResult(null);
    setIsSaved(false);
  };

  return (
    <div className="max-w-md bg-white border rounded-xl shadow-lg overflow-hidden">

      {/* Header */}
      <div className="px-4 py-2 border-b bg-gray-50 flex justify-between">
        <span className="text-xs font-semibold text-gray-600 uppercase">
          Smart Calc
        </span>
        <button onClick={clear} className="text-blue-600 text-xs">
          Clear
        </button>
      </div>

      {/* Body */}
      <div className="p-5">

        {/* Name */}
        <input
          type="text"
          value={calcName}
          onChange={(e) => setCalcName(e.target.value)}
          placeholder="Name (e.g. Groceries)"
          className="w-full mb-3 p-2 border rounded text-sm"
        />

        {/* Input */}
        <div className="relative">
          <input
            type="text"
            value={input}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setInput(e.target.value);
              setResult(null);
              setIsSaved(false);
            }}
            placeholder="e.g. 50 x 2 + 10 or 5 * -2"
            className="w-full p-3 border rounded"
          />

          <button
            onClick={calculateAndSave}
            className="absolute right-2 top-2 bottom-2 bg-blue-500 text-white px-4 rounded"
          >
            =
          </button>
        </div>

        {/* Result */}
        <div className="mt-5 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">Result</p>
            <div className={`text-2xl ${result === "Error" ? "text-red-500" : ""}`}>
              {result !== null ? result : "0"}
            </div>
          </div>

          {isSaved && (
            <div className="text-green-600 text-xs">
              Saved ✓
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 bg-gray-50 text-xs text-gray-400">
        Press Enter to calculate & save
      </div>
    </div>
  );
};

export default NotesCalculator;