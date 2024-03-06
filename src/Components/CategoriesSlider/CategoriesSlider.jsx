import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import url from "../../api";


export default function CategoriesSlider() {
  function getCategories() {
    return axios.get(url + "categories");
  }
  let { data } = useQuery("getCategories", getCategories);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
      <div className="my-5 container-fluid">
        <h3>Shop Populer Categories:</h3>
        <Slider {...settings}>
          {data?.data.data.map((item) => (
            <div key={item._id} className="cursor-pointer px-1">
              <img src={item.image} alt="" className="w-100" height={250} />
              <p className="fw-bold">{item.name}</p>
            </div>
          ))}
        </Slider>
      </div>
  );
}
