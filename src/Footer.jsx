import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");
  const location = useLocation();

  // Function to check if current page is product-related
  const isProductPage = () => {
    const { pathname } = location;
    return pathname === "/products" || pathname.startsWith("/products/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Conditional margin on medium and larger screens for product pages only */}
      <div
        className={`transition-all duration-300 ${
          isProductPage() ? "md:ml-[280px]" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src="./src/assets/logo/logo.png"
                  alt="FashionHub Logo"
                  className="h-10 w-10 rounded-full"
                />
                <h3 className="text-2xl font-bold text-white">SuturaHub</h3>
              </div>
              <p className="text-sm text-gray-400">
                Your premier destination for exclusive fashion and style.
                Discover the latest trends in African fashion.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <i className="fab fa-pinterest text-xl"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                    Special Offers
                  </a>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                Customer Service
              </h4>
              <ul className="space-y-2">
                <li>
                  {/* Updated: Added navigation to Contact page */}
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                    FAQs
                  </a>
                </li>
                {/* <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center">
                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                    Shipping Info
                  </a>
                </li> */}
                {/* <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center">
                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                    Returns Policy
                  </a>
                </li> */}
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Newsletter</h4>
              <p className="text-sm text-gray-400">
                Subscribe to receive updates, access to exclusive deals, and
                more.
              </p>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 placeholder-gray-500"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} SuturaHub. All rights
                reserved.
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
