import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiEye, HiEyeOff } from "react-icons/hi";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const EmailLoginForm = ({ onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      key="email"
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {/* Email */}
          <div className="relative !mb-6">
            <Field
              type="email"
              name="email"
              placeholder=" "
              autoComplete="email"
              className="peer w-full bg-[#F6F6F6] focus:bg-white border-0 text-gray-900  rounded-md !px-3 !py-3 focus:outline-none focus:ring-2 focus:ring-[#2C48A2]"
            />
            <label className="absolute left-3 !px-1 text-gray-500 text-md transition-all bg-[#F6F6F6] peer-placeholder-shown:top-3 peer-placeholder-shown:text-md  peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#2C48A2]  peer-focus:bg-white peer-not-placeholder-shown:-top-3  peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:bg-white z-10">
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
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder=" "
              autoComplete="password"
              className="peer w-full bg-[#F6F6F6] focus:bg-white border-0 text-gray-900 
                         rounded-md !px-3 !py-3 focus:outline-none focus:ring-2 focus:ring-[#2C48A2] pr-10"
            />
            <label
              className="absolute left-3 !px-1 text-gray-500 text-md transition-all 
                         bg-[#F6F6F6] peer-placeholder-shown:top-3 peer-placeholder-shown:text-md 
                         peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#2C48A2] 
                         peer-focus:bg-white peer-not-placeholder-shown:-top-3 
                         peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:bg-white z-10"
            >
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 
                       transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EmailLoginForm;
