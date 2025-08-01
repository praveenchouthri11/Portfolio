import React, { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle } from "lucide-react";
import { portfolioAPI, handleAPIError } from "../services/api";

const EnhancedContactSection = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await portfolioAPI.submitContactForm(formData);
      
      if (response.success) {
        setSubmitStatus('success');
        setStatusMessage(response.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(handleAPIError(error, 'Failed to send message. Please try again.'));
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setStatusMessage("");
      }, 5000);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="text-blue-600" size={24} />,
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <Phone className="text-green-600" size={24} />,
      label: "Phone",
      value: data.phone,
      href: `tel:${data.phone}`,
      gradient: "from-green-50 to-green-100"
    },
    {
      icon: <MapPin className="text-purple-600" size={24} />,
      label: "Location",
      value: data.location,
      href: "#",
      gradient: "from-purple-50 to-purple-100"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="text-blue-600" size={24} />,
      label: "LinkedIn",
      href: data.linkedin,
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <Github className="text-gray-800" size={24} />,
      label: "GitHub",
      href: data.github,
      gradient: "from-gray-50 to-gray-100"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Whether you're looking to collaborate on a project, discuss opportunities, 
                or just want to say hello, I'd love to hear from you. Feel free to reach out 
                through any of the channels below.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group card-hover border border-gray-100"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${method.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                      {method.label}
                    </div>
                    <div className="text-gray-900 font-medium">
                      {method.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Find me online
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group border border-gray-100`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg card-hover border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Send a Message
            </h3>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <span className="text-green-800 font-medium">
                  {statusMessage}
                </span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-red-600" size={20} />
                <span className="text-red-800 font-medium">
                  {statusMessage}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Let's collaborate on a project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            © 2024 Praveen Chouthri. Built with React and designed with care.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Thank you for visiting my portfolio!
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContactSection;