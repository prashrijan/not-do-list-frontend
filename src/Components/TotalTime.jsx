import React from "react";

const TotalTime = ({ getTotalTime, datas }) => {
  return (
    <div
      className="p-4 text-md text-gray-800 rounded-lg bg-gray-50 w-full"
      role="alert"
    >
      <span className="font-medium">
        Total Time Allocated: {getTotalTime(datas) || 0} hours
      </span>
    </div>
  );
};

export default TotalTime;
