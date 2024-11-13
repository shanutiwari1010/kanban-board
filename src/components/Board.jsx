import React, { useState, useEffect } from "react";
import Column from "./Column";

const initialData = [
  { listName: "To Do", listItems: [] },
  { listName: "In Progress", listItems: [] },
  { listName: "Done", listItems: [] },
];

const loadData = () => {
  const storedData = localStorage.getItem("kanbanData");
  return storedData ? JSON.parse(storedData) : initialData;
};

const Board = () => {
  const [boardData, setBoardData] = useState(loadData());
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("kanbanData", JSON.stringify(boardData));
  }, [boardData]);

  const handleCreateTask = () => {
    if (newTask.trim() === "") return;

    const updatedBoardData = boardData.map((list) =>
      list.listName === "To Do"
        ? {
            ...list,
            listItems: [
              ...list.listItems,
              {
                id: Date.now(),
                taskTitle: newTask,
              },
            ],
          }
        : list
    );

    setBoardData(updatedBoardData);
    setNewTask("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetListName) => {
    const taskId = e.dataTransfer.getData("taskId");
    const taskTitle = e.dataTransfer.getData("taskTitle");

    const updatedBoardData = boardData.map((list) => {
      if (list.listName === targetListName) {
        return {
          ...list,
          listItems: [
            ...list.listItems,
            {
              id: taskId,
              taskTitle: taskTitle,
            },
          ],
        };
      } else {
        return {
          ...list,
          listItems: list.listItems.filter((task) => task.id !== taskId),
        };
      }
    });

    setBoardData(updatedBoardData);
  };

  return (
    <div className="kanban-board">
      <h1>Kanban Board</h1>

      <div className="task-form">
        <input
          type="text"
          placeholder="Enter task title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>

      <div className="kanban-columns">
        {boardData.map((list, index) => (
          <Column
            key={index}
            list={list}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
