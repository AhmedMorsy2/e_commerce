import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Loading from "../Loading/Loading";

export default function Signin() {
  let [errMsg, setErrMsg] = useState("");
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  function sendDataToApi(values) {
    setLoading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          navigate("/home");
        }
      })
      .catch((error) => {
        setErrMsg(error.response.data.message);
        setLoading(true);
      });
  }

  let register = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  return (
    <div className="vh-100 d-flex justify-content-center align-content-center flex-wrap">
      <div className="container">
        <div className="w-75 m-auto my-5 brdrshdow p-4 ">
          <h3>Sign In:</h3>
          <form onSubmit={register.handleSubmit}>
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control my-2"
              onChange={register.handleChange}
              onBlur={register.handleBlur}
            />
            {register.errors.email && register.touched.email ? (
              <div className="alert alert-danger">{register.errors.email}</div>
            ) : (
              ""
            )}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control my-2"
              onChange={register.handleChange}
              onBlur={register.handleBlur}
            />
            {register.errors.password && register.touched.password ? (
              <div className="alert alert-danger">
                {register.errors.password}
              </div>
            ) : (
              ""
            )}
            <p className="text-center">
              Don't have e-mail ?
              <Link
                className="text-main text-decoration-underline ms-1"
                to="/Signup"
              >
                Signup
              </Link>
            </p>
            {errMsg ? <div className="alert alert-danger"> {errMsg} </div> : ""}

            <button
              className="btn bg-main text-white mt-3"
              type="submit"
              disabled={!(register.dirty && register.isValid)}
            >
              {loading ? (
                "Sign In"
              ) : (
                <i className="fa-solid fa-spinner fa-spin"></i>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
