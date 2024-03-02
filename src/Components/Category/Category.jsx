import React from "react";

export default function Category({ item }) {
  return (
    <>
      <div className="col-md-3 ">
        <div className="cursor-pointer text-center m-2">
          <img
            src={item.image}
            alt=""
            className="w-100 rounded-3"
            height={400}
          />
          <h5 className="my-3 fw-bold">{item.name}</h5>
        </div>
      </div>
    </>
  );
}
