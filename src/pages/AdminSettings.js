import React, { useState } from "react";
import "./AdminSettings.css";

function AdminSettings() {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="settings-page">
      {/* HEADER */}
      <div className="settings-header">
        <h1>⚙️ Admin Settings</h1>
        <p>Manage system configuration and application status</p>
      </div>

      {/* SETTINGS CARDS */}
      <div className="settings-card">
        <span className="settings-label">System Status</span>
        <span className="status-badge online">✔ Online</span>
      </div>

      <div className="settings-card">
        <span className="settings-label">Admin Role</span>
        <span className="settings-value">Super Admin</span>
      </div>

      <div className="settings-card">
        <span className="settings-label">Application Version</span>
        <span className="settings-value">v1.0.0</span>
      </div>

      <div className="settings-card">
        <span className="settings-label">Maintenance Mode</span>

        <label className="switch">
          <input
            type="checkbox"
            checked={maintenance}
            onChange={() => setMaintenance(!maintenance)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* FOOTER NOTE */}
      <div className="settings-note">
        🛠 Settings panel ready for future controls (logs, permissions, backups)
      </div>
    </div>
  );
}

export default AdminSettings;
