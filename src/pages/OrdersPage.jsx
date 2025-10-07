import React, { useState, useEffect } from "react";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Replace this with your API call to fetch orders
    const fetchedOrders = [
      {
        id: "ORD123456",
        date: "2025-10-06",
        status: "Delivered",
        items: [
          { id: 1, name: "Washing Machine", quantity: 1, price: 15000 },
          { id: 2, name: "Air Conditioner", quantity: 1, price: 25000 },
        ],
        total: 40000,
      },
      {
        id: "ORD123457",
        date: "2025-09-30",
        status: "Shipped",
        items: [
          { id: 3, name: "Smart TV", quantity: 1, price: 45000 },
        ],
        total: 45000,
      },
    ];
    setOrders(fetchedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-20">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg">You have no orders yet 🫤</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow p-6 space-y-4"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <p>
                  <span className="font-semibold">Order ID:</span> {order.id}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {order.date}
                </p>
                <p
                  className={`font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </p>
              </div>

              <div className="border-t pt-3">
                <h3 className="font-semibold mb-2">Items:</h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <p>{item.name} (x{item.quantity})</p>
                      <p>₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                  <p>Total:</p>
                  <p>₹{order.total}</p>
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
