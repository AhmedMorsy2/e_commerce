import React from "react";
import { Link } from "react-router-dom";

export default function Brand({ item }) {
  return (
    <>
      <div className="col-md-3 ">
        <div className="cursor-pointer text-center brdrshdow  ">
          <Link to={`/specificbrand/${item._id}`}>
            <img src={item.image} alt="" className="w-100" />
          </Link>
        </div>
      </div>
    </>
  );
}
