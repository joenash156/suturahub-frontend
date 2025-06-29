import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartCheckout() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatPrice = (price) => `¢${parseFloat(price).toFixed(2)}`;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" data-aos="fade-up">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Shopping Cart
        </h1>
        <span className="text-sm text-gray-500 font-medium">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="relative group">
                  <img
                    src={item.picture}
                    alt={item.name || "Product"}
                    className="w-28 h-28 object-cover rounded-lg ring-1 ring-gray-200"
                    onError={(e) => {
                      e.target.src = "fallback-image-url";
                      e.target.onerror = null;
                    }}
                  />
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
                    {item.quantity}
                  </span>
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-blue-600 font-medium mt-1 text-lg">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 rounded-l-md border border-gray-200 transition-colors"
                      >
                        <i className="fas fa-minus text-xs text-gray-600"></i>
                      </button>
                      <span className="w-12 h-8 flex items-center justify-center border-y border-gray-200 font-medium text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-green-50 hover:bg-green-100 rounded-r-md border border-gray-200 transition-colors"
                      >
                        <i className="fas fa-plus text-xs text-gray-600"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/products"
              className="text-sm font-medium bg-blue-500 px-2 py-1 rounded-lg text-white inline-flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all"
            >
              <i className="fas fa-bag-shopping"></i>
              <span>Continue shopping</span>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-20">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">¢{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium">¢0.00</span>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>¢{cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Including VAT</p>
              </div>
            </div>
            <Link
              to="/proceed-checkout"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <i className="fas fa-arrow-right text-sm"></i>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <i className="fas fa-shopping-bag"></i>
            <span>Continue Shopping</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartCheckout;
