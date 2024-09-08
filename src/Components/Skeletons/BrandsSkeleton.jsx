import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BrandsSkeleton() {
  return (
    <div className="container-fluid main-margin">
      <div className="row g-2">
        {[...Array(16).keys()].map((_, index) => (
          <div className="col-md-3  mb-4" key={index}>
            <div className="card">
              <Skeleton height={200} width={"100%"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
