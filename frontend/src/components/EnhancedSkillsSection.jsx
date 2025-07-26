import React from "react";
import { Code, Database, Settings, Layers } from "lucide-react";

const EnhancedSkillsSection = ({ data }) => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="text-blue-600" size={24} />,
      skills: data.programming,
      color: "blue",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      title: "Frameworks & Libraries",
      icon: <Layers className="text-green-600" size={24} />,
      skills: data.frameworks,
      color: "green",
      gradient: "from-green-50 to-green-100"
    },
    {
      title: "Tools & Environment",
      icon: <Settings className="text-purple-600" size={24} />,
      skills: data.tools,
      color: "purple",
      gradient: "from-purple-50 to-purple-100"
    },
    {
      title: "Databases",
      icon: <Database className="text-orange-600" size={24} />,
      skills: data.databases,
      color: "orange",
      gradient: "from-orange-50 to-orange-100"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200",
      green: "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200",
      purple: "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border-purple-200",
      orange: "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border-orange-200"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="skills" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I work with
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 card-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-full flex items-center justify-center`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 cursor-pointer ${getColorClasses(category.color)}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Note */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg max-w-3xl mx-auto border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Always Learning</h3>
            <p className="text-gray-700">
              I'm constantly expanding my skill set and staying up-to-date with the latest technologies. 
              Currently exploring advanced topics in web development, data structures, and software architecture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedSkillsSection;