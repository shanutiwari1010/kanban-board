import React from "react";

const Column = ({ list, handleDragOver, handleDrop }) => {
  return (
    <div
      className="kanban-column"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, list.listName)}
    >
      <h2>{list.listName}</h2>
      <div className="kanban-column-list">
        {list.listItems.map((task) => (
          <div
            key={task.id}
            className="kanban-task"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("taskId", task.id);
              e.dataTransfer.setData("taskTitle", task.taskTitle);
            }}
          >
            <h4>{task.taskTitle}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
