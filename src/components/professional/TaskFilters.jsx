function TaskFilters({ setFilter }) {
  return (
    <div className="flex gap-2 mb-4">
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("done")}>Done</button>
      <button onClick={() => setFilter("pending")}>Pending</button>
    </div>
  );
}

export default TaskFilters;