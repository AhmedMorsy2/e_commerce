import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Offline } from "react-detect-offline";
import MainLayout from "../src/Components/Layouts/MainLayout";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import RegisterLayout from "./Components/Layouts/RegisterLayout";
import Signin from "./Components/Signin/Signin";
import Wishlist from "./Components/Wishlist/Wishlist";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import Signup from "./Components/Signup/Signup";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import CartContextProvider from "./Context/CartContextProvider";
import Address from "./Components/Address/Address";
import AllOrders from "./Components/AllOrders/AllOrders";
import SpecificBrand from "./Components/SpecificBrand/SpecificBrand";
import { ToastContainer } from "react-toastify";
import UsersLayout from "./Components/Layouts/UsersLayout";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

export default function App() {
  let router = createHashRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/Brands", element: <Brands /> },
        { path: "specificbrand/:id", element: <SpecificBrand /> },
        { path: "/products", element: <Products /> },
        { path: "product-details/:id", element: <ProductDetails /> },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "address/:id",
          element: (
            <ProtectedRoutes>
              <Address />
            </ProtectedRoutes>
          ),
        },
        { path: "/categories", element: <Categories /> },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <PageNotFound /> },
      ],
    },
    {
      path: "/",
      element: <RegisterLayout />,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "signin", element: <Signin /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verifycode", element: <VerifyCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
    {
      path: "/users",
      element: <UsersLayout />,
      children: [
        {
          path: "updatepassword",
          element: (
            <ProtectedRoutes>
              <UpdatePassword />
            </ProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
  let query = new QueryClient();
  return (
    <>
      <ToastContainer
        autoClose={1000}
        hideProgressBar
        closeOnClick
        stacked
        draggable
        pauseOnHover={true}
        theme="colored"
      />

      <CartContextProvider>
        <QueryClientProvider client={query}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </CartContextProvider>

      <Offline>
        <div className="rounded-5 position-fixed bottom-0 end-0 bg-dark text-white text-center p-3 m-4">
          Your are offline
        </div>
      </Offline>
    </>
  );
}
