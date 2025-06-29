import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Card from "../Card";
import { useSearch } from "../context/SearchContext";

function Products({ isSidebarOpen, onCloseSidebar, onAddToCart }) {
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // const response = await fetch("https://suturahub-backend.onrender.com/api/products");
        const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/products`);
        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          throw new Error(data.message || "Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (products) => {
    if (!searchQuery) return products;

    const searchTerm = searchQuery.toLowerCase();
    return products.filter((product) => {
      // Support both product.name and product.title
      const name = (product.name || product.title || "").toLowerCase();
      const category = (product.category || "").toLowerCase();
      const description = (product.description || "").toLowerCase();
      return (
        name.includes(searchTerm) ||
        category.includes(searchTerm) ||
        description.includes(searchTerm)
      );
    });
  };

  // Get filtered products first
  const filteredProducts = filterProducts(products);

  // Then do pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get current page's products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <p className="text-gray-600">Error loading products: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Sidebar isOpen={isSidebarOpen} onClose={onCloseSidebar} />
      <main
        className="md:ml-[280px] min-h-[calc(100vh-8rem)]"
        data-aos="fade-up"
      >
        <div className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8 border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-lg shadow-sm">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Our Products
              </h1>
              <p className="mt-2 text-gray-600">
                Browse through our collection of finest fashion items
              </p>
            </div>

            {/* Filters and Sort */}
            {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Filter:</span>
                <select className="form-select rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option>All Categories</option>
                  <option>Men's Wear</option>
                  <option>Women's Wear</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select className="form-select rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option>Latest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div> */}

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <Card
                    key={product.id}
                    id={product.id}
                    picture={
                      product.primary_image
                        ? `http://localhost:5000${product.primary_image}`
                        : "/path/to/default-image.jpg"
                    }
                    title={product.title}
                    price={product.price}
                    discount_price={product.discount_price}
                    discount_percent={product.discount_percent}
                    category={product.category}
                    onAddToCart={() =>
                      onAddToCart({
                        id: product.id?.toString(),
                        picture: product.primary_image
                          ? `http://localhost:5000${product.primary_image}`
                          : "/path/to/default-image.jpg",
                        title: product.title,
                        name: product.title,
                        price: product.discount_price
                          ? parseFloat(product.discount_price)
                          : parseFloat(product.price),
                        originalPrice: parseFloat(product.price),
                        discount_percent: product.discount_percent
                          ? parseFloat(product.discount_percent)
                          : null,
                        discount_price: product.discount_price
                          ? parseFloat(product.discount_price)
                          : null,
                      })
                    }
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    No products found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>

            {/* Updated Pagination */}
            {filteredProducts.length > productsPerPage && (
              <div className="mt-12 flex justify-center">
                <nav
                  className="flex items-center space-x-2"
                  aria-label="Pagination"
                >
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Products;
