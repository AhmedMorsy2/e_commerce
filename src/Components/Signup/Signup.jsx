import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { cartContext } from "../../Context/CartContextProvider";
export default function Signup() {
  let [errMsg, setErrMsg] = useState("");
  let [loading, setLoading] = useState(true);
  let { setShowPassword, showPassword } = useContext(cartContext);
  let navigate = useNavigate();
  function sendDataToApi(values) {
    setLoading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        if (data.message === "success") {
          navigate("/Signin");
        }
      })
      .catch((err) => {
        setErrMsg(err.response.data.message);
        setLoading(true);
      });
  }

  function validationSchema() {
    let schema = new Yup.object({
      name: Yup.string().min(2).max(10).required("Name is required"),
      email: Yup.string().email().required("E-mail is required"),
      password: Yup.string()
        .matches(/^[A-Z][A-Za-z0-9!@#$%^&*]{6,}$/)
        .required("Password is reauired"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Should match password")
        .required(),
    });
    return schema;
  }
  function makePasswordVisible() {
    setShowPassword(!showPassword);
  }

  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Signup</title>
      </Helmet>
      <div className="vh-100 d-flex justify-content-center align-content-center flex-wrap">
        <div className="container-fluid  ">
          <div className="w-75 m-auto my-5 brdrshdow p-4">
            <h3>Register Now:</h3>
            <form onSubmit={register.handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control my-2"
                onChange={register.handleChange}
                onBlur={register.handleBlur}
              />
              {register.errors.name && register.touched.name ? (
                <div className="alert alert-danger">{register.errors.name}</div>
              ) : (
                ""
              )}

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
                <div className="alert alert-danger">
                  {register.errors.email}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="password">Password</label>
              <div className=" position-relative ">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-control my-2"
                  onChange={register.handleChange}
                />
                <i
                  className={`cursor-pointer position-absolute passicon fa-regular ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => makePasswordVisible()}
                ></i>
              </div>
              {register.errors.password && register.touched.password ? (
                <div className="alert alert-danger">
                  {register.errors.password}
                </div>
              ) : (
                ""
              )}

              <label htmlFor="rePassword">Retype Password</label>
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                className="form-control my-2"
                onChange={register.handleChange}
              />
              {register.errors.rePassword && register.touched.rePassword ? (
                <div className="alert alert-danger">
                  {register.errors.rePassword}
                </div>
              ) : (
                ""
              )}
              <p className="text-center mt-2">
                Already have an e-mail ?
                <Link
                  className="text-main text-decoration-underline ms-1"
                  to="/Signin"
                >
                  Signin
                </Link>
              </p>
              {errMsg ? (
                <div className="alert alert-danger"> {errMsg} </div>
              ) : (
                ""
              )}
              <button
                className="btn bg-main text-white mt-3"
                type="submit"
                disabled={!(register.dirty && register.isValid)}
              >
                {loading ? (
                  "Sign Up"
                ) : (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
