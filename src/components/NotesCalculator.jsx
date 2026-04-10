import React, { useState, useCallback, useRef } from "react";

const NotesCalculator = ({ onSaveResult }) => {
  const [calcName, setCalcName] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const inputRef = useRef(null);

  const calculateAndSave = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    try {
      if (!/^[0-9+\-*/().x\s]+$/i.test(trimmedInput)) throw new Error("Invalid characters");

      const safeInput = trimmedInput.replace(/x/gi, "*");

      if (/[+\-*/]{3,}/.test(safeInput) || /[*/]{2,}/.test(safeInput) || /^\*/.test(safeInput) || /[+\-*/.]$/.test(safeInput)) {
        throw new Error("Invalid format");
      }

      const res = Function(`"use strict"; return (${safeInput})`)();
      if (typeof res !== "number" || !isFinite(res)) throw new Error("Invalid result");

      setResult(res);
      setIsSaved(true);

      const finalText = calcName ? `${calcName} → ${trimmedInput} = ${res}` : `${trimmedInput} = ${res}`;
      onSaveResult && onSaveResult(finalText);

      setCalcName("");
      setInput("");

      setTimeout(() => setIsSaved(false), 2000);
      inputRef.current?.focus();
    } catch (err) {
      setResult("Error");
      setIsSaved(false);
    }
  }, [input, calcName, onSaveResult]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") calculateAndSave();
  };

  const clear = () => {
    setCalcName("");
    setInput("");
    setResult(null);
    setIsSaved(false);
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-md mx-auto bg-white border rounded-xl shadow-lg overflow-hidden transition-all">
      
      {/* Header */}
      <div className="px-4 py-2 border-b bg-gray-50 flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-600 uppercase">Smart Calc</span>
        <button onClick={clear} className="text-blue-600 text-xs hover:underline">Clear</button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-xs mb-1">Name (Optional)</label>
          <input
            type="text"
            value={calcName}
            onChange={(e) => setCalcName(e.target.value)}
            placeholder="e.g. Groceries"
            className="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-blue-300"
          />
        </div>

        {/* Expression */}
        <div className="flex flex-col relative">
          <label className="text-gray-500 text-xs mb-1">Expression</label>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setResult(null);
              setIsSaved(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 50 x 2 + 10"
            className="w-full p-3 border rounded focus:ring-1 focus:ring-blue-300 pr-16"
          />
          <button
            onClick={calculateAndSave}
            className="absolute right-2 top-12 -translate-y-1/2 bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            =
          </button>
        </div>

        {/* Result */}
        <div className="mt-4 p-4 border rounded bg-gray-50 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-400 text-xs">Result</p>
            <div className={`text-2xl font-semibold ${result === "Error" ? "text-red-500" : "text-gray-800"}`}>
              {result !== null ? result : "0"}
            </div>
          </div>
          {isSaved && <span className="text-green-600 text-sm font-medium animate-pulse">Saved ✓</span>}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 bg-gray-50 text-xs text-gray-400">
        Press Enter or "=" to calculate & save
      </div>
    </div>
  );
};

export default NotesCalculator;