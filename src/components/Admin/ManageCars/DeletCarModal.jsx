import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";

const DeleteCarModal = ({ isOpen, onClose, car, onDelete, fetchCars }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}cars/delete/${car._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    onDelete(car);
    onClose();
    fetchCars();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-2xl font-bold mb-4'>Delete Car</h2>
        {error && <div className='text-red-500 mb-4'>{error}</div>}
        <p className='mb-4'>Are you sure you want to delete {car.name}?</p>
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={onClose}
            className='bg-orange text-white py-2 px-4 rounded-md mr-2'>
            Cancel
          </button>
          <button
            type='button'
            onClick={handleDelete}
            className='bg-darkBlue-light text-white py-2 px-4 rounded-md'
            disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteCarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  car: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    seats: PropTypes.number.isRequired,
    engine: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  fetchCars: PropTypes.func.isRequired,
};

export default DeleteCarModal;
