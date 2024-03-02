import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../api";
import { useParams } from "react-router-dom";

export default function SpecificBrand() {
  let id = useParams();
  let [data, setData] = useState([]);
  async function getSpecificBrend() {
    try {
      let { data } = await axios.get(url + `brands/${id.id}`);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSpecificBrend();
  }, []);
  return (
    <>
      <div className="container  d-flex justify-content-between  align-content-center flex-wrap">
        <img src={data.image} alt="" className="w-100" />
      </div>
    </>
  );
}
