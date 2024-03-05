import axios from "axios";
import { createContext, useState } from "react";
import url from "../api";
export const cartContext = createContext();

function addToCart(productId) {
  return axios
    .post(
      url + "cart",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

function addToWishList(productId) {
  return axios
    .post(
      url + "wishlist",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

function getCart() {
  return axios
    .get(url + "cart", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

function getWishList() {
  return axios
    .get(url + "wishlist", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

function deleteItem(productId) {
  return axios
    .delete(url + "cart/" + productId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

function deleteProductFromWishList(productId) {
  return axios
    .delete(url + "wishlist/" + productId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

function updateQuantity(productId, count) {
  return axios
    .put(
      url + "cart/" + productId,
      { count },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

function deleteCart() {
  return axios
    .delete(url + "cart", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

function payOrder(cartId, shippingAddress) {
  return axios
    .post(
      url + "orders/checkout-session/" + cartId,
      { shippingAddress },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

export default function CartContextProvider({ children }) {
  let [counter, setCounter] = useState(0);
  let [wishListCounter, setWishListCounter] = useState(0);
  let [wislist, setWishlist] = useState([]);
  let [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <cartContext.Provider
        value={{
          counter,
          setCounter,
          addToCart,
          getCart,
          deleteItem,
          updateQuantity,
          deleteCart,
          payOrder,
          wishListCounter,
          setWishListCounter,
          addToWishList,
          getWishList,
          deleteProductFromWishList,
          wislist,
          setWishlist,
          showPassword,
          setShowPassword,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}
