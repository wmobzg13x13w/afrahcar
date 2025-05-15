import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const seatCapacities = ["5", "7"];

const Filter = ({ onFilterChange }) => {
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);
  const [selectedSeatCapacities, setSelectedSeatCapacities] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  useEffect(() => {
    // Fetch car types from the backend
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}cartypes/getall`
        );
        setCarTypes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch car types", error);
      }
    };

    fetchCarTypes();
  }, []);
  const handleCheckboxChange = (setSelected, selected, value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleFilterChange = () => {
    onFilterChange({
      carTypes: selectedCarTypes,
      seatCapacities: selectedSeatCapacities,
    });
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/5'>
      <h3 className='text-xl font-bold mb-4'>Filtrer les voitures</h3>

      {/* Car Type Filter */}
      <div className='mb-4'>
        <h4 className='text-lg font-semibold mb-2'>Type de voiture</h4>
        {carTypes.map((type) => (
          <div key={type.name} className='flex items-center mb-2'>
            <input
              type='checkbox'
              id={`car-type-${type.name}`}
              value={type.name}
              checked={selectedCarTypes.includes(type.name)}
              onChange={() =>
                handleCheckboxChange(
                  setSelectedCarTypes,
                  selectedCarTypes,
                  type.name
                )
              }
              className='mr-2'
            />
            <label htmlFor={`car-type-${type.name}`} className='text-gray-700'>
              {type.name}
            </label>
          </div>
        ))}
      </div>

      {/* Seat Capacity Filter */}
      <div className='mb-4'>
        <h4 className='text-lg font-semibold mb-2'>Nombre de sièges</h4>
        {seatCapacities.map((capacity) => (
          <div key={capacity} className='flex items-center mb-2'>
            <input
              type='checkbox'
              id={`seat-capacity-${capacity}`}
              value={capacity}
              checked={selectedSeatCapacities.includes(capacity)}
              onChange={() =>
                handleCheckboxChange(
                  setSelectedSeatCapacities,
                  selectedSeatCapacities,
                  capacity
                )
              }
              className='mr-2'
            />
            <label
              htmlFor={`seat-capacity-${capacity}`}
              className='text-gray-700'>
              {capacity}
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={handleFilterChange}
        className='bg-darkBlue text-white py-2 px-6 rounded-md hover:bg-darkBlue-light w-full'>
        Appliquer les filtres
      </button>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
