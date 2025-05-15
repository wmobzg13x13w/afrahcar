import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Public/Home/Footer/Footer';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Paiement Réussi!</h2>
          <p className="text-gray-600 mb-8">
            Merci pour votre paiement. Votre transaction a été effectuée avec succès.
          </p>
          <button
            onClick={handleReturnHome}
            className="w-full bg-darkBlue text-white py-3 px-4 rounded-md hover:bg-darkBlue-light transition duration-300"
          >
            Retour à l'Accueil
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;