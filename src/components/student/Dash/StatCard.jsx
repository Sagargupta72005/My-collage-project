export default function StatCard({
  title,
  value,
  color = "",
}) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl  p-5 border border-white/10">
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h2
        className={`text-3xl font-bold mt-2 ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}