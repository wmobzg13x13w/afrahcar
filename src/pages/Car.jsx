import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CarDetails from "../components/Public/CarDetails/CarDetails";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Public/Home/Footer/Footer";
import { Helmet } from "react-helmet";

const Car = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, settitle] = useState("");

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}cars/getcar/${id}`
      );
      setCarDetails(response.data);
      settitle(response.data.title);
    } catch (err) {
      setError("Failed to fetch car details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Helmet>{title}</Helmet>
      <div className='relative'>
        <Navbar />
        {carDetails && (
          <CarDetails {...carDetails} fetchCarDetails={fetchCarDetails} />
        )}
        <Footer />
      </div>
    </>
  );
};

export default Car;
