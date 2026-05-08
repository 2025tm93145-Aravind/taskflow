import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    adminSecret: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-md rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-semibold">Register</h1>
      {error && <p className="mb-3 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full rounded border p-2" placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
        <input className="w-full rounded border p-2" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
        <input className="w-full rounded border p-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
        <select className="w-full rounded border p-2" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {form.role === "admin" && (
          <input className="w-full rounded border p-2" placeholder="Admin Secret" value={form.adminSecret} onChange={(e) => setForm((p) => ({ ...p, adminSecret: e.target.value }))} />
        )}
        <button type="submit" disabled={loading} className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-500">
          {loading ? "Please wait..." : "Register"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account? <Link className="text-blue-600 underline" to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
