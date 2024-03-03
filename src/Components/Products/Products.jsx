import axios from "axios";
import React, { useState } from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import { useQuery } from "react-query";
import url from "../../api";
import Pagination from "react-js-pagination";
import { Helmet } from "react-helmet";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  function getProduct() {
    return axios.get(url + "products");
  }

  const { data, isLoading } = useQuery("getProduct", getProduct);

  if (isLoading) return <Loading />;

  let products = data?.data.data;

  if (products) {
    products.sort((catA, catB) => {
      return catA.category.name.localeCompare(catB.category.name);
    });
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <div className="container-fluid main-margin">
        <div className="row g-2">
          {currentItems.map((item) => (
            <Product item={item} key={item._id} />
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={products.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </>
  );
}
