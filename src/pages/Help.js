import React from "react";
import "./Help.css";

function Help() {
  return (
    <div className="help-page">
      <h1 className="help-title">Help & Support</h1>
      <p className="help-subtitle">
        Need assistance? We’re here to help you use Civic Connect smoothly.
      </p>

      <div className="help-grid">
        <div className="help-card">
          <h3>📢 How to Report an Issue</h3>
          <p>
            Go to the dashboard and click <b>Create New Issue</b>. Fill in the
            issue details and submit. Your issue will be tracked instantly.
          </p>
        </div>

        <div className="help-card">
          <h3>📊 Track Issue Status</h3>
          <p>
            View the status of your issues as <b>Pending</b>,{" "}
            <b>In Progress</b>, or <b>Resolved</b> directly from your dashboard.
          </p>
        </div>

        <div className="help-card">
          <h3>🔐 Account & Password</h3>
          <p>
            Visit your <b>Profile</b> page to update personal details or change
            your password securely.
          </p>
        </div>

        <div className="help-card">
          <h3>🛠 Admin Resolution Process</h3>
          <p>
            Admins review issues, update statuses, and ensure transparent
            resolutions through the admin dashboard.
          </p>
        </div>

        <div className="help-card">
          <h3>❓ Frequently Asked Questions</h3>
          <ul>
            <li>Why is my issue pending?</li>
            <li>How long does resolution take?</li>
            <li>Can I edit my issue?</li>
          </ul>
        </div>

        <div className="help-card">
          <h3>📧 Contact Support</h3>
          <p>
            If you need further assistance, contact us at:
            <br />
            <b>support@civicconnect.com</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;
