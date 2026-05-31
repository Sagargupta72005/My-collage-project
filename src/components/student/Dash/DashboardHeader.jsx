import StatCard from "./StatCard";

export default function DashboardHeader({
  stats,
}) {
  return (
    <div className="grid md:grid-cols-5 gap-4 ">
      <StatCard
        title="Tasks"
        value={stats.totalTasks}
      />

      <StatCard
        title="Completed"
        value={stats.completedTasks}
        color="text-green-400"
      />

      <StatCard
        title="Pending"
        value={stats.pendingTasks}
        color="text-orange-400"
      />

      <StatCard
        title="Notes"
        value={stats.totalNotes}
      />

      <StatCard
        title="Starred"
        value={stats.starredNotes}
        color="text-yellow-400"
      />
    </div>
  );
}