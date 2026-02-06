import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState({});
  const [notes, setNotes] = useState({});

  const load = () => {
    api
      .get("/issues")
      .then(res => setIssues(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    load();
  }, []);

  const update = (id, status) => {
    api.put(`/issues/${id}/status`, { status }).then(load);
  };

  // 🔍 Filter + Search
  const filteredIssues = issues.filter(i => {
    const matchSearch =
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      (i.reportedByEmail || "").toLowerCase().includes(search.toLowerCase());

    const matchStatus = filter === "all" ? true : i.status === filter;

    return matchSearch && matchStatus;
  });

  // 📊 Stats
  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === "pending").length,
    inProgress: issues.filter(i => i.status === "in-progress").length,
    resolved: issues.filter(i => i.status === "resolved").length,
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard - All Issues</h2>

      {/* 📊 STATS */}
      <div className="admin-stats">
        <div className="admin-stat total">
          Total Issues <span>{stats.total}</span>
        </div>
        <div className="admin-stat pending">
          Pending <span>{stats.pending}</span>
        </div>
        <div className="admin-stat progress">
          In Progress <span>{stats.inProgress}</span>
        </div>
        <div className="admin-stat resolved">
          Resolved <span>{stats.resolved}</span>
        </div>
      </div>

      {/* 🔍 SEARCH + FILTER */}
      <div className="admin-controls">
        <input
          className="admin-search"
          placeholder="🔍 Search by title or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="admin-filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* 🧾 ISSUE CARDS */}
      {filteredIssues.map(i => (
        <div key={i._id} className="admin-issue">
          <div className="admin-issue-header">
            <h3 className="admin-issue-title">{i.title}</h3>

            <button
              className="admin-btn pending"
              onClick={() =>
                setPriority(prev => ({
                  ...prev,
                  [i._id]: !prev[i._id],
                }))
              }
            >
              {priority[i._id] ? "⭐ High Priority" : "☆ Normal"}
            </button>
          </div>

          <div className="admin-issue-meta">
            <p><b>Reported By:</b> {i.reportedByName || "Unknown"}</p>
            <p><b>Email:</b> {i.reportedByEmail || "Unknown"}</p>
          </div>

          <span className={`admin-status ${i.status}`}>
            {i.status}
          </span>

          {/* 🔄 STATUS BUTTONS */}
          <div className="admin-actions">
            <button
              className="admin-btn pending"
              onClick={() => update(i._id, "pending")}
            >
              Pending
            </button>
            <button
              className="admin-btn progress"
              onClick={() => update(i._id, "in-progress")}
            >
              In Progress
            </button>
            <button
              className="admin-btn resolved"
              onClick={() => update(i._id, "resolved")}
            >
              Resolved
            </button>
          </div>

          {/* 💬 ADMIN NOTE */}
          <textarea
            className="admin-note"
            placeholder="Admin internal note (not saved yet)..."
            value={notes[i._id] || ""}
            onChange={e =>
              setNotes(prev => ({
                ...prev,
                [i._id]: e.target.value,
              }))
            }
          />
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
