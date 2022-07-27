import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Transaction.css";
import {format} from "timeago.js"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Transaction() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
   axios.get("http://localhost:3001/api/orders", { headers: {"Authorization" : `Bearer ${token}`} })
   .then(res => setOrders(res.data))
    .catch(err => console.log(err))
  }, [token]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const handleDelete = (id)=>{
    axios.delete(`http://localhost:3001/api/orders/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
   .then(res => {
    orders.splice(orders.findIndex(item => item._id === id), 1)
   })
    .catch(err => console.log(err))
  }
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">All transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer ID</th>
          <th className="widgetLgTh">Order ID</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
          <th className="widgetLgTh">Action</th>
        </tr>
        {orders.map((order) => (
        <tr className="widgetLgTr" key={order._id}>
        <td className="widgetLgName">{order._id}</td>
        <td className="widgetLgName">{order.userId}</td>
        <td className="widgetLgDate">{format(order.createdAt)}</td>
        <td className="widgetLgAmount">${order.amount}</td>
        <td className="widgetLgStatus">
          <Button type={order.status} />
        </td>
        <td className="action">
        <DeleteForeverIcon
              className="productListDelete"
              onClick={() => handleDelete(order._id)}
            />
        </td>
      </tr>
        ))}
      </table>
    </div>
  );
}