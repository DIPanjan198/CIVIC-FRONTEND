import React from "react";
import "./AdminReports.css";

function AdminReports() {
  const exportCSV = () => {
    alert("CSV export will be implemented");
  };

  const exportPDF = () => {
    alert("PDF export will be implemented");
  };

  return (
    <div className="reports-page">
      {/* HEADER */}
      <div className="reports-header">
        <h1>📑 Admin Reports</h1>
        <p>Generate and export system data for audits and analysis</p>
      </div>

      {/* REPORT ACTIONS */}
      <div className="reports-card">
        <div className="reports-card-left">
          <h3>Generate Reports</h3>
          <p>
            Export structured reports containing issues, users, and system
            activity. Ideal for audits and compliance reviews.
          </p>

          <div className="reports-actions">
            <button className="btn-primary" onClick={exportCSV}>
              ⬇ Export CSV
            </button>
            <button className="btn-secondary" onClick={exportPDF}>
              ⬇ Export PDF
            </button>
          </div>
        </div>

        <div className="reports-card-right">
          <div className="report-info">
            <span>📊</span>
            <p>Issue statistics</p>
          </div>
          <div className="report-info">
            <span>👤</span>
            <p>User activity</p>
          </div>
          <div className="report-info">
            <span>🕒</span>
            <p>Status history</p>
          </div>
        </div>
      </div>

      {/* FUTURE SECTION */}
      <div className="reports-future">
        🚀 Advanced filters, scheduled reports, and download history will be
        available soon.
      </div>
    </div>
  );
}

export default AdminReports;
