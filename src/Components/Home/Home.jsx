import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import Products from "../Products/Products";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <Products />
    </>
  );
}
