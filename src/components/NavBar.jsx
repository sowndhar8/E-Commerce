import React, { useState, useEffect } from "react";
import { Dropdown } from "antd";
import logo from "../assets/img/logo.png";
import { CgProfile } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { auth } from "../config/FireBase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Heart, Package, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/RegisterPage";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// User dropdown menu
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
      <div
        className="flex items-center gap-2 py-1 text-red-600"
        onClick={handleLogout}
      >
        <span className="font-medium">Logout</span>
      </div>
    ),
  },
];

function NavBar() {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const CartListCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  console.log(CartListCount);
  const WishListCount = wishlist.length;
  console.log(WishListCount);

  const navigate = useNavigate();


  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = JSON.parse(localStorage.getItem("USER_DATA"));
    if (storedUser) setCurrentUser(storedUser);

    // Listen for login events to update NavBar
    const handleLoginEvent = () => {
      const user = JSON.parse(localStorage.getItem("USER_DATA"));
      setCurrentUser(user);
    };

    window.addEventListener("user-logged-in", handleLoginEvent);

    return () => window.removeEventListener("user-logged-in", handleLoginEvent);
  }, []);

  // Logout handler
  const handleLogout = () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    toast.info("Logging out...", { autoClose: 1000 });

    // Remove user data from localStorage
    localStorage.removeItem("USER_DATA");
    localStorage.removeItem("ACCESS_TOKEN");
    setCurrentUser(null);

    setTimeout(() => {
      toast.success("Logged out successfully!");
      navigate("/");
      setIsLoggingOut(false);
    }, 800);
  };

  return (
    <div className="shadow-lg bg-white sticky top-0 z-40">
      <div className="flex justify-between items-center px-4 md:px-16 lg:px-40 py-4">
        {/* Logo */}
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
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 group relative"
              >
                <Heart
                  size={20}
                  fill={WishListCount > 0 ? "red" : "none"}
                  stroke={WishListCount > 0 ? "red" : "currentColor"}
                />
                {WishListCount > 0 && (
                  <span className="absolute -top-1 left-3 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {WishListCount}
                  </span>
                )}
                <span className="font-medium">Wishlist</span>
              </a>

              {/* Cart */}
              <button
                onClick={() => navigate("/cart")}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 group relative"
              >
                {CartListCount > 0 && (
                  <span className="absolute -top-1 left-3 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {CartListCount}
                  </span>
                )}
                <ShoppingCart size={20} />
                <span className="font-medium">Cart</span>
              </button>

              {/* Orders */}
              <button
                onClick={() => navigate("/orders")}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 group relative"
              >
                <Package
                  className="text-gray-600 group-hover:text-indigo-600"
                  size={20}
                />
                <span className="font-medium">Orders</span>
              </button>

              {/* User Dropdown */}
              <Dropdown
                menu={{ items: userMenu(handleLogout) }}
                trigger={["click"]}
                placement="bottomRight"
                overlayClassName="w-48"
                disabled={isLoggingOut}
              >
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoggingOut}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {currentUser?.firstname.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {currentUser?.firstname}
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
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setAuthType("signup");
                  setShowAuth(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 shadow-lg">
          {/* Similar logic for mobile menu using CartListCount & WishListCount */}
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
              <LoginPage onSuccess={() => setShowAuth(false)} />
            ) : (
              <SignUpPage onSuccess={() => setShowAuth(false)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
