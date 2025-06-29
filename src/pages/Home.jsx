import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Carousel from "../components/Carousel";

function Home() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-[calc(100vh-8rem)] relative">
      {/* Full-width carousel section */}
      <div className="w-full -mt-8" data-aos="fade-up">
        <Carousel />
      </div>

      {/* Container for other sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-blue-500 mb-4">
              <i className="fas fa-shipping-fast text-3xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Quick and reliable shipping to your doorstep
            </p>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-blue-500 mb-4">
              <i className="fas fa-medal text-3xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Quality Products
            </h3>
            <p className="text-gray-600">Handpicked premium fashion items</p>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="text-blue-500 mb-4">
              <i className="fas fa-headset text-3xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600">Always here to help you</p>
          </div>
        </div>

        {/* Categories Preview */}
        <div
          className="text-center mb-8"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Traditional Wear",
              "Modern Fashion",
              "Accessories",
              "Formal Attire",
            ].map((category, index) => (
              <Link
                key={category}
                to="/products"
                className="group relative overflow-hidden rounded-lg aspect-square"
                data-aos="fade-up"
                data-aos-delay={500 + index * 100}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10"></div>
                <img
                  src={`./src/assets/product-photos/${
                    category === "Traditional Wear"
                      ? "ab"
                      : category === "Modern Fashion"
                      ? "aa"
                      : category === "Accessories"
                      ? "ad"
                      : "ae"
                  }.jpg`}
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute bottom-4 left-4 text-white font-medium z-20">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
