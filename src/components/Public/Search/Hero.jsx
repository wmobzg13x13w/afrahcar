import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Hero = ({ onAvailableCars, category }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState(new Date());
  const [dropoffDate, setDropoffDate] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pickup, setpickup] = useState("");
  const [dropoff, setdropoff] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pickupDateParam = urlParams.get("pickupDate");
    const dropoffDateParam = urlParams.get("dropoffDate");
    const pickupParam = urlParams.get("pickup");
    const dropoffParam = urlParams.get("dropoff");

    if (pickupDateParam && dropoffDateParam && pickupParam && dropoffParam) {
      setPickupDate(pickupDateParam);
      setDropoffDate(dropoffDateParam);
      setPickupLocation(pickupParam);
      setDropoffLocation(dropoffParam);
      fetchAvailableCars(pickupDateParam, dropoffDateParam);
    }
  }, [location.search]);

  const fetchAvailableCars = async (pickupDate, dropoffDate) => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}rentings/availablecars`,
        {
          params: {
            category,
            startDate: pickupDate,
            endDate: dropoffDate,
            // location: pickupLocation, // Add location filter if supported
          },
        }
      );

      onAvailableCars(response.data);
    } catch (err) {
      setError("Échec de la récupération des voitures disponibles");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchAvailableCars(pickupDate, dropoffDate);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("pickupDate", pickupDate);
    urlParams.set("dropoffDate", dropoffDate);
    urlParams.set("dropoff", dropoffLocation);
    urlParams.set("pickup", pickupLocation);
    navigate(`${location.pathname}?${urlParams.toString()}`);
  };

  return (
    <div className='flex flex-col lg:flex-row justify-between items-center py-4'>
      {/* Left Part - Title and Text */}
      <div className='w-full lg:w-1/2 p-4'>
        <h1 className='text-4xl font-bold mb-4'>
          Réservez une voiture en quelques étapes simples
        </h1>
        <p className='text-xl mb-2'>
          Louer une voiture vous offre la liberté, et nous vous aiderons à
          trouver la meilleure voiture pour vous à un excellent prix.
        </p>
      </div>

      {/* Right Part - Form Group */}
      <div className='w-full lg:w-1/2 p-4 flex justify-center'>
        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded-lg shadow-lg flex flex-col w-fit'>
          <div className='flex md:flex-row flex-col justify-between items-center space-x-4 px-8'>
            <div className='flex flex-col'>
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium text-gray-700 mb-2'
                  htmlFor='pickup-location'>
                  Point de départ
                </label>
                <input
                  type='text'
                  id='pickup-location'
                  placeholder='Point de départ'
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className='w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange focus:outline-none'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium text-gray-700 mb-2'
                  htmlFor='dropoff-location'>
                  Point de retour
                </label>
                <input
                  type='text'
                  id='dropoff-location'
                  placeholder='Point de retour'
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className='w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange focus:outline-none'
                />
              </div>
            </div>
            <div className=''>
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium text-gray-700 mb-2'
                  htmlFor='pickup-date'>
                  Date de départ
                </label>
                <input
                  min={new Date().toISOString().slice(0, 16)}
                  type='datetime-local'
                  id='pickup-date'
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className='w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange focus:outline-none'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-sm font-medium text-gray-700 mb-2'
                  htmlFor='dropoff-date'>
                  Date de retour
                </label>
                <input
                  min={new Date(pickupDate).toISOString().slice(0, 16)}
                  type='datetime-local'
                  id='dropoff-date'
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className='w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange focus:outline-none'
                />
              </div>
            </div>
          </div>
          {error && <div className='text-red-500 mb-4'>{error}</div>}
          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-orange text-white py-2 px-6 rounded-md hover:bg-darkBlue-light'
              disabled={loading}>
              {loading ? "Chercher..." : "Chercher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
