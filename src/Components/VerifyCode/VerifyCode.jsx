import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  let navigate = useNavigate();
  function sendDataToApi(values) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then(({ data }) => {
        if (data.statusMsg === "success") {
          navigate("/resetpassword");
        }
      })
      .catch((err) => console.log(err));
  }
  let code = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Verify Code</title>
      </Helmet>
      <div className="vh-100 d-flex justify-content-center align-content-center flex-wrap">
        <div className="container">
          <div className="m-auto w-75 brdrshdow p-4">
            <form onSubmit={code.handleSubmit}>
              <label htmlFor="resetCode"> Verify Code </label>
              <input
                type="number"
                name="resetCode"
                id="resetCode"
                onChange={code.handleChange}
                className="form-control my-2"
              />
              <button type="submit" className="btn bg-main text-white">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
