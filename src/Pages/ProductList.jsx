import React, {useState} from "react";
import {useLocation} from 'react-router-dom'
import styled from "styled-components";
import Announcement from "../components/Infos";
import Navbar from "../components/Navbar";
import {mobile} from "../MobVersion";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Container = styled.div``;
const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 25px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })};
`;
const Title = styled.h1`
  margin: 25px;
`;
const TextFilter = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const TextSort = styled.span`
  font-size: 15px;
  font-weight: 700;
  margin-right: 45px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 8px;
  margin-right: 15px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

function ProductList() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({})
  const paramLocation = useLocation();
  const category = paramLocation.pathname.split("/")[2]

  const filtersHandler = (event) => {
      setFilters({
        ...filters, [event.target.name]: event.target.value
      })
  }
  const sortHandler = (event) => {
    setSort({
      [event.target.name]: event.target.value
    })
}
  
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>Collections</Title>
      <FiltersContainer>
        <Filter>
          <TextFilter>Filter by:-</TextFilter>
          <Select name= "size" onChange={filtersHandler}>
            <Option disabled>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
          <Select name= "color" onChange={filtersHandler}>
            <Option disabled>
              Color
            </Option>
            <Option>black</Option>
            <Option>white</Option>
            <Option>blue</Option>
            <Option>red</Option>
            <Option>green</Option>
            <Option>yellow</Option>
          </Select>
        </Filter>
        <Filter>
          <TextSort>Sort by:- </TextSort>
          <Select name="sort" onChange={sortHandler}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FiltersContainer>
      <Products filters={filters} sort={sort} category={category}/>
      <Newsletter/>
      <Footer/>
    </Container>
  );
}

export default ProductList;
