import axios from "axios";
import url from "../../api";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ForgetPassword() {
  function sendDataToApi(values) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgetpassword ",
        values
      )
      .then(({ data }) => {
        if (data.message === "success") {
          console.log(data);
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
      console.log(values);
    },
  });
  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-content-center flex-wrap">
        <div className="container">
          <div className="m-auto w-75">
            <form onSubmit={register.handleSubmit}>
              <label htmlFor="email"> E-mail Address </label>
              <input
                type="email"
                name="email"
                id="email"
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
