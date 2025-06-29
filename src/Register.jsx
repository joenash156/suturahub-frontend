import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Register({ isOpen, onClose, onLoginClick }) {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    location: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Animation effect
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match. Please try again.",
        confirmButtonColor: "#3b82f6",
      });
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Password Too Short",
        text: "Password must be at least 6 characters long.",
        confirmButtonColor: "#3b82f6",
      });
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Determine API endpoint based on user type
      const endpoint =
        userType === "seller"
          ? `${import.meta.env.VITE_API_BASE}/api/auth/signup`
          : `${import.meta.env.VITE_API_BASE}/api/auth/buyer/signup`;
      // const endpoint =
      //   userType === "seller"
      //     ? "http://localhost:5000/api/auth/signup"
      //     : "http://localhost:5000/api/auth/buyer/signup";
      // const endpoint =
      //   userType === "seller"
      //     ? "https://suturahub-backend.onrender.com/api/auth/signup"
      //     : "https://suturahub-backend.onrender.com/api/auth/buyer/signup";


      // Determine request body based on user type
      const requestBody =
        userType === "seller"
          ? {
              seller_name: formData.fullName,
              seller_email: formData.email,
              seller_password: formData.password,
              seller_phone: formData.phoneNumber,
              seller_location: formData.location,
            }
          : {
              buyer_name: formData.fullName,
              buyer_email: formData.email,
              buyer_password: formData.password,
              buyer_phone: formData.phoneNumber,
              buyer_location: formData.location,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Show success alert
      await Swal.fire({
        icon: "success",
        title: "Account Created Successfully!",
        text: "Your account has been created. You can now login.",
        confirmButtonColor: "#10b981",
        confirmButtonText: "Continue to Login",
      });

      setSuccessMessage(data.message);
      onClose();
      onLoginClick();
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
        confirmButtonColor: "#3b82f6",
        confirmButtonText: "Try Again",
      });

      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ease-in-out ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isAnimating ? "bg-opacity-50" : "bg-opacity-0"
        }`}
      >
        <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
          <div
            className={`relative transform rounded-lg bg-white text-left shadow-xl transition-all duration-300 ease-out w-[95%] mx-auto sm:w-full sm:max-w-md ${
              isAnimating
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95"
            }`}
            style={{ maxHeight: "calc(100vh - 4rem)" }}
          >
            <div className="h-full flex flex-col max-h-[calc(100vh-4rem)]">
              <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Create Account
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>

              <div className="flex-1 px-6 py-4 overflow-y-auto custom-scrollbar">
                <style>
                  {`
                    .custom-scrollbar::-webkit-scrollbar {
                      width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background:rgb(241, 241, 241);
                      border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background: #c5c5c5;
                      border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                      background: #a8a8a8;
                    }
                    .custom-scrollbar {
                      scrollbar-width: thin;
                      scrollbar-color: #c5c5c5 #f1f1f1;
                    }
                  `}
                </style>

                {/* User Type Selection */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    !userType
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8 hidden"
                  }`}
                >
                  <p className="text-gray-600 mb-4">
                    Please select your account type:
                  </p>
                  <button
                    onClick={() => setUserType("buyer")}
                    className="w-full p-4 border rounded-lg hover:border-blue-500 transition-colors flex items-center space-x-3 mb-4 hover:bg-blue-50/50"
                  >
                    <i className="fas fa-shopping-bag text-blue-500 text-xl"></i>
                    <div className="text-left">
                      <div className="font-semibold">Register as Buyer</div>
                      <div className="text-sm text-gray-500">
                        Shop for amazing products
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setUserType("seller")}
                    className="w-full p-4 border rounded-lg hover:border-blue-500 transition-colors flex items-center space-x-3 hover:bg-blue-50/50"
                  >
                    <i className="fas fa-store text-blue-500 text-xl"></i>
                    <div className="text-left">
                      <div className="font-semibold">Register as Seller</div>
                      <div className="text-sm text-gray-500">
                        Start selling your products
                      </div>
                    </div>
                  </button>
                </div>

                {/* Registration Form */}
                <form
                  onSubmit={handleSubmit}
                  className={`transition-all duration-300 ease-in-out ${
                    userType
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8 hidden"
                  } space-y-4`}
                >
                  <div className="flex items-center mb-6">
                    <button
                      type="button"
                      onClick={() => setUserType("")}
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      Back
                    </button>
                    <span className="ml-3 text-gray-600 text-lg font-semibold">
                      Register as a {userType === "buyer" ? "Buyer" : "Seller"}
                    </span>
                  </div>

                  {/* Error and Success Messages */}
                  {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                      {error}
                    </div>
                  )}
                  {successMessage && (
                    <div className="p-3 text-sm text-green-500 bg-green-50 rounded-lg">
                      {successMessage}
                    </div>
                  )}

                  {/* Form Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <i className="fas fa-user mr-2 text-blue-500"></i>Full
                      Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-400 transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <i className="fas fa-envelope mr-2 text-blue-500"></i>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-400 transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <i className="fas fa-phone mr-2 text-blue-500"></i>Phone
                      Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-400 transition-all"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <i className="fas fa-location-dot mr-2 text-blue-500"></i>
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-400 transition-all"
                      placeholder="Enter your current location"
                      required
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <i className="fas fa-lock mr-2 text-blue-500"></i>Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit(e);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-400 transition-all"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`fas ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <i className="fas fa-lock mr-2 text-blue-500"></i>Confirm
                      Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-400 transition-all"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/50 font-medium flex items-center justify-center focus:outline-none disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Creating account...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus mr-2"></i>
                        Create Account
                      </>
                    )}
                  </button>

                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        onClose();
                        onLoginClick();
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
