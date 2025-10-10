import React from "react";
import { useCart } from "../context/CartContext";
import { Plus, Minus, Trash2, ArrowLeft } from "lucide-react";

function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-20 lg:px-35">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-gray-600 mb-6 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="ml-2 font-medium">Back</span>
      </button>
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-gray-900">
        🛒 My Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-white rounded-3xl shadow-lg">
          <p className="text-gray-500 text-lg sm:text-xl mb-4">
            Your cart is empty 😅
          </p>
          <button
            onClick={() => (window.location.href = "/productListing")}
            className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-blue-700 transition font-semibold text-base sm:text-lg"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Cart Items */}
          <div className="flex-1 space-y-4 lg:space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:shadow-2xl transition"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 object-cover rounded-xl"
                />

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between h-full w-full">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="text-gray-700 mt-1 text-base sm:text-lg">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex justify-between items-center mt-3 sm:mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition text-gray-800"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 sm:px-4 py-1 sm:py-2 border rounded-lg font-medium text-gray-900 bg-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition text-gray-800"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="flex flex-col items-end gap-2 sm:gap-3 mt-3 sm:mt-0">
                      <p className="font-bold text-lg sm:text-xl text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 border border-red-600 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-red-600 hover:text-white hover:bg-red-600 font-semibold transition text-sm sm:text-base"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 sticky top-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-700 mb-2 sm:mb-3 text-base sm:text-lg">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600 font-semibold mb-2 sm:mb-3 text-base sm:text-lg">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-3 sm:pt-4 flex justify-between text-lg sm:text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>

              <button onClick={() => (window.location.href = "/checkout")} className="w-full mt-6 sm:mt-8 bg-blue-600 text-white py-3 sm:py-4 rounded-2xl hover:bg-blue-700 transition font-semibold text-base sm:text-lg">
                Proceed to Checkout
              </button>
              <button
                onClick={() => (window.location.href = "/productListing")}
                className="w-full mt-3 sm:mt-4 border-2 border-gray-300 text-gray-700 py-3 sm:py-4 rounded-2xl hover:bg-gray-50 transition font-semibold text-base sm:text-lg"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
