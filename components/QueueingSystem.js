import { useState } from "react";
import Task from "./Task"
import Loader from "./Loader"

const QueueingSystem = () => {
  const [gridTasks, setGridTasks] = useState([]);
  const [highPriorityQueue, setHighPriorityQueue] = useState([]);
  const [regularQueue1, setRegularQueue1] = useState([]);
  const [regularQueue2, setRegularQueue2] = useState([]);
  const [regularQueue3, setRegularQueue3] = useState([]);
  const [regularQueueIndex, setRegularQueueIndex] = useState(0);

  const addRandomTask = () => {
    const duration = Math.floor(Math.random() * 4000) + 1000;
    const priority = Math.random() < 0.25 ? "high" : "regular";
    const displayNumber = Math.floor(Math.random() * 100);
    const task = { id: Date.now(), duration, priority, displayNumber, admitted: false };

    if (gridTasks.length < 64) setGridTasks([...gridTasks, task]);
  };

  const admitOneTask = () => {
    const taskIndex = gridTasks.findIndex((task) => !task.admitted);
    if (taskIndex === -1) return;

    const task = gridTasks[taskIndex];

    if (task.priority === "high") {
      setHighPriorityQueue((prev) => [...prev, { ...task, admitted: true }]);
    } else {
      if (regularQueueIndex === 0) {
        setRegularQueue1((prev) => [...prev, { ...task, admitted: true }]);
        setRegularQueueIndex(1);
      } else if (regularQueueIndex === 1) {
        setRegularQueue2((prev) => [...prev, { ...task, admitted: true }]);
        setRegularQueueIndex(2);
      } else {
        setRegularQueue3((prev) => [...prev, { ...task, admitted: true }]);
        setRegularQueueIndex(0);
      }
    }

    setGridTasks((prev) => prev.filter((_, i) => i !== taskIndex));
  };

  const removeTask = (taskId) => {
    setHighPriorityQueue((prev) => prev.filter((task) => task.id !== taskId));
    setRegularQueue1((prev) => prev.filter((task) => task.id !== taskId));
    setRegularQueue2((prev) => prev.filter((task) => task.id !== taskId));
    setRegularQueue3((prev) => prev.filter((task) => task.id !== taskId));
  };

  const getTopTask = (queue) => queue[0] || null;

   return (
    <div className="queueing-system">
      <h1>Land Transportation Office Queueing System</h1>
      <button onClick={addRandomTask}>Add Customer Priority Number</button>
      <button onClick={admitOneTask}>Admit One Customer</button>

      {/* 8x8 Grid for displaying tasks */}
      <div className="grid">
        {gridTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      {/* Queues Section */}
      <div className="queues">
        <div>
          <h2>High Priority PWD Queue</h2>
          <div className="queue-box high-priority">
            {highPriorityQueue.map((task) => (
              <div key={task.id}>
                <Task task={task} />
                <Loader
                  task={task}
                  onComplete={() => removeTask(task.id)}
                  isActive={task === getTopTask(highPriorityQueue)}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Regular Queue 1</h2>
          <div className="queue-box">
            {regularQueue1.map((task) => (
              <div key={task.id}>
                <Task task={task} />
                <Loader
                  task={task}
                  onComplete={() => removeTask(task.id)}
                  isActive={task === getTopTask(regularQueue1)}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Regular Queue 2</h2>
          <div className="queue-box">
            {regularQueue2.map((task) => (
              <div key={task.id}>
                <Task task={task} />
                <Loader
                  task={task}
                  onComplete={() => removeTask(task.id)}
                  isActive={task === getTopTask(regularQueue2)}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Regular Queue 3</h2>
          <div className="queue-box">
            {regularQueue3.map((task) => (
              <div key={task.id}>
                <Task task={task} />
                <Loader
                  task={task}
                  onComplete={() => removeTask(task.id)}
                  isActive={task === getTopTask(regularQueue3)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default QueueingSystem;
