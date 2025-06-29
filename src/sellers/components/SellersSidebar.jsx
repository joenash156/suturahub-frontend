import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SellersSidebar({
  isCollapsed,
  onToggle,
  isMobileOpen,
  onMobileClose,
}) {
  const location = useLocation();
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuItems = [
    {
      id: "dashboard",
      icon: "fas fa-tachometer-alt",
      label: "Dashboard",
      path: "/seller/dashboard",
    },
    {
      id: "products",
      icon: "fas fa-box",
      label: "Products",
      path: "/seller/products",
      submenu: [
        { label: "All Products", path: "/seller/products" },
        { label: "Add Product", path: "/sell-products" },
        { label: "Categories", path: "/seller/products/categories" },
      ],
    },
    {
      id: "orders",
      icon: "fas fa-shopping-cart",
      label: "Orders",
      path: "/seller/orders",
      badge: "12",
    },
    {
      id: "customers",
      icon: "fas fa-users",
      label: "Customers",
      path: "/seller/customers",
    },
    {
      id: "analytics",
      icon: "fas fa-chart-line",
      label: "Analytics",
      path: "/seller/analytics",
    },
    {
      id: "payments",
      icon: "fas fa-credit-card",
      label: "Payments",
      path: "/seller/payments",
    },
    {
      id: "reviews",
      icon: "fas fa-star",
      label: "Reviews",
      path: "/seller/reviews",
    },
    {
      id: "settings",
      icon: "fas fa-cog",
      label: "Settings",
      path: "/seller/settings",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onMobileClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 min-h-screen fixed left-0 top-0 z-50
          ${
            // Desktop behavior
            isCollapsed ? "md:w-16" : "md:w-64"
          }
          ${
            // Mobile behavior
            isMobileOpen
              ? "w-64 translate-x-0"
              : "w-64 -translate-x-full md:translate-x-0"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <img
                src="/src/assets/logo/logo.png"
                alt="Logo"
                className="h-8 w-8 rounded-full"
              />
              <span className="font-bold text-lg">SellerHub</span>
            </div>
          )}
          {/* Desktop toggle button */}
          <button
            onClick={onToggle}
            className="hidden md:block p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <i
              className={`fas ${
                isCollapsed ? "fa-chevron-right" : "fa-chevron-left"
              }`}
            ></i>
          </button>
          {/* Mobile close button */}
          <button
            onClick={onMobileClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <div>
                  {item.submenu ? (
                    <button
                      onClick={() =>
                        setActiveSubmenu(
                          activeSubmenu === item.id ? null : item.id
                        )
                      }
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-colors ${
                        isActive(item.path) ? "bg-blue-600" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <i className={`${item.icon} text-lg`}></i>
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>
                      {!isCollapsed && (
                        <i
                          className={`fas fa-chevron-down transition-transform ${
                            activeSubmenu === item.id ? "rotate-180" : ""
                          }`}
                        ></i>
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={onMobileClose} // Close mobile sidebar on navigation
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-colors ${
                        isActive(item.path) ? "bg-blue-600" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <i className={`${item.icon} text-lg`}></i>
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>
                      {!isCollapsed && item.badge && (
                        <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}

                  {/* Submenu */}
                  {item.submenu &&
                    activeSubmenu === item.id &&
                    !isCollapsed && (
                      <ul className="mt-2 ml-6 space-y-1">
                        {item.submenu.map((subItem, index) => (
                          <li key={index}>
                            <Link
                              to={subItem.path}
                              onClick={onMobileClose} // Close mobile sidebar on navigation
                              className={`block px-3 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${
                                isActive(subItem.path) ? "bg-blue-600" : ""
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-sm font-medium">Need Help?</p>
              <p className="text-xs text-gray-400 mt-1">
                Contact our support team
              </p>
              <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors">
                Get Support
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export default SellersSidebar;
