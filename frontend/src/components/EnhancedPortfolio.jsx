import React, { useState, useEffect } from "react";
import { portfolioData } from "../mock";
import EnhancedHeroSection from "./EnhancedHeroSection";
import EnhancedAboutSection from "./EnhancedAboutSection";
import EnhancedSkillsSection from "./EnhancedSkillsSection";
import EnhancedProjectsSection from "./EnhancedProjectsSection";
import EnhancedEducationSection from "./EnhancedEducationSection";  
import EnhancedCertificationsSection from "./EnhancedCertificationsSection";
import EnhancedContactSection from "./EnhancedContactSection";
import EnhancedNavigation from "./EnhancedNavigation";

const EnhancedPortfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "education", "certifications", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="enhanced-portfolio">
      <EnhancedNavigation activeSection={activeSection} />
      <EnhancedHeroSection data={portfolioData.personal} />
      <EnhancedAboutSection data={portfolioData.about} />
      <EnhancedSkillsSection data={portfolioData.skills} />
      <EnhancedProjectsSection data={portfolioData.projects} />
      <EnhancedEducationSection data={portfolioData.education} />
      <EnhancedCertificationsSection data={portfolioData.certifications} />
      <EnhancedContactSection data={portfolioData.personal} />
    </div>
  );
};

export default EnhancedPortfolio;