import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, message } from "antd";
import * as Yup from "yup";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";



const OtpSchema = Yup.object().shape({
  phone: Yup.string().when("isOtpSent", {
    is: false,
    then: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  }),
  otp: Yup.string().when("isOtpSent", {
    is: true,
    then: Yup.string()
      .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
      .required("OTP is required"),
  }),
});

const OtpLoginForm = () => {
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = (values, setFieldValue) => {
    console.log("Send OTP to:", values.phone);
    setOtpSent(true);
    setFieldValue("isOtpSent", true);
    message.success("OTP sent!");
  };

  const handleVerifyOtp = (values) => {
    console.log("Verify OTP:", values.otp);
    message.success("OTP verified!");
  };

  return (
    <Formik
      key="otp"
      initialValues={{ phone: "", otp: "", isOtpSent: false }}
      validationSchema={OtpSchema}
      onSubmit={(values, { setFieldValue }) => {
        if (!otpSent) handleSendOtp(values, setFieldValue);
        else handleVerifyOtp(values);
      }}
    >
      {({ values }) => (
        <Form className="flex flex-col gap-3">
          {!otpSent ? (
            <>
              <Field
                type="text"
                name="phone"
                placeholder="Enter phone number"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-xs"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg 
                           hover:bg-green-700 transition"
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
              <ErrorMessage
                name="otp"
                component="div"
                className="text-red-500 text-xs"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg 
                           hover:bg-green-700 transition"
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
