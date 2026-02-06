import React from "react";
import "./IntroHero.css";

function IntroHero() {
  return (
    <section className="hero">
      <h1>Civic Connect</h1>
      <h3>Develope By:-- Dipanjan Choudhuri</h3>
      <p>
        Empowering citizens. Enabling transparency. Connecting people with civic
        authorities.
      </p>

      <a href="/login" className="hero-btn">
        Login to Continue
      </a>

     
    </section>
  );
}

export default IntroHero;
