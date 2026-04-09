function StatsCards({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const pending = total - completed;
  const highPriority = tasks.filter(t => t.priority === "high").length;

  const stats = [
    { label: "Total Tasks", value: total },
    { label: "Completed", value: completed },
    { label: "Pending", value: pending },
    { label: "High Priority", value: highPriority },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-white px-7 py-8 rounded-lg shadow">
          <h3 className="text-gray-500 text-md">{s.label}</h3>
          <p className="text-2xl font-bold">{s.value}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;