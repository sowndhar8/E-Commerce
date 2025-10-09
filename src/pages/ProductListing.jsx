import React, { useState } from "react";
import { Star, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { sampleProducts } from "../Datas/SampleData";
import ProductDetailView from "./ProductDetailView";


function ProductListing() {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [currentPage, setCurrentPage] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newReview, setNewReview] = useState({ user: "", rating: 0, comment: "" });

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  // --- Product List ---
  const ProductListView = () => (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <div className="relative group">
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
                <div className="absolute inset-0 bg-black opacity-80 flex items-center justify-center">
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
                <span className="text-sm text-gray-600">
                  ({product.reviews.length} reviews)
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
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300"
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

  // // --- Product Detail ---
  // const ProductDetailView = () => (
  //   <div className="max-w-7xl mx-auto p-6">
  //     <button
  //       onClick={() => setCurrentPage("products")}
  //       className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
  //     >
  //       ← Back to Products
  //     </button>

  //     <div className="grid md:grid-cols-2 gap-8">
  //       {/* Product Image */}
  //       <img
  //         src={selectedProduct.image}
  //         alt={selectedProduct.name}
  //         className="w-full rounded-xl shadow-lg"
  //       />

  //       {/* Product Info */}
  //       <div>
  //         <h1 className="text-3xl font-bold text-gray-900 mb-4">
  //           {selectedProduct.name}
  //         </h1>

  //         <div className="flex items-center gap-4 mb-4">
  //           {[...Array(5)].map((_, i) => (
  //             <Star
  //               key={i}
  //               size={20}
  //               className={
  //                 i < Math.floor(selectedProduct.rating)
  //                   ? "text-yellow-400 fill-yellow-400"
  //                   : "text-gray-300"
  //               }
  //             />
  //           ))}
  //           <span className="text-gray-600">
  //             ({selectedProduct.reviews.length} reviews)
  //           </span>
  //         </div>

  //         <div className="flex items-baseline gap-3 mb-6">
  //           <span className="text-4xl font-bold text-gray-900">
  //             ₹{selectedProduct.price.toLocaleString()}
  //           </span>
  //           <span className="text-xl text-gray-500 line-through">
  //             ₹{selectedProduct.originalPrice.toLocaleString()}
  //           </span>
  //           {selectedProduct.discount > 0 && (
  //             <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
  //               {selectedProduct.discount}% OFF
  //             </span>
  //           )}
  //         </div>

  //         <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

  //         {/* Action Buttons */}
  //         <div className="flex gap-4 mb-8">
  //           <button
  //             onClick={() => addToCart(selectedProduct)}
  //             disabled={!selectedProduct.inStock}
  //             className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg disabled:bg-gray-300"
  //           >
  //             {selectedProduct.inStock ? "Add to Cart" : "Out of Stock"}
  //           </button>
  //           <button
  //             onClick={() => toggleWishlist(selectedProduct)}
  //             className="p-3 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
  //           >
  //             <Heart
  //               size={28}
  //               className={
  //                 isInWishlist(selectedProduct.id)
  //                   ? "text-red-500 fill-red-500"
  //                   : "text-gray-600"
  //               }
  //             />
  //           </button>
  //         </div>

  //         {/* Reviews Section */}
  //         <div className="mt-8">
  //           <h2 className="text-2xl font-bold mb-4 text-gray-900">Customer Reviews</h2>

  //           {selectedProduct.reviews.length > 0 ? (
  //             <div className="space-y-4 max-h-96 overflow-y-auto">
  //               {selectedProduct.reviews.map((review, index) => (
  //                 <div
  //                   key={index}
  //                   className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col"
  //                 >
  //                   <div className="flex items-center justify-between mb-2">
  //                     <span className="font-semibold text-gray-900">{review.user}</span>
  //                     <div className="flex">
  //                       {[...Array(5)].map((_, i) => (
  //                         <Star
  //                           key={i}
  //                           size={16}
  //                           className={
  //                             i < review.rating
  //                               ? "text-yellow-400 fill-yellow-400"
  //                               : "text-gray-300"
  //                           }
  //                         />
  //                       ))}
  //                     </div>
  //                   </div>
  //                   <p className="text-gray-700 text-sm">{review.comment}</p>
  //                 </div>
  //               ))}
  //             </div>
  //           ) : (
  //             <p className="text-gray-500">No reviews yet. Be the first to review!</p>
  //           )}

  //           {/* Add Review Form */}
  //           <div className="mt-6">
  //             <h3 className="text-xl font-semibold mb-3">Write a Review</h3>
  //             <input
  //               type="text"
  //               placeholder="Your Name"
  //               value={newReview.user}
  //               onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
  //               className="w-full mb-2 p-2 border rounded-lg"
  //             />
  //             <input
  //               type="number"
  //               placeholder="Rating (1-5)"
  //               min={1}
  //               max={5}
  //               value={newReview.rating}
  //               onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
  //               className="w-full mb-2 p-2 border rounded-lg"
  //             />
  //             <textarea
  //               placeholder="Your Review"
  //               value={newReview.comment}
  //               onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
  //               className="w-full mb-2 p-2 border rounded-lg"
  //             />
  //             <button
  //               onClick={() => {
  //                 if (!newReview.user || !newReview.rating || !newReview.comment) return;
  //                 selectedProduct.reviews.push(newReview);
  //                 setNewReview({ user: "", rating: 0, comment: "" });
  //                 setSelectedProduct({ ...selectedProduct }); // refresh state
  //               }}
  //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
  //             >
  //               Submit Review
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === "products" && <ProductListView />}
      {currentPage === "productDetail" && selectedProduct && (
        <ProductDetailView
          selectedProduct={selectedProduct}
          setCurrentPage={setCurrentPage}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
        />
      )}
    </div>
  );
}

export default ProductListing;
