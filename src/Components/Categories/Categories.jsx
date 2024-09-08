import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import url from "../../api";
import Category from "../Category/Category";
import CategorySkeleton from "../Skeletons/CategorySkeleton";

export default function Categories() {
  function getCategories() {
    return axios.get(url + "categories");
  }
  let { data, isLoading } = useQuery("getCategories", getCategories);
  if (isLoading) {
    return (
      <div className="container-fluid main-margin">
        <div className="row g-2">
          {[...Array(12).keys()].map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (data && data?.data.data) {
    data.data.data.sort((cat1, cat2) => {
      return cat1.name.localeCompare(cat2.name);
    });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      <div className="container-fluid main-margin">
        <div className="row g-2">
          {data?.data.data.map((item) => {
            return <Category item={item} key={item._id} />;
          })}
        </div>
      </div>
    </>
  );
}
