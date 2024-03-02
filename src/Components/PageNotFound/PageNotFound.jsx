import React from "react";
import error from "../../assets/images/error.svg";
export default function PageNotFound() {
  return (
    <div className="d-flex justify-content-center align-content-center vh-100 main-margin">
      <img src={error} alt="error_404" className="w-100" />
    </div>
  );
}
