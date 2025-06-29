import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./Header.jsx";
import TabHeaderBar from "./TabHeaderBar.jsx";
import Footer from "./Footer.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contacts from "./pages/Contacts.jsx";
import SellProducts from "./pages/SellProducts.jsx";
import Sidebar from "./Sidebar.jsx";
import Notifications from "./pages/Notifications";
import CartCheckout from "./pages/CartCheckout";
import ChatRobot from "./components/ChatRobot";
import SellersDashboard from "./sellers/pages/SellersDashboard";
import SellerAllProducts from "./sellers/pages/SellerAllProducts";
import ProtectedRoute from "./components/ProtectedRoute";
import SellerProtectedRoute from "./components/SellerProtectedRoute";
import NotFound from "./pages/NotFound";
import { useCart } from "./context/CartContext";
import ProceedCheckout from "./pages/ProceedCheckout";

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout({ children, onMenuClick, isSidebarOpen, closeSidebar }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Header onMenuClick={onMenuClick} />
      <TabHeaderBar />
      {children}
      <ChatRobot />
      <Footer />
    </div>
  );
}

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { addToCart } = useCart(); // <-- use context

  // Initialize AOS when component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }, []);

  // Refresh AOS on route change
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isSellerRoute = location.pathname.startsWith("/seller");

  // For seller routes, return only the seller routes without main layout
  if (isSellerRoute) {
    return (
      <Routes>
        <Route
          path="/seller/dashboard"
          element={
            <SellerProtectedRoute>
              <SellersDashboard />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/products"
          element={
            <SellerProtectedRoute>
              <SellerAllProducts />
            </SellerProtectedRoute>
          }
        />
        {/* 404 for unknown seller routes */}
        <Route path="/seller/*" element={<NotFound />} />
      </Routes>
    );
  }

  // For main app routes, use the main layout
  return (
    <MainLayout
      onMenuClick={toggleSidebar}
      isSidebarOpen={isSidebarOpen}
      closeSidebar={closeSidebar}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Products
              isSidebarOpen={isSidebarOpen}
              onCloseSidebar={closeSidebar}
              onAddToCart={addToCart} // <-- pass context addToCart
            />
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contacts />} />
        <Route
          path="/sell-products"
          element={
            <SellerProtectedRoute>
              <SellProducts />
            </SellerProtectedRoute>
          }
        />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/cart" element={<CartCheckout />} />
        <Route path="/proceed-checkout" element={<ProceedCheckout />} />
        {/* 404 page for all unmatched main routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

function App() {
  console.log("API BASE:", import.meta.env.VITE_API_BASE);
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <div className="App">
              <ScrollToTop />
              <AppContent />
            </div>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
