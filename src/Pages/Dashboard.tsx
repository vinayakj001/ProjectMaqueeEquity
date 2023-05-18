import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppStateContext } from "../App";
import "./Dashboard.css";

interface Task {
  name: string;
  subtasks: Subtask[];
}

interface Subtask {
  name: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const { setMyState } = useContext(AppStateContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newSubtaskName, setNewSubtaskName] = useState<string>("");
  const [newSubtasks, setNewSubtasks] = useState<Subtask[]>([]);

  const totalSubtaskCount = tasks.reduce(
    (count, task) => count + task.subtasks.length,
    0
  );

  const navigate = useNavigate();

  const Logout = () => {
    setMyState(false);
    navigate("/");
  };

  const openModal = () => {
    setShowModal(true);
    setNewTaskName("");
    setNewSubtaskName("");
    setNewSubtasks([]);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addSubtask = () => {
    if (newSubtaskName.trim() === "") {
      return;
    }

    const newSubtask: Subtask = {
      name: newSubtaskName,
      completed: false,
    };

    setNewSubtasks((prevSubtasks) => [...prevSubtasks, newSubtask]);
    setNewSubtaskName("");
  };

  const addTask = () => {
    if (newTaskName.trim() === "") {
      return;
    }

    const newTask: Task = {
      name: newTaskName,
      subtasks: newSubtasks,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    closeModal();
  };

  const toggleTaskCompletion = (taskIndex: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, index) => {
        if (index === taskIndex) {
          const updatedSubtasks = task.subtasks.map((subtask) => ({
            ...subtask,
            completed: !task.subtasks.every((subtask) => subtask.completed),
          }));
          return {
            ...task,
            subtasks: updatedSubtasks,
          };
        }
        return task;
      });
      return updatedTasks;
    });
  };

  const toggleSubtaskCompletion = (taskIndex: number, subtaskIndex: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, index) => {
        if (index === taskIndex) {
          const updatedSubtasks = task.subtasks.map((subtask, subindex) => {
            if (subindex === subtaskIndex) {
              return {
                ...subtask,
                completed: !subtask.completed,
              };
            }
            return subtask;
          });
          return {
            ...task,
            subtasks: updatedSubtasks,
          };
        }
        return task;
      });
      return updatedTasks;
    });
  };

  return (
    <div className="dashboard">
      <div className="mainWrapper">
        <h1 className="MainHeader">To-Do</h1>
        <div>
          <button onClick={openModal} className="addTask">
            + Add Task
          </button>
          <button onClick={Logout} className="Logout">
            Logout
          </button>
        </div>
      </div>
      <div className="parent">
        <div className="div1">
          <h3 className="CardHeaderDiv1">All Tasks</h3>
          {tasks.map((task, taskIndex) => (
            <div key={taskIndex}>
              <div className="TaskName">
                <input
                  type="checkbox"
                  checked={task.subtasks.every((subtask) => subtask.completed)}
                  onChange={() => toggleTaskCompletion(taskIndex)}
                />
                <div className="TaskName2">{task.name}</div>
              </div>
              <ul>
                {task.subtasks.map((subtask, subtaskIndex) => (
                  <div key={subtaskIndex} className="TaskNameSub">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() =>
                        toggleSubtaskCompletion(taskIndex, subtaskIndex)
                      }
                    />
                    <div className="TaskName3">{subtask.name}</div>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="div2">
          <h1 className="CardHeader">Number of Tasks</h1>
          <h1 className="CardNumber">{tasks.length}</h1>
        </div>

        <div className="div3">
          Incomplete tasks
          <div className="IncompleteTasksWrapper">
            {tasks.map((task, index) => {
              const incompleteSubtasks = task.subtasks.filter(
                (subtask) => !subtask.completed
              );

              if (incompleteSubtasks.length === 0) {
                return null;
              }

              return (
                <div key={index} className="IncompleteTasksIndividual">
                  <div>
                    <div className="TaskName">{task.name}</div>
                    <ul>
                      {incompleteSubtasks.map((subtask, subindex) => (
                        <li key={subindex}>{subtask.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="div4">
          <h1 className="CardHeader">Number of Sub-tasks</h1>
          <h1 className="CardNumber">{totalSubtaskCount}</h1>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Task</h2>
            <label>Task Name:</label>
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />

            <label>Subtasks:</label>

            <div>
              <input
                type="text"
                value={newSubtaskName}
                onChange={(e) => setNewSubtaskName(e.target.value)}
              />
              <button onClick={addSubtask}>+</button>
            </div>
            <ul>
              {newSubtasks.map((subtask, index) => (
                <li key={index}>{subtask.name}</li>
              ))}
            </ul>

            <button onClick={addTask}>Submit</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
