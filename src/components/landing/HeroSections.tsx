import React from "react";
import { HeroHeader } from "../header";
import HeroSection from "../hero-section";
import Features from "../features-1";
import HowItWorks from "./howItWorks";
import FeaturesFour from "../features-4";
import CTA from "./CTA";
import FooterSection from "../footer";
import { Testimonials } from "./Testimonial";

function HeroSections() {
  return (
    <div>
      <HeroHeader />
      <HeroSection />
      <Features />
      <HowItWorks />
      <FeaturesFour />
      <Testimonials />
      <CTA />

      <FooterSection />
    </div>
  );
}

export default HeroSections;
