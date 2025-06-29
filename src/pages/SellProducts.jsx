import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import apiRequest from "../utils/api";

function SellProducts() {
  const { user, token } = useAuth();
  const [productData, setProductData] = useState({
    category: "",
    subCategory: "",
    title: "",
    description: "",
    price: "",
    quantity: "",
    sizes: [],
    colors: [],
    deliveryTime: "",
    tags: [],
    hasDiscount: false,
    discountPercent: "",
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customColor, setCustomColor] = useState("");

  const categories = {
    "Men's Wear": ["Agbada & Kaftan", "Formal Attire", "Native Styles"],
    "Women's Wear": ["Traditional Attire", "Occasion Wear", "Corporate Styles"],
    Accessories: ["Jewelry", "Bags", "Scarves"],
    Footwear: ["Men's Shoes", "Women's Shoes", "Traditional"],
  };

  const availableSizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
    "4XL",
    "Custom",
  ];
  const availableColors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#DC2626" },
    { name: "Blue", value: "#2563EB" },
    { name: "Green", value: "#16A34A" },
    { name: "Yellow", value: "#EAB308" },
    { name: "Purple", value: "#9333EA" },
    { name: "Orange", value: "#EA580C" },
    { name: "Pink", value: "#EC4899" },
    { name: "Brown", value: "#A16207" },
    { name: "Gray", value: "#6B7280" },
    { name: "Navy", value: "#1E3A8A" },
  ];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 6) {
      alert("Maximum 6 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...files]);

    // Create preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "hasDiscount") {
      setProductData((prev) => ({
        ...prev,
        hasDiscount: checked,
        discountPercent: checked ? prev.discountPercent : "", // Reset discount if unchecked
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSizeToggle = (size) => {
    setProductData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleColorToggle = (color) => {
    setProductData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    if (currentTag && !productData.tags.includes(currentTag)) {
      setProductData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setProductData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleCustomColorAdd = () => {
    if (
      customColor.trim() &&
      !productData.colors.includes(customColor.trim())
    ) {
      setProductData((prev) => ({
        ...prev,
        colors: [...prev.colors, customColor.trim()],
      }));
      setCustomColor("");
    }
  };

  // Calculate discounted price automatically
  const calculateDiscountedPrice = () => {
    const price = parseFloat(productData.price);
    const discountPercent = parseFloat(productData.discountPercent);

    if (
      productData.hasDiscount &&
      price &&
      discountPercent &&
      discountPercent > 0
    ) {
      return price - price * (discountPercent / 100);
    }
    return null;
  };

  const validateForm = () => {
    const errors = [];

    if (!productData.category) errors.push("Category is required");
    if (!productData.subCategory) errors.push("Sub Category is required");
    if (!productData.title.trim()) errors.push("Product title is required");
    if (!productData.description.trim()) errors.push("Description is required");
    if (!productData.price || parseFloat(productData.price) <= 0)
      errors.push("Valid price is required");
    if (!productData.quantity || parseInt(productData.quantity) <= 0)
      errors.push("Valid quantity is required");
    if (productData.sizes.length === 0)
      errors.push("At least one size must be selected");
    if (productData.colors.length === 0)
      errors.push("At least one color must be selected");
    if (!productData.deliveryTime) errors.push("Delivery time is required");
    if (images.length === 0)
      errors.push("At least one product image is required");

    // Discount validation
    if (productData.hasDiscount) {
      if (
        !productData.discountPercent ||
        parseFloat(productData.discountPercent) <= 0
      ) {
        errors.push(
          "Valid discount percentage is required when discount is enabled"
        );
      } else if (parseFloat(productData.discountPercent) >= 100) {
        errors.push("Discount percentage must be less than 100%");
      } else if (parseFloat(productData.discountPercent) > 99) {
        errors.push("Discount percentage cannot exceed 99%");
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: `<ul style="text-align: left;">${validationErrors
          .map((error) => `<li>${error}</li>`)
          .join("")}</ul>`,
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      // Add basic product data
      formData.append("seller_id", user.id);
      formData.append("title", productData.title.trim());
      formData.append("description", productData.description.trim());
      formData.append("category", productData.category);
      formData.append("sub_category", productData.subCategory);
      formData.append("price", parseFloat(productData.price));
      formData.append("quantity", parseInt(productData.quantity));
      formData.append("delivery_time", productData.deliveryTime);

      // Add discount data
      if (productData.hasDiscount && productData.discountPercent) {
        const discountPercent = parseFloat(productData.discountPercent);
        const discountedPrice = calculateDiscountedPrice();

        formData.append("discount_percent", discountPercent);
        formData.append("discount_price", discountedPrice);
      } else {
        formData.append("discount_percent", "");
        formData.append("discount_price", "");
      }

      // Add arrays as JSON strings
      formData.append("sizes", JSON.stringify(productData.sizes));
      formData.append("colors", JSON.stringify(productData.colors));
      formData.append("tags", JSON.stringify(productData.tags));

      // Add images
      images.forEach((image) => {
        formData.append("images", image);
      });

      console.log("Submitting product data...");

      await apiRequest("/products/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Success alert
      await Swal.fire({
        icon: "success",
        title: "Product Added Successfully!",
        text: "Your product has been added and is now live on the platform.",
        confirmButtonColor: "#10b981",
        confirmButtonText: "Great!",
      });

      // Reset form
      setProductData({
        category: "",
        subCategory: "",
        title: "",
        description: "",
        price: "",
        quantity: "",
        sizes: [],
        colors: [],
        deliveryTime: "",
        tags: [],
        hasDiscount: false,
        discountPercent: "",
      });
      setImages([]);
      setPreviewUrls([]);
      setCurrentTag("");
      setCustomColor("");
    } catch (error) {
      console.error("Error creating product:", error);

      Swal.fire({
        icon: "error",
        title: "Failed to Add Product",
        text: error.message,
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Try Again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8" data-aos="fade-up">
          {user?.userType === "seller" && (
            <Link
              to="/seller/dashboard"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors group mb-6"
            >
              <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
              <span>Back to Dashboard</span>
            </Link>
          )}

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              <i className="fas fa-plus-circle text-blue-600 mr-3"></i>
              Add New Product
            </h1>
            <p className="text-lg text-gray-600">
              Fill in the details below to list your product on our platform
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Basic Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Category Section */}
              <div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-layer-group text-blue-600"></i>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Product Category
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={productData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      required
                    >
                      <option value="">Select Category</option>
                      {Object.keys(categories).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {productData.category && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sub Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subCategory"
                        value={productData.subCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                        required
                      >
                        <option value="">Select Sub Category</option>
                        {categories[productData.category].map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details Section */}
              <div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-edit text-green-600"></i>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Product Details
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={productData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Enter an attractive product title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={productData.description}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                      placeholder="Describe your product in detail. Include materials, features, and benefits..."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 50 characters for better visibility
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Section - Enhanced with Discount */}
              <div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-dollar-sign text-yellow-600"></i>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Pricing & Inventory
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Basic Price and Quantity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₵) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                          ₵
                        </span>
                        <input
                          type="number"
                          name="price"
                          value={productData.price}
                          onChange={handleChange}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity in Stock{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={productData.quantity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                        placeholder="Available quantity"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  {/* Discount Section */}
                  <div className="border-t pt-6">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="hasDiscount"
                        name="hasDiscount"
                        checked={productData.hasDiscount}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label
                        htmlFor="hasDiscount"
                        className="ml-3 text-lg font-medium text-gray-700"
                      >
                        <i className="fas fa-percentage text-orange-500 mr-2"></i>
                        Does this product have a discount?
                      </label>
                    </div>

                    {productData.hasDiscount && (
                      <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Discount Percentage (%){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                name="discountPercent"
                                value={productData.discountPercent}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white"
                                placeholder="10"
                                min="0.01"
                                max="99"
                                step="0.01"
                                required={productData.hasDiscount}
                              />
                              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                %
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Maximum 99% discount allowed
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Discounted Price (₵)
                            </label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                ₵
                              </span>
                              <input
                                type="text"
                                value={
                                  calculateDiscountedPrice()
                                    ? `${calculateDiscountedPrice().toFixed(2)}`
                                    : ""
                                }
                                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-600"
                                placeholder="Auto-calculated"
                                disabled
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Automatically calculated from original price and
                              discount
                            </p>
                          </div>
                        </div>

                        {/* Price Preview */}
                        {productData.price &&
                          productData.discountPercent &&
                          calculateDiscountedPrice() && (
                            <div className="mt-4 p-3 bg-white rounded-lg border border-orange-300">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Price Preview:
                              </h4>
                              <div className="flex items-center space-x-4">
                                <span className="text-lg font-bold text-green-600">
                                  ₵{calculateDiscountedPrice().toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  ₵{parseFloat(productData.price).toFixed(2)}
                                </span>
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                  {productData.discountPercent}% OFF
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Customer saves: ₵
                                {(
                                  parseFloat(productData.price) -
                                  calculateDiscountedPrice()
                                ).toFixed(2)}
                              </p>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Variants Section */}
              <div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-palette text-purple-600"></i>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Product Variants
                  </h2>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Available Sizes <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                          productData.sizes.includes(size)
                            ? "bg-blue-500 text-white border-blue-500 shadow-lg scale-105"
                            : "border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {productData.sizes.length > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      <i className="fas fa-check mr-1"></i>
                      {productData.sizes.length} size
                      {productData.sizes.length > 1 ? "s" : ""} selected
                    </p>
                  )}
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Available Colors <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      {availableColors.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => handleColorToggle(color.name)}
                          className={`relative w-12 h-12 rounded-full border-3 transition-all duration-200 hover:scale-110 ${
                            productData.colors.includes(color.name)
                              ? "ring-4 ring-blue-500 ring-offset-2 scale-110"
                              : "hover:ring-2 hover:ring-gray-400 hover:ring-offset-1"
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        >
                          {productData.colors.includes(color.name) && (
                            <i className="fas fa-check absolute inset-0 flex items-center justify-center text-white text-lg drop-shadow-lg"></i>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Custom Color Input */}
                    <div className="border-t pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Custom Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Burgundy, Coral, Turquoise"
                        />
                        <button
                          type="button"
                          onClick={handleCustomColorAdd}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>

                    {productData.colors.length > 0 && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-700 font-medium mb-2">
                          Selected Colors:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {productData.colors.map((color) => (
                            <span
                              key={color}
                              className="px-3 py-1 bg-white border border-green-200 rounded-full text-sm text-green-800 flex items-center"
                            >
                              {color}
                              <button
                                type="button"
                                onClick={() => handleColorToggle(color)}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Media & Additional Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Image Upload Section */}
              <div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                // data-aos="fade-up"
                // data-aos-delay="500"
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-camera text-pink-600"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Product Images
                    </h2>
                    <p className="text-sm text-gray-500">Maximum 6 images</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {previewUrls.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200 group-hover:opacity-75 transition-opacity"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            ×
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Main
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {previewUrls.length < 6 && (
                    <label className="block">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                        <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-3"></i>
                        <p className="text-sm font-medium text-gray-600">
                          Click to upload images
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG, WebP up to 5MB each
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Tags Section */}
              <div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                // data-aos="fade-up"
                // data-aos-delay="600"
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-tags text-orange-600"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Tags
                    </h2>
                    <p className="text-sm text-gray-500">
                      Help customers find your product
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {productData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {productData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-blue-600 hover:text-red-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a tag"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleTagAdd(e))
                      }
                    />
                    <button
                      type="button"
                      onClick={handleTagAdd}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Delivery Section */}
              <div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                // data-aos="fade-right"
                // data-aos-delay="700"
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-shipping-fast text-teal-600"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Delivery
                    </h2>
                    <p className="text-sm text-gray-500">
                      Estimated delivery time
                    </p>
                  </div>
                </div>

                <select
                  name="deliveryTime"
                  value={productData.deliveryTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  required
                >
                  <option value="">Select delivery time</option>
                  <option value="1-2 days">1-2 days (Express)</option>
                  <option value="3-5 days">3-5 days (Standard)</option>
                  <option value="1-2 weeks">1-2 weeks (Custom)</option>
                  <option value="Custom">
                    Custom (Specify in description)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            // data-aos="fade-up"
            // data-aos-delay="800"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Ready to list your product?
                </h3>
                <p className="text-gray-600">
                  Review all details before publishing
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setProductData({
                      category: "",
                      subCategory: "",
                      title: "",
                      description: "",
                      price: "",
                      quantity: "",
                      sizes: [],
                      colors: [],
                      deliveryTime: "",
                      tags: [],
                      hasDiscount: false,
                      discountPercent: "",
                    });
                    setImages([]);
                    setPreviewUrls([]);
                    setCurrentTag("");
                    setCustomColor("");
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all duration-200 flex items-center"
                >
                  <i className="fas fa-undo mr-2"></i>
                  Reset Form
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg hover:shadow-xl"
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
                      Publishing Product...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-rocket mr-2"></i>
                      Publish Product
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellProducts;
