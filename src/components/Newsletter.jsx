import React, {useState} from 'react';
import styled from "styled-components";
import {mobile} from "../MobVersion";

import {
    Send
  } from "@mui/icons-material";
  const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  curser: pointer;
  background-color: orange;
  color: white;
`;

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [view, setView] = useState(true)

  const handleClick = () => {
    if(email){
        setMessage("We received your email, we will sent you updates weekly!");
        setView(false)
    }
  }

  return (
    <Container>
      <Title>Subscribe to our Weekly Newsletter</Title>
      <Desc>Get timely updates on your favorite products.</Desc>
      {view && <InputContainer>
        <Input type= "email" placeholder="Enter your email here" onChange={(e)=> setEmail(e.target.value)}/>
        <Button onClick={handleClick}>
          <Send />
        </Button>
      </InputContainer>}
      {!view && <h3 style={{color: "teal"}}>{message}</h3>}
    </Container>
  );
};

export default Newsletter;