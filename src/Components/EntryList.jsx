import "bootstrap-icons/font/bootstrap-icons.css";

const EntryList = ({
  datas,
  toggleTaskType,
  handleChecked,
  setShowModal,
  setSelectedTask,
}) => {
  return (
    <div className="col-span-12 sm:col-span-6">
      <div className="grid place-items-center">
        <h2 className="text-xl font-semibold">Entry List</h2>
        <hr className="w-full border-gray-300 my-2" />
      </div>

      <div>
        <table className="table-auto w-full text-center border-collapse">
          <tbody>
            {datas.map((data, index) => {
              if (data.isGood) {
                return (
                  <tr
                    key={index}
                    className={`order-b border-gray-300 ${
                      data.isCompleted ? "line-through text-gray-500" : ""
                    }`}
                  >
                    <th scope="row" className="p-2">
                      <input
                        type="checkbox"
                        checked={data.isCompleted}
                        onChange={() => {
                          handleChecked(data._id);
                        }}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    </th>
                    <td className="p-2">{data.taskName}</td>
                    <td className="p-2">{data.time} hrs</td>
                    <td className="p-2 text-right space-x-2">
                      <button
                        type="button"
                        className="p-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                        onClick={() => {
                          setSelectedTask(data);
                          setShowModal(true);
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
                        onClick={() => {
                          console.log(1001, data._id);
                          return toggleTaskType(data._id);
                        }}
                      >
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntryList;
