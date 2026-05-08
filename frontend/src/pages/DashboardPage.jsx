import { useEffect, useState } from "react";
import api from "../api/client";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ search: "", status: "", priority: "" });
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams();
      if (filters.search) query.append("search", filters.search);
      if (filters.status) query.append("status", filters.status);
      if (filters.priority) query.append("priority", filters.priority);
      const { data } = await api.get(`/tasks?${query.toString()}`);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters.status, filters.priority]);

  const handleSubmitTask = async (payload) => {
    setSaving(true);
    setError("");
    try {
      if (editingTask?._id) {
        await api.put(`/tasks/${editingTask._id}`, payload);
        setEditingTask(null);
      } else {
        await api.post("/tasks", payload);
      }
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save task");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleSearch = () => fetchTasks();

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-4 p-4">
        {error && <p className="rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
        <TaskForm onSubmit={handleSubmitTask} submitting={saving} editingTask={editingTask} onCancelEdit={() => setEditingTask(null)} />

        <section className="rounded bg-white p-4 shadow">
          <h2 className="mb-3 text-lg font-semibold">Task Dashboard</h2>
          <div className="grid gap-3 md:grid-cols-4">
            <input className="rounded border p-2" placeholder="Search title/description" value={filters.search} onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))} />
            <select className="rounded border p-2" value={filters.status} onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}>
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select className="rounded border p-2" value={filters.priority} onChange={(e) => setFilters((p) => ({ ...p, priority: e.target.value }))}>
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="button" onClick={handleSearch} className="rounded bg-slate-800 p-2 text-white">
              Apply Search
            </button>
          </div>
        </section>

        {loading ? (
          <div className="rounded bg-white p-4 text-center shadow">Loading tasks...</div>
        ) : (
          <TaskTable tasks={tasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
