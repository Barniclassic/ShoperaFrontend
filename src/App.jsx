import React from "react";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Cart from "./Pages/Cart";
import Success from "./Pages/Success";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminDash from "./Pages/admin/AdminDash";
import AdminProductList from "./Pages/admin/ProductList";
import AdminProduct from "./Pages/admin/Product";
import AddProduct from "./Pages/admin/AddProduct";
import User from "./Pages/admin/User";
import UserList from "./Pages/admin/UserList";
import AddUser from "./Pages/admin/AddUser";
import AdminTopBar from "./components/admin/AdminTopBar";
import AdminSideBar from "./components/admin/AdminSideBar";
import Transaction from "./Pages/admin/Transaction";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return user && user.isAdmin ? (
    <>
    <AdminTopBar />
    <div className="container">
      <AdminSideBar />
      <Routes>
        <Route exact path="/" element={ user && user.isAdmin ? <AdminDash /> : <Signin />}></Route>
        <Route
          exact
          path="/signin"
          element={
            user && user.isAdmin ? (
              <Navigate to="/" />
            ) : (
              <Signin />
            )
          }
        ></Route>
        <Route
          exact
          path="/signup"
          element={
            user && user.isAdmin ? (
              <Navigate to="/" />
            ) : (
              <Signup />
            )
          }
        ></Route>
        <Route exact path="/users" element={<UserList />}></Route>
        <Route exact path="/users/:userId" element={<User />}></Route>
        <Route exact path="/adduser" element={<AddUser />}></Route>
        <Route exact path="/products" element={<AdminProductList />}></Route>
        <Route exact path="/transactions" element={<Transaction />}></Route>
        <Route
          exact
          path="/products/:productId"
          element={<AdminProduct />}
        ></Route>
        <Route exact path="/addproduct" element={<AddProduct />}></Route>
      </Routes>
    </div>
  </>
  ) : (
    <>
    <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route
          exact
          path="/signin"
          element={user ? <Navigate to="/" /> : <Signin />}
        ></Route>
        <Route
          exact
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        ></Route>
        <Route
          exact
          path="/products/:category"
          element={<ProductList />}
        ></Route>
        <Route exact path="/product/:prodId" element={<Product />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/success" element={<Success />}></Route>
      </Routes>
    </>
  );
};

export default App;
