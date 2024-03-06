import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
// import { cartContext } from "../../Context/CartContextProvider";

export default function UpdatePassword() {
  let navigate = useNavigate();
  // let { setShowPassword, showPassword } = useContext(cartContext);
  let [showPassword, setShowPassword] = useState(false);
  let [newPassword, setNewPassword] = useState(false);
  function sendDataToApi(values) {
    axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then(({ data }) => {
        if (data.message === "success") {
          localStorage.clear("token");
          navigate("/signin");
        }
      })
      .catch((err) => console.log(err));
  }
  function validationSchema() {
    let schema = new Yup.object({
      password: Yup.string()
        .matches(/^[A-Z][A-Za-z0-9!@#$%^&*]{6,}$/)
        .required("Password is reauired"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Should match password")
        .required(),
    });
    return schema;
  }
  let register = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  function makePasswordVisible() {
    setShowPassword(!showPassword);
  }

  function makeNewVisiple() {
    setNewPassword(!newPassword);
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Change Password</title>
      </Helmet>
      <div className="vh-100 d-flex justify-content-center align-content-center flex-wrap">
        <div className="container">
          <div className="m-auto w-75 brdrshdow p-4">
            <h2>Change Password</h2>
            <form onSubmit={register.handleSubmit}>
              <label htmlFor="currentPassword"> Old Password </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  id="currentPassword"
                  className="form-control my-2"
                  onChange={register.handleChange}
                />
                <i
                  className={`position-absolute passicon fa-regular ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => makePasswordVisible()}
                ></i>
              </div>
              <label htmlFor="password">New Password </label>
              <div className="position-relative">
                <input
                  type={newPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-control my-2"
                  onChange={register.handleChange}
                />
                {register.errors.password && register.touched.password ? (
                  <div className="alert alert-danger">
                    {register.errors.password}
                  </div>
                ) : (
                  ""
                )}
                <i
                  className={`position-absolute passicon fa-regular ${
                    newPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => makeNewVisiple()}
                ></i>
              </div>
              <label htmlFor="rePassword"> Retype password </label>
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
              <button type="submit" className="btn bg-main text-white mt-3">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
