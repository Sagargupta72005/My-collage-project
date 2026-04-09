import { useState } from "react";

function AddNote({ addNote }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = () => {
    if (!subject || !content) return;

    addNote({ subject, content });
    setSubject("");
    setContent("");
  };

  return (
    <div className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Write notes..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Note
      </button>
    </div>
  );
}

export default AddNote;