import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Transaction.css";
import {format} from "timeago.js"

export default function Transaction() {
  const [orders, setOrders] = useState([]);
 
  useEffect(() => {
   const token = localStorage.getItem("token");
   axios.get("http://localhost:3001/api/orders", { headers: {"Authorization" : `Bearer ${token}`} })
   .then(res => setOrders(res.data))
    .catch(err => console.log(err))
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer ID</th>
          <th className="widgetLgTh">Order ID</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order) => (
        <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">{order.userId}</td>
        <td className="widgetLgName">{order._id}</td>
        <td className="widgetLgDate">{format(order.createdAt)}</td>
        <td className="widgetLgAmount">${order.amount}</td>
        <td className="widgetLgStatus">
          <Button type={order.status} />
        </td>
      </tr>
        ))}
      </table>
    </div>
  );
}