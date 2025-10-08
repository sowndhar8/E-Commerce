import React, { useState, useEffect } from "react";
import { Badge, Dropdown } from "antd";
import logo from "../assets/img/logo.png";
import { CgProfile } from "react-icons/cg";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { auth } from "../config/FireBase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Package, ShoppingCart } from "lucide-react";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/RegisterPage";
import { toast } from "react-toastify";

// Simplified user menu - removed wishlist and orders
const userMenu = (handleLogout) => [
  {
    key: "1",
    label: (
      <a href="/profile" className="flex items-center gap-2 py-1">
        <CgProfile className="text-gray-600" />
        <span>My Profile</span>
      </a>
    ),
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: (
      <div className="flex items-center gap-2 py-1 text-red-600">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span className="font-medium">Logout</span>
      </div>
    ),
    onClick: handleLogout,
  },
];

function NavBar() {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [cart, setCart] = useState([]); // Example count
  const [wishlist, setWishlist] = useState([]); // Example count


    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);


  // ✅ Fixed: Get userData inside useEffect and listen for storage changes
  useEffect(() => {
    // Function to update user from localStorage
    const updateUserFromStorage = () => {
      const userData = JSON.parse(localStorage.getItem("USER_DATA"));
      if (userData) {
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
    };

    // Initial load
    updateUserFromStorage();

    // Listen for Firebase auth changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        updateUserFromStorage(null);
      }
      // else {
      //   setCurrentUser(null);
      // }
    });

    // ✅ Listen for custom login event
    const handleLoginEvent = () => {
      updateUserFromStorage();
    };
    window.addEventListener("user-logged-in", handleLoginEvent);

    // ✅ Listen for storage changes (when user logs in from another tab)
    window.addEventListener("storage", updateUserFromStorage);

    return () => {
      unsubscribe();
      window.removeEventListener("user-logged-in", handleLoginEvent);
      window.removeEventListener("storage", updateUserFromStorage);
    };
  }, []);

  // ✅ Fixed: Show toast before redirect with delay
  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent double-click

    try {
      setIsLoggingOut(true);

      // Show toast FIRST
      toast.success("Logging out...", {
        autoClose: 1000,
      });

      // Sign out from Firebase
      await signOut(auth);

      // Clear all localStorage
      localStorage.removeItem("USER_DATA");
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("USER_ID");

      // Update state
      setCurrentUser(null);

      console.log("User logged out successfully!");

      // Show final success message
      toast.success("Logged out successfully!");

      // // Redirect AFTER delay (let toast show)
      setTimeout(() => {
        window.location.href = "/";
      }, 1000); // 1 second delay
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed: " + error.message);
      setIsLoggingOut(false);
    }
  };

  const wishlistItems = localStorage.getItem("WISHLIST_DATA") || 0;
      const wishlistCount =localStorage.getItem('WISHLIST_Length');



  return (
    <div className="shadow-lg bg-white sticky top-0 z-40">
      {/* Navbar */}
      <div className="flex justify-between items-center px-4 md:px-16 lg:px-40 py-4">
        <a href="/">
          <img
            src={logo}
            alt="logo"
            className="w-24 md:w-32 h-fit cursor-pointer"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {currentUser ? (
            <>
              {/* Wishlist */}
              <a
                href="/wishlist"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Wishlist"
              >
<FaHeart 
  size={24} 
  className={wishlistCount > 0 ? "text-red-500 fill-red-500" : "text-gray-600"}
/>                 {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
              </a>

              {/* Cart */}
              <button 
            onClick={() => setCurrentPage('cart')}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="text-gray-600" size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

              {/* Orders */}
              <a
                href="/orders"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="My Orders"
              >
                <Package className="text-gray-600" size={24} />
              </a>

              {/* User Dropdown */}
              <Dropdown
                menu={{ items: userMenu(handleLogout) }}
                trigger={["click", "hover"]}
                placement="bottomRight"
                overlayClassName="w-48"
                disabled={isLoggingOut}
              >
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoggingOut}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {currentUser.firstname
                      ? currentUser.firstname.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {isLoggingOut ? "Logging out..." : currentUser?.firstname}
                  </span>
                  <FaChevronDown className="text-gray-400 text-xs" />
                </button>
              </Dropdown>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setAuthType("login");
                  setShowAuth(true);
                }}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                <CgProfile size={18} /> Login
              </button>
              <button
                onClick={() => {
                  setAuthType("signup");
                  setShowAuth(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 shadow-lg">
          {currentUser ? (
            <div className="pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {currentUser.firstname
                    ? currentUser.firstname.charAt(0).toUpperCase()
                    : "U"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {currentUser.firstname || "User"}
                  </p>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="space-y-1">
            {currentUser ? (
              <>
                <a
                  href="/profile"
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <CgProfile className="text-gray-500" size={20} />
                  <span>My Profile</span>
                </a>

                <a
                  href="/wishlist"
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors relative"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaHeart className="text-red-500" size={20} />
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </a>

                <a
                  href="/cart"
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors relative"
                  onClick={() => setMenuOpen(false)}
                >
                  <BsCart3 className="text-gray-500" size={20} />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 font-medium">
                      {cartCount}
                    </span>
                  )}
                </a>

                <a
                  href="/orders"
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <Package className="text-gray-500" size={20} />
                  <span>My Orders</span>
                </a>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthType("login");
                    setShowAuth(true);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors text-left"
                >
                  <CgProfile className="text-gray-500" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    setAuthType("signup");
                    setShowAuth(true);
                    setMenuOpen(false);
                  }}
                  className="w-fit flex items-center gap-3 px-3 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-left"
                >
                  <span>Register</span>
                </button>
              </>
            )}

            {currentUser && (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors mt-3 border-t border-gray-100 pt-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAuth(false)}
          ></div>

          <div
            className="relative z-10 w-[90%] max-w-md bg-white rounded-xl shadow-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg transition-colors"
            >
              ✕
            </button>

            {authType === "login" ? (
              <div>
                <LoginPage onSuccess={() => setShowAuth(false)} />
                <p className="text-center mt-6 text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setAuthType("signup")}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Register
                  </button>
                </p>
              </div>
            ) : (
              <div>
                <SignUpPage onSuccess={() => setShowAuth(false)} />
                <p className="text-center mt-6 text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => setAuthType("login")}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Login
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
