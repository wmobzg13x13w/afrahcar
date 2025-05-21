import React from "react";
import PropTypes from "prop-types";

const RentingCard = ({ renting }) => {
  return (
    <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
      {/* Carrousel d'images */}
      <div className='relative'>
        <img
          src={
            process.env.REACT_APP_BASE_URL + "uploads/" + renting.car.images[0]
          }
          alt={renting.car.title}
          className='w-full h-64 object-cover'
        />
      </div>

      {/* Contenu */}
      <div className='p-6'>
        {/* Détails de la voiture */}
        <div className='flex flex-col md:flex-row md:justify-between items-start md:items-center'>
          <div>
            <h2 className='text-xl font-semibold text-gray-800'>
              {renting.car.title} - {renting.car.carType}
            </h2>
          </div>
          <p className='text-lg font-bold text-blue-600'>
            {renting.car.price} DTN/jour
          </p>
        </div>

        {/* Détails du locataire */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold text-gray-800'>
            Détails du locataire
          </h3>
          <p className='text-gray-700'>
            <strong>Nom:</strong> {renting.firstName} {renting.lastName}
          </p>
          <p className='text-gray-700'>
            <strong>Email:</strong> {renting.email}
          </p>
          <p className='text-gray-700'>
            <strong>Adresse:</strong> {renting.address}
          </p>
          <p className='text-gray-700'>
            <strong>Téléphone:</strong> {renting.phone}
          </p>
          <p className='text-gray-700'>
            <strong>Numéro WhatsApp:</strong> {renting.whatsApp}
          </p>
          <p className='text-gray-700'>
            <strong>Âge:</strong> {renting.age}
          </p>
          <p className='text-gray-700'>
            <strong>Ville:</strong> {renting.city}
          </p>
        </div>

        {/* Détails de la location */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold text-gray-800'>
            Détails de la location
          </h3>
          <p className='text-gray-700'>
            <strong>Date de début:</strong>{" "}
            {new Date(renting.startDate).toLocaleDateString()}
          </p>
          <p className='text-gray-700'>
            <strong>Date de fin:</strong>{" "}
            {new Date(renting.endDate).toLocaleDateString()}
          </p>
          <p className='text-gray-700'>
            <strong>Prix total:</strong> {renting.totalPrice} DTN
          </p>
          <p className='text-gray-700'>
            <strong>Lieu de prise en charge:</strong> {renting.pickupLocation}
          </p>
          <p className='text-gray-700'>
            <strong>Lieu de restitution:</strong> {renting.dropoffLocation}
          </p>
          <p className='text-gray-700'>
            <strong>Siége auto:</strong> {renting.siegeAuto ? "Oui" : "Non"}
          </p>

          {renting.numVol && (
            <p className='text-gray-700'>
              <strong>Numéro de vol:</strong> {renting.numVol}
            </p>
          )}
          <p className='text-gray-700'>
            <strong>Type de paiement:</strong>{" "}
            {renting.paymentType === "online" ? "En ligne" : "Sur place"}
            {renting.paymentType === "online" && renting.paymentPercentage && (
              <span className='ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                {renting.paymentPercentage}%
              </span>
            )}
          </p>
          <p
            className={`text-gray-700 font-semibold ${
              renting.paymentStatus === "paid"
                ? "text-green-600"
                : renting.paymentStatus === "partially_paid"
                ? "text-blue-600"
                : renting.paymentStatus === "pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}>
            <strong>Statut du paiement:</strong>{" "}
            {renting.paymentStatus === "paid"
              ? "Payé"
              : renting.paymentStatus === "partially_paid"
              ? "Partiellement payé"
              : renting.paymentStatus === "pending"
              ? "En attente"
              : "Échoué"}
            {(renting.paymentStatus === "paid" ||
              renting.paymentStatus === "partially_paid") &&
              renting.paidAmount > 0 && (
                <span className='ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded'>
                  {renting.paidAmount} DT
                </span>
              )}
          </p>
        </div>
      </div>
    </div>
  );
};

RentingCard.propTypes = {
  renting: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    car: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
      carType: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
    category: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    pickupLocation: PropTypes.string.isRequired,
    dropoffLocation: PropTypes.string.isRequired,
  }).isRequired,
};

export default RentingCard;
