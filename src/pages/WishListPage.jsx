import React from "react";
import { ArrowLeft, Heart, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function WishListPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const addToCartHandler = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-10">
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-gray-600 mb-6 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="ml-2 font-medium">Back</span>
      </button>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 flex items-center gap-3">
        <Heart className="text-red-500" /> My Wishlist
        {wishlist.length > 0 && (
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
            {wishlist.length} items
          </span>
        )}
      </h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-lg">
          <Heart className="w-20 h-20 text-red-200 mb-4" />
          <p className="text-gray-500 text-lg sm:text-xl mb-6">
            Your wishlist is empty 🫤
          </p>
          <button
            onClick={() => (window.location.href = "/productListing")}
            className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-blue-700 transition font-semibold text-base sm:text-lg"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover rounded-xl mb-3"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2">
                    {item.name}
                  </h2>
                  <p className="text-gray-700 text-xl font-bold mt-1">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => addToCartHandler(item)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 sm:py-3 rounded-xl hover:bg-blue-700 transition font-medium text-base sm:text-lg"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishListPage;
