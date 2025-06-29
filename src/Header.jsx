import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "./context/SearchContext";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import Login from "./Login";
import Register from "./Register";
import Swal from "sweetalert2";

function Header({ onMenuClick }) {
  const mobileSearchInputRef = useRef(null);
  const { handleSearch } = useSearch();
  const {
    cartItems,
    clearCart,
    removeFromCart,
    updateQuantity,
    getCartItemsCount,
    getCartTotal,
  } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".account-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchInput);
    setIsMobileSearchVisible(false); // Close mobile search after submission
  };

  // Function to handle mobile search toggle
  const handleMobileSearchToggle = () => {
    setIsMobileSearchVisible((prev) => !prev);
    // Focus input after visibility transition
    setTimeout(() => {
      mobileSearchInputRef.current?.focus();
    }, 100);
  };

  // Calculate total quantity of items - FIXED
  const totalQuantity = getCartItemsCount();
  const totalAmount = getCartTotal();

  console.log("Header - Cart items:", cartItems);
  console.log("Header - Total quantity:", totalQuantity);

  // Helper function to get user's first name
  const getFirstName = (fullName) => {
    if (!fullName) return "";
    return fullName.split(" ")[0];
  };

  // Helper function to get user type display
  const getUserTypeDisplay = (userType) => {
    if (userType === "buyer") return "Buyer";
    if (userType === "seller") return "Seller";
    return userType || "User";
  };

  // Handle sign out with SweetAlert
  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to sign out of your account?",
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
        text: "You have been logged out of your account.",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white z-30 shadow-lg backdrop-blur-sm bg-opacity-95 transition-all duration-300 ${
          isMobileSearchVisible ? "h-[104px] sm:h-14" : "h-14"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full">
          <div className="flex items-center justify-between h-14 px-4">
            {/* Left Section */}
            <div className="flex items-center space-x-4 md:space-x-6 flex-shrink-0">
              {/* Remove conditional rendering and always show hamburger on mobile */}
              <button
                id="hamburger"
                className="md:hidden w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                onClick={onMenuClick}
                aria-label="Toggle menu"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>

              {/* Updated logo section with smaller text on mobile */}
              <div className="flex items-center space-x-2 transition-all duration-200">
                <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-blue-500/30">
                  <img
                    src="./src/assets/logo/logo.png"
                    alt="logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="hidden sm:block font-semibold tracking-wide text-[14px] md:text-lg transition-all duration-200">
                  Sutura<span className="text-blue-400">Hub</span>
                </span>
              </div>
            </div>

            {/* Center Section - Search Bar */}
            <div className="hidden sm:block flex-1 max-w-xl px-4">
              <form
                onSubmit={handleSearchSubmit}
                className={`relative flex items-center transition-all duration-200 ${
                  isSearchFocused ? "scale-102" : ""
                }`}
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full h-9 px-4 pl-10 rounded-l-lg text-gray-300 focus:text-gray-800 bg-white/10 border border-r-0 border-gray-700 focus:bg-white focus:text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                    placeholder="Search designs, styles, categories..."
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
                <button
                  type="submit"
                  className="h-9 px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                className="sm:hidden w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
                onClick={handleMobileSearchToggle}
              >
                <i className="fas fa-search text-xl"></i>
              </button>

              <Link
                to="/notifications"
                className="group relative h-9 w-9 rounded-md hover:bg-gray-700 transition-all flex items-center justify-center"
              >
                <i className="fas fa-bell text-xl"></i>
                <span className="font-bold absolute top-0.5 -right-1 h-4 w-4 flex items-center justify-center text-xs text-white bg-green-600 rounded-full p-2.5">
                  12
                </span>
                <div className="absolute -translate-x-1/2 left-4 top-10 mt-2 pointer-events-none">
                  <span className="block px-2 py-1 bg-gray-200 text-xs text-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-semibold">
                    Notifications
                  </span>
                </div>
              </Link>

              {/* Cart Icon - FIXED */}
              <div className="relative">
                <button
                  onClick={() => setIsWishlistOpen(!isWishlistOpen)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors relative group"
                >
                  <i className="fas fa-shopping-cart text-xl"></i>
                  {/* GREEN CART BADGE - NOW WORKING */}
                  {totalQuantity > 0 && (
                    <span className="absolute top-1 -right-1 bg-green-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg animate-pulse">
                      {totalQuantity}
                    </span>
                  )}
                </button>

                {/* Cart Dropdown - FIXED */}
                <div
                  className={`absolute sm:-right-7 -right-14 top-full mt-2 w-80 bg-gray-800 rounded-lg shadow-xl transition-all duration-200 transform border border-gray-700 z-50
                    ${
                      isWishlistOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible translate-y-2"
                    }`}
                >
                  <div className="p-4 flex flex-col space-y-4">
                    {/* Cart Header */}
                    <div className="text-gray-300 font-medium flex items-center justify-between border-b border-gray-700 pb-2">
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-shopping-cart text-green-500"></i>
                        <span>My Cart</span>
                      </div>
                      <span className="text-sm text-gray-300">
                        {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                      </span>
                    </div>

                    {cartItems.length > 0 ? (
                      <>
                        {/* Cart Items */}
                        <div className="max-h-72 overflow-y-auto space-y-2 scrollbar-none">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 p-3 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-700/50"
                            >
                              {/* Product Image */}
                              <div className="relative flex-shrink-0">
                                <img
                                  src={item.picture}
                                  alt={item.name || item.title}
                                  className="w-16 h-16 object-cover rounded-md border border-gray-600"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/64x64?text=No+Image";
                                  }}
                                />
                                {item.discount_percent && (
                                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full">
                                    {Math.round(item.discount_percent)}%
                                  </span>
                                )}
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-200 truncate mb-1">
                                  {item.name || item.title}
                                </h4>
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-sm font-bold text-green-400">
                                    ₵{parseFloat(item.price).toFixed(2)}
                                  </span>
                                  {item.originalPrice &&
                                    parseFloat(item.originalPrice) !==
                                      parseFloat(item.price) && (
                                      <span className="text-xs text-gray-500 line-through">
                                        ₵
                                        {parseFloat(item.originalPrice).toFixed(
                                          2
                                        )}
                                      </span>
                                    )}
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="w-6 h-6 flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-white rounded-full text-xs transition-colors"
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                  <span className="text-sm font-medium text-gray-300 min-w-[2rem] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="w-6 h-6 flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-white rounded-full text-xs transition-colors"
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div>

                              {/* Item Total & Remove */}
                              <div className="text-right flex flex-col items-end space-y-2">
                                <span className="text-sm font-bold text-blue-400">
                                  ₵
                                  {(
                                    parseFloat(item.price) * item.quantity
                                  ).toFixed(2)}
                                </span>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-400 hover:text-red-300 text-xs transition-colors p-1"
                                  title="Remove item"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Cart Total */}
                        <div className="border-t border-gray-700 pt-3">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-300 font-medium">
                              Total Amount:
                            </span>
                            <span className="text-lg font-bold text-green-400">
                              ₵{totalAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Cart Actions */}
                        <div className="flex flex-col gap-2 pt-2">
                          <Link
                            to="/cart"
                            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 group"
                            onClick={() => setIsWishlistOpen(false)}
                          >
                            <i className="fas fa-shopping-cart text-sm group-hover:scale-110 transition-transform"></i>
                            <span className="font-medium">View Cart</span>
                          </Link>
                          <button
                            onClick={() => {
                              clearCart();
                              setIsWishlistOpen(false);
                            }}
                            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 group"
                          >
                            <i className="fas fa-trash-alt text-sm group-hover:scale-110 transition-transform"></i>
                            <span className="font-medium">Clear Cart</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      /* Empty Cart State */
                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-4">
                          <i className="fas fa-shopping-cart text-4xl mb-3"></i>
                          <p className="text-lg font-medium">
                            Your cart is empty
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Add some products to get started
                          </p>
                        </div>
                        <Link
                          to="/products"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          onClick={() => setIsWishlistOpen(false)}
                        >
                          <i className="fas fa-shopping-bag text-sm"></i>
                          <span>Browse Products</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sell Button - Show for all users but with different behavior */}
              <Link
                to={
                  isAuthenticated && user?.userType === "seller"
                    ? "/seller/dashboard"
                    : "/sell-products"
                }
                className="hidden [@media(min-width:371px)]:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 h-9 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/20 group relative"
              >
                <i className="fa fa-shopping-bag text-sm"></i>
                <span className="font-semibold text-sm">SELL</span>
                <div className="absolute -translate-x-1/2 left-8 top-10 mt-2 pointer-events-none">
                  <span className="block px-2 py-1 bg-gray-200 text-xs text-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-semibold">
                    {isAuthenticated && user?.userType === "seller"
                      ? "Seller Dashboard"
                      : "Start Selling"}
                  </span>
                </div>
              </Link>

              <div className="relative account-dropdown">
                <button
                  className="flex items-center space-x-2 h-10 px-2 md:px-3 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
                    {isAuthenticated ? (
                      <span className="text-sm font-semibold text-blue-400">
                        {getFirstName(user?.name)?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </span>
                    ) : (
                      <i className="fas fa-user text-sm text-gray-400"></i>
                    )}
                  </div>
                  <div className="hidden md:flex items-center space-x-1 font-semibold text-gray-200">
                    <span className="text-sm">
                      {isAuthenticated ? getFirstName(user?.name) : "Account"}
                    </span>
                    <i
                      className={`fas fa-chevron-down text-xs transition-transform duration-200 text-blue-500 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    ></i>
                  </div>
                </button>

                <div
                  className={`absolute right-0 top-full mt-2 w-64 bg-gray-800 rounded-lg shadow-xl transition-all duration-200 transform
                    ${
                      isDropdownOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible translate-y-2"
                    }`}
                >
                  <div className="p-2 space-y-1">
                    {isAuthenticated ? (
                      // Authenticated user dropdown
                      <>
                        {/* User Info Section */}
                        <div className="px-4 py-3 border-b border-gray-700">
                          <p className="text-sm font-medium text-gray-200 truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {user?.email}
                          </p>
                          <span className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium bg-blue-600 text-white rounded-full">
                            <i
                              className={`fas ${
                                user?.userType === "seller"
                                  ? "fa-store"
                                  : "fa-shopping-bag"
                              } mr-1`}
                            ></i>
                            {getUserTypeDisplay(user?.userType)}
                          </span>
                        </div>

                        {/* Dashboard Link for Sellers */}
                        {user?.userType === "seller" && (
                          <Link
                            to="/seller/dashboard"
                            onClick={() => setIsDropdownOpen(false)}
                            className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 rounded-lg transition-colors group"
                          >
                            <i className="fas fa-tachometer-alt w-5 text-blue-400"></i>
                            <span>Dashboard</span>
                          </Link>
                        )}

                        {/* Profile Link */}
                        <button
                          onClick={() => setIsDropdownOpen(false)}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 rounded-lg transition-colors group"
                        >
                          <i className="fas fa-user w-5 text-gray-400"></i>
                          <span>Profile</span>
                        </button>

                        {/* Orders Link */}
                        <button
                          onClick={() => setIsDropdownOpen(false)}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 rounded-lg transition-colors group"
                        >
                          <i className="fas fa-shopping-bag w-5 text-gray-400"></i>
                          <span>My Orders</span>
                        </button>

                        {/* Settings Link */}
                        <button
                          onClick={() => setIsDropdownOpen(false)}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 rounded-lg transition-colors group"
                        >
                          <i className="fas fa-cog w-5 text-gray-400"></i>
                          <span>Settings</span>
                        </button>

                        {/* Sell Link for all users in mobile dropdown */}
                        <Link
                          to={
                            user?.userType === "seller"
                              ? "/seller/dashboard"
                              : "/sell-products"
                          }
                          onClick={() => setIsDropdownOpen(false)}
                          className="[@media(min-width:371px)]:hidden w-full flex items-center space-x-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 rounded-lg transition-colors group bg-blue-600/10"
                        >
                          <i
                            className={`${
                              user?.userType === "seller"
                                ? "fas fa-tachometer-alt"
                                : "fa fa-shopping-bag"
                            } w-5 text-blue-500`}
                          ></i>
                          <span>
                            {user?.userType === "seller"
                              ? "Dashboard"
                              : "Start Selling"}
                          </span>
                        </Link>

                        {/* Sign Out Button */}
                        <div className="border-t border-gray-700 pt-1 mt-1">
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center space-x-3 px-4 py-2.5 text-red-400 hover:bg-red-600/10 hover:text-red-300 rounded-lg transition-colors group"
                          >
                            <i className="fas fa-sign-out-alt w-5"></i>
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      // Non-authenticated user dropdown
                      <>
                        {/* Mobile Sell Button for non-authenticated users */}
                        <Link
                          to="/sell-products"
                          onClick={() => setIsDropdownOpen(false)}
                          className="[@media(min-width:371px)]:hidden flex items-center space-x-3 px-4 py-2.5 text-gray-200 hover:bg-gray-50 hover:text-gray-600 font-semibold rounded-lg transition-colors group bg-blue-600/10"
                        >
                          <i className="fa fa-shopping-bag w-5 text-blue-500"></i>
                          <span>Start Selling</span>
                        </Link>
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setIsLoginOpen(true);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-200 hover:bg-gray-50 hover:text-gray-600 font-semibold rounded-lg transition-colors group"
                        >
                          <i className="fa-solid fa-right-to-bracket w-5 text-gray-200 group-hover:text-blue-500"></i>
                          <span>Login</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setIsRegisterOpen(true);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-200 hover:bg-gray-50 hover:text-gray-600 font-semibold rounded-lg transition-colors group"
                        >
                          <i className="fas fa-user-plus w-5 text-gray-200 group-hover:text-blue-500"></i>
                          <span>Register</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div
            className={`sm:hidden px-4 transition-all duration-300 transform overflow-hidden ${
              isMobileSearchVisible
                ? "h-12 opacity-100 translate-y-0"
                : "h-0 opacity-0 -translate-y-4"
            }`}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="relative py-2 flex items-center"
            >
              <div className="flex-1 relative">
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full h-9 px-4 pl-10 rounded-l-lg text-gray-800 bg-white/10 border border-r-0 border-gray-700 focus:bg-white focus:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-400"
                  placeholder="Search designs..."
                />
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>
              <button
                type="submit"
                className="h-9 px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </header>

      <div
        className={`transition-all duration-300 ${
          isMobileSearchVisible ? "h-[92px] sm:h-14" : "h-14"
        }`}
      ></div>

      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onLoginClick={() => setIsLoginOpen(true)}
      />
    </>
  );
}

export default Header;
