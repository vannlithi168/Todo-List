import "./TaskForm.css";
import { useState } from "react";
import Navbar from "../NavBar/NavBar";
import { LuClipboardEdit, LuTrash2 } from "react-icons/lu";

function App() {
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");

  return (
    <main className="App">
      <Navbar />
      <div className="container column">
        <h1>Adding Task</h1>
        <form>
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
      <div>
        <div>
          <div className="task-actions">
            <div className="text">
              <h4>Title: </h4>
              <p>Description: </p>
              <p className="createdate">Created Date:</p>
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
      </div>
    </main>
  );
}

export default App;
