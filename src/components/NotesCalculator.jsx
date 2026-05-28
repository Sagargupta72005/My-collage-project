import React, { useState, useCallback, useRef } from "react";

const NotesCalculator = ({ onSaveResult }) => {
  const [calcName, setCalcName] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // SAVE LIST
  const [savedResults, setSavedResults] = useState([]);

  const inputRef = useRef(null);

  const calculateAndSave = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    try {
      if (!/^[0-9+\-*/().x\s]+$/i.test(trimmedInput)) {
        throw new Error("Invalid characters");
      }

      const safeInput = trimmedInput.replace(/x/gi, "*");

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

      // SAVE TO LIST
      const newItem = {
        id: Date.now(),
        text: finalText,
        time: new Date().toLocaleTimeString(),
      };

      setSavedResults((prev) => [newItem, ...prev]);

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
    if (e.key === "Enter") {
      calculateAndSave();
    }
  };

  const clear = () => {
    setCalcName("");
    setInput("");
    setResult(null);
    setIsSaved(false);

    inputRef.current?.focus();
  };

  // DELETE ITEM
  const deleteItem = (id) => {
    setSavedResults((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto border rounded-xl shadow-lg overflow-hidden transition-all">

      {/* Header */}
      <div className="px-4 py-2 border-b flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-900 uppercase">
          Smart Calc
        </span>

        <button
          onClick={clear}
          className="text-red-950 text-xs hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">

        {/* Name */}
        <div className="flex flex-col text-(--text)">
          <label className="text-gray-800 text-xs mb-1">
            Name (Optional)
          </label>

          <input
            type="text"
            value={calcName}
            onChange={(e) => setCalcName(e.target.value)}
            placeholder="e.g. bills"
            className="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-blue-300"
          />
        </div>

        {/* Expression */}
        <div className="flex flex-col relative text-(--text)">
          <label className="text-xs mb-1">
            Expression
          </label>

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
            className="absolute right-2 top-11 -translate-y-1/2 bg-blue-500 text-(--text) px-5 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            =
          </button>
        </div>

        {/* Result */}
        <div className="mt-4 p-4 border rounded flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-900 text-xs">
              Result
            </p>

            <div
              className={`text-2xl font-semibold ${
                result === "Error"
                  ? "text-red-500"
                  : "text-gray-900"
              }`}
            >
              {result !== null ? result : "0"}
            </div>
          </div>

          {isSaved && (
            <span className="text-green-600 text-sm font-medium animate-pulse">
              Saved ✓
            </span>
          )}
        </div>

        {/* SAVE LIST */}
        <div className="border rounded-lg p-3">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold">
              Saved Calculations
            </h2>

            <span className="text-xs text-gray-500">
              {savedResults.length} items
            </span>
          </div>

          {savedResults.length === 0 ? (
            <p className="text-sm text-gray-400">
              No saved calculations
            </p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {savedResults.map((item) => (
                <div
                  key={item.id}
                  className="border rounded p-2 flex justify-between items-start"
                >
                  <div>
                    <p className="text-sm break-words">
                      {item.text}
                    </p>

                    <span className="text-xs text-gray-500">
                      {item.time}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 text-xs text-gray-900">
        Press Enter or "=" to calculate & save
      </div>
    </div>
  );
};

export default NotesCalculator;