import React, { useEffect, useState } from "react";
import api from "../services/api";
import UserNavbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";

import "./UserProfile.css";

function UserProfile() {
const navigate = useNavigate();


  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/auth/me").then(res => {
      setUser(res.data);
      setForm({
        name: res.data.name,
        email: res.data.email,
      });
    });
  }, []);

  const saveProfile = async () => {
    const res = await api.put("/auth/me", form);
    setUser(res.data);
    setEdit(false);
  };
  const changePassword = async () => {
  if (!currentPassword || !newPassword) {
    alert("Fill all password fields");
    return;
  }

  try {
    setLoading(true);

    await api.put("/auth/change-password", {
      currentPassword,
      newPassword,
    });

    alert("Password changed successfully. Please login again.");

    // ✅ CLEAR AUTH DATA
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // ✅ RESET FORM (optional but clean)
    setCurrentPassword("");
    setNewPassword("");

    // ✅ REDIRECT TO LOGIN
    navigate("/", { replace: true });

  } catch (err) {
    console.error("Password update error:", err.response?.data);
    alert(err.response?.data?.message || "Password update failed");
  } finally {
    setLoading(false);
  }
};
  if (!user) return <p>Loading...</p>;

  return (
    <>
      <UserNavbar />
      <div className="profile-container">
        <h2>User Profile</h2>

        <div className="profile-card">
          <div className="avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          {edit ? (
            <>
              <input
                value={form.name}
                onChange={e =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <input
                value={form.email}
                onChange={e =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              <button onClick={saveProfile}>Save</button>
              <button onClick={() => setEdit(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Role:</b> {user.role}</p>
              <button onClick={() => setEdit(true)}>
                Edit Profile
              </button>
            </>
          )}
        </div>

        <div className="profile-card">
          <h3>Change Password</h3>
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={e =>
              setCurrentPassword(e.target.value)
            }
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={e =>
              setNewPassword(e.target.value)
            }
          />
          <button onClick={changePassword} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
