import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("suturahub_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem("suturahub_cart", JSON.stringify(cartItems));
      console.log("Cart saved:", cartItems);
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    console.log("Adding to cart:", product);

    if (!product.id) {
      console.error("Product must have an id");
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        // If item exists, update quantity
        const updated = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );

        Swal.fire({
          icon: "success",
          title: "Updated Cart!",
          text: `${product.title || product.name} quantity updated`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        return updated;
      }

      // If item doesn't exist, add it
      const newItem = {
        id: product.id,
        name: product.title || product.name,
        title: product.title || product.name,
        picture: product.picture,
        price: parseFloat(product.price),
        originalPrice: parseFloat(product.originalPrice || product.price),
        discount_percent: product.discount_percent,
        discount_price: product.discount_price,
        quantity: 1,
      };

      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${product.title || product.name} added to cart`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      return [...prev, newItem];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== productId);

      Swal.fire({
        icon: "info",
        title: "Item Removed",
        text: "Item removed from cart",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      return updated;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    Swal.fire({
      title: "Clear Cart?",
      text: "Remove all items from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear cart",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems([]);
        Swal.fire({
          icon: "success",
          title: "Cart Cleared",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  // Calculate total with quantities
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * (item.quantity || 1),
      0
    );
  };

  // Calculate total item count
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    cartTotal: getCartTotal(), // For backward compatibility
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
