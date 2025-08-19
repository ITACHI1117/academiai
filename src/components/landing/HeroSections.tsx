import React from "react";
import { HeroHeader } from "../header";
import HeroSection from "../hero-section";
import Features from "../features-1";
import HowItWorks from "./howItWorks";
import FeaturesFour from "../features-4";
import CTA from "./CTA";
import FooterSection from "../footer";

function HeroSections() {
  return (
    <div>
      <HeroHeader />
      <HeroSection />
      <Features />
      <HowItWorks />
      <FeaturesFour />
      <CTA />
      <FooterSection />
    </div>
  );
}

export default HeroSections;
