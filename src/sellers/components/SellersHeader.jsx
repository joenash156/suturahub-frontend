import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function SellersHeader({ onSidebarToggle }) {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Handle sign out with SweetAlert
  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to sign out of your seller account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      logout();
      setIsDropdownOpen(false);

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Signed Out Successfully",
        text: "You have been logged out of your seller account.",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Greeting */}
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              {/* Mobile sidebar toggle button */}
              <button
                onClick={onSidebarToggle}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className="fas fa-bars text-gray-600"></i>
              </button>

              <img
                src="/src/assets/logo/logo.png"
                alt="Logo"
                className="h-8 w-8 rounded-full"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-gray-900">
                  Seller Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Welcome back, {user?.name || "Seller"}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Add Product Button - Hidden on mobile */}
            <Link
              to="/sell-products"
              className="hidden md:flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-white group"
            >
              <i className="fas fa-plus text-sm"></i>
              <span className="font-medium text-sm">Add Product</span>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
              >
                <i className="fas fa-bell text-xl"></i>
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium">New order received</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium">
                        Product review posted
                      </p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50">
                      <p className="text-sm font-medium">Payment received</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0) || "S"}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "Seller"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <i
                  className={`fas fa-chevron-down text-gray-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                ></i>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    {/* Add Product Link - Visible on mobile */}
                    <Link
                      to="/sell-products"
                      onClick={() => setIsDropdownOpen(false)}
                      className="md:hidden flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                    >
                      <i className="fas fa-plus mr-3 text-green-600"></i>
                      <div>
                        <span className="font-medium">Add New Product</span>
                        <p className="text-xs text-gray-500">
                          List a new item for sale
                        </p>
                      </div>
                    </Link>

                    {/* Add Product Link - Visible on desktop */}
                    <Link
                      to="/sell-products"
                      onClick={() => setIsDropdownOpen(false)}
                      className="hidden md:flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                    >
                      <i className="fas fa-plus mr-3 text-green-600"></i>
                      <div>
                        <span className="font-medium">Add New Product</span>
                        <p className="text-xs text-gray-500">
                          List a new item for sale
                        </p>
                      </div>
                    </Link>

                    <div className="border-t border-gray-200 my-1 md:hidden"></div>

                    {/* Profile Settings */}
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fas fa-user mr-3"></i>
                      Profile Settings
                    </a>

                    {/* Account Settings */}
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fas fa-cog mr-3"></i>
                      Account Settings
                    </a>

                    {/* Help & Support */}
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fas fa-question-circle mr-3"></i>
                      Help & Support
                    </a>

                    {/* Back to Main Site */}
                    <Link
                      to="/"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <i className="fas fa-home mr-3 text-blue-600"></i>
                      Back to Store
                    </Link>

                    <div className="border-t border-gray-200 my-1"></div>

                    {/* Sign Out */}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <i className="fas fa-sign-out-alt mr-3"></i>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SellersHeader;
