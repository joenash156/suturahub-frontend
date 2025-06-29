import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiRequest from "./utils/api";

function Login({ isOpen, onClose, onRegisterClick }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure the modal is rendered before starting the animation
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
      }, 500); // Match this with your animation duration
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Determine API endpoint based on user type
      const endpoint =
        userType === "seller" ? "/auth/login" : "/auth/buyer/login";

      // Determine request body based on user type
      const requestBody =
        userType === "seller"
          ? {
              seller_email: email,
              seller_password: password,
            }
          : {
              buyer_email: email,
              buyer_password: password,
            };

      console.log("Attempting login...");

      const data = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      // Use AuthContext login method with explicit userType
      const userData = userType === "seller" ? data.seller : data.buyer;
      userData.userType = userType;

      console.log("Login successful:", { userData, userType });

      login(data.token, userData);

      // Show success alert
      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${userData.name}!`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
      });

      onClose();

      // Redirect based on user type
      if (userType === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
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
      className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ease-in-out ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isAnimating ? "bg-opacity-50" : "bg-opacity-0"
        }`}
      >
        <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
          <div
            className={`relative transform rounded-xl bg-white text-left shadow-xl transition-all duration-300 ease-out w-[95%] mx-auto sm:w-full sm:max-w-md ${
              isAnimating
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95"
            }`}
          >
            <div className="bg-white px-6 py-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* User Type Selection */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  !userType
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8 hidden"
                }`}
              >
                <p className="text-gray-600 mb-4">
                  Please select how you want to continue:
                </p>
                <button
                  onClick={() => setUserType("buyer")}
                  className="w-full p-4 border rounded-xl hover:border-blue-500 transition-colors flex items-center space-x-3 mb-4 hover:bg-blue-50/50"
                >
                  <i className="fas fa-shopping-bag text-blue-500"></i>
                  <div className="text-left">
                    <div className="font-semibold">Continue as Buyer</div>
                    <div className="text-sm text-gray-500">
                      Shop for products and services
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setUserType("seller")}
                  className="w-full p-4 border rounded-xl hover:border-blue-500 transition-colors flex items-center space-x-3 hover:bg-blue-50/50"
                >
                  <i className="fas fa-store text-blue-500"></i>
                  <div className="text-left">
                    <div className="font-semibold">Continue as Seller</div>
                    <div className="text-sm text-gray-500">
                      List and sell your products
                    </div>
                  </div>
                </button>
              </div>

              {/* Login Form */}
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
                    Logging in as a {userType === "buyer" ? "Buyer" : "Seller"}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <i className="fas fa-envelope mr-2 text-blue-500"></i>Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <i className="fas fa-lock mr-2 text-blue-500"></i>Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-400 transition-all"
                      placeholder="Enter your password"
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg mb-4">
                    {error}
                  </div>
                )}

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
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Sign In
                    </>
                  )}
                </button>

                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      onClose();
                      onRegisterClick();
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
