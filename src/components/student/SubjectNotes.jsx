import { useState, useEffect } from "react";
import AddNote from "./AddNote";
import NotesList from "./NotesList";

function SubjectNotes() {
  const storageKey = "Subject_Notes";

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now() }]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">📚 Subject Notes</h2>

      <AddNote addNote={addNote} />
      <NotesList notes={notes} deleteNote={deleteNote} />
    </div>
  );
}

export default SubjectNotes;