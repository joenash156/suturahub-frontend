import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

function ProceedCheckout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    region: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    // Mobile Money
    mobileNumber: "",
    // Card
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const totalAmount = getCartTotal();
  const shippingFee = 15.0;
  const taxAmount = totalAmount * 0.125; // 12.5% VAT
  const finalTotal = totalAmount + shippingFee + taxAmount;

  const paymentMethods = [
    {
      id: "mtn",
      name: "MTN Mobile Money",
      icon: "fas fa-mobile-alt",
      color: "bg-yellow-500",
      description: "Pay with your MTN MoMo wallet",
    },
    {
      id: "telecel",
      name: "Telecel Cash",
      icon: "fas fa-mobile-alt",
      color: "bg-red-500",
      description: "Pay with your Telecel Cash wallet",
    },
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: "fas fa-credit-card",
      color: "bg-blue-500",
      description: "Visa, Mastercard accepted",
    },
  ];

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "billing") {
      setBillingInfo((prev) => ({ ...prev, [name]: value }));
    } else if (section === "payment") {
      setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentDetails((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentDetails((prev) => ({ ...prev, expiryDate: formatted }));
  };

  const validateForm = () => {
    // Check billing info
    const requiredBillingFields = [
      "fullName",
      "email",
      "phone",
      "address",
      "city",
      "region",
    ];
    for (const field of requiredBillingFields) {
      if (!billingInfo[field].trim()) {
        return `Please fill in your ${field
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()}`;
      }
    }

    // Check payment method
    if (!selectedPaymentMethod) {
      return "Please select a payment method";
    }

    // Validate payment details based on method
    if (
      selectedPaymentMethod === "mtn" ||
      selectedPaymentMethod === "telecel"
    ) {
      if (!paymentDetails.mobileNumber.trim()) {
        return "Please enter your mobile number";
      }
      if (!/^0\d{9}$/.test(paymentDetails.mobileNumber)) {
        return "Please enter a valid mobile number (10 digits starting with 0)";
      }
    } else if (selectedPaymentMethod === "card") {
      const requiredCardFields = [
        "cardNumber",
        "expiryDate",
        "cvv",
        "cardName",
      ];
      for (const field of requiredCardFields) {
        if (!paymentDetails[field].trim()) {
          return `Please fill in the ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()}`;
        }
      }
      // Additional card validations
      const cleanCardNumber = paymentDetails.cardNumber.replace(/\s/g, "");
      if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
        return "Please enter a valid card number";
      }
      if (paymentDetails.cvv.length < 3) {
        return "Please enter a valid CVV";
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: validationError,
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Show success message
      await Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: `Your order has been placed successfully. You will receive a confirmation email shortly.`,
        confirmButtonColor: "#10b981",
        confirmButtonText: "Continue Shopping",
      });

      // Clear cart and redirect
      clearCart();
      navigate("/");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "There was an error processing your payment. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Show login message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-gray-100">
          <i className="fas fa-lock text-4xl text-blue-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Login Required
          </h2>
          <p className="text-gray-600 mb-4">
            You must be logged in to proceed with checkout.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8" data-aos="fade-up">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              to="/cart"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
              <span>Back to Cart</span>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">
            Complete your order by providing your payment and shipping details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <div
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-user text-blue-600"></i>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Billing Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={billingInfo.fullName}
                    onChange={(e) => handleInputChange(e, "billing")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={(e) => handleInputChange(e, "billing")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={billingInfo.phone}
                    onChange={(e) => handleInputChange(e, "billing")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="0201234567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={billingInfo.city}
                    onChange={(e) => handleInputChange(e, "billing")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your city"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={billingInfo.address}
                    onChange={(e) => handleInputChange(e, "billing")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your full address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="region"
                    value={billingInfo.region}
                    onChange={(e) => handleInputChange(e, "billing")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Region</option>
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="Ashanti">Ashanti</option>
                    <option value="Western">Western</option>
                    <option value="Central">Central</option>
                    <option value="Eastern">Eastern</option>
                    <option value="Volta">Volta</option>
                    <option value="Northern">Northern</option>
                    <option value="Upper East">Upper East</option>
                    <option value="Upper West">Upper West</option>
                    <option value="Brong Ahafo">Brong Ahafo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-credit-card text-green-600"></i>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedPaymentMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center`}
                      >
                        <i className={`${method.icon} text-white text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {method.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {method.description}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          selectedPaymentMethod === method.id
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPaymentMethod === method.id && (
                          <i className="fas fa-check text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Details Form */}
              {selectedPaymentMethod && (
                <div className="border-t pt-6">
                  {(selectedPaymentMethod === "mtn" ||
                    selectedPaymentMethod === "telecel") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={paymentDetails.mobileNumber}
                        onChange={(e) => handleInputChange(e, "payment")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="0201234567"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        You will receive a payment prompt on this number
                      </p>
                    </div>
                  )}

                  {selectedPaymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentDetails.cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handleExpiryChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={(e) => handleInputChange(e, "payment")}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="123"
                            maxLength="4"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={paymentDetails.cardName}
                          onChange={(e) => handleInputChange(e, "payment")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="Name on card"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.picture}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₵{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₵{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₵{shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (12.5%)</span>
                  <span>₵{taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₵{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                {isProcessing ? (
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
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock mr-2"></i>
                    Complete Payment ₵{finalTotal.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                <i className="fas fa-shield-alt mr-1"></i>
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProceedCheckout;
