import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { removeProduct} from ".././redux/cartRed"

const Success = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.post("http://localhost:3001/api/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
          status: "approved"
        }, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => setOrderId(res.data._id))
        .catch(err => console.log(err))
  }, [cart, data, currentUser]);

  const handleReturn = () => {
    dispatch(removeProduct())
      navigate("../")
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20, backgroundColor: "teal" }} onClick={handleReturn}>Go to Homepage</button>
    </div>
  );
};

export default Success;