import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  height: 100%;
  padding: 20px;
  margin-top: 16%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({filters, sort, category}) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(()=>{
    axios.get(category ? `http://localhost:3001/api/products?category=${category}` : "http://localhost:3001/api/products")
    .then(res => setItems(res.data))
    .catch(error => console.log(error))
  }, [category])

  useEffect(() => {
    category &&
    setFilteredItems(
      items.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [items, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredItems((state) =>
        [...state].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      
      setFilteredItems((state) =>
        [...state].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredItems((state) =>
        [...state].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {category ? filteredItems.map((product) => (
        <Product item={product} key={product._id} />
      )) : items
      .slice(0, 8)
      .map((product) => <Product item={product} key={product._id} />)}
    </Container>
  );
};

export default Products;
