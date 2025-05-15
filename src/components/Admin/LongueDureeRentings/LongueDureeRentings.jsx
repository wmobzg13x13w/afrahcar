import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import RentingCard from "./RentingCard";
import { AuthContext } from "../../../contexts/AuthContext";

const RentingsPage = () => {
  const [rentings, setRentings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("longueduree");
  const { token } = useContext(AuthContext); // Get token from auth context

  useEffect(() => {
    const fetchRentings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}rentings`,
          {
            params: { category: selectedCategory },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRentings(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Échec de la récupération des locations"
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRentings();
    } else {
      setLoading(false);
      setError("Authentification requise - Veuillez vous connecter");
    }
  }, [selectedCategory, token]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setLoading(true);
  };

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
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold mb-4 md:mb-0'>
          Locations{" "}
          {selectedCategory === "longueduree" ? "Longue Durée" : "Courte Durée"}
        </h1>

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className='bg-white border border-gray-300 rounded-md px-4 py-2 w-full md:w-64'>
          <option value='longueduree'>Longue Durée</option>
          <option value='courteduree'>Courte Durée</option>
        </select>
      </div>

      {rentings.length === 0 ? (
        <div className='text-center mt-12'>
          <h2 className='text-2xl font-semibold text-gray-600'>
            Aucune location trouvée pour cette catégorie
          </h2>
        </div>
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

export default RentingsPage;
