import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../Navbars/MainNav";
import Footer from "../Footer/Footer";

export default function RegisterLayout() {
  return (
    <>
      <MainNav />
      <Outlet />
      <Footer />
    </>
  );
}
