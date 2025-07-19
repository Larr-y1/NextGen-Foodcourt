'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function Navigation() {
  const pathname = usePathname();
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/order', label: 'Orders' },
    { href: '/reservations', label: 'Reservations' },
  ];

  useEffect(() => {

    const userType = localStorage.getItem('userType');
    setIsOwnerLoggedIn(userType === 'owner');
    setIsLoggedIn(!!userType);
    
    
    const savedCart = localStorage.getItem('foodCourtCart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(totalItems);
    }
    
  
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
    
    
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem('foodCourtCart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-18">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
              <span className="text-white text-2xl">Utensils</span>

            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              FoodCourt Hub
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-semibold transition-all duration-300 hover:text-orange-600 dark:hover:text-orange-400 hover:scale-105 ${
                  pathname === item.href 
                    ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <Link
              href="/signup"
              className={`text-lg font-semibold transition-all duration-300 hover:text-orange-600 dark:hover:text-orange-400 hover:scale-105 ${
                pathname === '/signup' 
                  ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Sign Up
            </Link>
            
           
            <Link
              href="/checkout"
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
               <span className="w-6 h-6 text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
           
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
            <span className="w-6 h-6 text-xl">
             {isDarkMode ? '☀️' : '🌙'}
            </span>

            </button>
            
            {isOwnerLoggedIn && (
              <Link
                href="/owner-dashboard"
                className={`text-lg font-semibold transition-all duration-300 hover:text-orange-600 dark:hover:text-orange-400 hover:scale-105 ${
                  pathname === '/owner-dashboard' 
                    ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
           
            <Link
              href="/checkout"
              className="relative p-2 text-gray-700 dark:text-gray-300"
            >
              <span className="text-xl">🛒</span>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
           
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300"
            >
            <span className="text-lg">
              {isDarkMode ? '☀️' : '🌙'}
            </span>

            </button>
            
            <select
              onChange={(e) => window.location.href = e.target.value}
              value={pathname}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {navItems.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
              {isOwnerLoggedIn && (
                <option value="/owner-dashboard">Dashboard</option>
              )}
              <option value="/signup">Sign Up</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}