import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar"; // Ajustez le chemin d'importation si nécessaire
import "react-date-range/dist/styles.css"; // fichier css principal
import "react-date-range/dist/theme/default.css"; // fichier css du thème
import axios from "axios";
import Footer from "../components/Public/Home/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Helmet } from "react-helmet";

const Transfert = () => {
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    whatsAppNum: "",
    pickupLocation: "",
    dropoffLocation: "",
    startDate: "",
    endDate: "",
    carType: "",
    carburant: "",
    fuelFeesOn: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption.value });
  };

  const engineTypeOptions = [
    { value: "Essence", label: "Essence" },
    { value: "Diesel", label: "Diesel" },
  ];

  const fuelFeesOptions = [
    { value: "client", label: "Client" },
    { value: "agence", label: "Agence" },
  ];

  const [carTypes, setCarTypes] = useState([]);

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}cartypes/getall`
        );
        const carTypeOptions = response.data.map((type) => ({
          value: type.name,
          label: type.name,
        }));
        setCarTypes(carTypeOptions);
      } catch (error) {
        console.error("Failed to fetch car types", error);
      }
    };

    fetchCarTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "transfert/create",
        formData
      );

      navigate("/confirmation");
      setisLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Transfert</title>
      </Helmet>
      <div className=''>
        <Navbar />

        <div className=' bg-white py-6 px-6 md:px-24 rounded-lg shadow-lg'>
          <h2 className='text-3xl font-bold my-4'>Transfert</h2>
          <hr />
          <h2 className='text-2xl font-bold my-4'>Informations personnelles</h2>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-wrap -mx-2 mb-4'>
              <div className='w-full md:w-1/2 px-2 mb-4 md:mb-0'>
                <label className='block text-gray-700 mb-2'>Prénom</label>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder='Entrez votre prénom'
                  className='w-full border border-gray-300 rounded-md py-2 px-4'
                  required
                />
              </div>
              <div className='w-full md:w-1/2 px-2'>
                <label className='block text-gray-700 mb-2'>Nom</label>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder='Entrez votre nom'
                  className='w-full border border-gray-300 rounded-md py-2 px-4'
                  required
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-2 mb-4'>
              <div className='w-full md:w-1/2 px-2'>
                <label className='block text-gray-700 mb-2'>Adresse</label>
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  placeholder='Entrez votre adresse'
                  className='w-full border border-gray-300 rounded-md py-2 px-4'
                  required
                />
              </div>
              <div className='w-full md:w-1/2 px-2'>
                <label className='block text-gray-700 mb-2'>Téléphone</label>
                <input
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Entrez votre téléphone'
                  className='w-full border border-gray-300 rounded-md py-2 px-4'
                  required
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-2 mb-4'>
              <div className='w-full md:w-1/2 px-2'>
                <label className='block text-gray-700 mb-2'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Entrez votre email'
                  className='w-full border border-gray-300 rounded-md py-2 px-4'
                  required
                />
              </div>
              <div className='w-full md:w-1/2 px-2'>
                <label className='block text-gray-700 mb-2'>
                  Numéro WhatsApp
                </label>
                <input
                  type='text'
                  name='whatsAppNum'
                  value={formData.whatsAppNum}
                  onChange={handleChange}
                  placeholder='Entrez votre numéro WhatsApp'
                  className='w-full border border-gray-300 rounded-md py-2 px-4'
                  required
                />
              </div>
            </div>
            <hr />
            <h2 className='text-2xl font-bold my-4'>
              Informations du transfert
            </h2>
            <div className='flex flex-wrap -mx-2 mb-4'>
              <div className='w-full md:w-1/2 px-2 mb-4 md:mb-0'>
                <label className='block text-gray-700 mb-2'>
                  Point de départ
                </label>
                <input
                  type='text'
                  name='pickupLocation'
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  placeholder='Entrez votre point de départ'
                  className='w-full border border-gray-300 rounded-md py-2 px-4'
                  required
                />
              </div>
              <div className='w-full md:w-1/2 px-2'>
                <label className='block text-gray-700 mb-2'>Déstination </label>
                <input
                  type='text'
                  name='dropoffLocation'
                  value={formData.dropoffLocation}
                  onChange={handleChange}
                  placeholder='Entrez votre déstination'
                  className='w-full border border-gray-300 rounded-md py-2 px-4'
                  required
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-2 mb-4'>
              <div className='w-full md:w-1/2 px-2 mb-4 md:mb-0'>
                <label className='block text-gray-700 mb-2'>
                  Date de départ
                </label>
                <input
                  type='datetime-local'
                  name='startDate'
                  value={formData.startDate}
                  onChange={handleChange}
                  placeholder='Entrez votre point de départ'
                  className='w-full border border-gray-300 rounded-md py-2 px-4'
                  required
                />
              </div>
              <div className='w-full md:w-1/2 px-2'>
                <label className='block text-gray-700 mb-2'>
                  Date d'arrivé{" "}
                </label>
                <input
                  type='datetime-local'
                  name='endDate'
                  value={formData.endDate}
                  onChange={handleChange}
                  placeholder="Entrez votre date d'arrivé"
                  className='w-full border border-gray-300 rounded-md py-2 px-4'
                  required
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-2 mb-4'>
              <div className='w-full md:w-1/2 px-2 mb-4 md:mb-0'>
                <label className='block text-gray-700 mb-2'>
                  Type de Voiture
                </label>
                <Select
                  name='carType'
                  value={carTypes.find(
                    (option) => option.value === formData.carType
                  )}
                  onChange={handleSelectChange}
                  options={carTypes}
                  className='w-full border  rounded-md '
                  required
                />
              </div>
              <div className='w-full md:w-1/2 px-2'>
                <label className='block text-gray-700 mb-2'>Carburant</label>
                <Select
                  name='carburant'
                  value={engineTypeOptions.find(
                    (option) => option.value === formData.carburant
                  )}
                  onChange={handleSelectChange}
                  options={engineTypeOptions}
                  className='w-full border  rounded-md '
                  required
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-2 mb-4'>
              <div className='w-full md:w-1/2 px-2 mb-4 md:mb-0'>
                <label className='block text-gray-700 mb-2'>
                  Frais de carburant
                </label>
                <Select
                  name='fuelFeesOn'
                  value={fuelFeesOptions.find(
                    (option) => option.value === formData.fuelFeesOn
                  )}
                  onChange={handleSelectChange}
                  options={fuelFeesOptions}
                  className='w-full border  rounded-md '
                  required
                />
              </div>
            </div>
            <button
              type='submit'
              className='bg-darkBlue text-white py-2 px-4 rounded-md'>
              {isLoading ? "Chargement.." : "Soumttre"}
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Transfert;
