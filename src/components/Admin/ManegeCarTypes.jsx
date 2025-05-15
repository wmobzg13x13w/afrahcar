import React, { useState, useEffect } from "react";
import axios from "axios";

const ManegeCarTypes = () => {
  const [carTypes, setCarTypes] = useState([]);
  const [newCarType, setNewCarType] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editCarType, setEditCarType] = useState("");

  useEffect(() => {
    // Fetch car types from the backend
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}cartypes/getall`
        );
        setCarTypes(response.data);
      } catch (error) {
        console.error("Failed to fetch car types", error);
      }
    };

    fetchCarTypes();
  }, []);

  const handleAddCarType = async (e) => {
    e.preventDefault();
    if (newCarType.trim() !== "") {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}cartypes/create`,
          { name: newCarType }
        );
        setCarTypes([...carTypes, response.data]);
        setNewCarType("");
      } catch (error) {
        console.error("Failed to add car type", error);
      }
    }
  };

  const handleDeleteCarType = async (index) => {
    const carTypeToDelete = carTypes[index];
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}cartypes/${carTypeToDelete._id}`
      );
      const updatedCarTypes = carTypes.filter((_, i) => i !== index);
      setCarTypes(updatedCarTypes);
    } catch (error) {
      console.error("Failed to delete car type", error);
    }
  };

  const handleEditCarType = (index) => {
    setEditIndex(index);
    setEditCarType(carTypes[index].name);
  };

  const handleUpdateCarType = async (e) => {
    e.preventDefault();
    if (editCarType.trim() !== "") {
      const carTypeToUpdate = carTypes[editIndex];
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_BASE_URL}cartypes/${carTypeToUpdate._id}`,
          { name: editCarType }
        );
        const updatedCarTypes = carTypes.map((type, i) =>
          i === editIndex ? response.data : type
        );
        setCarTypes(updatedCarTypes);
        setEditIndex(null);
        setEditCarType("");
      } catch (error) {
        console.error("Failed to update car type", error);
      }
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Manage Car Types</h2>
      <form onSubmit={handleAddCarType} className='mb-4 flex items-center'>
        <input
          type='text'
          value={newCarType}
          onChange={(e) => setNewCarType(e.target.value)}
          placeholder='Add new car type'
          className='border border-gray-300 rounded-md py-2 px-4 mr-2 flex-1'
        />
        <button
          type='submit'
          className='bg-darkBlue text-white py-2 px-4 rounded-md'>
          Add
        </button>
      </form>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {carTypes.map((type, index) => (
          <div
            key={type._id}
            className='bg-white shadow-md rounded-lg p-4 flex flex-col justify-between'>
            {editIndex === index ? (
              <form onSubmit={handleUpdateCarType} className='flex flex-col'>
                <input
                  type='text'
                  value={editCarType}
                  onChange={(e) => setEditCarType(e.target.value)}
                  className='border border-gray-300 rounded-md py-2 px-4 mb-2'
                />
                <div className='flex justify-between'>
                  <button
                    type='submit'
                    className='bg-[green] text-white py-2 px-4 rounded-md'>
                    Update
                  </button>
                  <button
                    type='button'
                    onClick={() => setEditIndex(null)}
                    className='bg-[red] text-white py-2 px-4 rounded-md'>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <span className='text-lg font-semibold mb-2'>{type.name}</span>
                <div className='flex justify-between'>
                  <button
                    type='button'
                    onClick={() => handleEditCarType(index)}
                    className='bg-orange text-white py-2 px-4 rounded-md'>
                    Edit
                  </button>
                  <button
                    type='button'
                    onClick={() => handleDeleteCarType(index)}
                    className='bg-[red] text-white py-2 px-4 rounded-md'>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManegeCarTypes;
