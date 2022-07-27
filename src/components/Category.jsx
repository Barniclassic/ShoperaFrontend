import styled from "styled-components";
import { categories } from "../DummyData";
import {mobile} from "../MobVersion";
import CategoryItem from "./Items";

const Container = styled.div`
  padding: 20px;
  justify-content: space-between;
  display: flex;

  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
