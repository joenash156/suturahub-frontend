import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const carouselData = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Discover the latest trends in African fashion",
    image: "./src/assets/product-photos/ab.jpg",
    position: "center",
  },
  {
    id: 2,
    title: "Traditional Elegance",
    subtitle: "Embrace your culture with our premium collection",
    image: "./src/assets/product-photos/aa.jpg",
    position: "top",
  },
  {
    id: 3,
    title: "Modern African Style",
    subtitle: "Where tradition meets contemporary fashion",
    image: "./src/assets/product-photos/ad.jpg",
    position: "center",
  },
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(
        (prev) => (prev - 1 + carouselData.length) % carouselData.length
      );
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[70vh] w-full overflow-hidden group">
      {/* Ensure content is rendering */}
      {carouselData.length > 0 && (
        <>
          {/* Slides */}
          {carouselData.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform
                ${
                  index === currentSlide
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
              onTransitionEnd={() => setIsAnimating(false)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover object-${slide.position}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="max-w-xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 transform transition-all duration-700 delay-100">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 transform transition-all duration-700 delay-200">
                      {slide.subtitle}
                    </p>
                    <Link
                      to="/products"
                      className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Shop Now
                      <i className="fas fa-arrow-right ml-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                  ${
                    index === currentSlide
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Carousel;
