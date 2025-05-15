import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Public/Home/Footer/Footer';

const PaymentFail = () => {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    navigate(-1);
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Échec du Paiement</h2>
          <p className="text-gray-600 mb-8">
            Nous sommes désolés, mais votre paiement n'a pas pu être traité. Veuillez réessayer ou contacter le support si le problème persiste.
          </p>
          <div className="space-y-4">
            <button
              onClick={handleRetryPayment}
              className="w-full bg-darkBlue text-white py-3 px-4 rounded-md hover:bg-darkBlue-light transition duration-300"
            >
              Réessayer le Paiement
            </button>
            <button
              onClick={handleReturnHome}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition duration-300"
            >
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