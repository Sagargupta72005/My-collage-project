import { useState } from "react";

function QuickAddTask({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title) return;
    onAdd({
      id: Date.now(),
      title,
      done: false,
      dueDate: null,
    });
    setTitle("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 flex-1"
        placeholder="Add task..."
      />
      <button onClick={handleAdd} className="bg-blue-500 text-white px-4">
        Add
      </button>
    </div>
  );
}

export default QuickAddTask;