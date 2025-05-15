import React from "react";
import Hero from "../components/Public/Home/Hero/Hero";
import Navbar from "../components/Public/Home/Navbar/Navbar";
import Brands from "../components/Public/Home/Brands/Brands";
import Collections from "../components/Public/Home/Collections/Collections";
import Services from "../components/Public/Home/Services/Services";
import AboutUs from "../components/Public/Home/AboutUS/AboutUs";
import HowItWorks from "../components/Public/Home/HowItWorks/HowItWorks";
import Footer from "../components/Public/Home/Footer/Footer";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>Accueil</Helmet>
      <div className='relative w-full overflow-hidden'>
        <Navbar />
        <Hero />
        <Brands />
        <Collections />
        <Services />
        <AboutUs />
        <HowItWorks />
        <Footer />
      </div>
    </>
  );
};

export default Home;
