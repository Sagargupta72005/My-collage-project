import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function WeeklyChart({ tasks }) {

  // 👉 Get last 7 days
  const getLast7Days = () => {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);

      const label = d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });

      days.push({
        date: label,
        fullDate: d.toDateString(),
        completed: 6,
      });
    }

    return days;
  };

  const weeklyData = getLast7Days();

  // 👉 Map tasks into those 7 days
  tasks.forEach((t) => {
    if (!t.dueDate || !t.completed) return;

    const taskDate = new Date(t.dueDate).toDateString();

    const day = weeklyData.find((d) => d.fullDate === taskDate);

    if (day) {
      day.completed += 1;
    }
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Weekly Progress
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="completed"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyChart;