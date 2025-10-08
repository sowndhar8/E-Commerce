import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Package,
  CheckCircle,
  Clock,
  MessageSquare,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Steps } from "antd";

// Sample Data
const sampleProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 2999,
    originalPrice: 4999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 128,
    description: "High-quality wireless headphones with noise cancellation",
    inStock: true,
    discount: 40,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 12999,
    originalPrice: 15999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 256,
    description: "Latest smartwatch with health tracking features",
    inStock: true,
    discount: 19,
  },
  {
    id: 3,
    name: "Professional Camera",
    price: 45999,
    originalPrice: 52999,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 89,
    description: "Professional DSLR camera with 24MP sensor",
    inStock: false,
    discount: 13,
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: 1499,
    originalPrice: 2499,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    rating: 4.3,
    reviews: 445,
    description: "Durable laptop backpack with USB charging port",
    inStock: true,
    discount: 40,
  },
];

const sampleReviews = [
  {
    id: 1,
    userName: "Rahul Kumar",
    rating: 5,
    date: "2 days ago",
    comment: "Excellent product! Really loved the quality and fast delivery.",
    helpful: 24,
  },
  {
    id: 2,
    userName: "Priya Singh",
    rating: 4,
    date: "1 week ago",
    comment: "Good product but packaging could be better. Overall satisfied!",
    helpful: 12,
  },
  {
    id: 3,
    userName: "Amit Patel",
    rating: 5,
    date: "2 weeks ago",
    comment: "Amazing value for money. Highly recommended!",
    helpful: 38,
  },
];

const sampleOrders = [
  {
    id: "ORD123456",
    date: "2024-01-04",
    total: 15998,
    status: "delivered",
    items: 2,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        date: "Jan 04, 10:30 AM",
        completed: true,
      },
      {
        status: "confirmed",
        label: "Order Confirmed",
        date: "Jan 04, 11:00 AM",
        completed: true,
      },
      {
        status: "shipped",
        label: "Shipped",
        date: "Jan 05, 09:00 AM",
        completed: true,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        date: "Jan 06, 08:00 AM",
        completed: true,
      },
      {
        status: "delivered",
        label: "Delivered",
        date: "Jan 06, 02:30 PM",
        completed: true,
      },
    ],
    products: [
      { ...sampleProducts[0], quantity: 1 },
      { ...sampleProducts[1], quantity: 1 },
    ],
  },
  {
    id: "ORD123455",
    date: "2024-01-02",
    total: 2999,
    status: "shipped",
    items: 1,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        date: "Jan 02, 03:00 PM",
        completed: true,
      },
      {
        status: "confirmed",
        label: "Order Confirmed",
        date: "Jan 02, 03:30 PM",
        completed: true,
      },
      {
        status: "shipped",
        label: "Shipped",
        date: "Jan 03, 10:00 AM",
        completed: true,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        date: "Expected Jan 07",
        completed: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        date: "Pending",
        completed: false,
      },
    ],
    products: [{ ...sampleProducts[3], quantity: 1 }],
  },
];

function ProductListing() {
  const [currentPage, setCurrentPage] = useState("products");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, change) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    if (wishlist.find((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const ProductListing = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrentPage('wishlist')}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Heart className={wishlist.length > 0 ? "text-red-500 fill-red-500" : "text-gray-600"} size={24} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setCurrentPage('cart')}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="text-gray-600" size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setCurrentPage('orders')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
          >
            My Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative g roup">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                  {product.discount}% OFF
                </div>
              )}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
              >
                <Heart
                  size={20}
                  className={
                    isInWishlist(product.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-600"
                  }
                />
              </button>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black opacity-90 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews})
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setCurrentPage("productDetail");
                  }}
                  className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  View Details
                </button>
                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProductDetail = () => (
    <div className="max-w-7xl mx-auto p-6">
      <button
        onClick={() => setCurrentPage("products")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedProduct.name}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.floor(selectedProduct.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600">
              ({selectedProduct.reviews} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900">
              ₹{selectedProduct.price.toLocaleString()}
            </span>
            <span className="text-xl text-gray-500 line-through">
              ₹{selectedProduct.originalPrice.toLocaleString()}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
              {selectedProduct.discount}% OFF
            </span>
          </div>

          <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => addToCart(selectedProduct)}
              disabled={!selectedProduct.inStock}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg disabled:bg-gray-300"
            >
              {selectedProduct.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              onClick={() => toggleWishlist(selectedProduct)}
              className="p-3 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
            >
              <Heart
                size={28}
                className={
                  isInWishlist(selectedProduct.id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600"
                }
              />
            </button>
          </div>

          {selectedProduct.inStock && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
              <CheckCircle size={20} />
              <span className="font-medium">In Stock - Ready to Ship</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews
        </h2>

        <div className="space-y-6">
          {sampleReviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-6 last:border-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.userName}
                      </p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-3">{review.comment}</p>

              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                <MessageSquare size={16} />
                Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CartPage = () => (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Shopping Cart ({cartCount} items)
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => setCurrentPage("products")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    ₹{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-gray-100 rounded-l-lg"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-gray-100 rounded-r-lg"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg mb-3">
                Proceed to Checkout
              </button>

              <button
                onClick={() => setCurrentPage("products")}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const WishlistPage = () => (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        My Wishlist ({wishlist.length} items)
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-4">Your wishlist is empty</p>
          <button
            onClick={() => setCurrentPage("products")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                >
                  <Heart size={20} className="text-red-500 fill-red-500" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  ₹{product.price.toLocaleString()}
                </p>

                <button
                  onClick={() => {
                    addToCart(product);
                    toggleWishlist(product);
                  }}
                  disabled={!product.inStock}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300"
                >
                  {product.inStock ? "Move to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const OrdersPage = () => (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

      <div className="space-y-6">
        {sampleOrders.map((order) => (
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
                  onClick={() => {
                    setSelectedOrder(order);
                    setCurrentPage("trackOrder");
                  }}
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
        ))}
      </div>
    </div>
  );

  const TrackOrderPage = () => (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => setCurrentPage("orders")}
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
                  className={`w-10 h-25 rounded-full flex items-center justify-center ${
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
                    className={`w-0.5 h-full  ${
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

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === "products" && <ProductListing />}
      {currentPage === "productDetail" && selectedProduct && <ProductDetail />}
      {currentPage === "cart" && <CartPage />}
      {currentPage === "wishlist" && <WishlistPage />}
      {currentPage === "orders" && <OrdersPage />}
      {currentPage === "trackOrder" && selectedOrder && <TrackOrderPage />}
    </div>
  );
}

export default ProductListing;