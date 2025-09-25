import './App.css'
import { RouterProvider , createBrowserRouter, Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage.jsx'
import Register from './pages/RegisterPage.jsx'
import Wishlist from './pages/WishListPage'
import CartList from './pages/CartListPage.jsx'
import Checkout from './pages/CheckoutPage'



  function Layout () {
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
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/cart",
          element: <CartList />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        // {
        //   path: "/login",
        //   element: <LoginPage />,
        // },
        // {
        //   path: "/register",
        //   element: <Register />,
        // },
        {
          path: "/wishlist",
          element: <Wishlist />,
        }
      ],
    },
  ]);

function App() {
  return <RouterProvider router={ router } />;
}

export default App
