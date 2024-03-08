import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { cartContext } from "../../Context/CartContextProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
export default function ProductDetails() {
  let id = useParams();
  let {
    setCounter,
    addToCart,
    addToWishList,
    setWishListCounter,
    getWishList,
    deleteProductFromWishList,
  } = useContext(cartContext);
  const token = localStorage.getItem("token");

  let [btnLoading, setBtnLoading] = useState(true);
  let [product, setProduct] = useState({});
  let [loading, setLoading] = useState(true);
  let [isAdded, setIsAdded] = useState(false);
  async function getProductDetails() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id.id}`
      );
      setProduct(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function addProduct(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);
    if (data.status === "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
      setIsAdded(true);
    }
  }
  async function addToWish(productId) {
    let data = await addToWishList(productId);
    let list = await getWishList();
    if (data.status === "success") {
      toast.success("Product added to wishlist");
      setWishListCounter(list.count);
      setIsAdded(true);
    }
  }
  async function deleteFromList(productId) {
    let data = await deleteProductFromWishList(productId);
    let list = await getWishList();
    if (data.status === "success") {
      toast.error(
        <div>
          <span> Product Removed from wishlist</span>
          <i className="fa-solid fa-heart-crack ms-2"></i>
        </div>
      );
      setWishListCounter(list.count);
      setIsAdded(false);
    }
  }

  useEffect(() => {
    getProductDetails();
    getWishList();
  }, []);
  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product Details</title>
      </Helmet>
      <div className="container main-margin  d-flex justify-content-center align-content-center flex-wrap">
        <div className="row main-margin">
          {token ? (
            <>
              <div className="col-md-4 col-lg-3 position-relative">
                <button
                  className={`btn  ${isAdded ? "text-danger " : "text-main"}`}
                  onClick={() =>
                    isAdded
                      ? deleteFromList(product._id)
                      : addToWish(product._id)
                  }s
                >
                  <i className="fa-solid fa-heart fa-xl"></i>
                </button>
                <img src={product.imageCover} className="w-100" alt="" />
              </div>
              <div className="col-md-8 col-lg-9">
                <div className="title">
                  <h2>{product.title}</h2>
                  <p className="mt-3">{product.description}</p>
                </div>
                <div className="category">{product.category.name}</div>
                <div className="d-flex justify-content-between my-3">
                  <div>{product.price} EGP</div>
                  <div>
                    <i className="fa-solid fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </div>
                </div>
                <button
                  className="btn bg-main text-white w-100"
                  onClick={() => addProduct(product._id)}
                  disabled={!btnLoading}
                >
                  {btnLoading ? (
                    "Add to cart"
                  ) : (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-3 position-relative">
                <img src={product.imageCover} className="w-100" alt="" />
              </div>
              <div className="col-md-9">
                <div className="title">
                  <h2>{product.title}</h2>
                  <p className="mt-3">{product.description}</p>
                </div>
                <div className="category">{product.category.name}</div>
                <div className="d-flex justify-content-between my-3">
                  <div>{product.price} EGP</div>
                  <div>
                    <i className="fa-solid fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
