import React, { useEffect, useState } from "react";

const InputBox = ({ storeInDb }) => {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");

  const handleClick = () => {
    if ((!time && !task) || !time || !task) {
      alert("Please fill out both field");
      return;
    }

    const newTask = {
      taskName: task,
      time: parseInt(time),
      isGood: true,
      isCompleted: false,
    };

    storeInDb(newTask);

    setTask("");
    setTime("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    } else {
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      handleKeyDown;
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 p-10 border rounded-lg shadow-lg sm:grid-cols-12 w-full md:w-3/4">
      <p className="text-red-500 hidden" id="error-msg">
        Please enter a task..
      </p>
      <div className="col-span-12 sm:col-span-7">
        <input
          type="text"
          className="w-full p-2 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="col-span-12 sm:col-span-2">
        <input
          type="number"
          className="w-full p-2 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="hours"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div className="col-span-12 sm:col-span-3">
        <button
          type="button"
          className="w-full p-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-300 focus:outline-none"
          id="button"
          onClick={handleClick}
        >
          Add task
        </button>
      </div>
    </div>
  );
};

export default InputBox;
