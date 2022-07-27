import { useState } from "react";
import "./AddUser.css";
import { addUser } from "../../redux/apiRedux"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const AddUser = () => {
  const [user, setUser] = useState({});

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  const handleClick = (e) => {
    e.preventDefault();
    addUser(user, dispatch);
    navigate("../users")
  }

    return (
        <div className="newUser">
          <h1 className="newUserTitle">New User</h1>
          <form className="newUserForm">
            <div className="newUserItem">
              <label>First Name</label>
              <input type="text" name= "firstName" placeholder="first name"  onChange={handleChange}/>
            </div>
            <div className="newUserItem">
              <label>Last Name</label>
              <input type="text" name= "lastName" placeholder="last name"  onChange={handleChange}/>
            </div>
            <div className="newUserItem">
              <label>Email</label>
              <input type="email" name= "email" placeholder="email"  onChange={handleChange}/>
            </div>
            <div className="newUserItem">
              <label>Password</label>
              <input type="password" name= "password" placeholder="password"  onChange={handleChange}/>
            </div>
            <div className="newUserItem">
              <label>Username</label>
              <input type="text" name= "username" placeholder="username"  onChange={handleChange}/>
            </div>
            <div className="newUserItem">
              <label>Role</label>
              <select className="newUserSelect" name="isAdmin" id="active" onChange={handleChange}>
                <option value="true">Administrator</option>
                <option value="false">Client</option>
              </select>
            </div>
            <button className="newUserButton" onClick={handleClick}>Create</button>
          </form>
        </div>
      );
}

export default AddUser