import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import UserNavbar from "../components/UserNavbar";
import "./UserDashboard.css";

function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);

 useEffect(() => {
  api
    .get(`/issues/${id}`)
    .then(res => setIssue(res.data))
    .catch(() => alert("Failed to load issue"));
}, [id]);


  if (!issue) {
    return <p style={{ padding: 20 }}>Loading issue...</p>;
  }

  return (
    <>
      <UserNavbar />

      <div className="user-container">
        <button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
          ← Back
        </button>

        <div className="issue-card animate">
          <h2>{issue.title}</h2>

          <p><b>Category:</b> {issue.category}</p>
          <p><b>Description:</b> {issue.description}</p>

          <p>
            <b>Status:</b>{" "}
            <span className={`status-pill ${issue.status}`}>
              {issue.status}
            </span>
          </p>

          <p>
            <b>Created:</b>{" "}
            {new Date(issue.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
}

export default IssueDetails;
