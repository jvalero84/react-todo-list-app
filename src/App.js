import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import RemoveTasks from "./components/RemoveTasks";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  // Fetch Tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...task, status: "IN PROGRESS" }),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  // Delete Task

  const deleteTasks = async () => {
    setTasks(tasks.filter((task) => task.status !== "COMPLETED"));

    //TODO: DELETE the tasks on the backend...
    //await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
  };

  // Toggle Status

  const toggleStatus = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {
      ...taskToToggle,
      status: taskToToggle.status === "COMPLETED" ? "IN PROGRESS" : "COMPLETED",
    };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    // After performing the update on the backend, lets do it on the UI state.
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: data.status } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        onAdd={() => {
          setShowAddTask(!showAddTask);
        }}
        showAdd={showAddTask}
      />

      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onToggle={toggleStatus} />
      ) : (
        "No tasks to show.."
      )}

      <RemoveTasks onDelete={deleteTasks} />
    </div>
  );
}

export default App;
