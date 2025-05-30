import React, { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "../CarCard/CarCard";
import AddCarModal from "./AddCarModal";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}cars/getcars`
      );
      setCars(response.data);
    } catch (err) {
      setError("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAddCar = (newCar) => {
    // Add all new cars without category filtering
    setCars([...cars, newCar]);
  };

  const handleEditCar = (updatedCar) => {
    setCars(cars.map((car) => (car._id === updatedCar._id ? updatedCar : car)));
  };

  const handleDeleteCar = (deletedCar) => {
    setCars(cars.filter((car) => car._id !== deletedCar._id));
  };

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Gestion des Voitures</h1>
        <div className='flex gap-4'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='bg-darkBlue text-white py-2 px-4 rounded-md'>
            Ajouter Voiture
          </button>
        </div>
      </div>

      {error && <div className='text-red-500 mb-4'>{error}</div>}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {cars.map((car) => (
          <CarCard
            key={car._id}
            car={car}
            onEdit={handleEditCar}
            onDelete={handleDeleteCar}
            fetchCars={fetchCars}
          />
        ))}
      </div>

      <AddCarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCar}
        fetchCars={fetchCars}
        category='courteduree'
      />
    </div>
  );
};

export default ManageCars;
