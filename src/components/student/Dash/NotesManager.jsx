import { Pencil, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

export default function NotesManager({
  notes,
  setNotes,
  searchQuery = "",
}) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  /* ================= DEMO DATA ================= */
  const demoNotes = [
    {
      id: crypto.randomUUID(),
      title: "Math Formula Sheet",
      content: "a² + b² = c² (Pythagoras theorem)",
      starred: true,
      status: "active",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: "Physics Concepts",
      content: "Newton's Laws of Motion + examples",
      starred: false,
      status: "active",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: "Chemistry Revision",
      content: "Periodic Table trends & valency rules",
      starred: false,
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];

  const loadDemoNotes = () => {
    setNotes(demoNotes);
  };

  /* ================= FILTER ================= */
  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase();

    return notes.filter((note) => {
      const title = note.title?.toLowerCase() || "";
      const content = note.content?.toLowerCase() || "";

      return title.includes(q) || content.includes(q);
    });
  }, [notes, searchQuery]);

  /* ================= SAVE ================= */
  const saveNote = () => {
    if (!form.title.trim() || !form.content.trim()) return;

    if (editingId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingId
            ? {
                ...n,
                title: form.title.trim(),
                content: form.content.trim(),
              }
            : n
        )
      );
      setEditingId(null);
    } else {
      setNotes((prev) => [
        {
          id: crypto.randomUUID(),
          title: form.title.trim(),
          content: form.content.trim(),
          starred: false,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    setForm({ title: "", content: "" });
  };

  /* ================= ACTIONS ================= */
  const removeNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const toggleStar = (id) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, starred: !n.starred } : n
      )
    );
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Notes
        </h2>

        <button
          onClick={loadDemoNotes}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Load Demo Data
        </button>
      </div>

      {/* FORM */}
      <div className="grid gap-4">
        <input
          placeholder="Note title"
          value={form.title}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              title: e.target.value,
            }))
          }
          className="bg-white/10 shadow rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-300"
        />

        <textarea
          rows={5}
          placeholder="Write note..."
          value={form.content}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              content: e.target.value,
            }))
          }
          className="bg-white/10 shadow rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-300 resize-none"
        />

        <button
          onClick={saveNote}
          className="bg-orange-300 text-black font-semibold rounded-xl py-3 hover:opacity-90 transition"
        >
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* NOTES GRID */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 hover:bg-white/10 transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">
                  {note.title}
                </h3>

                <button
                  onClick={() => removeNote(note.id)}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                  title="Delete note"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* CONTENT */}
              <p className="text-sm text-gray-300">
                {note.content}
              </p>

              {/* ACTIONS */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => toggleStar(note.id)}
                  className={`p-2 rounded-lg transition ${
                    note.starred
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-white/10 text-gray-400 hover:bg-white/20"
                  }`}
                >
                  <Star
                    size={18}
                    fill={
                      note.starred
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

                <button
                  onClick={() => {
                    setEditingId(note.id);
                    setForm({
                      title: note.title,
                      content: note.content,
                    });
                  }}
                  className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                >
                  <Pencil size={18} />
                </button>

                <div className="ml-auto text-xs text-gray-400">
                  {note.starred ? "Starred" : ""}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-400 border border-dashed border-white/10 rounded-2xl">
            No notes found
          </div>
        )}
      </div>
    </div>
  );
}