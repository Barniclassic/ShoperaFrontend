import React, {useState} from "react";
import styled from "styled-components";
import {mobile} from "../MobVersion";
import { signup } from "../redux/apiRedux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.toptrendsguide.com/wp-content/uploads/2020/02/Online-Shopping.jpg")
      center;
  background-size: cover;
`;

const Wrapper = styled.div`
  border-radius: 20px;
  width: 40%;
  padding: 15px;
  background-color: teal;
  color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 25px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 90%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 40%;
  margin-left: 30%;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 15px 20px;
  background-color: orange;
  color: black;
  cursor: pointer;
`;

const Image = styled.img`
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 30%;
    margin-top: 10px;
  `;

  const InfoText = styled.div`
  font-size: 15px;
  color: white;
  padding: 15px;
`;

const Error = styled.span`
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    signup(dispatch, {firstName, lastName, username, email, password });
    if(!error){
      alert("Signup success!");
       navigate("../Signin", {replace: true});
    }
  };

  return (
    <Container>
      <Wrapper>
      <Image src="http://www.zedgepac.com/wp-content/uploads/2017/09/login-logo.png"/ >
      {error && <Error>Something went wrong...</Error>}
        <Form>
          <Input type="text" placeholder="first name" onChange={(e) => setFirstName(e.target.value)}/>
          <Input type="text" placeholder="last name" onChange={(e) => setLastName(e.target.value)}/>
          <Input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
          <Input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
          <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
          <InfoText>
            ALREADY REGISTERED? <a href="./Signin">SIGNIN</a> HERE.
          </InfoText>
          <Button onClick={handleClick} disabled={isFetching}>REGISTER</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Signup;
