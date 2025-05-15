import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CurrencyContext } from "../../../../contexts/Currencycontext";

const CarCard = ({ image, title, ratings, price, isNewCar }) => {
  const { currency, convertPrice } = useContext(CurrencyContext);
  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, { rating }) => sum + rating, 0) / ratings.length
      : 0;

  return (
    <div className='relative bg-white rounded-lg shadow-lg overflow-hidden'>
      {isNewCar && (
        <div class='absolute top-0 right-0 bg-orange-light text-white text-xs font-semibold uppercase tracking-wide  px-3 py-1 shadow-lg rounded-lg rounded-tl-none rounded-br-none'>
          {"Nouvelle"}
        </div>
      )}

      <img
        src={process.env.REACT_APP_BASE_URL + "uploads/" + image}
        alt={title}
        className='w-full h-40 object-contain rounded-t-3xl'
      />
      <div className='p-2'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-xl font-bold mb-2'>{title}</h3>
            <div className='flex items-center'>
              <span className='text-yellow-light mr-2'>
                {"★".repeat(averageRating)}
                {"☆".repeat(5 - averageRating)}
              </span>
            </div>
          </div>
          <div className='flex justify-between items-center mb-2'>
            <p className='text-gray-700 font-semibold'>
              {convertPrice(price)} {currency}/Jour
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

CarCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
  price: PropTypes.number.isRequired,
  isNewCar: PropTypes.bool.isRequired,
};

export default CarCard;
