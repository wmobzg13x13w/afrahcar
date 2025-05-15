import React, { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "./CarCard";
import { Link } from "react-router-dom";

const Collections = () => {
  const [carTypes, setCarTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [filteredCars, setFilteredCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}cars/getcollectioncars`
      );
      setCarTypes(response.data);
      // Initialize with all cars
      const allCars = response.data.reduce(
        (acc, type) => [...acc, ...type.cars],
        []
      );
      setFilteredCars(allCars);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    if (type === "All") {
      const allCars = carTypes.reduce(
        (acc, type) => [...acc, ...type.cars],
        []
      );
      setFilteredCars(allCars);
    } else {
      const typeData = carTypes.find((t) => t.type === type);
      setFilteredCars(typeData ? typeData.cars : []);
    }
  };

  return (
    <section className='py-12'>
      <div className='mx-auto md:px-24 px-12'>
        <h2 className='text-3xl font-semibold text-center mb-4 text-orange-dark'>
          Notre collection de voitures
        </h2>
        <p className='text-center text-lg mb-8'>
          Choisissez parmi une variété de types de voitures pour répondre à vos
          besoins.
        </p>
        <div className='md:flex md:items-center md:justify-center grid grid-cols-2 mb-8 gap-4'>
          <button
            className={`py-2 px-4 rounded-full ${
              selectedType === "All"
                ? "bg-darkBlue-dark text-white"
                : "bg-grey text-gray-700"
            } border-[1px] border-darkBlue-dark`}
            onClick={() => handleTypeChange("All")}>
            Tous
          </button>
          {carTypes.map((type) => (
            <button
              key={type.type}
              className={`py-2 px-4 rounded-full ${
                selectedType === type.type
                  ? "bg-darkBlue-dark text-white"
                  : "bg-grey text-gray-700"
              } border-[1px] border-darkBlue-dark`}
              onClick={() => handleTypeChange(type.type)}>
              {type.type}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
          {filteredCars.map((car) => (
            <CarCard
              key={car._id}
              image={car.images[0]}
              title={car.title}
              price={car.price}
              ratings={car.ratings}
              type={car.carType}
              isNewCar={car.isNewCar}
            />
          ))}
        </div>

        <div className='flex justify-center'>
          <Link to='/search/courteduree'>
            <button className='bg-darkBlue-dark text-white py-2 px-6 rounded-full hover:bg-darkBlue-light'>
              Voir toutes les collections
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Collections;
