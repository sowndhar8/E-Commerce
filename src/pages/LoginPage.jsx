import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { auth, googleProvider, facebookProvider } from "../config/FireBase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  // Email login
  const handleEmailLogin = async (values) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      message.success("Logged in successfully!");
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  // Phone login
  const handlePhoneLogin = async () => {
    try {
      // Add your phone login logic here
    } catch (error) {
      message.error(error.message);
    }
  };

  // Google login
  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Signed up with Google!");
      colsol
      message.success("Logged in with Google!");
    } catch (error) {
      message.error(error.message);
    }
  };

  // Facebook login
  const handleFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      message.success("Logged in with Facebook!");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className=" p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">
          Please login to continue
        </p>

        {/* Email Login with Formik */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleEmailLogin}
        >
          {({ isSubmitting }) => (
            <Form className="">
              {/* Email */}
              <div className="relative !mb-6">
                <Field
                  type="email"
                  name="email"
                  placeholder=" "
                  className="peer w-full bg-[#F6F6F6] focus:bg-white border-0 text-gray-900 rounded-md !px-3 !py-3 focus:outline-none focus:ring-2 focus:ring-[#2C48A2]"
                />
                <label className="absolute left-3 !px-1 text-gray-500 text-md transition-all bg-[#F6F6F6] peer-placeholder-shown:top-3 peer-placeholder-shown:text-md peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#2C48A2] peer-focus:bg-white peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:bg-white z-10">
                  Email
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Password */}
              <div className="relative !mb-6">
                <Field
                  type="password"
                  name="password"
                  placeholder=" "
                  className="peer w-full bg-[#F6F6F6] focus:bg-white border-0 text-gray-900 rounded-md !px-3 !py-3 focus:outline-none focus:ring-2 focus:ring-[#2C48A2]"
                />
                <label className="absolute left-3 !px-1 text-gray-500 text-md transition-all bg-[#F6F6F6] peer-placeholder-shown:top-3 peer-placeholder-shown:text-md peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#2C48A2] peer-focus:bg-white peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:bg-white z-10">
                  Password
                </label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500">Or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

         <button
          // onClick={handleOTP}
          className="w-full border py-2 rounded-lg mb-2 hover:bg-gray-100 transition"
        >
          Continue with OTP
        </button>

        {/* Social login */}
        <button
          onClick={handleGoogle}
          className="w-full border py-2 rounded-lg mb-2 hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>
        <button
          onClick={handleFacebook}
          className="w-full border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Continue with Facebook
        </button>

       
      </div>
    </div>
  );
};

export default LoginPage;
