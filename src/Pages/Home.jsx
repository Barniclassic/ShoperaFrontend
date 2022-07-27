import React from "react";
import Announcement from "../components/Infos";
import Categories from "../components/Category";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import SlideShow from "../components/Slide";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <SlideShow />
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;