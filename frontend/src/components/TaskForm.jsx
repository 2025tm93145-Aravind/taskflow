import { useEffect, useState } from "react";

const initialState = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

const TaskForm = ({ onSubmit, submitting, editingTask, onCancelEdit }) => {
  const [form, setForm] = useState(editingTask || initialState);
  useEffect(() => {
    setForm(editingTask || initialState);
  }, [editingTask]);

  const isEditing = Boolean(editingTask?._id);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      dueDate: form.dueDate || null,
    });
    if (!isEditing) {
      setForm(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold">{isEditing ? "Edit Task" : "Create Task"}</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded border p-2" name="title" placeholder="Task title" value={form.title} onChange={handleChange} required />
        <input className="rounded border p-2" name="dueDate" type="date" value={form.dueDate?.slice?.(0, 10) || form.dueDate || ""} onChange={handleChange} />
        <select className="rounded border p-2" name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select className="rounded border p-2" name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <textarea className="mt-3 w-full rounded border p-2" name="description" rows="3" placeholder="Description" value={form.description} onChange={handleChange} />
      <div className="mt-3 flex gap-2">
        <button type="submit" disabled={submitting} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 disabled:opacity-60">
          {submitting ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancelEdit} className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-200">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
