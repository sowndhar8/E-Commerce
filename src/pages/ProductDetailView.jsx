import React, { useState } from 'react';
import { Heart, Star, ArrowLeft, ShoppingCart, Package, Shield, Truck } from 'lucide-react';

const ProductDetailView = ({ 
  selectedProduct, 
  setCurrentPage, 
  addToCart, 
  toggleWishlist, 
  isInWishlist 
}) => {
  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });
  const [selectedImage, setSelectedImage] = useState(selectedProduct.image);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const handleSubmitReview = () => {
    if (!newReview.user || !newReview.rating || !newReview.comment) {
      alert("Please fill in all fields");
      return;
    }
    
    // Add review to product
    if (!selectedProduct.reviews) {
      selectedProduct.reviews = [];
    }
    selectedProduct.reviews.push({
      ...newReview,
      date: new Date().toLocaleDateString()
    });
    
    setNewReview({ user: "", rating: 5, comment: "" });
  };

  const reviewsCount = selectedProduct.reviews?.length || selectedProduct.reviews || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage("products")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Left Column - Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={selectedImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                {selectedProduct.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    {selectedProduct.discount}% OFF
                  </div>
                )}
                {!selectedProduct.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images (if multiple images available) */}
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedImage(selectedProduct.image)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === selectedProduct.image
                      ? "border-blue-600 shadow-md"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={selectedProduct.image}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <Truck className="text-blue-600" size={24} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-2">
                    <Shield className="text-green-600" size={24} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-2">
                    <Package className="text-purple-600" size={24} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="flex flex-col">
              {/* Brand */}
              {selectedProduct.brand && (
                <span className="text-blue-600 font-semibold text-sm mb-2">
                  {selectedProduct.brand}
                </span>
              )}

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {selectedProduct.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
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
                <span className="text-gray-600 font-medium">
                  {selectedProduct.rating} ({reviewsCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">
                  ₹{selectedProduct.price.toLocaleString()}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{selectedProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Features */}
              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Color: <span className="font-normal text-gray-600">{selectedColor}</span>
                  </h3>
                  <div className="flex gap-3">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedColor === color
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-gray-300 hover:border-gray-400 text-gray-700"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors font-semibold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      addToCart(selectedProduct);
                    }
                  }}
                  disabled={!selectedProduct.inStock}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <ShoppingCart size={22} />
                  {selectedProduct.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  className="p-4 border-2 border-gray-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all"
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

              {/* Stock Status */}
              {selectedProduct.inStock && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <span className="text-green-700 font-medium">✓ In Stock - Ships within 2-3 days</span>
                </div>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t bg-gray-50 p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              Customer Reviews
            </h2>

            {/* Reviews List */}
            {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
              <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
                {selectedProduct.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-gray-900">{review.user}</span>
                          {review.date && (
                            <span className="text-sm text-gray-500">{review.date}</span>
                          )}
                        </div>
                        <div className="flex">
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
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl text-center mb-8">
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              </div>
            )}

            {/* Add Review Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Write a Review</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={newReview.user}
                    onChange={(e) =>
                      setNewReview({ ...newReview, user: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setNewReview({ ...newReview, rating })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={32}
                          className={
                            rating <= newReview.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    placeholder="Share your experience with this product..."
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmitReview}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg shadow-blue-600/30"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;