import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContextProvider";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { setCounter, getCart, deleteItem, updateQuantity, deleteCart } =
    useContext(cartContext);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);

  async function deleteProduct(productId) {
    let data = await deleteItem(productId);
    if (data.status === "success") {
      setData(data);
      setCounter(data.numOfCartItems);
      toast.error("Product Removed");
    }
  }

  async function updateProductQuantity(productId, count) {
    let data = await updateQuantity(productId, count);
    console.log(data);
    if (data.status === "success") {
      setData(data);
      setCounter(data.numOfCartItems);
    }
  }

  async function clearCart() {
    let data = await deleteCart();
    if (data.message === "success") {
      setData(null);
      setCounter(data.numOfCartItems);
      toast.error("Cart Removed");
    }
  }
  useEffect(() => {
    (async () => {
      let data = await getCart();
      if (data?.response?.data.statusMsg === "fail") {
        setData(null);
      } else {
        setData(data);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;
  if (data == null || data.numOfCartItems === 0)
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <h2 className="main-margin text-center text-main">No items in cart</h2>
      </div>
    );
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      <div className="container main-margin bg-main-light p-4 rounded-3">
        <h2>Shop Cart:</h2>
        <p className="text-main my-2">
          Total Cart Price: {data?.data.totalCartPrice} EPG{" "}
        </p>
        {data?.data.products.map((item) => {
          return (
            <div key={item._id} className="row py-2 border-bottom">
              <div className="col-md-3 col-lg-1">
                <img src={item.product.imageCover} alt="" className="w-100" />
              </div>
              <div className="col-md-9 col-lg-11 ">
                <div>
                  <h6 className="m-0 pt-1">
                    {item.product.title.split(" ").slice(0, 15).join(" ")}
                  </h6>
                  <p className="text-main p-0 m-0 "> price: {item.price} </p>
                  <div className="d-flex justify-content-between align-content-center">
                    <div>
                      <button
                        className="btn p-0 m-0 "
                        onClick={() => deleteProduct(item.product._id)}
                      >
                        <i className="fa-regular fa-trash-can text-main me-1"></i>
                        Remove
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btnborder"
                        disabled={item.count >= item.product.quantity}
                        onClick={() => {
                          updateProductQuantity(
                            item.product._id,
                            item.count + 1
                          );
                        }}
                      >
                        +
                      </button>
                      <span className="p-2">{item.count}</span>
                      <button
                        className="btn btnborder"
                        onClick={() => {
                          item.count === 1
                            ? deleteProduct(item.product._id)
                            : updateProductQuantity(
                                item.product._id,
                                item.count - 1
                              );
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="d-flex justify-content-between align-content-center mt-4">
          <div>
            <Link
              to={`/address/${data.data._id}`}
              className="btn bg-main text-white "
            >
              <i className="fa-solid fa-truck"></i> Place Order
            </Link>
          </div>
          <div>
            <button
              className="btn btn-danger text-white"
              onClick={() => clearCart()}
            >
              <i className="fa-solid fa-trash-can"></i> Delete Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
