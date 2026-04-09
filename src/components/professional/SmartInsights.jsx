function SmartInsights({ tasks }) {
  const overdue = tasks.filter(t => !t.done && new Date(t.dueDate) < new Date()).length;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold mb-3">Insights</h2>
      <p>You have {overdue} overdue tasks</p>
    </div>
  );
}

export default SmartInsights;