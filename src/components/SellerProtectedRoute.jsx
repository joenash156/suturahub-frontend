import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "../Login";
import Register from "../Register";
import Swal from "sweetalert2";

function SellerProtectedRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    AOS.refresh();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated at all
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <i className="fas fa-store text-6xl text-blue-500 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Seller Access Required
              </h2>
              <p className="text-gray-600">
                You need to be logged in as a seller to access the selling
                features.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  // Show info alert
                  Swal.fire({
                    icon: "info",
                    title: "Seller Login Required",
                    text: "Please login with your seller credentials to continue.",
                    confirmButtonColor: "#3b82f6",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                  });
                }}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <i className="fas fa-sign-in-alt"></i>
                <span>Login as Seller</span>
              </button>

              <div className="text-sm text-gray-500">
                Don't have a seller account?
              </div>

              <button
                onClick={() => {
                  setShowRegisterModal(true);
                  // Show info alert
                  Swal.fire({
                    icon: "info",
                    title: "Create Seller Account",
                    text: "Join our platform and start selling your products today!",
                    confirmButtonColor: "#10b981",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                  });
                }}
                className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <i className="fas fa-user-plus"></i>
                <span>Register as Seller</span>
              </button>
            </div>
          </div>
        </div>

        <Login
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onRegisterClick={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
        <Register
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onLoginClick={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      </>
    );
  }

  // If authenticated but not a seller
  if (isAuthenticated && user?.userType !== "seller") {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <i className="fas fa-user-times text-6xl text-orange-500 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Seller Account Required
              </h2>
              <p className="text-gray-600 mb-4">
                Hi{" "}
                <span className="font-semibold text-blue-600">
                  {user?.name}
                </span>
                ! You're currently logged in as a buyer. To access selling
                features, you need a seller account.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setShowRegisterModal(true);
                  // Show info alert
                  Swal.fire({
                    icon: "info",
                    title: "Upgrade to Seller",
                    text: "Create a seller account to start selling your products.",
                    confirmButtonColor: "#10b981",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                  });
                }}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <i className="fas fa-store"></i>
                <span>Create Seller Account</span>
              </button>

              <div className="text-sm text-gray-500">
                Already have a seller account?
              </div>

              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <i className="fas fa-sign-in-alt"></i>
                <span>Login as Seller</span>
              </button>
            </div>
          </div>
        </div>

        <Login
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onRegisterClick={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
        <Register
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onLoginClick={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      </>
    );
  }

  // If authenticated as seller, render the children
  return children;
}

export default SellerProtectedRoute;
