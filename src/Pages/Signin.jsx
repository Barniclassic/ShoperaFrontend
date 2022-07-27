import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {mobile} from "../MobVersion";
import {signin} from "../redux/apiRedux"

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
    url("https://i.pinimg.com/736x/03/c2/55/03c2555538762f617b0366fd98663bd6--preppy-clothing-brands-preppy-clothes.jpg")
      center;
  background-size: cover;
`;

const Wrapper = styled.div`
  border-radius: 20px;
  width: 35%;
  height: 70vh;
  padding: 15px;
  flex-wrap: wrap;
  background-color: pink;
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
  margin-top: 15px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 15px 20px;
  background-color: orange;
  color: black;
  cursor: pointer;
`;

const Image = styled.img`
  height: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 32%;
  margin-top: 30px;
`;

const Error = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 18px;
padding-top: 15px;
color: red;
`;

const InfoText = styled.div`
  font-size: 15px;
  color: white;
  padding: 15px;
`;

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    signin(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Image src="http://www.zedgepac.com/wp-content/uploads/2017/09/login-logo.png" />
        {error && <Error>Incorrect username or password</Error>}
        <Form>
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
          <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
          <InfoText>
            NOT OUR MEMBER YET? <a href="./Signup">REGISTER</a> HERE.
          </InfoText>
          <Button onClick={handleClick} disabled={isFetching}>SIGNIN</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Signin;
