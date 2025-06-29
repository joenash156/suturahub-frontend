import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "./context/AuthContext"; // <-- Add this import

function Sidebar({ isOpen, onClose }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const isProductPage = location.pathname.startsWith("/products");
  const { isAuthenticated, user } = useAuth(); // <-- Add this line

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is on user profile area
      if (event.target.closest(".user-profile-area")) {
        return; // Don't close sidebar if clicking in user profile area
      }

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest("#hamburger")
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [onClose, isOpen]);

  return (
    <>
      {/* Overlay - show on mobile for all pages */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 block md:hidden z-40
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed bg-gradient-to-b from-gray-800 via-gray-800 to-gray-900 text-white w-[280px] 
          inset-y-0 md:top-[6.2rem] left-0 
          transition-transform duration-300 ease-in-out transform z-[60] border-r border-gray-700/50 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${isProductPage ? "md:translate-x-0" : "md:-translate-x-full"}`}
        style={{
          "--scrollbar-width": "0px",
        }}
      >
        {/* User Profile Section - Only show below md breakpoint */}
        <div className="block md:hidden">
          <div className="px-6 pt-4 pb-6">
            {/* Mobile Logo */}
            <div className="mb-6 pt-10 mb-8 flex items-center space-x-3">
              <img
                src="./src/assets/logo/logo.png"
                alt="Website Logo"
                className="h-12 w-auto object-contain rounded-full ring-2 ring-blue-500/30"
              />
              <span className="md:hidden font-semibold text-lg tracking-wide">
                Sutura<span className="text-blue-400">Hub</span>
              </span>
            </div>

            {/* User Profile - ADD THE CLASS HERE */}
            <div className="flex items-center space-x-4 user-profile-area">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center ring-2 ring-gray-700">
                  <i className="fas fa-user text-gray-400 text-xl"></i>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-400">Hello,</div>
                {isAuthenticated && user?.name ? (
                  <span className="text-blue-400 font-medium text-base truncate block text-left relative z-[70]">
                    {user.name}
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                      onClose();
                    }}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-base font-medium truncate block text-left relative z-[70]"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Gradient border effect */}
          <div className="h-6 bg-gradient-to-b from-gray-800/95 to-transparent relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          <div className="p-6 space-y-8">
            {/* Categories Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                <i className="fas fa-tshirt mr-3 text-blue-400"></i>
                Categories
                <div className="flex-1 ml-2 border-b border-gray-700/50"></div>
              </h2>
              <nav className="space-y-1">
                {/* Men's Fashion */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-blue-400 mb-2 px-4 uppercase tracking-wider">
                    Men's Wear
                  </h3>
                  <div className="space-y-0.5">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-gray-300 rounded-lg hover:bg-blue-600/10 hover:text-white transition-all duration-200 group"
                    >
                      <i className="fas fa-male mr-3 text-gray-400 group-hover:text-blue-400"></i>
                      <span>Agbada & Kaftan</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-gray-300 rounded-lg hover:bg-blue-600/10 hover:text-white transition-all duration-200 group"
                    >
                      <i className="fas fa-user-tie mr-3 text-gray-400 group-hover:text-blue-400"></i>
                      <span>Formal Attire</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-gray-300 rounded-lg hover:bg-blue-600/10 hover:text-white transition-all duration-200 group"
                    >
                      <i className="fas fa-vest mr-3 text-gray-400 group-hover:text-blue-400"></i>
                      <span>Native Styles</span>
                    </a>
                  </div>
                </div>

                {/* Women's Fashion */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-blue-400 mb-2 px-4 uppercase tracking-wider">
                    Women's Wear
                  </h3>
                  <div className="space-y-0.5">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-gray-300 rounded-lg hover:bg-blue-600/10 hover:text-white transition-all duration-200 group"
                    >
                      <i className="fas fa-female mr-3 text-gray-400 group-hover:text-blue-400"></i>
                      <span>Traditional Attire</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-gray-300 rounded-lg hover:bg-blue-600/10 hover:text-white transition-all duration-200 group"
                    >
                      <i className="fas fa-gem mr-3 text-gray-400 group-hover:text-blue-400"></i>
                      <span>Occasion Wear</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-gray-300 rounded-lg hover:bg-blue-600/10 hover:text-white transition-all duration-200 group"
                    >
                      <i className="fas fa-briefcase mr-3 text-gray-400 group-hover:text-blue-400"></i>
                      <span>Corporate Styles</span>
                    </a>
                  </div>
                </div>
              </nav>
            </div>

            {/* Price Range */}
            <div>
              <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                <i className="fas fa-tags mr-3 text-blue-400"></i>
                Price Range
                <div className="flex-1 ml-2 border-b border-gray-700/50"></div>
              </h2>
              <div className="px-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Min: ₵100</span>
                    <span>Max: ₵5000</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    defaultValue="2500"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="pb-6">
              <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                <i className="fas fa-ruler mr-3 text-blue-400"></i>
                Available Sizes
                <div className="flex-1 ml-2 border-b border-gray-700/50"></div>
              </h2>
              <div className="grid grid-cols-4 gap-2 px-4">
                {["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"].map(
                  (size) => (
                    <button
                      key={size}
                      className="px-2 py-1 text-sm text-gray-300 border border-gray-600 rounded-md hover:bg-blue-600/10 hover:text-white hover:border-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Modal container with higher z-index */}
      <div className="relative z-[80]">
        <Login
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onRegisterClick={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />
        <Register
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onLoginClick={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </div>
    </>
  );
}

export default Sidebar;
