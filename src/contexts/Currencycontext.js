import React, { createContext, useState, useEffect } from "react";
import tn from "../assets/img/tn.png";
import eur from "../assets/img/eur.png";
import usa from "../assets/img/usa.png";
import Select from "react-select";

// Create Context
export const CurrencyContext = createContext();

// Currency Provider Component
export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("TND"); // Default currency
  const [conversionRates, setConversionRates] = useState({ TND: 1 }); // Default rates

  // Load saved currency from localStorage on initial render
  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  // Save selected currency to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedCurrency", currency);
  }, [currency]);

  // Fetch exchange rates (API or static rates)
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_exchange_rate);
        const data = await response.json();
        setConversionRates({ ...data.conversion_rates, TND: 1 }); // Add TND as base currency
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  // Currency conversion function
  const convertPrice = (priceInTND) => {
    return (priceInTND * (conversionRates[currency] || 1)).toFixed(2);
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, convertPrice, conversionRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

const CurrencySelector = () => {
  const { currency, setCurrency } = React.useContext(CurrencyContext);
  const currencyOptions = [
    { label: "TND", value: "TND", flag: tn },
    { label: "USD", value: "USD", flag: usa },
    { label: "EUR", value: "EUR", flag: eur },
  ];
  const customComponents = {
    DropdownIndicator: () => null, // Completely removes the arrow
    IndicatorSeparator: () => null, // Removes the separator next to the arrow
  };
  return (
    <Select
      name='currency'
      components={customComponents}
      value={currencyOptions.find((option) => option.value === currency)} // Match value with selected option
      onChange={(selectedOption) => setCurrency(selectedOption.value)} // Use selectedOption.value
      options={currencyOptions}
      placeholder={currency}
      className='border rounded-md'
      isSearchable={false}
      formatOptionLabel={(country) => (
        <div className='country-option flex items-center gap-2'>
          <img
            src={country.flag}
            alt={`${country.label} flag`}
            className='w-4 h-4'
          />
          <span className='text-black'>{country.label}</span>
        </div>
      )}
    />
  );
};

export default CurrencySelector;
