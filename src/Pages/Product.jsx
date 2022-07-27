import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Announcement from "../components/Infos";
import Navbar from "../components/Navbar";
import {mobile} from "../MobVersion";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux"
import {addProduct} from "../redux/cartRed"

const Container = styled.div``;
const InnerContainer = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100hv;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  border-radius: 50%;
  background-color: ${(props) => props.color};
  width: 20px;
  height: 20px;
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const Amount = styled.span`
  justify-content: center;
  border-radius: 10px;
  border: 1px solid teal;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;

  margin: 0px 5px;
`;

const SizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Button = styled.button`
  background-color: black;
  cursor: pointer;
  font-weight: 500;
  color: white;
  padding: 15px;
  border: 2px solid teal;
  border-radius: 10px;
  &:hover {
    background-color: gray;
  }
`;

const Product = () => {
  const [productItem, setproductItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch  = useDispatch();

  const paramLocation = useLocation();
  const productId = paramLocation.pathname.split("/")[2];
  useEffect(() => {
    axios.get(`http://localhost:3001/api/products/find/${productId}`)
    .then(res => setproductItem(res.data))
    .catch(err => console.log(err))
  }, [productId]);
  const handleQuantity = (action) => {
    if(action === "add"){
      setQuantity(quantity+1)
    }
    if(action === "reduce" && quantity > 1){
      setQuantity(quantity-1)
    }
  }

  const handleAddToBag = () => {
    dispatch(addProduct({...productItem, quantity, color, size}))
  }

  return (
    <Container>
      <Announcement />
      <Navbar />
      <InnerContainer>
        <ImageContainer>
          <Img src={productItem.img}/>
        </ImageContainer>
        <InfoContainer>
          <Title>{productItem.title}</Title>
          <Desc>{productItem.desc}
          </Desc>
          <Price>$ {productItem.price}</Price>
          <FilterContainer>
            <Filter>
            <FilterTitle>Color </FilterTitle>
            {productItem.color?.map((color) => (
                <FilterColor color={color} key={color} onClick={() => setColor(color)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size </FilterTitle>
              <FilterSize onChange={(event) => setSize(event.target.value)}>
              {productItem.size?.map((size) => (
                 <SizeOption key={(size)}>{size}</SizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("reduce")}/>
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("add")} />
            </AmountContainer>
            <Button onClick={handleAddToBag}>ADD TO BAG</Button>
          </AddContainer>
        </InfoContainer>
      </InnerContainer>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
