function ActivityFeed({ tasks }) {
  const recent = [...tasks].slice(-5).reverse();

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold mb-3">Recent Activity</h2>
      {recent.map(t => (
        <div key={t.id}>{t.title}</div>
      ))}
    </div>
  );
}

export default ActivityFeed;