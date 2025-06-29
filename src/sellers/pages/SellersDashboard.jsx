import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../../context/AuthContext";
import SellersHeader from "../components/SellersHeader";
import SellersSidebar from "../components/SellersSidebar";

function SellersDashboard() {
  const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });

  // Initialize AOS for seller dashboard
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    // Simulate API call for dashboard data
    setDashboardData({
      totalSales: 520,
      totalOrders: 4,
      totalProducts: 6,
      totalCustomers: 4,
    });
  }, []);

  const handleSidebarToggle = () => {
    // On desktop, toggle collapsed state
    // On mobile, toggle open state
    if (window.innerWidth >= 768) {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    } else {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    }
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  const statCards = [
    {
      title: "Total Sales",
      value: `¢${dashboardData.totalSales.toLocaleString()}`,
      icon: "fas fa-dollar-sign",
      color: "bg-green-500",
      change: "+6.5%",
      changeType: "increase",
    },
    {
      title: "Total Orders",
      value: dashboardData.totalOrders,
      icon: "fas fa-shopping-cart",
      color: "bg-blue-500",
      change: "+8.2%",
      changeType: "increase",
    },
    {
      title: "Total Products",
      value: dashboardData.totalProducts,
      icon: "fas fa-box",
      color: "bg-purple-500",
      change: "+3",
      changeType: "increase",
    },
    {
      title: "Total Customers",
      value: dashboardData.totalCustomers,
      icon: "fas fa-users",
      color: "bg-orange-500",
      change: "+2.3%",
      changeType: "increase",
    },
  ];

  const recentOrders = [
    {
      id: "#001",
      customer: "John Doe",
      product: "Agbada Set",
      amount: "¢450",
      status: "Completed",
    },
    {
      id: "#002",
      customer: "Jane Smith",
      product: "Kente Dress",
      amount: "¢320",
      status: "Processing",
    },
    {
      id: "#003",
      customer: "Mike Johnson",
      product: "Traditional Shirt",
      amount: "¢180",
      status: "Pending",
    },
    {
      id: "#004",
      customer: "Sarah Wilson",
      product: "Ankara Dress",
      amount: "¢275",
      status: "Completed",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellersSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />

      <div
        className={`flex-1 transition-all duration-300 
          ${
            // Desktop margin adjustment
            isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
          }
          ${
            // Mobile - no margin when sidebar is hidden
            "ml-0"
          }`}
      >
        <SellersHeader
          onSidebarToggle={handleSidebarToggle}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8" data-aos="fade-up">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your store today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {card.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <span
                        className={`text-sm font-medium ${
                          card.changeType === "increase"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <i
                          className={`fas ${
                            card.changeType === "increase"
                              ? "fa-arrow-up"
                              : "fa-arrow-down"
                          } mr-1`}
                        ></i>
                        {card.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        from last week
                      </span>
                    </div>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <i className={`${card.icon} text-white text-xl`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div
              className="bg-white rounded-xl shadow-sm border border-gray-200"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Orders
                  </h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {order.customer}
                        </p>
                        <p className="text-sm text-gray-500">{order.product}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {order.amount}
                        </p>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sales Chart */}
            <div
              className="bg-white rounded-xl shadow-sm border border-gray-200"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Sales Overview
                </h2>
              </div>
              <div className="p-6">
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <i className="fas fa-chart-line text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-500">
                      Sales chart will be displayed here
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Integration with charting library needed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            // data-aos="fade-up"
            // data-aos-delay="700"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <i className="fas fa-plus text-2xl text-gray-400 group-hover:text-blue-500 mb-2"></i>
                <p className="font-medium text-gray-700 group-hover:text-blue-700">
                  Add Product
                </p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
                <i className="fas fa-eye text-2xl text-gray-400 group-hover:text-green-500 mb-2"></i>
                <p className="font-medium text-gray-700 group-hover:text-green-700">
                  View Orders
                </p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
                <i className="fas fa-chart-bar text-2xl text-gray-400 group-hover:text-purple-500 mb-2"></i>
                <p className="font-medium text-gray-700 group-hover:text-purple-700">
                  View Analytics
                </p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group">
                <i className="fas fa-cog text-2xl text-gray-400 group-hover:text-orange-500 mb-2"></i>
                <p className="font-medium text-gray-700 group-hover:text-orange-700">
                  Settings
                </p>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SellersDashboard;
