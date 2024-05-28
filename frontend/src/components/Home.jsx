import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import { BsCircleFill, BsFillTrashFill, BsCheckCircle } from "react-icons/bs"; // Make sure to install react-icons

function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTodos(result.data))
        .catch((err) => {
            console.log(err);
      });
  }, []);

  const handleEdit = (id) => {
    axios.put('http://localhost:5000/update/'+id)
      .then((result) => location.reload()) 
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDelete = (id) => { 
    axios.delete('http://localhost:5000/delete/' + id)
      .then(result => location.reload())
    .catch(err => console.log(err))
  }

  return (
    <div className="home">
      <h2>To-Do List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Task</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo.id || todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ?
                <BsCheckCircle className="icon" ></BsCheckCircle>
                : <BsCircleFill className="icon" />
              }
              <p className={todo.done ? "line_through" : ""}>{todo.task || "No task description"}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)}/>
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
