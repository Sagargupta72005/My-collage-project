function GoalTracker({ tasks }) {
  const weeklyGoal = 10;
  const completed = tasks.filter(t => t.done).length;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold mb-3">Weekly Goal</h2>
      <p>{completed} / {weeklyGoal}</p>
      <div className="w-full bg-gray-200 h-2 mt-2">
        <div
          className="bg-green-500 h-2"
          style={{ width: `${(completed / weeklyGoal) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default GoalTracker;