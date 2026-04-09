import { useState, useEffect } from "react";

function NotesSection() {
  const role = localStorage.getItem("role") || "user";
  const storageKey = `notes_library_${role}`;

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [currentNote, setCurrentNote] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [aiOutput, setAiOutput] = useState("");

  // Load notes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch {
        setNotes([]);
      }
    }
  }, [storageKey]);

  // Save notes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(notes));
  }, [notes, storageKey]);

  const handleSaveNote = () => {
    if (!currentNote.trim()) return;

    if (activeId) {
      setNotes(notes.map(n =>
        n.id === activeId
          ? { ...n, text: currentNote, title }
          : n
      ));
    } else {
      const newNote = {
        id: Date.now(),
        title: title || "Untitled Note",
        text: currentNote,
        createdAt: new Date().toLocaleString()
      };
      setNotes([newNote, ...notes]);
    }

    setCurrentNote("");
    setTitle("");
    setActiveId(null);
    setAiOutput("");
  };

  const handleEditNote = (note) => {
    setTitle(note.title || "");
    setCurrentNote(note.text);
    setActiveId(note.id);
    setAiOutput("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Delete this note?")) {
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  // 🤖 Fake AI
  const handleSummarize = () => {
    if (!currentNote) return;
    const summary = currentNote.split(".").slice(0, 2).join(".") + "...";
    setAiOutput("Summary: " + summary);
  };

  const handleImprove = () => {
    if (!currentNote) return;
    const improved = currentNote
      .replace(/\bi\b/g, "I")
      .replace(/\bim\b/g, "I'm")
      .replace(/\bdont\b/g, "don't");

    setAiOutput("Improved: " + improved);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">

      {/* Header */}
      <h2 className="text-lg font-semibold text-slate-700 mb-4">
       Notes 
      </h2>

      {/* Editor */}
      <div className="mb-6">

        {/* ✅ Title Input */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          className="w-full mb-2 p-2 border border-slate-300 rounded-lg"
        />

        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Write a new note..."
          className="w-full h-32 p-3 border border-slate-300 rounded-lg resize-none 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* AI Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSummarize}
            className="px-2 py-1 text-xs bg-purple-500 text-white rounded"
          >
            Summarize
          </button>

          <button
            onClick={handleImprove}
            className="px-2 py-1 text-xs bg-green-500 text-white rounded"
          >
            Improve
          </button>
        </div>

        {/* AI Output */}
        {aiOutput && (
          <div className="mt-3 p-2 bg-white border rounded text-sm text-slate-600">
            {aiOutput}
          </div>
        )}

        <div className="flex justify-between mt-2">
          <span className="text-xs text-slate-400">
            {currentNote.length} characters
          </span>

          <button
            onClick={handleSaveNote}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
          >
            {activeId ? "Update" : "Save Note"}
          </button>
        </div>
      </div>

      {/* Library */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 mb-2">
          Saved Notes
        </h3>

        {notes.length === 0 && (
          <p className="text-xs text-slate-400 italic">
            No notes saved yet.
          </p>
        )}

        <div className="grid gap-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-3 border rounded-lg bg-white hover:shadow-sm transition"
            >
              {/* ✅ Title Display */}
              <h4 className="font-semibold text-slate-800 text-sm">
                {note.title}
              </h4>

              <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                {note.text}
              </p>

              <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                <span>{note.createdAt}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditNote(note)}
                    className="hover:text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default NotesSection;