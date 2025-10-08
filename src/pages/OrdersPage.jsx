import React from "react";
import { Package, ChevronRight } from "lucide-react";
import { sampleOrders } from "../Datas/SampleData";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const navigate = useNavigate();

  const handleTrackOrder = (order) => {
    navigate('/trackOrder', { state: { order } });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

      <div className="space-y-6">
        {sampleOrders.length === 0 ? ( // Fixed: check sampleOrders.length instead of sampleOrders
          <div className="text-center py-12">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 mb-4">No orders found</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Shop Now
            </button>
          </div>
        ) : (
          sampleOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      Order ID:{" "}
                      <span className="font-medium text-gray-900">
                        {order.id}
                      </span>
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
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Package
                      className={
                        order.status === "delivered"
                          ? "text-green-600"
                          : "text-blue-600"
                      }
                      size={24}
                    />
                    <span
                      className={`font-medium ${
                        order.status === "delivered"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {order.status === "delivered" ? "Delivered" : "In Transit"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTrackOrder(order)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Track Order <ChevronRight size={18} />
                  </button>
                </div>

                <div className="space-y-3">
                  {order.products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {product.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OrdersPage;