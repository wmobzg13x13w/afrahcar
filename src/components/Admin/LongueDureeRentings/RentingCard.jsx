import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const RentingCard = ({ renting }) => {
  // Format dates with time
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [availableMatricules, setAvailableMatricules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableMatricules = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}rentings/availablematricules`,
        {
          params: {
            carModel: renting.carModel,
            startDate: renting.startDate,
            endDate: renting.endDate,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAvailableMatricules(response.data.availableMatricules);
      setShowDropdown(true);
    } catch (err) {
      setError("Failed to fetch available matricules");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignMatricule = async (matricule) => {
    try {
      setIsLoading(true);
      setError(null);

      await axios.post(
        `${process.env.REACT_APP_BASE_URL}rentings/assignmatricule/${renting._id}`,
        { matricule },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update UI optimistically
      renting.assignedMatricule = matricule;
      setShowDropdown(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign matricule");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-6'>
      {/* Car Images - Add fallback for missing images */}
      <div className='relative h-64 bg-gray-100'>
        {renting.carModel?.images?.length > 0 ? (
          <img
            src={`${process.env.REACT_APP_BASE_URL}uploads/${renting.carModel.images[0]}`}
            alt={renting.carModel.title}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-500'>
            Aucune image disponible
          </div>
        )}
      </div>

      {/* Content */}
      <div className='p-6'>
        {/* Vehicle Header */}
        <div className='flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4'>
          <div>
            <h2 className='text-xl font-semibold text-gray-800'>
              {renting.carModel?.title} - {renting.carModel?.carType}
            </h2>
            {renting.assignedMatricule && (
              <p className='text-sm text-gray-600 mt-1'>
                Matricule: {renting.assignedMatricule}
              </p>
            )}
          </div>
          <p className='text-lg font-bold text-blue-600 mt-2 md:mt-0'>
            {renting.carModel?.price} DT/jour
          </p>
        </div>

        {/* Client Details */}
        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              Informations client
            </h3>
            <DetailItem
              label='Nom'
              value={`${renting.firstName} ${renting.lastName}`}
            />
            <DetailItem label='Email' value={renting.email} />
            <DetailItem label='Adresse' value={renting.address} />
            <DetailItem label='Téléphone' value={renting.phone} />
            <DetailItem label='WhatsApp' value={renting.whatsapp} />
            <DetailItem label='Âge' value={renting.age} />
            <DetailItem label='Ville' value={renting.city} />
          </div>

          {/* Rental Details */}
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              Détails location
            </h3>
            <DetailItem
              label='Catégorie'
              value={
                renting.category === "longueduree"
                  ? "Longue durée"
                  : "Courte durée"
              }
            />
            <DetailItem label='Début' value={formatDate(renting.startDate)} />
            <DetailItem label='Fin' value={formatDate(renting.endDate)} />
            <DetailItem label='Prix total' value={`${renting.totalPrice} DT`} />
            <DetailItem
              label='Prise en charge'
              value={renting.pickupLocation}
            />
            <DetailItem label='Restitution' value={renting.dropoffLocation} />
            <DetailItem
              label='Siège auto'
              value={renting.siegeAuto ? "Oui" : "Non"}
            />
            {renting.numVol && (
              <DetailItem label='Numéro de vol' value={renting.numVol} />
            )}
            <DetailItem
              label='Type de paiement'
              value={
                <>
                  {renting.paymentType === "online"
                    ? "En ligne"
                    : renting.paymentType === "onsite"
                    ? "Sur place"
                    : "Non spécifié"}
                  {renting.paymentType === "online" && renting.paymentPercentage && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {renting.paymentPercentage}%
                    </span>
                  )}
                </>
              }
            />

            <DetailItem
              label='Statut du paiement'
              value={
                <>
                  {renting.paymentStatus === "paid"
                    ? "Payé"
                    : renting.paymentStatus === "partially_paid"
                    ? "Partiellement payé"
                    : renting.paymentStatus === "pending"
                    ? "En attente"
                    : renting.paymentStatus === "failed"
                    ? "Échoué"
                    : "Inconnu"}
                  {(renting.paymentStatus === "paid" || renting.paymentStatus === "partially_paid") && renting.paidAmount > 0 && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {renting.paidAmount} DT
                    </span>
                  )}
                </>
              }
            />
          </div>
        </div>
      </div>
      {!renting.assignedMatricule && (
        <div className='p-4 border-t'>
          <div className='flex items-center gap-4'>
            <button
              onClick={fetchAvailableMatricules}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg ${
                isLoading
                  ? "bg-darkBlue cursor-not-allowed"
                  : "bg-darkBlue-light hover:bg-blue-700 text-white"
              }`}>
              {isLoading ? "Chargement..." : "Choisir Matricule"}
            </button>

            {error && <p className='text-red-500 text-sm'>{error}</p>}

            {showDropdown && availableMatricules.length > 0 && (
              <select
                onChange={(e) => handleAssignMatricule(e.target.value)}
                className='border rounded-lg p-2'
                disabled={isLoading}>
                <option value=''>Choisir Matricule</option>
                {availableMatricules.map((matricule) => (
                  <option key={matricule} value={matricule}>
                    {matricule}
                  </option>
                ))}
              </select>
            )}

            {showDropdown && availableMatricules.length === 0 && (
              <p className='text-gray-500 text-sm'>
                Aucune matricule est valable pour cette période
              </p>
            )}
          </div>
        </div>
      )}

      {renting.assignedMatricule && (
        <div className='p-4 bg-green-50 border-t'>
          <p className='text-green-600'>
            Matricule: {renting.assignedMatricule}
          </p>
        </div>
      )}
    </div>
  );
};

// Helper component for detail items
const DetailItem = ({ label, value }) => (
  <p className='text-gray-700 text-sm mb-1'>
    <strong className='font-medium'>{label}:</strong> {value || "Non spécifié"}
  </p>
);

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
    carModel: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
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
    siegeAuto: PropTypes.bool.isRequired,
    numVol: PropTypes.string,
    whatsapp: PropTypes.string.isRequired,
    assignedMatricule: PropTypes.string, // Added matricule prop type
    paymentType: PropTypes.string.isRequired,
    paymentStatus: PropTypes.string.isRequired,
  }).isRequired,
};

export default RentingCard;
