import React, {useState} from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import { mobile } from "../MobVersion";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {logout} from "../redux/userRed"
import { useDispatch } from "react-redux";


const Container = styled.div`
  height: 80px;
  background-color: teal;
  color: white;
  ${mobile({ height: "50px" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "20px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  ${mobile({ padding: "10px 0px" })}
`;

const SearchWrapper = styled.div`
  display: flex;
  border: none;
  align-items: center;
  padding: 4px;
  margin-left: 25px;
  ${mobile({ marginLeft: "10px" })}
`;

const Input = styled.input`
  border: 0.2px solid gray;
  margin-left: 0;
  ${mobile({ width: "50px" })}
`;

const Left = styled.div`
  flex: 1;
`;

const Middle = styled.div`
  flex: 1;
  margin-left: 20%;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuLink = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [searched, setSearched] = useState("")
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear()
     dispatch(logout())
     navigate("./Signin")
  }

  const handleClick = () => {
    console.log(searched)
    navigate(`../products/${searched}`)
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchWrapper>
            <Input placeholder="Search" onChange={(e) => {setSearched(e.target.value); console.log(searched)}}/>
            <SearchIcon onClick={handleClick}/>
          </SearchWrapper>
        </Left>
        <Middle>
          <Link to="../" style={{textDecoration: 'none'}}>
          <Logo>SHOPERA</Logo>
          </Link>
        </Middle>
        <Right>
          <Link to="/signup" style={{textDecoration: 'none'}}>
            <MenuLink>SIGNUP</MenuLink>
          </Link>
          <Link to="/signin" style={{textDecoration: 'none'}}>
            <MenuLink>SIGN IN</MenuLink>
          </Link>
          <Link to="/cart">
            <MenuLink>
              <Badge badgeContent={quantity} color="warning">
                <ShoppingCartOutlinedIcon color="yellow" />
              </Badge>
            </MenuLink>
          </Link>
          <div style={{ padding: "15px"}} onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
          </div>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
