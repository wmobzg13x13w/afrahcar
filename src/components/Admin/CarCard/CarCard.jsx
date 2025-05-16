import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import EditCarModal from "../ManageCars/EditCarModal";
import DeleteCarModal from "../ManageCars/DeletCarModal";
import axios from "axios";

const CarCard = ({ car, onEdit, onDelete, fetchCars }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(car.available);

  const handleStatusChange = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}cars/${car._id}/status`
      );
      setIsAvailable(response.data.available);
      fetchCars();
    } catch (error) {
      console.error("Failed to change car status", error);
    }
  };

  // Get category information
  const getCategories = () => {
    // Always use the categories array
    if (car.categories && car.categories.length > 0) {
      return car.categories;
    }
    // If no categories array exists, create one from legacy fields
    // This is for backward compatibility with older data
    return [
      {
        categoryType: car.category || "courteduree",
        price: car.price || 0,
        available: car.available !== undefined ? car.available : true,
      },
    ];
  };

  const categories = getCategories();
  const categoryLabels = {
    longueduree: "Longue Durée",
    courteduree: "Courte Durée",
  };

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <img
        src={process.env.REACT_APP_BASE_URL + "uploads/" + car.images[0]}
        alt={car.title}
        className='w-full h-40 object-cover rounded-lg mb-4'
      />
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold mb-1'>{car.title}</h2>
      </div>
      <p className='text-gray-700 text-md mb-2'>{car.type}</p>

      {/* Categories and Prices */}
      <div className='mb-3 border-t border-b py-2'>
        <h3 className='font-semibold mb-1'>Catégories:</h3>
        {categories.map((category, index) => (
          <div key={index} className='flex justify-between items-center mb-1'>
            <span className='text-sm'>
              {categoryLabels[category.type] || category.type}
            </span>
            <div className='flex items-center gap-2'>
              <span className='text-gray-700 font-medium'>
                {category.price} <strong>DNT/JOUR</strong>
              </span>
              <span
                className={`px-2 py-0.5 text-xs rounded ${
                  category.available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                {category.available ? "Disponible" : "Non disponible"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='flex items-center justify-between'>
        <p className='flex items-center gap-2 mb-2 mr-4'>
          <BsPerson /> {car.seats}
        </p>
      </div>
      <div className='flex justify-end gap-2'>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className='bg-blue-500 text-darkBlue py-1 px-2 rounded-md'>
          <FaEdit />
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className='bg-red-500 text-darkBlue py-1 px-2 rounded-md'>
          <FaTrash />
        </button>
        <button
          onClick={handleStatusChange}
          className={`py-1 px-2 rounded-md ${
            isAvailable ? "bg-[green]" : "bg-[red]"
          } text-white`}>
          {isAvailable ? "Disponible" : "Non Disponible"}
        </button>
      </div>
      <EditCarModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        car={car}
        onEdit={onEdit}
        fetchCars={fetchCars}
      />
      <DeleteCarModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        car={car}
        fetchCars={fetchCars}
        onDelete={onDelete}
      />
    </div>
  );
};

CarCard.propTypes = {
  car: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
    seats: PropTypes.number.isRequired,
    // Legacy fields (optional for backward compatibility)
    category: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    available: PropTypes.bool,
    // New multi-category structure (required)
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        categoryType: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        available: PropTypes.bool,
      })
    ),
    // Support for matricules
    matricules: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        available: PropTypes.bool,
      })
    ),
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  fetchCars: PropTypes.func.isRequired,
};

export default CarCard;
