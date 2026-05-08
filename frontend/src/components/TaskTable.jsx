const TaskTable = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Due Date</th>
            <th className="p-3">Owner</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-t">
              <td className="p-3">
                <div className="font-medium">{task.title}</div>
                <div className="text-xs text-gray-500">{task.description}</div>
              </td>
              <td className="p-3">{task.status}</td>
              <td className="p-3">{task.priority}</td>
              <td className="p-3">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</td>
              <td className="p-3">{task.createdBy?.name || "-"}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button type="button" onClick={() => onEdit(task)} className="rounded bg-amber-500 px-2 py-1 text-white">
                    Edit
                  </button>
                  <button type="button" onClick={() => onDelete(task._id)} className="rounded bg-red-600 px-2 py-1 text-white">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {!tasks.length && (
            <tr>
              <td className="p-4 text-center text-gray-500" colSpan="6">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
