import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card">
        <Skeleton height={200} width={"100%"} />
        <div className="card-body">
          <Skeleton height={30} width={"80%"} />
          <Skeleton height={20} width={"60%"} style={{ marginTop: "0.5rem" }} />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
