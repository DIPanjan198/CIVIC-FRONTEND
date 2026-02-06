import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./UserDashboard.css";
import UserNavbar from "../components/UserNavbar";


function UserDashboard() {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [favorite, setFavorite] = useState({}); // UI only

  // 🔄 Load user issues
  const load = async () => {
    try {
      const res = await api.get("/issues/my");
      setIssues(res.data);
    } catch (err) {
      console.error("Failed to load issues", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ➕ Create issue
  const createIssue = async () => {
    try {
      await api.post("/issues", {
        title,
        description,
        category,
      });

      setTitle("");
      setDescription("");
      setCategory("");
      setShowForm(false);
      load();
    } catch (err) {
      alert("Failed to create issue");
    }
  };

  // 🔍 Filter + search
  const filteredIssues = issues.filter(i => {
    const matchSearch = i.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      filter === "all" ? true : i.status === filter;

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
    <>
      <UserNavbar />

      <div className="user-container">
        <h2 className="user-title">User Dashboard - My Issues</h2>

        {/* 📊 STATS */}
        <div className="stats-grid">
          <div className="stat-card">Total: {stats.total}</div>
          <div className="stat-card pending">Pending: {stats.pending}</div>
          <div className="stat-card progress">
            In Progress: {stats.inProgress}
          </div>
          <div className="stat-card resolved">
            Resolved: {stats.resolved}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="user-controls">
          <button
            className="primary-btn"
            onClick={() => setShowForm(true)}
          >
            + Create New Issue
          </button>

          <input
            className="search-input"
            placeholder="Search my issues..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* 📝 CREATE MODAL */}
        {showForm && (
          <div className="modal-backdrop">
            <div className="modal-card animate">
              <h3>Create New Issue</h3>

              <input
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />

              <input
                placeholder="Category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />

              <div className="modal-actions">
                <button
                  className="primary-btn"
                  onClick={createIssue}
                >
                  Submit
                </button>
                <button onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🧾 ISSUE LIST */}
        {filteredIssues.length === 0 && (
          <p>No issues yet.</p>
        )}

        {filteredIssues.map(i => (
          <div
            key={i._id}
            className={`issue-card animate ${
              favorite[i._id] ? "favorite" : ""
            }`}
            onClick={() => navigate(`/issues/${i._id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="issue-header">
              <h3>{i.title}</h3>

              <button
                className="favorite-btn"
                onClick={e => {
                  e.stopPropagation(); // 🔴 IMPORTANT
                  setFavorite(prev => ({
                    ...prev,
                    [i._id]: !prev[i._id],
                  }));
                }}
              >
                {favorite[i._id] ? "❤️ Favorite" : "🤍 Favorite"}
              </button>
            </div>

            <p>
              <b>Category:</b> {i.category}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span className={`status-pill ${i.status}`}>
                {i.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserDashboard;
