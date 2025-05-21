import React, { useState, useEffect } from "react";
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

  // Extract category from URL path
  const [pathCategory, setPathCategory] = useState("");

  useEffect(() => {
    // Extract category from path (e.g., /search/longueduree)
    const pathSegments = location.pathname.split("/");
    const categoryFromPath = pathSegments[pathSegments.length - 1];
    if (categoryFromPath && categoryFromPath !== "search") {
      setPathCategory(categoryFromPath);
    }
  }, [location.pathname]);

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

  const handleCardClick = (car) => {
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

    // Use category from path or query parameter
    let categoryParam = urlParams.get("category");

    // If no category in query params but we have one from the path, use that
    if (!categoryParam && pathCategory) {
      categoryParam = pathCategory;
      urlParams.set("category", pathCategory);
    }

    // If still no category but car has categories, use the first one
    if (!categoryParam && car.categories && car.categories.length > 0) {
      urlParams.set("category", car.categories[0].categoryType);
    }

    navigate(`/car/${car._id}?${urlParams.toString()}`);
  };

  return (
    <div className='w-full'>
      {error && <div className='text-[red] mb-4'>{error}</div>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {currentItems.map((car) => (
          <div key={car.id} onClick={() => handleCardClick(car)}>
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
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      price: PropTypes.number.isRequired,
      ratings: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
        })
      ).isRequired,
      type: PropTypes.string.isRequired,
      isNewCar: PropTypes.bool,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          categoryType: PropTypes.string.isRequired,
          price: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            .isRequired,
          available: PropTypes.bool,
        })
      ),
    })
  ).isRequired,
};

export default Cars;
