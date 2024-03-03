import React from "react";
import error from "../../assets/images/error.svg";
import { Helmet } from "react-helmet";
export default function PageNotFound() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Page Not Found</title>
      </Helmet>
      <div className="d-flex justify-content-center align-content-center vh-100 main-margin">
        <img src={error} alt="error_404" className="w-100" />
      </div>
    </>
  );
}
