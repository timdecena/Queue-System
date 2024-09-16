import Task from './Task';
import Loader from './Loader';

const Queue = ({ title, tasks, getTopTask, removeTask }) => {
  return (
    <div className="queue-container">
      <h2>{title}</h2>
      <div className={`queue ${title === "High Priority Queue" ? "high-priority-queue" : "regular-queue"}`}>
        {tasks.map((task) => (
          <div key={task.id} className="queue-task">
            <Task task={task} />
            <Loader task={task} onComplete={() => removeTask(task.id)} isActive={task === getTopTask(tasks)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queue;
