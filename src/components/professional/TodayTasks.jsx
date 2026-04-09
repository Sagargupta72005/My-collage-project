import { isToday } from "../../utils/taskUtils";

function TodayTasks({ tasks }) {
  const todayTasks = tasks.filter(t => t.dueDate && isToday(t.dueDate));

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold mb-3">Today’s Tasks</h2>
      {todayTasks.length === 0 ? (
        <p>No tasks today</p>
      ) : (
        todayTasks.map(t => (
          <div key={t.id} className="border-b py-2">
            {t.title}
          </div>
        ))
      )}
    </div>
  );
}

export default TodayTasks;