import axios from "axios";
import React from "react";
import url from "../../api";
import Category from "../Category/Category";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function Categories() {
  function getCategories() {
    return axios.get(url + "categories");
  }
  let { data, isLoading } = useQuery("getCategories", getCategories);
  if (isLoading) return <Loading />;
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
