import React, { useState, useEffect } from "react";
import axios from "axios";
import RentingCard from "./RentingCard";

const CourteDureeRentings = () => {
  const [rentings, setRentings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentings = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}rentings/getall/courteduree`
        );
        setRentings(response.data);
      } catch (error) {
        setError("Échec de la récupération des locations");
      } finally {
        setLoading(false);
      }
    };

    fetchRentings();
  }, []);

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
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl font-bold mb-6'>Locations Courte Durée</h1>
      {rentings.length === 0 ? (
        <h1 className='text-4xl font-bold text-center'>
          Aucune location trouvée.
        </h1>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {rentings.map((renting) => (
            <RentingCard key={renting._id} renting={renting} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourteDureeRentings;
