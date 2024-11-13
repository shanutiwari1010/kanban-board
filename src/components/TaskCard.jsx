export const TaskCard = ({ task }) => {
  return (
    <div className="task-card" draggable>
      <h3>{task?.taskTitle}</h3>
    </div>
  );
};
