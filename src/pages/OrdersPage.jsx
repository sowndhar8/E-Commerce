import React from "react";
import { Package, ChevronRight } from "lucide-react";
import { sampleOrders } from "../Datas/SampleData";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const navigate = useNavigate();

  const handleTrackOrder = (order) => {
    navigate("/trackOrder", { state: { order } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-20 lg:px-35">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
        My Orders
      </h1>

      {sampleOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-6">No orders found</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-colors font-semibold"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {sampleOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              {/* Order Header */}
              <div className="bg-gray-50 p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center">
                <div className="mb-4 sm:mb-0">
                  <p className="text-sm text-gray-600">
                    Order ID:{" "}
                    <span className="font-medium text-gray-900">{order.id}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Placed on:{" "}
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ₹{order.total.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Order Products & Status */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Package
                      className={`${
                        order.status === "delivered"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                      size={28}
                    />
                    <span
                      className={`font-semibold text-lg ${
                        order.status === "delivered"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {order.status === "delivered"
                        ? "Delivered"
                        : "In Transit"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTrackOrder(order)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Track Order <ChevronRight size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  {order.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {product.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-gray-900 text-lg sm:text-xl">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
