const Task = ({ task }) => {
    return (
      <div
        className={`task ${task.priority === "high" ? "task-high" : "task-regular"}`}
      >
        {task.displayNumber}
      </div>
    );
  };
  export default Task;
  