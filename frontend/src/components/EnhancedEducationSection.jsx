import React from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";

const EnhancedEducationSection = ({ data }) => {
  return (
    <section id="education" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            My academic journey and educational background
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {data.map((education, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="text-blue-600" size={28} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                      {education.degree}
                      {education.field && (
                        <span className="text-gray-600"> in {education.field}</span>
                      )}
                    </h3>
                    <p className="text-lg text-gray-700 font-medium">
                      {education.institution}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {education.duration}
                    </div>
                    {education.gpa && (
                      <div className="flex items-center gap-2">
                        <Award size={16} />
                        <span className="font-semibold text-blue-600">GPA: {education.gpa}</span>
                      </div>
                    )}
                  </div>

                  {/* Special highlight for current education */}
                  {index === 0 && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-400">
                      <p className="text-blue-800 text-sm font-medium">
                        Currently pursuing an integrated dual degree program with focus on 
                        software development, data structures, algorithms, and database management systems.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Academic Info */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg card-hover border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Academic Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="group cursor-pointer">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">8.0/10.0</div>
                <div className="text-sm text-gray-600">Current GPA</div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">Dual Degree</div>
                <div className="text-sm text-gray-600">BTech + MTech</div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">IIITDM</div>
                <div className="text-sm text-gray-600">Premier Institute</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedEducationSection;