import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./UserNavbar.css";

function UserNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <nav className="user-navbar">
        {/* ☰ MENU ICON */}
        <button className="menu-icon" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {/* BRAND */}
        <span className="brand">Civic Connect</span>
      </nav>

      {/* LEFT MENU */}
      <div
        ref={menuRef}
        className={`user-menu ${open ? "open" : ""}`}
      >
        {/* USER BADGE */}

        <Link to="/user" onClick={() => setOpen(false)}>
          🏠 Dashboard
        </Link>

        <Link to="/user/profile" onClick={() => setOpen(false)}>
          🙍 Profile
        </Link>

        <Link to="/help" onClick={() => setOpen(false)}>
          ❓ Help
        </Link>

        <hr />
         <div className="user-role">USER</div>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </>
  );
}

export default UserNavbar;
