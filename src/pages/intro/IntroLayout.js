import React from "react";

import IntroHero from "./IntroHero";
import IntroHowItWorks from "./IntroHowItWorks";
import IntroImpact from "./IntroImpact";
import IntroFuture from "./IntroFuture";

function IntroLayout() {
  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <IntroHero />
      <IntroHowItWorks />
      <IntroImpact />
      <IntroFuture />
    </div>
  );
}

export default IntroLayout;
