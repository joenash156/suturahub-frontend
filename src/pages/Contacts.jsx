import { useState } from "react";
import ContactUsImg from "../assets/other-images/get-intouch.jpg";

function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    alert("Thank you for your message. We will get back to you soon!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ContactUsImg})` }}
        data-aos="fade-up"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div
            className="max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              We'd love to hear from you. Please get in touch with us.
            </p>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-8">
              <div
                className="bg-white rounded-xl shadow-sm p-6"
                data-aos="fade-up"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  <div
                    className="flex items-start space-x-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-blue-100 rounded-full p-3">
                        <i className="fas fa-map-marker-alt text-blue-600"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        Our Location
                      </h3>
                      <p className="text-gray-600 mt-1">
                        1 University Avenue, Ashesi University, Ghana
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-start space-x-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-blue-100 rounded-full p-3">
                        <i className="fas fa-phone text-blue-600"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        Phone
                      </h3>
                      <p className="text-gray-600 mt-1">+233 257 2662 72</p>
                    </div>
                  </div>

                  <div
                    className="flex items-start space-x-4"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-blue-100 rounded-full p-3">
                        <i className="fas fa-envelope text-blue-600"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        Email
                      </h3>
                      <p className="text-gray-600 mt-1">
                        contact@suturahub.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div
                  className="mt-8 pt-8 border-t border-gray-200"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <i className="fab fa-facebook text-2xl"></i>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      <i className="fab fa-instagram text-2xl"></i>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <i className="fab fa-twitter text-2xl"></i>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <i className="fab fa-pinterest text-2xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="bg-white rounded-xl shadow-sm p-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
