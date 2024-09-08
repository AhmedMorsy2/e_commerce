import React from "react";
import { Offline } from "react-detect-offline";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainLayout from "../src/Components/Layouts/MainLayout";
import Address from "./Components/Address/Address";
import AllOrders from "./Components/AllOrders/AllOrders";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Home from "./Components/Home/Home";
import RegisterLayout from "./Components/Layouts/RegisterLayout";
import UsersLayout from "./Components/Layouts/UsersLayout";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Products from "./Components/Products/Products";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import SpecificBrand from "./Components/SpecificBrand/SpecificBrand";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import Wishlist from "./Components/Wishlist/Wishlist";
import CartContextProvider from "./Context/CartContextProvider";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";

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
          path: "/allorders",
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
