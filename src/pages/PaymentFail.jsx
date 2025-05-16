import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Public/Home/Footer/Footer";
import axios from "axios";

const PaymentFail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rentalId, setRentalId] = useState("");

  useEffect(() => {
    // Get rental ID from URL parameters
    const params = new URLSearchParams(location.search);
    const id = params.get("rentalId");

    // If not in URL, try to get from localStorage
    const storedId = localStorage.getItem("rentalId");

    if (id) {
      setRentalId(id);
    } else if (storedId) {
      setRentalId(storedId);
    }
  }, [location]);

  const handleRetryPayment = () => {
    if (!rentalId) {
      alert(
        "Impossible de retrouver les informations de votre réservation. Veuillez contacter le support."
      );
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}rentings/${rentalId}/retry-payment`
      )
      .then((res) => (window.location.href = res.data.redirectTo))
      .catch((err) => alert("Payment retry failed"));
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center'>
          <XCircleIcon className='h-16 w-16 text-red-500 mx-auto mb-4' />
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            Échec du Paiement
          </h2>
          <p className='text-gray-600 mb-8'>
            Nous sommes désolés, mais votre paiement n'a pas pu être traité.
            Veuillez réessayer ou contacter le support si le problème persiste.
            {!rentalId && (
              <span className='block mt-2 text-red-500'>
                Informations de réservation non trouvées.
              </span>
            )}
          </p>
          <div className='space-y-4'>
            <button
              onClick={handleRetryPayment}
              className='w-full bg-darkBlue text-white py-3 px-4 rounded-md hover:bg-darkBlue-light transition duration-300'>
              Réessayer le Paiement
            </button>
            <button
              onClick={handleReturnHome}
              className='w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition duration-300'>
              Retour à l'Accueil
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentFail;
