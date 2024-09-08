import React from "react";
import Skeleton from "react-loading-skeleton";

export default function CategorySliderSkeleton() {
  return (
    <div className="my-5 container-fluid">
      <h3>Shop Popular Categories:</h3>
      <div className="slider-skeleton">
        <div className="d-flex">
          {[...Array(5).keys()].map((_, index) => (
            <div key={index} className="px-1" style={{ flex: "1 0 20%" }}>
              <Skeleton height={300} width={"100%"} />
              <Skeleton
                height={20}
                width={"80%"}
                style={{ marginTop: "0.5rem" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
