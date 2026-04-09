function ProductivityScore({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;

  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold mb-3">Productivity</h2>
      <p className="text-3xl">{percent}%</p>
      <p>{done} of {total} tasks done</p>
    </div>
  );
}

export default ProductivityScore;