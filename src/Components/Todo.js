import React, { useState, useEffect } from "react";

// Values from local Storage
const dataFromLS = () => {
  const data = localStorage.getItem("tasks");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const TODO = () => {
  // Main array of tasks
  const [tasks, setTasks] = useState(dataFromLS());

  // input collection
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // handleTasks
  const handleAddTask = (e) => {
    e.preventDefault();
    let task = {
      title,
      description,
      date,
      completed: false,
    };
    setTasks([...tasks, task]);
    setTitle("");
    setDescription("");
    setDate("");
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (i) => {
    const filteredTasks = tasks.filter((element, index) => {
      return index !== i;
    });
    setTasks(filteredTasks);
  };

  const handleCheck = (i) => {
    const updatedTasks = tasks.map((ele, index) => {
      if (index === i) {
        ele.completed = !ele.completed;
      }
      return ele;
    });

    setTasks(updatedTasks);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }
  const handleDate = (e) => {
    setDate(e.target.value)
  }

  return (
    <div className="img">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            {/* <div className="todoContainer">
          <div className="todo_adder my-3"> */}
            <form>
              <h2 className="subhead">To Do List</h2>
              <input
                className="text form-control"
                type="text"
                placeholder="Enter Your task"
                onChange={handleTitle}
                value={title}
              />

              <textarea
                className="text form-control mt-3"
                rows="3"
                placeholder="Description of task"
                onChange={handleDescription}
                value={description}
              />
              <div className="due my-3"><label>Due date:</label>
                <input
                  type="date"
                  className="date form-control"
                  onChange={handleDate}
                  value={date}
                /></div>
              <div className="button-dark mt-4">
                <button className="btn btn-success btn-add" onClick={handleAddTask}>
                  Add Task</button>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            {tasks.length > 0 && (
              <>
                <div className="list m-3">
                  <h2 className="my-task"> My Task List</h2>
                  {tasks.map((ele, i) => {
                    let date1 = new Date();
                    let datePassed;
                    let date2 = new Date(ele.date); date2.setDate(date2.getDate() + 1);
                    if (date1.getTime() < date2.getTime()) datePassed = false;
                    else if (date1.getTime() > date2.getTime()) datePassed = true;

                    return (
                      <div key={i}>
                        <div
                          className=" row list_box p-2 m-2 mt-4"
                          style={{
                            border:
                              datePassed === true && ele.completed === false
                                ? "2px solid yellow"
                                : "2px solid blueviolet",
                          }}
                        >
                          <div className="d-flex col-1 justify-content-center align-items-center mx-2">
                            <button className="check_box">
                              <input
                                type="checkbox"
                                checked={ele.completed}
                                onChange={() => handleCheck(i)}
                              />
                            </button>
                          </div>
                          <div className=" col-5 task_item">
                            <dt
                              style={{
                                textDecoration:
                                  ele.completed === true
                                    ? "line-through yellogreen"
                                    : "none",
                              }}
                            >
                              {" "}
                              {ele.title}
                            </dt>
                            <dl
                              style={{
                                textDecoration:
                                  ele.completed === true
                                    ? "line-through yellogreen"
                                    : "none",
                              }}
                            >
                              {ele.description}
                            </dl>
                            <p
                              style={{
                                textDecoration:
                                  ele.completed === true
                                    ? "line-through yellogreen"
                                    : "none",
                              }}
                            >
                              {ele.date}{" "}
                            </p>
                          </div>
                          <div className="delete mt-3">
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(i)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="alert"> {datePassed === true && ele.completed === false ? "Due date passed" : ""} </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {tasks.length < 1 && <div className="Notask"> No Tasks added yet</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TODO;