import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
export default function ProtectedRoutes({ children }) {
  let token = localStorage.getItem("token");
  try {
    const decoded = jwtDecode(token);
  } catch (error) {
    localStorage.clear();
    return <Navigate to="/signup" />;
  }

  return children;
}
