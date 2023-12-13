import { FaTimes } from "react-icons/fa";

const Task = ({ task, onToggle }) => {
  return (
    <div
      className={`task ${
        task.status === "COMPLETED" ? "completed" : "inprogress"
      }`}
      onClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        <span>Status: {task.status}</span>
      </h3>
    </div>
  );
};

export default Task;
