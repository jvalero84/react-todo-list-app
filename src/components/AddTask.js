import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = (e) => {
    e.preventDefault(); // To prevent submiting to a page.

    if (!text) {
      alert("Please add a TODO");
      return;
    }

    onAdd({ text, status });

    setText("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="Add Todo" className="btn btn-block" />
      </div>
      {/* <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div> */}
      {/* <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div> */}
      {/* <div className="form-control">
        <input type="submit" value="Save Task" className="btn btn-block" />
      </div> */}
    </form>
  );
};

export default AddTask;
