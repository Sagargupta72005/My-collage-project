import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeeklyChart({ tasks = [] }) {

  const getLast7Days = () => {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);

      days.push({
        date: d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }),
        fullDate: d.toDateString(),
        completed: 0,
      });
    }

    return days;
  };

  const weeklyData = getLast7Days();

  tasks.forEach((t) => {
    if (!t.dueDate || !t.completed) return;

    const taskDate = new Date(t.dueDate).toDateString();
    const day = weeklyData.find((d) => d.fullDate === taskDate);

    if (day) day.completed += 1;
  });

  return (
    <div className="p-5 rounded-2xl shadow-lg mt-6 text-white bg-(--secondary-gradient) ">
      
      <h2 className="mb-4 font-semibold text-lg">
        Weekly Progress
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={weeklyData}>

          <XAxis 
            dataKey="date" 
            stroke="#d1d5db" 
          />

          <YAxis 
            allowDecimals={true} 
            stroke="#d1d5db" 
          />

          <Tooltip
            contentStyle={{
              background: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          <Bar
            dataKey="completed"
            fill="orange"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyChart;