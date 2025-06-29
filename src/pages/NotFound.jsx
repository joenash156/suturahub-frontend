import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(20);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }, []);

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Animation */}
        <div className="mb-8" data-aos="fade-up">
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-[8rem] md:text-[12rem] font-bold text-gray-200 select-none animate-pulse">
              404
            </h1>

            {/* Floating Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 md:w-48 md:h-48 relative">
                {/* Floating Icons */}
                <div className="absolute top-0 left-0 animate-bounce delay-0">
                  <i className="fas fa-shopping-bag text-3xl text-blue-500 opacity-70"></i>
                </div>
                <div className="absolute top-0 right-0 animate-bounce delay-100">
                  <i className="fas fa-heart text-2xl text-red-500 opacity-70"></i>
                </div>
                <div className="absolute bottom-0 left-0 animate-bounce delay-200">
                  <i className="fas fa-star text-2xl text-yellow-500 opacity-70"></i>
                </div>
                <div className="absolute bottom-0 right-0 animate-bounce delay-300">
                  <i className="fas fa-gem text-3xl text-purple-500 opacity-70"></i>
                </div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-spin-slow">
                    <i className="fas fa-search text-white text-2xl md:text-3xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            The page you're looking for doesn't exist or may still be under production.
          </p>
          <p className="text-gray-500">
            Don't worry, even the best explorers sometimes get lost!
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto border border-gray-100">
            <div className="flex items-center mb-4">
              <i className="fas fa-lightbulb text-yellow-500 text-xl mr-3"></i>
              <h3 className="text-lg font-semibold text-gray-800">
                Quick Suggestion
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Try searching for what you need in our store
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, categories..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="600">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGoHome}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 group"
            >
              <i className="fas fa-home group-hover:scale-110 transition-transform"></i>
              <span>Go to Homepage</span>
            </button>

            <button
              onClick={handleGoBack}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all duration-200 flex items-center space-x-2 group"
            >
              <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
              <span>Go Back</span>
            </button>
          </div>
        </div>

        {/* Popular Links */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="800">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Or visit these popular pages:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Link
              to="/products"
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <i className="fas fa-shopping-bag text-2xl text-blue-500 mb-2 group-hover:scale-110 transition-transform"></i>
              <p className="text-sm font-medium text-gray-700">Products</p>
            </Link>

            <Link
              to="/about"
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-green-300 transition-all group"
            >
              <i className="fas fa-info-circle text-2xl text-green-500 mb-2 group-hover:scale-110 transition-transform"></i>
              <p className="text-sm font-medium text-gray-700">About Us</p>
            </Link>

            <Link
              to="/contact"
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-300 transition-all group"
            >
              <i className="fas fa-envelope text-2xl text-purple-500 mb-2 group-hover:scale-110 transition-transform"></i>
              <p className="text-sm font-medium text-gray-700">Contact</p>
            </Link>

            <Link
              to="/sell-products"
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-300 transition-all group"
            >
              <i className="fas fa-store text-2xl text-orange-500 mb-2 group-hover:scale-110 transition-transform"></i>
              <p className="text-sm font-medium text-gray-700">Sell</p>
            </Link>
          </div>
        </div>

        {/* Auto Redirect Notice */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="1000">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
            <i className="fas fa-clock animate-pulse"></i>
            <span className="text-sm">
              Redirecting to homepage in{" "}
              <span className="font-bold">{countdown}</span> seconds
            </span>
          </div>
        </div>

        {/* Fun Facts */}
        <div
          className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100"
          data-aos="fade-up"
          data-aos-delay="1200"
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            <i className="fas fa-sparkles text-purple-500 mr-2"></i>
            Did you know?
          </h4>
          <p className="text-gray-600 text-sm">
            The 404 error code was named after room 404 at CERN, where the
            original web servers were located. When someone couldn't find a
            file, they'd say it was "404" - not found in room 404!
          </p>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
}

export default NotFound;
