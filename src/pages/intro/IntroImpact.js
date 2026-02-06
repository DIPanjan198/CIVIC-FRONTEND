import React from "react";
import "./IntroImpact.css";

function IntroImpact() {
  return (
    <section className="impact">
      <h2>Our Impact</h2>

      <div className="impact-grid">
        <div>
          <h1>1,200+</h1>
          <p>Issues Reported</p>
        </div>
        <div>
          <h1>900+</h1>
          <p>Issues Resolved</p>
        </div>
        <div>
          <h1>85%</h1>
          <p>Resolution Rate</p>
        </div>
        <div>
          <h1>500+</h1>
          <p>Active Citizens</p>
        </div>
      </div>
    </section>
  );
}

export default IntroImpact;
