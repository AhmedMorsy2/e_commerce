import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function ProtectedRoutes({ children }) {
  let token = localStorage.getItem("token");
  try {
    const decoded = jwtDecode(token);
  } catch (error) {
    localStorage.clear();
    toast.error("Please Signin First");
    return (
      <>
        <Navigate to="/signin" />
      </>
    );
  }

  return children;
}
