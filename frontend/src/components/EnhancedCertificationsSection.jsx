import React from "react";
import { Award, ExternalLink } from "lucide-react";

const EnhancedCertificationsSection = ({ data }) => {
  const getCategoryColor = (category) => {
    const colors = {
      "Database": "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200",
      "AI/ML": "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border-purple-200",
      "Development": "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200",
      "Data Science": "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border-orange-200",
      "Design": "bg-gradient-to-r from-pink-50 to-pink-100 text-pink-800 border-pink-200"
    };
    return colors[category] || "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <section id="certifications" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Continuous learning through professional certifications and courses
          </p>
        </div>

        {/* All Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {data.map((certification, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group card-hover border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Award className="text-gray-700" size={24} />
                </div>
                <ExternalLink className="text-gray-400 group-hover:text-gray-600 transition-colors" size={18} />
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                  {certification.name}
                </h3>
                <p className="text-gray-600 font-medium">
                  {certification.issuer}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(certification.category)}`}>
                  {certification.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-3xl mx-auto shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Commitment to Growth
            </h3>
            <p className="text-gray-700 mb-6">
              I believe in continuous learning and staying updated with the latest technologies. 
              These certifications represent my dedication to professional development and mastering new skills.
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center group cursor-pointer">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{data.length}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">3+</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedCertificationsSection;