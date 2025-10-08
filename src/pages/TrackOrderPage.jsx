import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Package, MapPin, CheckCircle, Clock } from "lucide-react";

const TrackOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedOrder = location.state?.order;

  // Handle case where no order data is passed
  if (!selectedOrder) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-4">No order data found</p>
          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        ← Back to Orders
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Track Order</h1>
        <p className="text-gray-600 mb-4">Order ID: {selectedOrder.id}</p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <Package className="text-blue-600" size={32} />
            <div>
              <p className="text-sm text-gray-600">Order Status</p>
              <p className="font-bold text-gray-900 capitalize">
                {selectedOrder.status.replace("_", " ")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <MapPin className="text-green-600" size={32} />
            <div>
              <p className="text-sm text-gray-600">Delivery Address</p>
              <p className="font-bold text-gray-900">Home, Tiruchirappalli</p>
            </div>
          </div>
        </div>

        <div className="relative">
          {selectedOrder.trackingSteps.map((step, index) => (
            <div key={index} className="flex gap-4 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="text-white" size={24} />
                  ) : (
                    <Clock className="text-white" size={24} />
                  )}
                </div>
                {index < selectedOrder.trackingSteps.length - 1 && (
                  <div
                    className={`w-0.5 h-full ${
                      step.completed ? "bg-green-500" : "bg-gray-300"
                    }`}
                    style={{ minHeight: "4px" }}
                  />
                )}
              </div>

              <div className="flex-1 pb-4">
                <h3
                  className={`font-semibold text-lg ${
                    step.completed ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </h3>
                <p
                  className={`text-sm ${
                    step.completed ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {step.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
        <div className="space-y-3">
          {selectedOrder.products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {product.quantity}
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
  );
};

export default TrackOrderPage;