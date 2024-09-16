import Task from './Task';


const Grid = ({ tasks }) => {
  return (
    <div className="grid">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Grid;
