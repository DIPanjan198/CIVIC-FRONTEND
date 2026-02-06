import React from "react";
import "./IntroHowItWorks.css";

function IntroHowItWorks() {
  return (
    <section className="how">
      <h2>How Civic Connect Works</h2>

      <div className="how-grid">
        <div className="how-card">
          <h3>📢 Report Issues</h3>
          <p>Citizens report civic problems like roads, water, electricity.</p>
        </div>

        <div className="how-card">
          <h3>📊 Track Progress</h3>
          <p>Track issue status in real-time — Pending to Resolved.</p>
        </div>

        <div className="how-card">
          <h3>🏛 Admin Resolution</h3>
          <p>Authorities manage and resolve issues transparently.</p>
        </div>
      </div>
    </section>
  );
}

export default IntroHowItWorks;
