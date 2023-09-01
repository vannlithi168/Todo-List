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
  const [editId, setEditId] = useState(null);
  const taskCollectionRef = collection(db, "tasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

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
      await addDoc(taskCollectionRef, newTask); // Add the task to the database
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

  const populateEditForm = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const cancelEdit = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
  };

  const toggleTaskCompletion = async (taskId, isCompleted) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !isCompleted };
        }
        return task;
      })
    );
  };

  function sortTasksByCompletion(tasks) {
    const completedTasks = tasks.filter((task) => task.completed);
    const incompleteTasks = tasks.filter((task) => !task.completed);
    return [...incompleteTasks, ...completedTasks];
  }

  const updateTask = async () => {
    if (!editId) {
      return;
    }

    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editId) {
          return {
            ...task,
            title: newTitle,
            description: newDescription,
          };
        }
        return task;
      });

      setTasks(updatedTasks);

      setEditId(null);
      setTitle("");
      setDescription("");

      const taskDocRef = doc(db, "tasks", editId);

      await updateDoc(taskDocRef, {
        title: newTitle,
        description: newDescription,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      // Update the component state by removing the task with the given id
      setTasks(tasks.filter((task) => task.id !== id));

      // Delete the task document from Firestore
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(taskCollectionRef);
      const fetchedTasks = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sortedTasks = sortTasksByCompletion(fetchedTasks);
      setTasks(sortedTasks);
    };
    console.log(tasks);

    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="App">
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
        <h4>
          All tasks you have:{" "}
          <span className="num">
            {tasks.filter((task) => !task.completed).length}
          </span>
        </h4>
        <h4 className="date">{currentDate.toLocaleString()}</h4>
        <h4>
          Completed Tasks:{" "}
          <span className="num">
            {tasks.filter((task) => task.completed).length}
          </span>
        </h4>
      </div>

      {/* Display tasks */}
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
                <button
                  onClick={() => toggleTaskCompletion(task.id, task.completed)}
                >
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
            {editId === task.id ? (
              <div className="edit-form">
                <button className="save" onClick={() => updateTask(task.id)}>
                  Save
                </button>
                <button className="cancel" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="task-actions">
                <button onClick={() => populateEditForm(task)}>
                  <LuClipboardEdit className="edit" />
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  <LuTrash2 className="delete" />
                </button>
              </div>
            )}
          </section>
        ))}
    </main>
  );
}

export default App;
