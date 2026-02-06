import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const close = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <nav className="admin-navbar">
        {/* 💻 SINGLE MENU ICON */}
        <button className="menu-icon" onClick={() => setOpen(!open)}>
          💻
        </button>

        {/* BRAND */}
        <span className="admin-brand">Civic Connect</span>
      </nav>

      {/* DROPDOWN MENU */}
      <div
        ref={menuRef}
        className={`admin-menu ${open ? "open" : ""}`}
      >
        <Link to="/admin" onClick={() => setOpen(false)}>
          📊 Dashboard
        </Link>

        <Link to="/admin/analytics" onClick={() => setOpen(false)}>
          📈 Analytics
        </Link>

        <Link to="/admin/reports" onClick={() => setOpen(false)}>
          🧾 Reports
        </Link>

        <Link to="/admin/settings" onClick={() => setOpen(false)}>
          ⚙️ Settings
        </Link>

        <hr />

        <div className="admin-role">Admin</div>

        <button className="menu-logout" onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </>
  );
}

export default AdminNavbar;
