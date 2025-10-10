import "./App.css";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Wishlist from "./pages/WishListPage";
import CartList from "./pages/CartListPage";
import Checkout from "./pages/CheckoutPage";
import Profile from "./pages/ProfilePage";
import Orders from "./pages/OrdersPage";
import ProductListing from "./pages/ProductListing";
import TrackOrderPage from "./pages/TrackOrderPage";
import { CartProvider } from "./context/CartContext"; 
import { WishlistProvider } from "./context/WishlistContext";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/cart", element: <CartList /> },
      { path: "/productListing", element: <ProductListing /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/profile", element: <Profile /> },
      { path: "/orders", element: <Orders /> },
      { path: "/trackOrder", element: <TrackOrderPage /> },
    ],
  },
]);

function App() {
  return (
    // ✅ Wrap your router with CartProvider
    <CartProvider>
      <WishlistProvider>
        <RouterProvider router={router} />
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
