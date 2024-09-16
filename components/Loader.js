import { useState,useEffect } from "react";
const Loader = ({ task, onComplete, isActive }) => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      if (!isActive) return; 
  
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev + 10 >= 100) {
            clearInterval(interval);
            onComplete(task.id); 
            return 100;
          }
          return prev + 10;
        });
      }, task.duration / 10);
  
      return () => clearInterval(interval);
    }, [task, onComplete, isActive]);
  
    return (
      <div
        className="loader"
        style={{
          width: `${progress}%`,
        }}
      />
    );
  };
  export default Loader;
  