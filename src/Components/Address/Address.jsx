import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { cartContext } from "../../Context/CartContextProvider";
import { useParams } from "react-router-dom";
export default function Address() {
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  async function sendDataToApi(values) {
    setLoading(false);
    let data = await payOrder(id, values);
    if (data.status === "success") {
      window.location.href = data.session.url;
    }
  }
  let { payOrder } = useContext(cartContext);
  let userAddress = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <>
      <div className="container form-margin">
        <div className="w-75 m-auto my-5 brdrshdow p-4">
          <h3>Address:</h3>
          <form onSubmit={userAddress.handleSubmit}>
            <label htmlFor="phone">Phone:</label>
            <input
              type="number"
              name="phone"
              id="phone"
              className="form-control my-2"
              onChange={userAddress.handleChange}
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="city"
              id="address"
              className="form-control my-2"
              onChange={userAddress.handleChange}
            />
            <label htmlFor="details">Details:</label>
            <textarea
              type="text"
              name="details"
              id="details"
              className="form-control my-2"
              onChange={userAddress.handleChange}
            ></textarea>

            <button
              className="btn bg-main text-white mt-3"
              type="submit"
              disabled={!(userAddress.dirty && userAddress.isValid)}
            >
              {loading ? (
                "Order"
              ) : (
                <i className="fa-solid fa-spinner fa-spin"></i>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
