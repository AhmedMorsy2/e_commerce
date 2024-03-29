import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function ForgetPassword() {
  let navigate = useNavigate();
  function sendDataToApi(values) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords ",
        values
      )
      .then(({ data }) => {
        if (data.statusMsg === "success") {
          toast.success(data.message);
          navigate("/verifycode");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
  function validationSchema() {
    let schema = new Yup.object({
      email: Yup.string().email().required("E-mail is required"),
    });
    return schema;
  }

  let register = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
      </Helmet>
      <div className="vh-100 d-flex justify-content-center align-content-center flex-wrap">
        <div className="container">
          <div className="m-auto w-75 brdrshdow p-4">
            <form onSubmit={register.handleSubmit}>
              <label htmlFor="email"> E-mail Address </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={register.handleChange}
                className="form-control my-2"
              />
              <button type="submit" className="btn bg-main text-white">
                Send Code
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
