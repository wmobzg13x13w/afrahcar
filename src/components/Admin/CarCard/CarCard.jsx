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

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <img
        src={process.env.REACT_APP_BASE_URL + "uploads/" + car.images[0]}
        alt={car.title}
        className='w-full h-40 object-cover rounded-lg mb-4'
      />
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold mb-1'>{car.title}</h2>
        <h2 className='text-xl font-bold mb-1'>
          {car.category === "longueduree" ? "Longue Durée" : "Courte Durée"}
        </h2>
      </div>
      <p className='text-gray-700 text-md mb-2'>{car.type}</p>
      <div className='flex items-center justify-between'>
        <p className='flex items-center gap-2 mb-2 mr-4'>
          <BsPerson /> {car.seats}
        </p>
        <p className='text-gray-700 mb-2'>
          {car.price} <strong>DNT/JOUR</strong>
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
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    seats: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    isAvailable: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  fetchCars: PropTypes.func.isRequired,
};

export default CarCard;
