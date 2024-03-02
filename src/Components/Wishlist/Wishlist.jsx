import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContextProvider";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Wishlist() {
  let {
    getWishList,
    setWishListCounter,
    addToCart,
    setCounter,
    deleteProductFromWishList,
  } = useContext(cartContext);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);
  let [btnLoading, setBtnLoading] = useState(true);

  async function addProductTCart(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);
    if (data.status === "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
    }
  }

  async function removeListItem(productId) {
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
    }
  }

  useEffect(() => {
    (async () => {
      let data = await getWishList();
      setData(data);
      setWishListCounter(data.count);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;
  if (data == null || data.count === 0) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <h2 className="main-margin text-center text-main">
          No items in WishList
        </h2>
      </div>
    );
  }
  return (
    <div className="main-margin container-fluid">
      <div className="row g-2">
        {data?.data.map((item) => {
          return (
            <div
              className="col-md-4 col-lg-2 product cursor-pointer rounded-3 p-4 position-relative mx-2"
              key={item._id}
            >
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
                  className="btn text-danger"
                  onClick={() => removeListItem(item._id)}
                >
                  <i className="fa-solid fa-heart fa-lg"></i>
                </button>
                <button
                  className="btn bg-main text-white "
                  disabled={!btnLoading}
                  onClick={() => addProductTCart(item._id)}
                >
                  {btnLoading ? (
                    "Add to cart"
                  ) : (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
