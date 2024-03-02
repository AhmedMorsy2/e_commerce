import React from "react";
import MainNav from "../Navbars/MainNav";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <MainNav />
      <Outlet />
      <Footer />
    </>
  );
}
