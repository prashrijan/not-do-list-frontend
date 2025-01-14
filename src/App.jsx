import "./App.css";

import InputBox from "./Components/InputBox";
import TotalTime from "./Components/TotalTime";
import EntryList from "./Components/EntryList";
import BadList from "./Components/BadList";
import { useEffect, useState } from "react";
import DeleteModal from "./Components/DeleteModal";
import axios from "axios";

function App() {
  let [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  // GET request
  const fetchTaskFromApi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/tasks");
      setTasks(response.data.task);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // POST request
  const storeInDb = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/tasks",
        data
      );

      console.log(response);
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
    } catch (error) {
      console.error("Error while adding task", error);
    }
  };

  useEffect(() => {
    fetchTaskFromApi();
  }, []);

  // PATCH request
  const toggleTaskType = async (id) => {
    try {
      const updatedTask = tasks.find((task) => task._id === id);
      const response = await axios.patch(
        `http://localhost:5000/api/v1/tasks/${id}`,
        {
          ...updatedTask,
          isGood: !updatedTask.isGood,
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response.data.task : task))
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/tasks/${id}`
    );

    if (response.statusText === "OK") {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } else {
      console.log("Error while deleting the data");
    }
  };

  // Get total time of the task
  const getTotalTime = (array) => {
    return array.reduce((total, item) => {
      return total + item.time;
    }, 0);
  };

  // Get Bad Task Time
  const getBadTaskTime = () => {
    let badTasks = tasks.filter((task) => !task.isGood);
    return getTotalTime(badTasks);
  };

  // Filter the task
  // const deleteTask = (id) => {
  //   setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  // };

  // Toggle isCompleted
  const handleChecked = async (id) => {
    const updatedTask = tasks.find((task) => task._id === id);
    const response = await axios.patch(
      `http://localhost:5000/api/v1/tasks/${id}`,
      {
        ...updatedTask,
        isCompleted: !updatedTask.isCompleted,
      }
    );
    if (response.status === 200) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response.data.task : task))
      );
    } else {
      console.log("Error while handle checking the data");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col w-full items-center gap-10 px-12 py-10 bg-gradient-to-t from-[#22C1C3] to-[#FDBB2D]">
        {/* title */}
        <div>
          <h1 className="text-4xl font-bold text-center">NOT TO DO LIST</h1>
        </div>
        {/* Input Box */}
        <InputBox setTasks={setTasks} storeInDb={storeInDb} />

        {showModal && (
          <DeleteModal
            setShowModal={setShowModal}
            deleteTask={deleteTask}
            selectedTask={selectedTask}
          />
        )}

        <div className="grid grid-cols-12 gap-4 w-full">
          <EntryList
            datas={tasks}
            toggleTaskType={toggleTaskType}
            deleteTask={deleteTask}
            handleChecked={handleChecked}
            setShowModal={setShowModal}
            setSelectedTask={setSelectedTask}
          />
          <BadList
            datas={tasks}
            setSelectedTask={setSelectedTask}
            toggleTaskType={toggleTaskType}
            getBadTaskTime={getBadTaskTime}
            deleteTask={deleteTask}
            handleChecked={handleChecked}
            setShowModal={setShowModal}
            setSelectedId={setSelectedTask}
          />
        </div>

        <TotalTime getTotalTime={getTotalTime} datas={tasks} />
      </div>
    </>
  );
}

export default App;
