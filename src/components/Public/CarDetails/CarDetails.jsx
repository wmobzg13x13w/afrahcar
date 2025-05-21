import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  FaGasPump,
  FaSnowflake,
  FaTachometerAlt,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import { GiCarDoor, GiGearStickPattern } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import { CurrencyContext } from "../../../contexts/Currencycontext";

const CarDetails = ({
  _id,
  images,
  title,
  description,
  carType,
  price,
  gear,
  fuel,
  doors,
  seats,
  ratings,
  fetchCarDetails,
  garantie,
  airConditionner,
  categories,
}) => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  console.log(categories);
  const category = urlParams.get("category");

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const { currency, convertPrice } = useContext(CurrencyContext);

  const { id } = useParams();
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [newFullname, setNewFullname] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddRating = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}cars/${id}/rating`,
        {
          fullName: newFullname,
          rating: newRating,
          comment: newComment,
        }
      );
      fetchCarDetails();
      setNewRating(0);
      setNewComment("");
      setNewFullname("");
    } catch (err) {
      setError("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-12'>
      {/* First Row */}
      <div className='flex flex-col lg:flex-row justify-between items-start gap-8 mb-12'>
        {/* Image Gallery */}
        <div className='w-full lg:w-1/2'>
          <div className='mb-4'>
            <img
              src={process.env.REACT_APP_BASE_URL + "uploads/" + selectedImage}
              alt='Selected Car'
              className='rounded-lg shadow-lg object-fit aspect-ratio-16/9 w-full'
            />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {images.map((image, index) => (
              <img
                key={index}
                src={process.env.REACT_APP_BASE_URL + "uploads/" + image}
                alt={`Car Image ${index + 1}`}
                className='h-20 rounded-lg cursor-pointer object-fit cover'
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Car Details */}
        <div className='w-full lg:w-1/2'>
          <h1 className='text-4xl font-bold mb-4'>{title}</h1>
          {/* <p className='text-lg mb-2'>{reviews.length} Reviews</p> */}
          <p className='text-lg mb-4'>{description}</p>
          <p className='text-lg mb-2'>
            <strong>Type:</strong> {carType}
          </p>

          <p className='text-3xl mb-4 flex  justify-between items-center'>
            <p>
              {categories && categories.length > 0 ? (
                // Display price based on effective category (URL param or path segment)
                <>
                  <strong>
                    {(() => {
                      // Find the category that matches the effective category
                      const categoryMatch = categories.find(
                        (cat) => cat.type === category
                      );
                      // If found, use its price, otherwise fallback to first category
                      return convertPrice(
                        categoryMatch
                          ? categoryMatch.price
                          : categories[0].price
                      );
                    })()}
                  </strong>{" "}
                  {currency}/jour
                </>
              ) : (
                // Fallback to legacy price field
                <>
                  <strong>{convertPrice(price)}</strong> {currency}/jour
                </>
              )}
            </p>
            <Link
              to={`/reservation/${_id}?${urlParams.toString()}`}
              className='text-white'>
              <button className='bg-darkBlue text-white py-2 px-6 rounded-md hover:bg-darkBlue-light text-lg'>
                Réserver
              </button>
            </Link>
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
            <div className='bg-white p-4 rounded-lg shadow-lg flex items-center'>
              <GiGearStickPattern className='text-2xl text-darkBlue mr-4' />
              <div>
                <h3 className='text-lg font-bold'>Boîte de vitesses</h3>
                <p className='text-gray-700'>{gear}</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg flex items-center'>
              <FaGasPump className='text-2xl text-darkBlue mr-4' />
              <div>
                <h3 className='text-lg font-bold'>Carburant</h3>
                <p className='text-gray-700'>{fuel}</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg flex items-center'>
              <GiCarDoor className='text-2xl text-darkBlue mr-4' />
              <div>
                <h3 className='text-lg font-bold'>Portes</h3>
                <p className='text-gray-700'>{doors}</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg flex items-center'>
              <FaSnowflake className='text-2xl text-darkBlue mr-4' />
              <div>
                <h3 className='text-lg font-bold'>Climatisation</h3>
                <p className='text-gray-700'>
                  {airConditionner ? "Oui" : "Non"}
                </p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg flex items-center'>
              <IoMdPerson className='text-2xl text-darkBlue mr-4' />
              <div>
                <h3 className='text-lg font-bold'>Sièges</h3>
                <p className='text-gray-700'>{seats}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Technical Specifications */}
      {/* <div className='text-lg mb-12 bg-white rounded-lg shadow-lg p-8'>
        <strong>Équipements de voiture:</strong>
        <ul className='list-disc list-inside grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
          {allEquipments.map((equipment, index) => (
            <li key={index} className='flex items-center p-2 '>
              {equipments.includes(equipment) && (
                <FaCheckCircle className='text-darkBlue mr-2' />
              )}
              <span className='text-gray-800'>{equipment}</span>
            </li>
          ))}
        </ul>
      </div> */}

      <div className='mb-12 bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-2xl font-bold mb-4'>Conditions de location</h1>
        <div className='flex items-center gap-2'>
          <FaCheckCircle className='text-darkBlue mr-2' />
          <p>TVA 19%</p>
        </div>
        <div className='flex items-center gap-2'>
          <FaCheckCircle className='text-darkBlue mr-2' />
          <p>Kilométrage illimité</p>
        </div>
        <div className='flex items-center gap-2'>
          <FaCheckCircle className='text-darkBlue mr-2' />
          <p>Assurance de base (Responsabilité Civile)</p>
        </div>
        <div className='flex items-center gap-2'>
          <FaCheckCircle className='text-darkBlue mr-2' />
          <p>
            Dépôt de garantie {convertPrice(garantie)} {currency}
          </p>
        </div>
      </div>

      <div className='mb-12 bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-2xl font-bold mb-4'>Critères du conducteur</h1>
        <div className='flex items-center gap-2'>
          <FaCheckCircle className='text-darkBlue mr-2' />
          <p>Age minimal {carType === "Luxe" ? "35" : "25"} ans</p>
        </div>
        <div className='flex items-center gap-2'>
          <FaCheckCircle className='text-darkBlue mr-2' />
          <p>Permis de conduite de plus de 2 ans</p>
        </div>
      </div>
      <div className='mb-12 bg-white rounded-lg shadow-lg p-8'>
        <h2 className='text-2xl font-bold mb-4'>
          Avis des clients{" "}
          <span className='bg-darkBlue-dark text-white rounded-lg px-4 py-1 ml-2 text-lg'>
            {ratings.length}
          </span>
        </h2>
        {ratings.length > 0 ? (
          ratings.map((rating, index) => (
            <div key={index} className='p-4 mb-4 border rounded-lg'>
              <div className='flex items-center mb-2 gap-2'>
                <Avatar
                  name={rating.fullName}
                  size='40'
                  round={true}
                  className='text-xl'
                />
                <p className='text-lg font-bold'>{rating.fullName}</p>
              </div>
              <p className='text-yellow mb-2'>
                {"★".repeat(rating.rating)} {"☆".repeat(5 - rating.rating)}
              </p>
              <p className='text-gray-700'>{rating.comment}</p>
            </div>
          ))
        ) : (
          <p className='text-gray-700'>Aucun avis disponible.</p>
        )}
      </div>

      {/* New Rating Form */}
      <div className='mb-12 bg-white rounded-lg shadow-lg p-8'>
        <h2 className='text-2xl font-bold mb-4'>Ajouter votre avis</h2>
        <form onSubmit={handleAddRating}>
          <div className='mb-4'>
            <label
              className='block text-sm font-medium text-gray-700 mb-2'
              htmlFor='fullname'>
              Votre Nom Complet
            </label>
            <input
              type='text'
              id='fullname'
              value={newFullname}
              onChange={(e) => setNewFullname(e.target.value)}
              className='w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange focus:outline-none'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-sm font-medium text-gray-700 mb-2'
              htmlFor='rating'>
              Avis
            </label>
            <select
              id='rating'
              value={newRating}
              onChange={(e) => setNewRating(parseInt(e.target.value))}
              className='w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange focus:outline-none'
              required>
              <option value=''>Votre avis</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4'>
            <label
              className='block text-sm font-medium text-gray-700 mb-2'
              htmlFor='comment'>
              Commentaire
            </label>
            <textarea
              id='comment'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className='w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-orange focus:outline-none'
              required
            />
          </div>
          {error && <div className='text-red-500 mb-4'>{error}</div>}
          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-orange text-white py-2 px-6 rounded-md hover:bg-darkBlue-light'
              disabled={loading}>
              {loading ? "Soumission..." : "Soumettre avis"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CarDetails.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  reviews: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  carType: PropTypes.string.isRequired,
  capacity: PropTypes.string.isRequired,
  steering: PropTypes.string.isRequired,
  engineType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  availableEquipments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CarDetails;
