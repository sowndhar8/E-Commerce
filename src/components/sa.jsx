import React, { useState, useMemo } from 'react';
import { ShoppingCart, Heart, Package, Menu, X, Filter } from 'lucide-react';

// Navbar Component
const Navbar = ({ currentPage, setCurrentPage, cartItemCount, wishlistCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">ShopHub</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('products')}
              className={`flex items-center space-x-1 ${
                currentPage === 'products' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <span className="font-medium">Products</span>
            </button>
            <button
              onClick={() => setCurrentPage('orders')}
              className={`flex items-center space-x-2 ${
                currentPage === 'orders' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <Package size={20} />
              <span className="font-medium">Orders</span>
            </button>
            <button
              onClick={() => setCurrentPage('wishlist')}
              className={`flex items-center space-x-2 relative ${
                currentPage === 'wishlist' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <Heart size={20} fill={wishlistCount > 0 ? 'currentColor' : 'none'} />
              <span className="font-medium">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className={`flex items-center space-x-2 relative ${
                currentPage === 'cart' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              <ShoppingCart size={20} />
              <span className="font-medium">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => { setCurrentPage('products'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Products
            </button>
            <button
              onClick={() => { setCurrentPage('orders'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              <Package size={20} />
              <span>Orders</span>
            </button>
            <button
              onClick={() => { setCurrentPage('wishlist'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Heart size={20} />
                <span>Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { setCurrentPage('cart'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <ShoppingCart size={20} />
                <span>Cart</span>
              </div>
              {cartItemCount > 0 && (
                <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Cart Component
const Cart = ({ cart, updateQuantity, removeFromCart, setCurrentPage }) => {
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">Your cart is empty</p>
          <button
            onClick={() => setCurrentPage('products')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
              <div className="text-4xl">{item.image}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(cartTotal + 5).toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 font-semibold">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wishlist Component
const Wishlist = ({ wishlist, toggleWishlist, addToCart, setCurrentPage }) => {
  if (wishlist.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Wishlist</h2>
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">Your wishlist is empty</p>
          <button
            onClick={() => setCurrentPage('products')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="text-6xl mb-4 text-center">{product.image}</div>
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-indigo-600 mb-4">${product.price}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Products Component
const Products = ({ products, addToCart, toggleWishlist, isInWishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (priceRange !== 'all') {
      if (priceRange === 'under50') {
        filtered = filtered.filter(p => p.price < 50);
      } else if (priceRange === '50to100') {
        filtered = filtered.filter(p => p.price >= 50 && p.price <= 100);
      } else if (priceRange === 'over100') {
        filtered = filtered.filter(p => p.price > 100);
      }
    }

    filtered.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [selectedCategory, priceRange, sortBy, products]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Products</h2>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 - $100</option>
              <option value="over100">Over $100</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="text-6xl mb-4 text-center">{product.image}</div>
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center mb-3">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
              </div>
              <p className="text-2xl font-bold text-indigo-600 mb-4">${product.price}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={16} />
                  <span>Add</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    isInWishlist(product.id)
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Orders Component
const Orders = ({ orders }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{order.product}</h3>
                <p className="text-gray-600">Order Date: {order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'Delivered' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-2xl font-bold text-indigo-600">${order.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const EcommerceApp = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders] = useState([
    { id: 1, product: 'Wireless Headphones', price: 79.99, status: 'Delivered', date: '2025-10-01' },
    { id: 2, product: 'Smart Watch', price: 199.99, status: 'In Transit', date: '2025-10-05' }
  ]);
  const [currentPage, setCurrentPage] = useState('products');

  const products = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Electronics', image: '🎧', rating: 4.5 },
    { id: 2, name: 'Smart Watch', price: 199.99, category: 'Electronics', image: '⌚', rating: 4.8 },
    { id: 3, name: 'Running Shoes', price: 89.99, category: 'Fashion', image: '👟', rating: 4.3 },
    { id: 4, name: 'Backpack', price: 49.99, category: 'Fashion', image: '🎒', rating: 4.6 },
    { id: 5, name: 'Coffee Maker', price: 129.99, category: 'Home', image: '☕', rating: 4.7 },
    { id: 6, name: 'Yoga Mat', price: 29.99, category: 'Sports', image: '🧘', rating: 4.4 },
    { id: 7, name: 'Laptop Stand', price: 39.99, category: 'Electronics', image: '💻', rating: 4.2 },
    { id: 8, name: 'Water Bottle', price: 19.99, category: 'Sports', image: '💧', rating: 4.5 },
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartItemCount={cartItemCount}
        wishlistCount={wishlist.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'products' && (
          <Products 
            products={products}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
          />
        )}

        {currentPage === 'cart' && (
          <Cart 
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'wishlist' && (
          <Wishlist 
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'orders' && (
          <Orders orders={orders} />
        )}
      </div>
    </div>
  );
};

export default EcommerceApp;