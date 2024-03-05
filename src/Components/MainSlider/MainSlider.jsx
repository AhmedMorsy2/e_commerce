import React from "react";
import Slider from "react-slick";

import slider1 from "../../assets/images/slider1.gif";
import slider2 from "../../assets/images/slider2.png";
import slider3 from "../../assets/images/slider3.png";
import slider4 from "../../assets/images/slider4.png";
import slider5 from "../../assets/images/slider5.png";
import slider6 from "../../assets/images/slider6.png";
import { Helmet } from "react-helmet";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <div className="container-fluid form-margin ">
        <Slider {...settings}>
          <img src={slider1} alt="" className="w-100" />
          <img src={slider2} alt="" className="w-100" />
          <img src={slider3} alt="" className="w-100" />
          <img src={slider4} alt="" className="w-100" />
          <img src={slider5} alt="" className="w-100" />
          <img src={slider6} alt="" className="w-100" />
        </Slider>
      </div>
    </>
  );
}
