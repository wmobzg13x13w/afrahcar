import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const TransfertCard = ({ transfert }) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    whatsAppNum,
    startDate,
    endDate,
    pickupLocation,
    dropoffLocation,
    address,
    carType,
    carburant,
    fuelFeesOn,
  } = transfert;

  return (
    <div className='max-w-sm rounded-lg shadow-lg bg-white overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow'>
      <div className='p-6'>
        <h2 className='text-xl font-bold text-gray-800 mb-2'>
          {firstName} {lastName}
        </h2>
        <p className='text-sm text-gray-500 mb-4'>{email}</p>

        <div className='space-y-2'>
          <div className='flex items-center'>
            <span className='text-gray-500 font-medium mr-2'>Phone:</span>
            <span className='text-gray-700'>{phone}</span>
          </div>

          <div className='flex items-center'>
            <span className='text-gray-500 font-medium mr-2'>WhatsApp:</span>
            <span className='text-gray-700'>{whatsAppNum}</span>
          </div>

          <div className='flex items-center'>
            <span className='text-gray-500 font-medium mr-2'>Address:</span>
            <span className='text-gray-700'>{address}</span>
          </div>

          <div className='flex items-center'>
            <span className='text-gray-500 font-medium mr-2'>
              Date de début:
            </span>
            <span className='text-gray-700'>
              {new Date(startDate).toLocaleString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className='flex items-center'>
            <span className='text-gray-500 font-medium mr-2'>Date de fin:</span>
            <span className='text-gray-700'>
              {new Date(endDate).toLocaleString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className='flex items-center'>
            <span className='text-gray-500 font-medium mr-2'>
              Pickup Location:
            </span>
            <span className='text-gray-700'>{pickupLocation}</span>
          </div>

          <div className='flex items-center'>
            <span className='text-gray-500 font-medium mr-2'>
              Dropoff Location:
            </span>
            <span className='text-gray-700'>{dropoffLocation}</span>
          </div>
          <div className='flex items-center'>
            <span className='text-gray-500 font-medium mr-2'>
              Type de voiture:
            </span>
            <span className='text-gray-700'>{carType}</span>
          </div>
          <div className='flex items-center'>
            <span className='text-gray-500 font-medium mr-2'>Carburant:</span>
            <span className='text-gray-700'>{carburant}</span>
          </div>
          <div className='flex items-center'>
            <span className='text-gray-500 font-medium mr-2'>
              Frais du carburant:
            </span>
            <span className='text-gray-700'>{fuelFeesOn}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

TransfertCard.propTypes = {
  transfert: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    whatsAppNum: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    pickupLocation: PropTypes.string.isRequired,
    dropoffLocation: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default TransfertCard;
