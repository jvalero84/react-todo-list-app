import Button from "./Button";
const RemoveTasks = ({ onDelete }) => {
  return (
    <div className="footer">
      <Button onClick={onDelete} text="Remove Completed" />
    </div>
  );
};

export default RemoveTasks;
