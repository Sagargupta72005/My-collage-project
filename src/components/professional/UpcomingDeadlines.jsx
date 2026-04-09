import { daysLeft } from "../../utils/taskUtils";

function UpcomingDeadlines({ tasks }) {
  const upcoming = tasks
    .filter(t => t.dueDate && !t.done)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold mb-3">Upcoming</h2>
      {upcoming.map(t => (
        <div key={t.id} className="flex justify-between py-2">
          <span>{t.title}</span>
          <span>{daysLeft(t.dueDate)} days</span>
        </div>
      ))}
    </div>
  );
}

export default UpcomingDeadlines;