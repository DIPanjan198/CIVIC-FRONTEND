import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/reset-password", {
        token,
        password,
      });

      alert("Password reset successful. Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Reset Password</h2>

      <form onSubmit={submit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
