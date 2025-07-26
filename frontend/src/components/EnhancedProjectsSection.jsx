import React, { useState } from "react";
import { ExternalLink, Github, CheckCircle, Clock, Code, X } from "lucide-react";

const EnhancedProjectsSection = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusIcon = (status) => {
    return status === "Live" ? 
      <CheckCircle className="text-green-600" size={16} /> : 
      <Clock className="text-orange-600" size={16} />;
  };

  const getStatusColor = (status) => {
    return status === "Live" ? 
      "text-green-600 bg-gradient-to-r from-green-50 to-green-100 border-green-200" : 
      "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200";
  };

  return (
    <>
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              Click on any project to explore in detail
            </p>
          </div>

          {/* Project Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((project, index) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 card-hover"
              >
                {/* Project Preview Icon */}
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Code className="text-white" size={24} />
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{project.subtitle}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      {project.status}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-blue-600 text-sm font-medium group-hover:underline">
                      View Details →
                    </span>
                    <div className="flex gap-2">
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      <Github className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-backdrop">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedProject.status)}`}>
                    {getStatusIcon(selectedProject.status)}
                    {selectedProject.status}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                      <Code className="text-white" size={24} />
                    </div>
                    <p className="text-gray-600">{selectedProject.title}</p>
                    <p className="text-sm text-gray-500">Project Preview</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 btn-primary"
                    >
                      <ExternalLink size={16} />
                      View Live
                    </a>
                  )}
                  <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                    <Github size={16} />
                    Source Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedProjectsSection;