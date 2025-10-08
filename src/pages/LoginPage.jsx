import React, { useState } from "react";
import { auth, googleProvider, facebookProvider } from "../config/FireBase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

import EmailLoginForm from "../components/EmailLoginForm";
import OtpLoginForm from "../components/OtpLoginform";
import SocialLoginButtons from "../components/SocialLoginButtons";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import fetchdata from "../config/fetchdata";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("email");

  // Email login
  const handleEmailLogin = async (values) => {
    setLoading(true);
    try {
      console.log("Login successful!", values);
      const payload = { email: values?.email, password: values?.password };
      const Loginuser = await fetchdata?.Login(payload);
      console.log("Loginuser", Loginuser);
      if (Loginuser?.success == true) {
        localStorage.setItem("ACCESS_TOKEN", Loginuser?.token);
        localStorage.setItem("USER_DATA", JSON.stringify(Loginuser?.user));
        setTimeout(() => (window.location.href = "/"), 300);
        toast.success("Logged in successfully!");
      } else {
        toast.error(Loginuser?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // Google login
  // Google login
  const handleGoogle = async () => {
    setLoading(true);
    try {
      // Step 1: Sign in with Google via Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Firebase Google user:", user);

      // Step 2: Prepare payload for backend
      const payload = {
        firstname: user.displayName?.split(" ")[0] || "",
        lastname: user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email,
        profileImage: user.photoURL || "",
        authProvider: "google",
        firebaseUid: user.uid,
      };

      // Step 3: Send user to your backend (register/login)
      const registerResponse = await fetchdata?.RegisterOrLoginGoogle(payload);
      console.log("Backend register/login response:", registerResponse);

      // Step 4: Store token + user in localStorage
      if (registerResponse?.success === true) {
        console.log("✅ Login successful, storing data:", registerResponse.user);
        
        localStorage.setItem("ACCESS_TOKEN", registerResponse?.token);
        localStorage.setItem(
          "USER_DATA",
          JSON.stringify(registerResponse?.user)
        );
        localStorage.setItem("USER_ID", registerResponse?.user?._id || registerResponse?.user?.userid);

        toast.success("Logged in successfully!");
        
        // ✅ Close modal first
        if (onSuccess) onSuccess();
        
        // ✅ Update NavBar directly using global function
        if (window.updateNavBarUser) {
          console.log("🔔 Calling updateNavBarUser");
          window.updateNavBarUser();
        }
        
        // ✅ Also dispatch event as backup
        window.dispatchEvent(new Event('user-logged-in'));
        
      } else {
        toast.error(registerResponse?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Google login error:", error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info("Login popup was closed");
      } else if (error.message?.includes("Failed to fetch")) {
        toast.error("Cannot connect to server. Please ensure backend is running.");
      } else {
        toast.error(error.message || "Login failed");
      }
    }
    setLoading(false);
  };

  // Facebook login
  const handleFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      toast.success("Logged in with Facebook!");
      console.log(auth.currentUser.displayName);
      setTimeout(() => (window.location.href = "/"), 300);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">
          Please login to continue
        </p>

        {activeTab === "email" ? (
          <EmailLoginForm onSubmit={handleEmailLogin} loading={loading} />
        ) : (
          <OtpLoginForm />
        )}

        <ToastContainer position="top-right" autoClose={3000} />
        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500">Or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Toggle between Email/OTP */}
        {activeTab === "email" ? (
          <button
            onClick={() => setActiveTab("otp")}
            className="w-full border py-2 rounded-lg mb-2 hover:bg-gray-100 transition"
          >
            Continue with OTP
          </button>
        ) : (
          <button
            onClick={() => setActiveTab("email")}
            className="w-full border py-2 rounded-lg mb-2 hover:bg-gray-100 transition"
          >
            Continue with Email
          </button>
        )}

        {/* Social buttons */}
        <SocialLoginButtons
          handleGoogle={handleGoogle}
          handleFacebook={handleFacebook}
        />
      </div>
    </div>
  );
};

export default LoginPage;
