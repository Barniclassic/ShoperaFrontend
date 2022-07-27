import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./User.css";
import { useSelector } from "react-redux";
import { updateUser } from "../../redux/apiRedux"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [inputs, setInputs] = useState({});
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const user = useSelector((state) =>
    state.adminUsers.users.find((user) => user._id === userId)
  );


  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  const handleClick = (e) => {
    e.preventDefault();
    let user = {...inputs, _id: userId}
    updateUser(userId, user, dispatch);
    navigate("../users")
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/adduser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  name= "firstName"
                  placeholder={user.firstName}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  name= "lastName"
                  placeholder={user.lastName}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name= "email"
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name= "username"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  name= "password"
                  placeholder="enter new password"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button className="userUpdateButton" onClick={handleClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
