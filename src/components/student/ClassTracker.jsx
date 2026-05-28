function ClassTracker({ tasks = [] }) {
  const classTasks = tasks.filter((task) => task.type === "class");

  
  
  return (
    <div className="space-y-3">
      {classTasks.length > 0 ? (
        classTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-300">{task.description}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No class tasks available.</p>
      )}
    </div>
  );
}

export default ClassTracker;