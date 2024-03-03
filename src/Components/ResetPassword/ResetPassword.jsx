import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import * as Yup from "yup";

export default function ResetPassword() {
  function sendDataToApi(values) {
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error:", err.response.data);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    newPassword: Yup.string().required("New password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
      </Helmet>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="m-auto w-75 brdrshdow p-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                  onChange={formik.handleChange}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="text-danger">{formik.errors.newPassword}</div>
                ) : null}
              </div>
              <button type="submit" className="btn bg-main text-white">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
