
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: rgb(252, 199, 84);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Summer Deal HERE! Free Delivery on Orders Over $100</Container>;
};

export default Announcement;