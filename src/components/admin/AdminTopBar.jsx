import React from 'react'
import "./AdminTopBar.css";
import {logout} from "../../redux/userRed"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminTopBar = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
     dispatch(logout())
     localStorage.clear();
     navigate(".././Signin")
  }

    return (
        <div className="topNavbar">
          <div className="topNavbarContainer">
            <div className="left">
              <span className="logo">SHOPERA</span>
            </div>
            <div className="right" onClick={handleLogout}>
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.logolynx.com%2Fimages%2Flogolynx%2Fb0%2Fb0f8fbd050af03f886708ad44dc09685.jpeg&f=1&nofb=1" alt="" className="topAvatar" />
            </div>
          </div>
        </div>
      );
}

export default AdminTopBar

