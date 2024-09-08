import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CategorySkeleton() {
  return (
    <div className="col-md-3 mb-4">
      <div className="card">
        <Skeleton height={400} width={"100%"} />
        <div className="card-body">
          <Skeleton height={30} width={"100%"} />
        </div>
      </div>
    </div>
  );
}
