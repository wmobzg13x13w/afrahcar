import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CurrencyContext } from "../../../contexts/Currencycontext";
import { useParams, useLocation } from "react-router-dom";

const CarCard = ({
  images,
  title,
  price,
  ratings,
  type,
  isNewCar,
  categories,
}) => {
  const image = process.env.REACT_APP_BASE_URL + "uploads/" + images[0];
  const { currency, convertPrice } = useContext(CurrencyContext);
  const { category: paramCategory } = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const queryCategory = urlParams.get("category");

  // Get category from URL params, query params, or path segment
  const category = paramCategory || queryCategory;

  // Extract category from path if not in params or query
  const pathSegments = location.pathname.split("/");
  const pathCategory = pathSegments[pathSegments.length - 1];
  const effectiveCategory =
    category || (pathCategory !== "search" ? pathCategory : null);

  return (
    <div className='relative bg-grey rounded-3xl shadow-lg w-full max-w-xs sm:max-w-sm mx-auto'>
      {/* Badge */}
      {isNewCar && (
        <div class='absolute top-0 right-0 bg-orange-light text-white text-xs font-semibold uppercase tracking-wide  px-3 py-1 shadow-lg rounded-lg rounded-tl-none rounded-br-none'>
          {"Nouvelle"}
        </div>
      )}

      {/* Car Image */}
      <img
        src={image}
        alt={title}
        className='object-cover w-full aspect-[16/9] rounded-t-3xl'
      />

      {/* Car Details */}
      <div className='p-4'>
        <div className='flex flex-col sm:flex-row justify-between'>
          {/* Title and Ratings */}
          <div className='mb-4 sm:mb-0'>
            <h3 className='text-lg sm:text-xl font-bold mb-2'>{title}</h3>
            <div className='flex items-center'>
              <span className='text-yellow-light mr-2'>
                {"★".repeat(
                  ratings.length > 0
                    ? Math.round(
                        ratings.reduce((sum, { rating }) => sum + rating, 0) /
                          ratings.length
                      )
                    : 0
                )}
                {"☆".repeat(
                  5 -
                    (ratings.length > 0
                      ? Math.round(
                          ratings.reduce((sum, { rating }) => sum + rating, 0) /
                            ratings.length
                        )
                      : 0)
                )}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className='flex items-center'>
            <p className='text-gray-700 text-sm sm:text-base'>
              {categories && categories.length > 0 ? (
                // Display price based on category if available
                categories.find(
                  (cat) => cat.categoryType === effectiveCategory
                ) ? (
                  <>
                    {convertPrice(
                      categories.find(
                        (cat) => cat.categoryType === effectiveCategory
                      ).price
                    )}{" "}
                    {currency}/Day
                  </>
                ) : (
                  // Fallback to first category price if selected category not found
                  <>
                    {convertPrice(categories[0].price)} {currency}/Day
                  </>
                )
              ) : (
                // Fallback to legacy price field
                <>
                  {convertPrice(price)} {currency}/Day
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

CarCard.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
  isNewCar: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryType: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      available: PropTypes.bool,
    })
  ),
};

export default CarCard;
