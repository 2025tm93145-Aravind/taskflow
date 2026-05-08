import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="text-xl font-semibold">
          TaskFlow
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/dashboard">Dashboard</Link>
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
          <span className="rounded bg-slate-700 px-2 py-1">{user?.role}</span>
          <button type="button" onClick={handleLogout} className="rounded bg-red-600 px-3 py-1 hover:bg-red-500">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
