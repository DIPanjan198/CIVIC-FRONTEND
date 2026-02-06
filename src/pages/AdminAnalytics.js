import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminAnalytics.css";

function AdminAnalytics() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    api.get("/issues")
      .then(res => {
        const issues = res.data;

        setStats({
          total: issues.length,
          pending: issues.filter(i => i.status === "pending").length,
          inProgress: issues.filter(i => i.status === "in-progress").length,
          resolved: issues.filter(i => i.status === "resolved").length,
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="analytics-page">
      <h1 className="analytics-title">
        📊 Admin Analytics
      </h1>

      {/* ===== STATS GRID ===== */}
      <div className="analytics-grid">
        <div className="analytics-card blue">
          <p>Total Issues</p>
          <h2>{stats.total}</h2>
        </div>

        <div className="analytics-card orange">
          <p>Pending</p>
          <h2>{stats.pending}</h2>
        </div>

        <div className="analytics-card purple">
          <p>In Progress</p>
          <h2>{stats.inProgress}</h2>
        </div>

        <div className="analytics-card green">
          <p>Resolved</p>
          <h2>{stats.resolved}</h2>
        </div>
      </div>

      {/* ===== INSIGHTS ===== */}
      <div className="analytics-insights">
        <div className="insight-card">
          <h3>📈 Issue Resolution Rate</h3>
          <p>
            {stats.total === 0
              ? "No data yet"
              : `${Math.round((stats.resolved / stats.total) * 100)}% issues resolved`}
          </p>
        </div>

        <div className="insight-card">
          <h3>⏳ Pending Load</h3>
          <p>
            {stats.pending === 0
              ? "No pending issues 🎉"
              : `${stats.pending} issues awaiting action`}
          </p>
        </div>

        <div className="insight-card muted">
          <h3>📊 Trends</h3>
          <p>Charts & trends can be added here later</p>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
