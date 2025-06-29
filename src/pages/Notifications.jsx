import { useState } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([
  
    {
      id: 1,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #1234 has been confirmed and is being processed.',
      time: '2 hours ago',
      isRead: false,
      icon: 'fa-shopping-bag'
    },
    {
      id: 2,
      type: 'promo',
      title: 'Special Offer',
      message: 'Get 25% off on all traditional wear this weekend!',
      time: '5 hours ago',
      isRead: true,
      icon: 'fa-tag'
    },
    {
      id: 3,
      type: 'delivery',
      title: 'Package Delivered',
      message: 'Your package has been delivered successfully.',
      time: '1 day ago',
      isRead: true,
      icon: 'fa-truck'
    },
   
    {
      id: 4,
      type: 'delivery',
      title: 'Package Delivered',
      message: 'Your package has been delivered successfully.',
      time: '1 day ago',
      isRead: true,
      icon: 'fa-truck'
    },
    
    {
      id: 5,
      type: 'delivery',
      title: 'Package Delivered',
      message: 'Your package has been delivered successfully.',
      time: '1 day ago',
      isRead: true,
      icon: 'fa-truck'
    },
    {
      id: 6,
      type: 'delivery',
      title: 'Package Delivered',
      message: 'Your package has been delivered successfully.',
      time: '1 day ago',
      isRead: true,
      icon: 'fa-truck'
    },
    {
      id: 7,
      type: 'promo',
      title: 'Special Offer',
      message: 'Get 25% off on all traditional wear this weekend!',
      time: '2 days ago',
      isRead: true,
      icon: 'fa-tag'
    },
    {
      id: 8,
      type: 'promo',
      title: 'Special Offer',
      message: 'Get 25% off on all traditional wear this weekend!',
      time: '2 days ago',
      isRead: true,
      icon: 'fa-tag'
    },
    {
      id: 9,
      type: 'promo',
      title: 'Special Offer',
      message: 'Get 25% off on all traditional wear this weekend!',
      time: '2 days ago',
      isRead: true,
      icon: 'fa-tag'
    },
    {
      id: 10,
      type: 'promo',
      title: 'Special Offer',
      message: 'Get 25% off on all traditional wear this weekend!',
      time: '3 days ago',
      isRead: true,
      icon: 'fa-tag'
    },
    {
      id: 11,
      type: 'promo',
      title: 'Special Offer',
      message: 'Get 25% off on all traditional wear this weekend!',
      time: '3 days ago',
      isRead: true,
      icon: 'fa-tag'
    },
    {
      id: 12,
      type: 'promo',
      title: 'Special Offer',
      message: 'Get 25% off on all traditional wear this weekend!',
      time: '4 days ago',
      isRead: true,
      icon: 'fa-tag'
    }
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleClearNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-8" data-aos="fade-up">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Mark all as read
                </button>
                <span className="text-gray-300">|</span>
                <button 
                  onClick={clearAll}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>

          {/* Updated Notifications List with scroll */}
          <div className="max-h-[600px] overflow-y-auto divide-y divide-gray-100 custom-scrollbar">
            <style>
              {`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: #f1f1f1;
                  border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: #c5c5c5;
                  border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #a8a8a8;
                }
                .custom-scrollbar {
                  scrollbar-width: thin;
                  scrollbar-color: #c5c5c5 #f1f1f1;
                }
              `}
            </style>
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`px-6 py-4 transition-colors hover:bg-gray-50 ${
                    !notification.isRead ? 'bg-blue-50/50' : ''
                  }`}
                  //data-aos="fade-left"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`mt-1 p-2 rounded-full ${
                      notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                      notification.type === 'promo' ? 'bg-green-100 text-green-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <i className={`fas ${notification.icon}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-500">{notification.time}</span>
                          {!notification.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-xs text-blue-600 hover:text-blue-700"
                            >
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => handleClearNotification(notification.id)}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {notifications.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <i className="fas fa-bell text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
              <p className="mt-2 text-sm text-gray-500">
                You're all caught up! Check back later for new updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
