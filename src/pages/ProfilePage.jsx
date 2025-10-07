import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, Phone, Home, Briefcase } from "lucide-react";
import { LuBadgeCheck, LuBadgeX } from "react-icons/lu";
import { Tabs, Spin } from "antd";
import fetchdata from "../config/fetchdata";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
  try {
    const fetchedUser = localStorage.getItem("USER_DATA");
    if (!fetchedUser) return;

    const parsedUser = JSON.parse(fetchedUser);
    const userId = parsedUser?.userid;
    console.log("userId", userId);

    // ✅ Fetch user addresses
    const addressResponse = await fetchdata?.GetUserAddress(userId);
    console.log("addressResponse", addressResponse);

    // const updateAddress = await fetchdata?.UpdateAddress(userId);
    // console.log("userResponse", updateAddress);

    const addresses = addressResponse?.addresses || [];

    // ✅ Separate home & work addresses based on type
    const homeAddress = addresses.find(a => a.addresstype === "home") || {};
    const workAddress = addresses.find(a => a.addresstype === "work") || {};

    // ✅ Set default structure for safety
    const formattedHome = {
      line1: homeAddress.houseno || "",
      line2: homeAddress.street || "",
      city: homeAddress.city || "",
      state: homeAddress.state || "",
      pincode: homeAddress.pincode || "",
      country: homeAddress.country || "",
      phone: homeAddress.mobilenumber || "",
    };

    const formattedWork = {
      line1: workAddress.houseno || "",
      line2: workAddress.street || "",
      city: workAddress.city || "",
      state: workAddress.state || "",
      pincode: workAddress.pincode || "",
      country: workAddress.country || "",
      phone: workAddress.mobilenumber || "",
    };

    // ✅ Update state
    setUser({
      name: parsedUser.firstname || "",
      email: parsedUser.email || "",
      phone: parsedUser.mobilenumber || "",
      emailVerified: parsedUser.isemailverify || false,
      phoneVerified: parsedUser.ismobilenumberverify || false,
      homeAddress: formattedHome,
      workAddress: formattedWork,
    });
  } catch (error) {
    console.error("Error fetching user or address:", error);
  } finally {
    setLoading(false);
  }
};


  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Spin size="large" />
      </div>
    );
  if (!user) return <p>No user data found</p>;

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?\d{10,14}$/, "Invalid phone number")
      .required("Phone number is required"),
    homeAddress: Yup.object({
      line1: Yup.string().required("Required"),
      line2: Yup.string(),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      pincode: Yup.string().required("Required"),
      phone: Yup.string()
        .matches(/^\+?\d{10,14}$/, "Invalid phone number")
        .required("Phone number is required"),
    }),
    workAddress: Yup.object({
      line1: Yup.string().required("Required"),
      line2: Yup.string(),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      pincode: Yup.string().required("Required"),
      phone: Yup.string()
        .matches(/^\+?\d{10,14}$/, "Invalid phone number")
        .required("Phone number is required"),
    }),
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-20">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>

      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          console.log("Updated User:", values);
          // optionally send to backend here
        }}
      >
        {({ values }) => (
          <Form className="bg-white rounded-xl shadow p-6 space-y-6">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Personal Info",
                  children: (
                    <div className="pb-5">
                      <h2 className="text-xl font-semibold mb-3">
                        Personal Information
                      </h2>
                      <div className="flex flex-col md:w-1/3 gap-10">
                        {/* Full Name */}
                        <div>
                          <label className="text-gray-500 text-sm">
                            Full Name
                          </label>
                          <Field
                            name="name"
                            className="w-full mt-1 p-2 border rounded-md"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="text-gray-500 text-sm flex items-center gap-1">
                            <Mail size={16} /> Email
                          </label>
                          <div className="flex items-center gap-2">
                            <Field
                              name="email"
                              className="w-full mt-1 p-2 border rounded-md"
                            />
                            {user.emailVerified ? (
                              <LuBadgeCheck
                                className="text-green-500"
                                size={18}
                                title="Verified"
                              />
                            ) : (
                              <LuBadgeX
                                className="text-red-500"
                                size={18}
                                title="Not Verified"
                              />
                            )}
                          </div>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="text-gray-500 text-sm flex items-center gap-1">
                            <Phone size={16} /> Mobile Number
                          </label>
                          <div className="flex items-center gap-2">
                            <Field
                              name="phone"
                              className="w-full mt-1 p-2 border rounded-md"
                            />
                            {user.phoneVerified ? (
                              <LuBadgeCheck
                                className="text-green-500"
                                size={18}
                                title="Verified"
                              />
                            ) : (
                              <LuBadgeX
                                className="text-red-500"
                                size={18}
                                title="Not Verified"
                              />
                            )}
                          </div>
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: "Address",
                  children: (
                    <div className="pb-5">
                      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Home className="text-blue-600" /> Home Address
                      </h2>
                      <div className="grid md:grid-cols-3 gap-5 ">
                        {["line1", "line2", "city", "state", "pincode", "phone"].map(
                          (field) => (
                            <div key={field}>
                              <label>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                              </label>
                              <Field
                                name={`homeAddress.${field}`}
                                className="w-full mt-1 p-2 border rounded-md"
                              />
                              <ErrorMessage
                                name={`homeAddress.${field}`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ),
                },
                {
                  key: "3",
                  label: "Work Info",
                  children: (
                    <div className="pb-5">
                      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Briefcase className="text-blue-600" /> Work Address
                      </h2>
                      <div className="grid md:grid-cols-3 gap-5">
                        {["line1", "line2", "city", "state", "pincode", "phone"].map(
                          (field) => (
                            <div key={field}>
                              <label>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                              </label>
                              <Field
                                name={`workAddress.${field}`}
                                className="w-full mt-1 p-2 border rounded-md"
                              />
                              <ErrorMessage
                                name={`workAddress.${field}`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfilePage;
