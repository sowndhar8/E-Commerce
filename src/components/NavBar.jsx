import React, { useState } from "react";
import { Badge } from "antd";
import logo from "../assets/img/logo.png";
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";

// Import your modals
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/RegisterPage";

function NavBar() {
  const [showAuth, setShowAuth] = useState(false); // one modal for both
  const [authType, setAuthType] = useState("login"); // "login" or "signup"
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu toggle

  return (
    <div className="shadow-2xl text-black">
      {/* NavBar */}
      <div className="flex justify-between items-center px-4 md:px-16 lg:px-40 py-4 relative">
        {/* Logo */}
        <img src={logo} alt="logo" className="w-24 md:w-32 h-fit" />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <button
            onClick={() => {
              setAuthType("login");
              setShowAuth(true);
            }}
            className="flex items-center gap-1 text-lg"
          >
            <CgProfile size={20} /> Login
          </button>
          <button
            onClick={() => {
              setAuthType("signup");
              setShowAuth(true);
            }}
            className="text-lg"
          >
            Register
          </button>

          <a href="/wishlist" className="flex items-center gap-1 text-lg">
            <FaHeart size={20} color="red" />
            WishList
          </a>

          <a href="/cart" className="flex items-center gap-1 text-lg">
            <Badge size="small" count={2}>
              <BsCart3 size={20} />
            </Badge>
            Cart
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 shadow-md">
          <button
            onClick={() => {
              setAuthType("login");
              setShowAuth(true);
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left"
          >
            <CgProfile size={20} /> Login
          </button>
          <button
            onClick={() => {
              setAuthType("signup");
              setShowAuth(true);
              setMenuOpen(false);
            }}
            className="w-full text-left"
          >
            Register
          </button>
          <a
            href="/wishlist"
            className="flex items-center gap-2 text-left"
            onClick={() => setMenuOpen(false)}
          >
            <FaHeart size={20} color="red" /> WishList
          </a>
          <a
            href="/cart"
            className="flex items-center gap-2 text-left"
            onClick={() => setMenuOpen(false)}
          >
            <Badge size="small" count={2}>
              <BsCart3 size={20} />
            </Badge>{" "}
            Cart
          </a>
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAuth(false)}
          ></div>

          {/* Modal Content */}
          <div
            className="relative z-10 w-[90%] max-w-md bg-white rounded-xl shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            {/* Toggle between Login and Signup */}
            {authType === "login" ? (
              <div>
                <LoginPage />
                <p className="text-center mt-4 text-gray-500">
                  Don't have an account?
                  <button
                    onClick={() => setAuthType("signup")}
                    className="text-blue-600 hover:underline pl-1"
                  >
                    Register
                  </button>
                </p>
              </div>
            ) : (
              <div>
                <SignUpPage />
                <p className="text-center mt-4 text-gray-500">
                  Already have an account?
                  <button
                    onClick={() => setAuthType("login")}
                    className="text-blue-600 hover:underline pl-1"
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
