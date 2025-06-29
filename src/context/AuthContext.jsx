import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedSeller = localStorage.getItem("seller");
    const storedBuyer = localStorage.getItem("buyer");

    if (storedToken && (storedSeller || storedBuyer)) {
      try {
        setToken(storedToken);

        if (storedSeller) {
          const sellerData = JSON.parse(storedSeller);
          sellerData.userType = "seller";
          setUser(sellerData);
        } else if (storedBuyer) {
          const buyerData = JSON.parse(storedBuyer);
          buyerData.userType = "buyer";
          setUser(buyerData);
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("seller");
        localStorage.removeItem("buyer");
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);

    let userWithType = { ...userData };

    if (!userWithType.userType) {
      if (userData.id || userData.sellerId) {
        userWithType.userType = "seller";
      } else {
        userWithType.userType = "buyer";
      }
    }

    if (userWithType.userType === "seller") {
      localStorage.setItem("seller", JSON.stringify(userWithType));
      localStorage.removeItem("buyer");
    } else {
      localStorage.setItem("buyer", JSON.stringify(userWithType));
      localStorage.removeItem("seller");
    }

    setToken(token);
    setUser(userWithType);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("seller");
    localStorage.removeItem("buyer");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    isSeller: !!token && !!user && user.userType === "seller",
    isBuyer: !!token && !!user && user.userType === "buyer",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
//     logout,
//     isAuthenticated: !!token && !!user,
//     isSeller: !!token && !!user && user.userType === "seller",
//     isBuyer: !!token && !!user && user.userType === "buyer",
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
