import axios from "axios";
import React, { useState } from "react";
import url from "../../api";
import Brand from "../Brand/Brand";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import Pagination from "react-js-pagination";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  function getBrands() {
    return axios.get(url + "brands");
  }
  let { data, isLoading } = useQuery("getBrands", getBrands);
  let brands = data?.data.data;

  if (isLoading) return <Loading />;
  if (brands) {
    brands.sort((brand1, brand2) => {
      return brand1.name.localeCompare(brand2.name);
    });
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = brands.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
      <div className="container-fluid main-margin">
        <div className="row g-2">
          {currentItems.map((item) => {
            return <Brand item={item} key={item._id} />;
          })}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={brands.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </>
  );
}
