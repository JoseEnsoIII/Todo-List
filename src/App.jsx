import { useState } from "react";
import "./App.css";

export default function Widget() {
  // State to control the visibility of the popup
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set()); // Track selected tasks

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask(""); // Reset input field
      setIsPopupVisible(false); // Close popup after adding
    }
  };

  // Function to toggle task selection
  const toggleTaskSelection = (taskToToggle) => {
    setSelectedTasks((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(taskToToggle)) {
        newSelected.delete(taskToToggle);
      } else {
        newSelected.add(taskToToggle);
      }
      return newSelected;
    });
  };

  // Function to remove selected tasks
  const handleRemoveSelectedTasks = () => {
    setTasks(tasks.filter((task) => !selectedTasks.has(task)));
    setSelectedTasks(new Set()); // Reset selection after removal
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-black">
      <div
        className="w-full max-w-md p-6 rounded-lg shadow-lg flex flex-col justify-between bg-white"
        style={{
          borderRadius: "5%",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <h1 className="text-black text-center mb-4" style={{ color: "black" }}>
          Todo List
        </h1>

        {/* Table to display tasks */}
        <table
          className="w-full mb-4 border-collapse"
          style={{ marginTop: "-10%" }}
        >
          <thead>
            <tr>
              <th className="text-left text-black" style={{ color: "black" }}>
                Task:
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((taskItem, index) => (
              <tr
                key={index}
                className="border-b border-gray-300" // Keep the border class
              >
                <td
                  className="flex items-center p-2" // Use padding for consistent spacing
                  style={{ color: "black" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedTasks.has(taskItem)}
                    onChange={() => toggleTaskSelection(taskItem)}
                    className="mr-2" // Optional: Adds some space between the checkbox and the text
                  />
                  <span className="text-black">{taskItem}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Button to add and remove tasks */}
        <div className="flex flex-col gap-4">
          <button
            className="bg-primary text-black px-4 py-2 rounded hover:bg-primary/80"
            onClick={() => setIsPopupVisible(true)} // Show popup when clicking "Add Task"
          >
            Add Task
          </button>
          <button
            className="bg-destructive text-black px-4 py-2 rounded hover:bg-destructive/80"
            onClick={handleRemoveSelectedTasks} // Remove selected tasks
          >
            Remove Task
          </button>
        </div>
      </div>

      {/* Popup for adding task */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-black mb-4">Add New Task</h2>
            <label className="text-black mb-2 block">Task:</label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)} // Update task value
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your task"
            />
            <div className="flex justify-between">
              <button
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
                onClick={handleAddTask} // Add the task to the list
              >
                Add
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => setIsPopupVisible(false)} // Close popup without adding
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
