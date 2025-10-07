import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, Phone, Home, Briefcase } from "lucide-react";
import { LuBadgeCheck, LuBadgeX } from "react-icons/lu";
import { Tabs, Spin } from "antd";
import fetchdata from "../config/fetchdata";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile();
  }, []);

  // Fetch user profile and addresses
  const getUserProfile = async () => {
    try {
      const fetchedUser = localStorage.getItem("USER_DATA");
      if (!fetchedUser) return;

      const parsedUser = JSON.parse(fetchedUser);
      const userId = parsedUser?.userid;

      const addressResponse = await fetchdata?.GetUserAddress(userId);
      const addresses = addressResponse?.addresses || [];

      const homeAddress = addresses.find((a) => a.addresstype === "home") || {};
      const workAddress = addresses.find((a) => a.addresstype === "work") || {};

      const formattedHome = {
        line1: homeAddress.houseno || "",
        line2: homeAddress.street || "",
        city: homeAddress.city || "",
        state: homeAddress.state || "",
        pincode: homeAddress.pincode || "",
        country: homeAddress.country || "",
        phone: homeAddress.mobilenumber || "",
        addressid: homeAddress.addressid || "",
      };

      const formattedWork = {
        line1: workAddress.houseno || "",
        line2: workAddress.street || "",
        city: workAddress.city || "",
        state: workAddress.state || "",
        pincode: workAddress.pincode || "",
        country: workAddress.country || "",
        phone: workAddress.mobilenumber || "",
        addressid: workAddress.addressid || "",
      };

      setUser({
        userid: parsedUser.userid,
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
      toast.error("❌ Failed to load profile!");
    } finally {
      setLoading(false);
    }
  };

  // Update user profile and addresses
  const handleUpdateUser = async (values) => {
    try {
      console.log("values", values);
      setLoading(true);

      const userId = values.userid;
      console.log("userId", userId);
      if (!userId) {
      alert("User ID not found!");
      return;
    }

      // 1️⃣ Update personal info
      const personalData = {
        firstname: values.name,
        email: values.email,
        mobilenumber: values.phone,
      };
      // await fetchdata.UpdateUser(userId, personalData);
       const updatedUser = await fetchdata.UpdateUser(userId, personalData);

    // Update local state & storage
    setUser((prev) => ({ ...prev, ...personalData }));
    const localUser = JSON.parse(localStorage.getItem("USER_DATA")) || {};
    localStorage.setItem("USER_DATA", JSON.stringify({ ...localUser, ...personalData }));

      // 2️⃣ Update Home Address
      if (user?.homeAddress?.addressid) {
        const homeData = {
          houseno: values.homeAddress.line1,
          street: values.homeAddress.line2,
          city: values.homeAddress.city,
          state: values.homeAddress.state,
          pincode: values.homeAddress.pincode,
          mobilenumber: values.homeAddress.phone,
          addresstype: "home",
        };
        await fetchdata.UpdateAddress(
          userId,
          user.homeAddress.addressid,
          homeData
        );
      }

      // 3️⃣ Update Work Address
      if (user?.workAddress?.addressid) {
        const workData = {
          houseno: values.workAddress.line1,
          street: values.workAddress.line2,
          city: values.workAddress.city,
          state: values.workAddress.state,
          pincode: values.workAddress.pincode,
          mobilenumber: values.workAddress.phone,
          addresstype: "work",
        };
        await fetchdata.UpdateAddress(
          userId,
          user.workAddress.addressid,
          workData
        );
      }

      await getUserProfile();
      toast.success("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("❌ Failed to update profile!");
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />{" "}
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => handleUpdateUser(values)}
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
                  label: "Home Address",
                  children: (
                    <div className="pb-5">
                      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Home className="text-blue-600" /> Home Address
                      </h2>
                      <div className="grid md:grid-cols-3 gap-5">
                        {[
                          "line1",
                          "line2",
                          "city",
                          "state",
                          "pincode",
                          "phone",
                        ].map((field) => (
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
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  key: "3",
                  label: "Work Address",
                  children: (
                    <div className="pb-5">
                      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Briefcase className="text-blue-600" /> Work Address
                      </h2>
                      <div className="grid md:grid-cols-3 gap-5">
                        {[
                          "line1",
                          "line2",
                          "city",
                          "state",
                          "pincode",
                          "phone",
                        ].map((field) => (
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
                        ))}
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
