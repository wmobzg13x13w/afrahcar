import React, { useState } from "react";
import PropTypes from "prop-types";
import CarCard from "./CarCard";
import { useLocation, useNavigate } from "react-router-dom";

const Cars = ({ cars }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const pickupDateParam = urlParams.get("pickupDate");
  const dropoffDateParam = urlParams.get("dropoffDate");
  const pickupParam = urlParams.get("pickup");
  const dropoffParam = urlParams.get("dropoff");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cars.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCardClick = (carId) => {
    if (
      !pickupDateParam ||
      !dropoffDateParam ||
      !pickupParam ||
      !dropoffParam
    ) {
      setError(
        "Veuillez choisir les dates et les points de départ et de retour."
      );
      return;
    }

    navigate(`/car/${carId}?${urlParams.toString()}`);
  };

  return (
    <div className='w-full'>
      {error && <div className='text-[red] mb-4'>{error}</div>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {currentItems.map((car) => (
          <div key={car.id} onClick={() => handleCardClick(car._id)}>
            <CarCard
              key={car.id}
              image={car.image}
              title={car.title}
              price={car.price}
              ratings={car.ratings}
              type={car.type}
              images={car.images}
              isNewCar={car.isNewCar}
              categories={car.categories}
            />
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className='px-4 py-2 mx-1 bg-grey rounded disabled:opacity-50'>
          Précédent
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1 ? "bg-darkBlue text-white" : "bg-grey"
            } rounded`}>
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className='px-4 py-2 mx-1 bg-grey rounded disabled:opacity-50'>
          Suivant
        </button>
      </div>
    </div>
  );
};

Cars.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      ratings: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
        })
      ).isRequired,
      isNew: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default Cars;
