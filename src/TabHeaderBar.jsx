import { useRef, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function TabHeaderBar() {
  const location = useLocation();
  const scrollContainerRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Separate main navigation from product subcategories
  const tabs = [
    { id: 'home', label: 'Home', icon: 'fas fa-home', path: '/' },
    { id: 'products', label: 'Products', icon: 'fas fa-store', path: '/products' },
    // { 
    //   id: 'categories', 
    //   label: 'Categories', 
    //   icon: 'fas fa-th-large', 
    //   path: '/products#categories',
    //   isProductTab: true 
    // },
    { id: 'about', label: 'About Us', icon: 'fas fa-info-circle', path: '/about' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope', path: '/contact' },
    // { id: 'settings', label: 'settings', icon: 'fas fa-gear', path: '/contact' }
  ];

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      setShowScrollButtons(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Enhanced active state logic to handle product subcategories
  const isActive = (tab) => {
    const { pathname, hash } = location;
    
    // If it's the home page, only activate home tab
    if (tab.path === '/' && pathname === '/') {
      return true;
    }
    
    // For product subcategories, check if we're on products page and the hash matches
    if (tab.isProductTab) {
      return pathname === '/products' && hash === tab.path.split('#')[1];
    }
    
    // For main navigation items, exact path match
    return pathname === tab.path;
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sticky top-14 z-20 shadow-lg">
      <div className="relative max-w-7xl mx-auto">
        {/* Left Scroll Button */}
        {showScrollButtons && canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-gray-800 to-transparent px-2 z-10 text-white/70 hover:text-white transition-colors flex items-center"
            aria-label="Scroll left"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-none"
          onScroll={checkScroll}
        >
          <div className="flex items-center min-w-max px-4 justify-center">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all relative
                  ${isActive(tab)
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                <i className={`${tab.icon} text-[14px]`}></i>
                <span>{tab.label}</span>
                {isActive(tab) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Scroll Button */}
        {showScrollButtons && canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-gray-800 to-transparent px-2 z-10 text-white/70 hover:text-white transition-colors flex items-center"
            aria-label="Scroll right"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default TabHeaderBar;