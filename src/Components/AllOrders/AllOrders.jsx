import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../api";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  let [orders, setOrders] = useState([]);
  async function getAllOrders() {
    let { data } = await axios.get(url + "orders");
    setOrders(data.data);
  }
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Orders</title>
      </Helmet>
      <div className="container form-margin">
        <table className="table ">
          <thead>
            <th>Customer id</th>
            <th>Customer</th>
            <th>Pay Method</th>
            <th>Total Cost</th>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.paymentMethodType}</td>
                <td>{order.totalOrderPrice} EGP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
