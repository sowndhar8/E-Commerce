import React from "react";
import { useState, useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";

function WishListPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Example: Fetch wishlist from localStorage or API
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-20">
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2">
        <Heart className="text-red-500" /> Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg">Your wishlist is empty 🫤</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-lg font-medium mt-3">{item.name}</h2>
              <p className="text-gray-600">₹{item.price}</p>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-2 rounded-md hover:bg-red-200"
                >
                  <Trash2 size={16} /> Remove
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishListPage;
