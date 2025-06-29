import { useCart } from "./context/CartContext";

function Card({
  id,
  picture,
  title,
  price,
  discount_percent = null,
  discount_price = null,
  category,
  onAddToCart,
}) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = {
      id: id?.toString() || `product-${Date.now()}`,
      picture: picture || "https://via.placeholder.com/300x300",
      title: title,
      name: title,
      price: discount_price ? parseFloat(discount_price) : parseFloat(price),
      originalPrice: parseFloat(price),
      discount_percent: discount_percent ? parseFloat(discount_percent) : null,
      discount_price: discount_price ? parseFloat(discount_price) : null,
    };

    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
  };

  // Determine if product has a valid discount
  const hasDiscount =
    discount_percent &&
    discount_price &&
    parseFloat(discount_percent) > 0 &&
    parseFloat(discount_price) < parseFloat(price);

  // Simulated additional props for demo
  const inStock = true;
  const rating = 4.5;
  const reviewCount = 128;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative flex flex-col h-full">
      {/* Discount Badge - Only show if has valid discount */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg animate-pulse">
            {parseFloat(discount_percent).toFixed(0)}% OFF
          </div>
        </div>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50">
        <i className="fas fa-heart text-red-500 text-sm hover:scale-110 transition-transform duration-200"></i>
      </button>

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={picture}
          alt={title}
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        {/* Category & Status */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] sm:text-xs font-medium rounded-full">
            {category || "New"}
          </span>
          {inStock ? (
            <span className="px-1.5 py-0.5 bg-green-50 text-green-600 text-[10px] sm:text-xs font-medium rounded-full flex items-center">
              <span className="w-1 h-1 bg-green-500 rounded-full mr-1"></span>
              In Stock
            </span>
          ) : (
            <span className="px-1.5 py-0.5 bg-red-50 text-red-600 text-[10px] sm:text-xs font-medium rounded-full flex items-center">
              <span className="w-1 h-1 bg-red-500 rounded-full mr-1"></span>
              Out of Stock
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-1">
          {title}
        </h2>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex text-yellow-400 space-x-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`fas fa-star text-[10px] sm:text-xs ${
                  star <= Math.floor(rating)
                    ? "text-yellow-400"
                    : star - rating <= 0.5
                    ? "text-yellow-400 opacity-50"
                    : "text-gray-300"
                }`}
              ></i>
            ))}
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500">
            ({reviewCount})
          </p>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-1.5 mb-3">
          {hasDiscount ? (
            <>
              {/* Discounted price */}
              <p className="text-base sm:text-lg font-bold text-green-600">
                ₵{parseFloat(discount_price).toFixed(2)}
              </p>
              {/* Original price (crossed out) */}
              <p className="text-xs sm:text-sm text-gray-500 line-through">
                ₵{parseFloat(price).toFixed(2)}
              </p>
            </>
          ) : (
            /* Regular price */
            <p className="text-base sm:text-lg font-bold text-gray-800">
              ₵{parseFloat(price).toFixed(2)}
            </p>
          )}
        </div>

        {/* Discount savings display */}
        {hasDiscount && (
          <div className="mb-2">
            <p className="text-xs text-green-600 font-medium">
              You save: ₵
              {(parseFloat(price) - parseFloat(discount_price)).toFixed(2)}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-5 gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            className="col-span-4 w-full bg-blue-600 text-white py-2 px-1 text-sm sm:text-md rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 font-semibold"
          >
            <i className="fas fa-shopping-cart"></i>
            <span>Add to Cart</span>
          </button>
          <button className="col-span-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium p-2 rounded-lg transition-all duration-300 flex items-center justify-center">
            <i className="fas fa-share-alt text-[10px] sm:text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
//   );
// }

// export default Card;
