import AttendanceCard from "./AttendanceCard";
import SubjectStats from "./SubjectStats";
import WeeklyStats from "./WeeklyStats";

function ClassStats({ tasks, setTasks, storageKey }) {
  return (
    <div className="space-y-8 mt-6">

     <div className="flex justify-between items-center gap-5">

      <SubjectStats tasks={tasks} />

      <WeeklyStats tasks={tasks} />
     </div>

      <AttendanceCard 
        tasks={tasks} 
        setTasks={setTasks} 
        storageKey={storageKey}
      />

    </div>
  );
}

export default ClassStats;