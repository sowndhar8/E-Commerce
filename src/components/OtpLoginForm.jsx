import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, message } from "antd";
import * as Yup from "yup";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { api } from "../config/api"; // ✅ your API handler (same as loginUser)
import { useNavigate } from "react-router-dom";

const OtpSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
    .required("Phone number is required"),
  otp: Yup.string().when("isOtpSent", {
    is: true,
    then: Yup.string()
      .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
      .required("OTP is required"),
  }),
});

const OtpLoginForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();



  const handleSendOtp = async (phoneOrEmail) => {
  try {
    const response = await api.post("/users/send-otp", { mobilenumber: phoneOrEmail });
    if (response.data.success) {
      setOtpSent(true);
      message.success("OTP sent successfully!");
    }
  } catch (error) {
    message.error(error.response?.data?.message || error.message);
  }
};

const handleVerifyOtp = async (otp, phoneOrEmail) => {
  try {
    const response = await api.post("/users/verify-otp", { mobilenumber: phoneOrEmail, otp });
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      message.success("Login successful!");
      navigate("/");
    }
  } catch (error) {
    message.error(error.response?.data?.message || error.message);
  }
};


  return (
    <Formik
      initialValues={{ phone: "", otp: "", isOtpSent: false }}
      validationSchema={OtpSchema}
      onSubmit={async (values, { setFieldValue }) => {
        if (!otpSent) {
          await handleSendOtp(values.phone, setFieldValue);
        } else {
          await handleVerifyOtp(values.otp, values.phone);
        }
      }}
    >
      {({ values }) => (
        <Form className="flex flex-col gap-3">
          <div id="recaptcha-container"></div>

          {!otpSent ? (
            <>
              <Field
                type="text"
                name="phone"
                placeholder="Enter phone number"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <Field name="otp">
                {({ field }) => (
                  <Input.OTP {...field} length={6} className="mb-2" />
                )}
              </Field>
              <ErrorMessage name="otp" component="div" className="text-red-500 text-xs" />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Verify OTP
              </button>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default OtpLoginForm;
