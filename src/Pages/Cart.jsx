import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Announcement from "../components/Infos";
import Navbar from "../components/Navbar";
import { mobile } from "../MobVersion";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Add, Remove } from "@mui/icons-material";
import StripeCheckout from "react-stripe-checkout"
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const KEY = "pk_test_51LORdbJOV72oSMERDtnzK2iqriBx7IexkadNEnMGAWfAB6AnfJIgBOjeBav2sRoOSlmo2u1sTtnB0yZUyf16RRuV00pKZ0qdFT";

const Container = styled.div``;
const Wrapper = styled.div``;
const Title = styled.h1`
  font-weight: 250;
  text-align: center;
`;

const Header = styled.div`
  height: 75vh;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const CartDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 150px;
`;

const Details = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  justify-content: space-around;
`;

const ItemName = styled.span``;
const ItemId = styled.span``;

const ItemColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ItemSize = styled.span``;

const ItemPrice = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Quantity = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const SingleItemPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  color: ${(props) => props.type === "total" && "red"};
  font-size: ${(props) => props.type === "total" && "22px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const ItemHeader = styled.div`
  font-size: 15px;
  color: black;
`;

const FooterContainer = styled.div`
flex: 1;
position: relative;
margin-top: 10px;
`;

const Cart = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
      setToken(token)
  }

  const cart = useSelector((state) => state.cart);
  useEffect(()=>{
     token && axios.post("http://localhost:3001/api/checkout/payment", 
      {tokenId: token.id, amount: cart.total*100})
      .then(res => navigate("/success", {state: {data: res.data, products: cart}}))
      .catch(err => console.log(err))
  }, [token, cart.total])
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Header>
          <Info>
            {cart.products.map((product) => (
              <Item>
                <CartDetail>
                  <Image src={product.img} />
                  <Details>
                    <ItemName>
                      <b>Product:</b> {product.title}
                    </ItemName>
                    <ItemId>
                      <b>ID:</b> {product._id}
                    </ItemId>
                    <ItemColor color={product.color} />
                    <ItemSize>
                      <b>Size:</b> {product.size}
                    </ItemSize>
                  </Details>
                </CartDetail>
                <ItemPrice>
                  <ItemHeader>Quantity</ItemHeader>
                  <PriceContainer>
                    <Add />
                    <Quantity>{product.quantity}</Quantity>
                    <Remove />
                  </PriceContainer>
                  <ItemHeader>Total</ItemHeader>
                  <SingleItemPrice>$ {product.quantity*product.price}</SingleItemPrice>
                </ItemPrice>
              </Item>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 6.99</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -6.99</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Tax</SummaryItemText>
              <SummaryItemPrice>$ {(cart.total/10).toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText> Estimated Total</SummaryItemText>
              <SummaryItemPrice>$ {(cart.total + cart.total/10).toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Shopera"
              image="https://media.istockphoto.com/photos/shopping-cart-vector-art-closeup-view-picture-id1251362621?b=1&k=20&m=1251362621&s=170667a&w=0&h=dRxDVhO60mUXTb3g5N5EFizNRm8Sq7xDKdmyeBeZTXQ="
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey= {KEY}
            >
               <Button>CHECKOUT</Button>
            </StripeCheckout>
          </Summary>
        </Header>
      </Wrapper>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Container>
  );
};

export default Cart;
