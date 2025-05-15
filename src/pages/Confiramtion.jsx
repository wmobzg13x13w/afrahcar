import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Public/Home/Footer/Footer";

const Confirmation = () => {
  return (
    <div className='relative'>
      <Navbar />
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
          <h1 className='text-3xl font-bold mb-4'>Réservation Confirmée</h1>
          <p className='text-gray-700 mb-6'>
            Votre réservation a été confirmée avec succès. Merci de nous avoir
            choisis !
          </p>
          <Link
            to='/'
            className='bg-darkBlue hover:bg-darkBlue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Retour à l'accueil
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Confirmation;
