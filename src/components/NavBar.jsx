import React, { useState } from "react";
import { Badge } from "antd";
import logo from "../assets/img/logo.png";
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

// Import your modals
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/RegisterPage";

function NavBar() {
  const [showAuth, setShowAuth] = useState(false); // one modal for both
  const [authType, setAuthType] = useState("login"); // "login" or "signup"

  return (
    <div>
      <div className="flex justify-between items-center text-black shadow-2xl px-40 py-5">
        <img src={logo} alt="logo" className="w-32 h-fit" />
        <div>
          <div className="flex gap-15">
            <div className="flex items-center">
              {/* Login trigger */}
              <button
                onClick={() => {
                  setAuthType("login");
                  setShowAuth(true);
                }}
                className="text-xl flex items-center gap-1"
              >
                <CgProfile size={20} />
                Login
              </button>
              <span className="mx-2">|</span>
              {/* Register trigger */}
              <button
                onClick={() => {
                  setAuthType("signup");
                  setShowAuth(true);
                }}
                className="text-xl"
              >
                Register
              </button>
            </div>

            <a href="/wishlist" className="text-xl">
              <div className="flex items-center gap-1">
                <FaHeart size={20} color="red" />
                WishList
              </div>
            </a>

            <a href="/cart" className="text-xl">
              <div className="flex items-center gap-1">
                <Badge size="small" count={2}>
                  <BsCart3 size={20} />
                </Badge>
                Cart
              </div>
            </a>
          </div>
        </div>
      </div>

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
            className="relative z-10 w-[400px] bg-white rounded-xl shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-7 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            {/* Toggle between Login and Signup */}
            {authType === "login" ? (
              <div>
                <LoginPage />
                <p className="text-center mt-4 text-gray-500 ">
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
