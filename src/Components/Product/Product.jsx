import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContextProvider";
import { toast } from "react-toastify";

export default function Product({ item }) {
  let {
    setCounter,
    addToCart,
    addToWishList,
    setWishListCounter,
    getWishList,
    deleteProductFromWishList,
  } = useContext(cartContext);
  let [btnLoading, setBtnLoading] = useState(true);
  let [data, setData] = useState([]);
  let [isAdded, setIsAdded] = useState(false);
  const token = localStorage.getItem("token");
  async function addProductTCart(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);
    if (data.status === "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
    }
  }

  async function addToList(productId) {
    try {
      let data = await addToWishList(productId);
      let list = await getWishList();
      if (data.status === "success") {
        toast.success("Product added to wishlist");
        setData(list);
        setWishListCounter(list.count);
        setIsAdded(true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function deleteFromList(productId) {
    try {
      let data = await deleteProductFromWishList(productId);
      let list = await getWishList();
      if (data.status === "success") {
        toast.error(
          <div>
            <span> Product Removed from wishlist</span>
            <i class="fa-solid fa-heart-crack ms-2"></i>
          </div>
        );
        setData(list);
        setWishListCounter(list.count);
        setIsAdded(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    (async () => {
      let data = await getWishList();
      setData(data);
      setWishListCounter(data.count);
    })();
  }, []);

  return (
    <>
      {token ? (
        <>
          <div className="col-sm-6 col-md-4 col-lg-2">
            <div className="product cursor-pointer rounded-3 p-4 position-relative ">
              <Link to={`/product-details/${item._id}`}>
                <img
                  src={item.imageCover}
                  className="w-100"
                  alt="Product_png"
                />
                <span className="text-main font-sm mt-2">
                  {item.category.name}
                </span>
                <h5 className="fw-bold my-2">
                  {item.title.split(" ").slice(0, 3).join(" ")}
                </h5>
                <div className="d-flex justify-content-between my-2">
                  <div>{item.price} EGP</div>
                  <div>
                    <i className="fa-solid fa-star rating-color"></i>
                    {item.ratingsAverage}
                  </div>
                </div>
              </Link>
              <div className="d-flex justify-content-between align-content-center">
                <button
                  className={`btn  ${isAdded ? "text-danger " : "text-main"}`}
                  onClick={() =>
                    isAdded ? deleteFromList(item._id) : addToList(item._id)
                  }
                >
                  <i className="fa-solid fa-heart fa-lg"></i>
                </button>
                <button
                  className={`btn bg-main text-white `}
                  onClick={() => addProductTCart(item._id)}
                  disabled={!btnLoading}
                >
                  {btnLoading ? (
                    "Add to cart"
                  ) : (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="col-sm-6 col-md-4 col-lg-2">
            <div className="product cursor-pointer rounded-3 p-4 position-relative ">
              <Link to={`/product-details/${item._id}`}>
                <img
                  src={item.imageCover}
                  className="w-100"
                  alt="Product_png"
                />
                <span className="text-main font-sm mt-2">
                  {item.category.name}
                </span>
                <h5 className="fw-bold my-2">
                  {item.title.split(" ").slice(0, 3).join(" ")}
                </h5>
                <div className="d-flex justify-content-between my-2">
                  <div>{item.price} EGP</div>
                  <div>
                    <i className="fa-solid fa-star rating-color"></i>
                    {item.ratingsAverage}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
