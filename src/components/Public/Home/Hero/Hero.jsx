import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import heroimg from "../../../../assets/img/hero.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    pickupDate: "",
    dropoffDate: "",
  });
  const [heroImage, setHeroImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}settings/hero-image`
        );
        if (response.data && response.data.imageUrl) {
          setHeroImage(response.data.imageUrl);
        } else {
          setHeroImage(""); // Reset to empty to use fallback
        }
      } catch (err) {
        console.error("Error loading hero image:", err);
        setHeroImage(""); // Reset to empty to use fallback
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImage();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      let updatedData = {
        ...prevState,
        [name]: value,
      };

      if (name === "pickupDate") {
        const pickupDate = new Date(value);
        const dropoffDate = new Date(pickupDate);
        dropoffDate.setDate(pickupDate.getDate() + 1);
        updatedData.dropoffDate = dropoffDate.toISOString().split("T")[0];
      }

      return updatedData;
    });
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams(formData).toString();
    navigate(`/search/courteduree?${queryParams}`);
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
    <section
      className='relative bg-cover h-fit lg:h-screen bg-center bg-no-repeat rounded-2xl m-2 overflow-hidden max-w-full'
      style={{
        backgroundImage:
          heroImage && !error
            ? `url(${process.env.REACT_APP_BASE_URL}uploads/${heroImage})`
            : `url(${heroimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Content */}
      <div className='relative z-10 container mx-auto text-white px-4 py-14 sm:py-16 lg:py-32'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left leading-tight'>
          Où que vous alliez,
          <br /> nous avons le véhicule qu'il vous faut !
        </h1>

        {/* Booking Form */}
        <div className='mt-8 bg-white bg-opacity-30 backdrop-blur-xl rounded-lg shadow-lg p-4 sm:p-6 md:p-8 flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4 '>
          <div className='flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:gap-4 w-full'>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-900 mb-2'>
                Point de départ
              </label>
              <input
                type='text'
                name='pickup'
                value={formData.pickup}
                onChange={handleChange}
                placeholder='Ariana soghra - ariana'
                className='w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange-500 focus:outline-none text-grey-grey'
              />
            </div>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-900 mb-2'>
                Point de retour
              </label>
              <input
                type='text'
                name='dropoff'
                value={formData.dropoff}
                onChange={handleChange}
                placeholder='Ariana soghra - ariana'
                className='w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange-500 focus:outline-none text-grey-grey'
              />
            </div>
          </div>
          <div className='flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:gap-4 w-full'>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-900 mb-2'>
                Date de départ
              </label>
              <input
                min={new Date().toISOString().split("T")[0]}
                type='datetime-local'
                name='pickupDate'
                value={formData.pickupDate}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange-500 focus:outline-none text-grey-grey'
              />
            </div>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-900 mb-2'>
                Date de retour
              </label>
              <input
                min={new Date().toISOString().split("T")[0]}
                type='datetime-local'
                name='dropoffDate'
                value={formData.dropoffDate}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange-500 focus:outline-none text-grey-grey'
              />
            </div>
          </div>
          <div className='flex items-center justify-center lg:justify-end w-full'>
            <button
              onClick={handleSearch}
              className='bg-darkBlue text-white py-2 px-6 rounded-md hover:bg-darkBlue-light'>
              Chercher
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
