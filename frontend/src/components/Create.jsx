import React, { useState } from "react";
import axios from "axios";
function Create() {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim()) {
      axios
        .post("http://localhost:5000/add", { task: task })
        .then((result) => location.reload())
        .catch((err) => console.log(err));
    } else {
      console.log("Task is empty");
    }
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
          }
        }}
      />
      <button type="button" onClick={handleAdd}>
        Add Task
      </button>
    </div>
  );
}

export default Create;
