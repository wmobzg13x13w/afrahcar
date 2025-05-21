import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar"; // Ajustez le chemin d'importation si nécessaire
import "react-date-range/dist/styles.css"; // fichier css principal
import "react-date-range/dist/theme/default.css"; // fichier css du thème
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Public/Home/Footer/Footer";
import { CurrencyContext } from "../contexts/Currencycontext";
import { Helmet } from "react-helmet";

const LongueDuree = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const { carid } = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const pickupDateParam = urlParams.get("pickupDate");
  const dropoffDateParam = urlParams.get("dropoffDate");
  const pickupParam = urlParams.get("pickup");
  const dropoffParam = urlParams.get("dropoff");
  const category = urlParams.get("category");

  const { currency, convertPrice } = useContext(CurrencyContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    city: "",
    age: "",
    pickupLocation: pickupParam,
    dropoffLocation: dropoffParam,
    numVol: "",
    siegeAuto: false,
    paymentPercentage: 100,
  });

  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}cars/getcar/${carid}`
        );
        setCarDetails(response.data);
      } catch (err) {
        setError("Échec de la récupération des détails de la voiture");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carid]);

  useEffect(() => {
    if (carDetails?.title) {
      document.title = `Réservation - ${carDetails.title}`;
    }
  }, [carDetails]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "radio" ? value : type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData({ ...formData, [actionMeta.name]: selectedOption });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    const categoryValue = urlParams.get("category");
    const totalAmount = calculateTotal();
    const paidAmount = (totalAmount * formData.paymentPercentage) / 100;

    const data = {
      ...formData,
      startDate: pickupDateParam,
      endDate: dropoffDateParam,
      category: categoryValue,
      carModel: carid,
      totalPrice: totalAmount,
      paidAmount: paidAmount,
      paymentType: "online", // Adding payment type here to ensure backend compatibility
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}rentings/create`,
        data
      );

      const resData = response.data;

      if (resData.redirectTo) {
        // Redirect to ClicToPay form
        window.location.href = resData.redirectTo;
      } else {
        // Immediate success
        navigate("/confirmation");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setisLoading(false);
    }
  };

  const calculateTotal = () => {
    const pickupDate = new Date(pickupDateParam);
    const dropoffDate = new Date(dropoffDateParam);

    pickupDate.setHours(0, 0, 0, 0);
    dropoffDate.setHours(0, 0, 0, 0);

    const timeDifference = dropoffDate - pickupDate;

    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
    const catprice = carDetails.categories.find(
      (cat) => cat.type === category
    ).price;
    return days * catprice;
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
    <>
      <Helmet>
        <title>Réservation </title>
      </Helmet>

      <div className='relative'>
        <Navbar />
        <div className='mx-auto px-12 py-12 bg-grey'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Colonne du formulaire */}
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-2xl font-bold mb-4'>
                Informations personnelles
              </h2>
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
                <div className='mb-4'>
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
                <div className='mb-4'>
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
                <div className='mb-4'>
                  <label className='block text-gray-700 mb-2'>
                    Numéro WhatsApp
                  </label>
                  <input
                    type='text'
                    name='whatsapp'
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder='Entrez votre numéro WhatsApp'
                    className='w-full border border-gray-300 rounded-md py-2 px-4'
                    required
                  />
                </div>
                <div className='mb-4'>
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
                <div className='flex flex-wrap -mx-2 mb-4'>
                  <div className='w-full md:w-1/2 px-2 mb-4 md:mb-0'>
                    <label className='block text-gray-700 mb-2'>Ville</label>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleChange}
                      placeholder='Entrez votre ville'
                      className='w-full border border-gray-300 rounded-md py-2 px-4'
                      required
                    />
                  </div>
                  <div className='w-full md:w-1/2 px-2 mb-4 md:mb-0'>
                    <label className='block text-gray-700 mb-2'>Âge</label>
                    <input
                      type='number'
                      name='age'
                      value={formData.age}
                      onChange={handleChange}
                      placeholder='Entrez votre âge'
                      className='w-full border border-gray-300 rounded-md py-2 px-4'
                      required
                    />
                  </div>
                </div>

                <div className='mb-4'>
                  <label className='block text-gray-700 mb-2'>
                    Numéro de vol (optionnel)
                  </label>
                  <input
                    type='text'
                    name='numVol'
                    value={formData.numVol}
                    onChange={handleChange}
                    placeholder='Entrez le numéro de vol'
                    className='w-full border border-gray-300 rounded-md py-2 px-4'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 font-semibold mb-2'>
                    Avez-vous besoin de siège auto?
                  </label>
                  <div className='flex items-center space-x-2'>
                    <input
                      type='checkbox'
                      name='siegeAuto'
                      checked={formData.siegeAuto}
                      onChange={handleChange}
                      className='h-5 w-5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-blue-600'
                    />
                    <span className='text-gray-600'>
                      Oui, j'ai besoin d'un siège auto
                    </span>
                  </div>
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 font-semibold mb-2'>
                    Pourcentage de paiement
                  </label>
                  <select
                    name='paymentPercentage'
                    value={formData.paymentPercentage}
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-md py-2 px-4'
                    required>
                    <option value='30'>Payer 30% maintenant</option>
                    <option value='50'>Payer 50% maintenant</option>
                    <option value='100'>Payer 100% maintenant</option>
                  </select>
                </div>

                <button
                  type='submit'
                  className='bg-darkBlue text-white py-2 px-4 rounded-md'>
                  {isLoading ? "En cours..." : "Soummettre"}
                </button>
              </form>
            </div>

            {/* Colonne de la carte de voiture */}
            <div className=''>
              <div className='bg-white p-6 rounded-t-lg shadow-lg h-fit'>
                <h2 className='text-2xl font-bold mb-4 text-center'>
                  Informations de location
                </h2>
                {carDetails && (
                  <>
                    <h2 className='text-lg font-bold mb-4'>
                      {carDetails.title}
                    </h2>
                    <div className='mt-4'>
                      <p>
                        De :{" "}
                        {new Date(pickupDateParam).toLocaleDateString("fr-FR")}{" "}
                        {new Date(pickupDateParam).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className='font-semibold'>
                        Lieu de départ : {pickupParam}
                      </p>
                      <p>
                        À :{" "}
                        {new Date(dropoffDateParam).toLocaleDateString("fr-FR")}{" "}
                        {new Date(dropoffDateParam).toLocaleTimeString(
                          "fr-FR",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                      <p className='font-semibold'>
                        Lieu de retour : {dropoffParam}
                      </p>
                      <img
                        className='object-fit aspect-ratio-16/9 w-full rounded-md mt-4 p-8'
                        src={
                          process.env.REACT_APP_BASE_URL +
                          "uploads/" +
                          carDetails.images[0]
                        }
                        alt={carDetails.title}
                      />
                      <p>
                        Prix par jour :{" "}
                        {convertPrice(
                          carDetails.categories &&
                            carDetails.categories.length > 0
                            ? (() => {
                                const categoryType = urlParams.get("category");
                                const categoryData = carDetails.categories.find(
                                  (cat) => cat.type === categoryType
                                );
                                return categoryData
                                  ? categoryData.price
                                  : carDetails.categories[0].price;
                              })()
                            : carDetails.price
                        )}
                        {currency}
                      </p>
                      <p>
                        Dépôt de garantie : {convertPrice(carDetails.garantie)}
                        {currency}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className='bg-darkBlue-dark text-white text-2xl rounded-lg p-4 '>
                {" "}
                Total : {convertPrice(calculateTotal())}{" "}
                {currency}
              </div>
              <div className='bg-darkBlue text-white text-xl rounded-lg p-4 mt-2'>
                Montant à payer maintenant : {convertPrice((calculateTotal() * formData.paymentPercentage) / 100)}{" "}
                {currency} ({formData.paymentPercentage}%)
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LongueDuree;
