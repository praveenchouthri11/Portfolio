import React from "react";
import { ChevronDown, Github, Linkedin, Mail, MapPin } from "lucide-react";

const EnhancedHeroSection = ({ data }) => {
  const scrollToNext = () => {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="space-y-8 animate-slideUp">
          {/* Name with elegant typography */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-light text-gray-900 tracking-tight leading-none">
              {data.name.split(" ")[0]}
              <br />
              <span className="font-normal bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {data.name.split(" ")[1]}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
              {data.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>

          {/* Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 glass-effect px-4 py-2 rounded-full"
            >
              <Mail size={20} />
              <span className="text-sm">{data.email}</span>
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 glass-effect px-4 py-2 rounded-full"
            >
              <Linkedin size={20} />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 glass-effect px-4 py-2 rounded-full"
            >
              <Github size={20} />
              <span className="text-sm">GitHub</span>
            </a>
            <div className="flex items-center gap-2 text-gray-600 glass-effect px-4 py-2 rounded-full">
              <MapPin size={20} />
              <span className="text-sm">{data.location}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8 flex flex-col items-center">
            <button
              onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-10 py-4 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-gray-800 hover:to-gray-700 btn-primary"
            >
              View My Work
            </button>
            
            {/* Scroll indicator - centered under button */}
            <button
              onClick={scrollToNext}
              className="mt-12 text-gray-400 hover:text-gray-600 transition-colors animate-bounce"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;