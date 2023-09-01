import { useState, useEffect } from "react";
import "./TaskForm.css";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  LuClipboardEdit,
  LuTrash2,
  LuCheckCircle,
  LuCircle,
} from "react-icons/lu";
import Navbar from "../NavBar/NavBar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const taskCollectionRef = collection(db, "tasks");
  const [searchQuery, setSearchQuery] = useState("");

  const createTask = async (event) => {
    event.preventDefault();
    const newTask = {
      title: newTitle,
      description: newDescription,
      createdDate: new Date().toISOString(),
      completed: false,
    };

    setTasks([newTask, ...tasks]);

    setTitle("");
    setDescription("");

    try {
      await addDoc(taskCollectionRef, newTask);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask(event);
    setTitle("");
    setDescription("");
  };

  function sortTasksByCompletion(tasks) {
    const completedTasks = tasks.filter((task) => task.completed);
    const incompleteTasks = tasks.filter((task) => !task.completed);
    return [...incompleteTasks, ...completedTasks];
  }

  return (
    <div className="App">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container column">
        <h1>Adding Task</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="title"
            type="text"
            placeholder="title"
            value={newTitle}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            className="description"
            type="text"
            placeholder="description"
            value={newDescription}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button className="add" type="submit">
            Add Task
          </button>
        </form>
      </div>

      <div className="time">
        <h4>All tasks you have:</h4>
        <h4>Completed Tasks:</h4>
      </div>

      {sortTasksByCompletion(tasks)
        .filter((task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((task) => (
          <section
            className={`task ${task.completed ? "completed-task" : ""}`}
            key={task.id}
          >
            <div className={task.completed ? "completed-task" : ""}>
              <div className="task-actions">
                <button>
                  {task.completed ? (
                    <LuCheckCircle className="yet" />
                  ) : (
                    <LuCircle className="done" />
                  )}
                </button>

                <div className="text">
                  <h4>Title: {task.title}</h4>
                  <p>Description: {task.description}</p>
                  <p className="createdate">
                    Created Date:{" "}
                    {task.createdDate
                      ? new Date(task.createdDate).toLocaleString()
                      : "Not available"}
                  </p>
                </div>
              </div>
            </div>

            <div className="task-actions">
              <button>
                <LuClipboardEdit className="edit" />
              </button>
              <button>
                <LuTrash2 className="delete" />
              </button>
            </div>
          </section>
        ))}
    </div>
  );
}

export default App;
