import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Public/Search/Hero";
import Filter from "../components/Public/Search/Filter";
import Cars from "../components/Public/Search/Cars";
import Footer from "../components/Public/Home/Footer/Footer";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Search = () => {
  const { category } = useParams();

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    carTypes: [],
    seatCapacities: [],
    engineTypes: [],
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}cars/getcarsbycategory/${category}`
        );
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (err) {
        setError("Failed to fetch cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleAvailableCars = (availableCars) => {
    setCars(availableCars);
    applyFilters(availableCars, filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(cars, newFilters);
  };

  const applyFilters = (cars, filters) => {
    let filtered = cars;

    if (filters.carTypes.length > 0) {
      filtered = filtered.filter((car) =>
        filters.carTypes.includes(car.carType)
      );
    }

    if (filters.seatCapacities.length > 0) {
      filtered = filtered.filter((car) =>
        filters.seatCapacities.includes(car.capacity.toString())
      );
    }

    if (filters.engineTypes.length > 0) {
      filtered = filtered.filter((car) =>
        filters.engineTypes.includes(car.engineType)
      );
    }

    setFilteredCars(filtered);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='w-16 h-16 border-t-4 border-darkBlue rounded-full animate-spin'></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Collection de voiture</title>
      </Helmet>
      <div className='relative'>
        <Navbar />
        <Hero onAvailableCars={handleAvailableCars} category={category} />
        <div className=' w-full px-8 flex items-start  lg:flex-row flex-col mb-8 gap-4'>
          <Filter onFilterChange={handleFilterChange} />
          <Cars cars={filteredCars} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Search;
