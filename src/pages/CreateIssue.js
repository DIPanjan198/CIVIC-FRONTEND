import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateIssue() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: ""
  });

  const navigate = useNavigate();

  const submit = async () => {
    try {
      // 🔎 DEBUG: Check token
      console.log("TOKEN:", localStorage.getItem("token"));

      const res = await api.post("/issues", form);

      console.log("Create issue response:", res.data);

      // Clear form
      setForm({
        title: "",
        description: "",
        category: ""
      });

      // Go back to user dashboard
      navigate("/user");

    } catch (err) {
      console.error("Create issue error:", err.response || err);

      alert(
        err.response?.data?.message ||
        "Failed to create issue (Unauthorized or server error)"
      );
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Create New Issue</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={submit} style={{ padding: "8px 16px" }}>
        Submit Issue
      </button>
    </div>
  );
}

export default CreateIssue;
