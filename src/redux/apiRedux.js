import {loginProcess, loginSuccessful, loginFailed, signupProcess, signupSuccessful, signupFailed} from "./userRed"
import axios from "axios"
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRed";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  addUserFailure,
  addUserStart,
  addUserSuccess,
} from "./adminUserRed";

const token = localStorage.getItem('token');


export const signin = async (dispatch, user) => {
    dispatch(loginProcess());
    try {
      const res = await axios.post("http://localhost:3001/api/users/signin", user);
      localStorage.setItem("token", res.data.token)
      dispatch(loginSuccessful(res.data));
    } catch (err) {
      dispatch(loginFailed());
    }
 };

 export const signup = async (dispatch, user) => {
  dispatch(signupProcess());
  try {
    const res = await axios.post("http://localhost:3001/api/users/signup", user);
    dispatch(signupSuccessful(res.data));
  } catch (err) {
    dispatch(signupFailed());
  }
}; 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                          // PRODUCT REDUX
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get("http://localhost:3001/api/products", { headers: {"Authorization" : `Bearer ${token}`} });
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await axios.delete(`http://localhost:3001/api/products/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await axios.put(`http://localhost:3001/api/products/${id}`, product, { headers: {"Authorization" : `Bearer ${token}`} });
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await axios.post(`http://localhost:3001/api/products`, product, { headers: {"Authorization" : `Bearer ${token}`} });
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                          // USER REDUX
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("http://localhost:3001/api/users", { headers: {"Authorization" : `Bearer ${token}`} });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete(`http://localhost:3001/api/users/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    console.log(user)
    const res = await axios.put(`http://localhost:3001/api/users/${id}`, user, { headers: {"Authorization" : `Bearer ${token}`} });
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await axios.post(`http://localhost:3001/api/users/adduser`, user, { headers: {"Authorization" : `Bearer ${token}`} });
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};