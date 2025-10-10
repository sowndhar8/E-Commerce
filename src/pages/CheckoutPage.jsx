import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ArrowLeft, CreditCard, Truck, Home } from "lucide-react";

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Order placed successfully!");
    clearCart();
    window.location.href = "/thankyou";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-35">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-gray-600 mb-6 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="ml-2 font-medium">Back to Cart</span>
      </button>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-900">
        🧾 Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Shipping Info */}
        <div className="flex-1 bg-white rounded-3xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            <Home className="w-6 h-6 text-blue-600" /> Shipping Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={form.address}
              onChange={handleChange}
              required
              rows="3"
              className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                name="postalCode"
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex items-center border border-gray-300 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <Truck className="w-5 h-5 text-green-600 mr-2" /> Cash on Delivery
                </label>

                <label className="flex items-center border border-gray-300 rounded-xl p-3 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={form.paymentMethod === "card"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <CreditCard className="w-5 h-5 text-blue-600 mr-2" /> Card Payment
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition font-semibold text-lg"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-1/3 bg-white rounded-3xl shadow-lg p-6 sm:p-8 h-fit">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-200 pb-2"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>₹{cartTotal.toLocaleString()}</span>
          </div>

          <p className="text-green-600 mt-2 font-medium">Free Shipping</p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
