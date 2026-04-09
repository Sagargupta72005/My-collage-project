function NotesList({ notes, deleteNote }) {
  if (notes.length === 0) {
    return <p className="text-sm text-gray-400">No notes yet</p>;
  }

  return (
    <div className="space-y-3">
      {notes.map((n) => (
        <div
          key={n.id}
          className="p-3 border rounded flex justify-between"
        >
          <div>
            <h3 className="font-semibold">{n.subject}</h3>
            <p className="text-sm text-gray-600">{n.content}</p>
          </div>

          <button
            onClick={() => deleteNote(n.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotesList;