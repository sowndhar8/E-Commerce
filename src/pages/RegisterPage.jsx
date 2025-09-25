import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  auth,
  googleProvider,
  facebookProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../config/FireBase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { message } from "antd";
import { HiEye, HiEyeOff } from "react-icons/hi";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Required password")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Must include uppercase, lowercase, number & special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phone: Yup.string()
    .required("Required contact number")
    .matches(/^[0-9]{10}$/, "Contact must be exactly 10 digits"),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Email signup
  const handleEmailSignUp = async (values) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      message.success("Account created successfully!");
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  // Google signup
  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      message.success("Signed up with Google!");
    } catch (error) {
      message.error(error.message);
    }
  };

  // Facebook signup
  const handleFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      message.success("Signed up with Facebook!");
    } catch (error) {
      message.error(error.message);
    }
  };

  // Phone OTP setup
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  };

  const sendOtp = async () => {
    if (!phone || phone.trim() === "") {
      return message.error("Enter phone number");
    }
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      await signInWithPhoneNumber(auth, phone, appVerifier).then(
        (confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setOtpSent(true);
          message.success("OTP sent!");
        }
      );
    } catch (error) {
      message.error(error.message);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return message.error("Enter OTP");
    try {
      await window.confirmationResult.confirm(otp);
      message.success("Phone verified & account created!");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="bg-white w-[400px] rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {/* Email Signup with Formik */}
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleEmailSignUp}
        >
          {({ isSubmitting }) => (
            <Form className=" ">
              <div className="flex flex-col gap-6">
              {/* Mobile */}
              <div className="relative">
                <Field
                  type="text"
                  name="phone"
                  className="peer w-full bg-[#F6F6F6] focus:bg-white border-0 text-gray-900 rounded-md !px-3 !py-3 focus:outline-none focus:ring-2 focus:ring-[#2C48A2]"
                  placeholder=" "
                />
                <label className="absolute left-3 !px-1 text-gray-500 text-md transition-all bg-[#F6F6F6] peer-placeholder-shown:top-3 peer-placeholder-shown:text-md peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#2C48A2] peer-focus:bg-white peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:bg-white z-10">
                  Mobile Number
                </label>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Field
                  type="email"
                  name="email"
                  className="peer w-full bg-[#F6F6F6] focus:bg-white border-0 text-gray-900 rounded-md !px-3 !py-3 focus:outline-none focus:ring-2 focus:ring-[#2C48A2]"
                  placeholder=" "
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
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=" "
                  className="peer w-full bg-[#F6F6F6] focus:bg-white border-0 text-gray-900 rounded-md !px-3 !py-3 focus:outline-none focus:ring-2 focus:ring-[#2C48A2] pr-10"
                />
                <label className="absolute left-3 !px-1 text-gray-500 text-md transition-all bg-[#F6F6F6] peer-placeholder-shown:top-3 peer-placeholder-shown:text-md peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#2C48A2] peer-focus:bg-white peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:bg-white z-10">
                  Password
                </label>
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Field
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder=" "
                  className="peer w-full bg-[#F6F6F6] focus:bg-white border-0 text-gray-900 rounded-md !px-3 !py-3 focus:outline-none focus:ring-2 focus:ring-[#2C48A2] pr-10"
                />
                <label className="absolute left-3 !px-1 text-gray-500 text-md transition-all bg-[#F6F6F6] peer-placeholder-shown:top-3 peer-placeholder-shown:text-md peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#2C48A2] peer-focus:bg-white peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:bg-white z-10">
                  Confirm Password
                </label>
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  onClick={() => setShowConfirm((prev) => !prev)}
                >
                  {showConfirm ? <HiEyeOff /> : <HiEye />}
                </span>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
            </Form>
          )}
        </Formik>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500">Or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Signup */}
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

export default SignUpPage;
