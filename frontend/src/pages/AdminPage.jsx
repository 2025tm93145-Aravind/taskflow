import { useEffect, useState } from "react";
import api from "../api/client";
import Navbar from "../components/Navbar";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    try {
      await api.patch(`/users/${id}/role`, { role });
      await fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update role");
    }
  };

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-4xl p-4">
        <h1 className="mb-4 text-2xl font-semibold">Admin Panel</h1>
        {error && <p className="mb-3 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
        <div className="overflow-x-auto rounded bg-white shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">
                    <button type="button" onClick={() => changeRole(u._id, u.role === "admin" ? "user" : "admin")} className="rounded bg-indigo-600 px-2 py-1 text-white">
                      Make {u.role === "admin" ? "User" : "Admin"}
                    </button>
                  </td>
                </tr>
              ))}
              {!users.length && (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan="4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
