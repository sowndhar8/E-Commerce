import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, Phone, Home, Briefcase } from "lucide-react";
import { LuBadgeCheck, LuBadgeX } from "react-icons/lu";
import { Tabs } from "antd";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchedUser = localStorage.getItem("USER_DATA");
    if (fetchedUser) {
      const parsedUser = JSON.parse(fetchedUser);
      console.log(parsedUser);
      setUser({
        name: parsedUser.firstname || "",
        email: parsedUser.email || "",
        phone: parsedUser.mobilenumber || "",
        emailVerified: parsedUser.isemailverify || false,
        phoneVerified: parsedUser.ismobilenumberverify || false,
        homeAddress: {
          line1: "12/219",
          line2: "Tiruppur",
          city: "Erode",
          state: "Tamil Nadu",
          pincode: "643928",
        },
        workAddress: {
          line1: "12/219",
          line2: "Tiruppur",
          city: "Erode",
          state: "Tamil Nadu",
          pincode: "643928",
        },
      });
    }
  }, []);

  if (!user) return <p>Loading...</p>;

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
    }),
    workAddress: Yup.object({
      line1: Yup.string().required("Required"),
      line2: Yup.string(),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      pincode: Yup.string().required("Required"),
    }),
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-20">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>

      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Updated User:", values);
          setUser(values);
          alert("Profile updated successfully!");
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
                  label: "Address",
                  children: (
                    <div className="pb-5">
                      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Home className="text-blue-600" /> Home Address
                      </h2>
                      <div className="grid md:grid-cols-2 gap-5">
                        {["line1", "line2", "city", "state", "pincode"].map(
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
                      <div className="grid md:grid-cols-2 gap-5">
                        {["line1", "line2", "city", "state", "pincode"].map(
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
