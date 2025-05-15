import React, { useState } from "react";
import tabImage1 from "../../../../assets/img/about.jpg";
import suv from "../../../../assets/img/suv.png";
import sport from "../../../../assets/img/sport.png";
import sedan from "../../../../assets/img/sedan.png";
import pickup from "../../../../assets/img/pickup.png";
import toyota from "../../../../assets/img/toyota.png";
import about from "../../../../assets/img/about.jpg";

const tabs = [
  {
    id: 1,
    title: "Découvrez la voiture parfaite pour vous",
    content:
      "Trouvez la voiture idéale qui correspond à vos besoins et à votre style, en quelques clics seulement.",
    image: tabImage1,
  },
  {
    id: 2,
    title: "Choisissez votre voiture",
    content:
      "Explorez notre large gamme de véhicules et sélectionnez celui qui vous convient le mieux.",
    image: tabImage1,
  },
  {
    id: 3,
    title: "Remplir le formulaire de location",
    content:
      "Complétez les informations nécessaires pour réserver votre voiture en toute simplicité.",
    image: tabImage1,
  },
  {
    id: 4,
    title: "Paiement",
    content:
      "Procédez au paiement sécurisé pour finaliser votre réservation et profitez de votre voiture.",
    image: tabImage1,
  },
];

const carTypes = [
  { type: "SUV", image: suv },
  { type: "Sedan", image: sedan },
  { type: "Sport", image: sport },
  { type: "PickUp", image: pickup },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className='flex flex-col lg:flex-row justify-between items-center p-6 sm:p-8 lg:p-12'>
      {/* Left Side - Tabs */}
      <div className='w-full lg:w-1/2 p-4'>
        <h3 className='text-xl sm:text-2xl font-semibold mb-2 text-orange-dark'>
          Comment ça marche
        </h3>
        <h2 className='text-3xl sm:text-5xl font-medium mb-4'>
          Étapes pour louer une voiture sur notre plateforme
        </h2>
        <div className='flex flex-col gap-4'>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className='flex flex-row items-center justify-start gap-4 cursor-pointer'
              onClick={() => setActiveTab(tab.id)}>
              {/* Numbered Circle */}
              <div
                className={`rounded-full w-12 h-12 sm:w-16 sm:h-16 border-[1px] border-darkBlue-dark ${
                  activeTab === tab.id
                    ? "bg-darkBlue-dark text-white"
                    : "bg-gray-200"
                } flex items-center justify-center text-lg sm:text-3xl font-thin`}>
                0{tab.id}
              </div>

              {/* Title and Content */}
              <div className='flex flex-col flex-1'>
                <h2 className='text-lg sm:text-xl font-bold'>{tab.title}</h2>
                {activeTab === tab.id && (
                  <p className='text-sm sm:text-base'>{tab.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Content */}
      <div className='w-full lg:w-1/2 p-4'>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`transition-opacity duration-300 ${
              activeTab === tab.id ? "opacity-100" : "opacity-0 hidden"
            }`}>
            {activeTab === 1 && (
              <div className='bg-gray-100 p-4 sm:p-8 rounded-3xl shadow-md'>
                {/* Section Header */}
                <div className='flex items-center space-x-4 mb-8 relative'>
                  <div className='bg-darkBlue-dark text-white w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center rounded-full absolute -right-3 sm:-right-6 -top-3 sm:-top-6'>
                    <span className='font-bold text-lg sm:text-xl'>
                      0{tab.id}
                    </span>
                  </div>
                  <h2 className='text-xl sm:text-2xl font-semibold'>
                    {tab.title}
                  </h2>
                </div>

                {/* Car Type Icons */}
                <div className='bg-white p-2 rounded-2xl shadow-sm mb-8'>
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                    {carTypes.map((type, index) => (
                      <div
                        key={index}
                        className='flex flex-col items-center justify-between'>
                        <div className='w-16 h-16 rounded-lg bg-gray-200 overflow-hidden m-auto'>
                          <img
                            src={type.image}
                            alt={type.type}
                            className='w-full h-full object-contain '
                          />
                        </div>
                        <p className='text-xs sm:text-sm mt-2 text-gray-600'>
                          {type.type}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <h2 className='text-lg sm:text-2xl font-semibold mb-4'>
                  Plus de 200 voitures disponibles
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  {[1, 2].map((car, index) => (
                    <div
                      key={index}
                      className='bg-white p-4 rounded-2xl shadow-sm flex flex-col'>
                      <div className='w-full h-32 sm:h-40 rounded-lg overflow-hidden mb-4'>
                        <img
                          src={toyota}
                          alt='Car'
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <h3 className='font-semibold text-sm sm:text-lg'>
                        Toyota Corolla 2016
                      </h3>
                      <p className='text-gray-500 text-xs sm:text-sm mb-2'>
                        150 TND / Day
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className='bg-gray-100 p-4 sm:p-8 rounded-3xl shadow-md'>
                {/* Section Header */}
                <div className='flex items-center space-x-4 mb-8 relative'>
                  <div className='bg-darkBlue-dark text-white w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center rounded-full absolute -right-3 sm:-right-6 -top-3 sm:-top-6'>
                    <span className='font-bold text-lg sm:text-xl'>
                      0{tab.id}
                    </span>
                  </div>
                  <h2 className='text-xl sm:text-2xl font-semibold'>
                    {tab.title}
                  </h2>
                </div>

                {/* Content */}
                <h2 className='text-lg sm:text-2xl font-semibold mb-4'>
                  Plus de 200 voitures disponibles
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4'>
                  {[1, 2].map((car, index) => (
                    <div
                      key={index}
                      className='bg-white p-4 rounded-2xl shadow-sm flex flex-col'>
                      <div className='w-full h-32 sm:h-40 rounded-lg overflow-hidden mb-4'>
                        <img
                          src={toyota}
                          alt='Car'
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <h3 className='font-semibold text-sm sm:text-lg'>
                        Toyota Corolla 2016
                      </h3>
                      <p className='text-gray-500 text-xs sm:text-sm mb-2'>
                        150 TND / Day
                      </p>
                    </div>
                  ))}
                </div>
                <h2 className='text-lg sm:text-2xl font-semibold mb-4'>
                  Choisissez votre voiture parfaite.
                </h2>
                <p>
                  Pour bien choisir votre voiture de location, déterminez
                  d'abord vos besoins : durée du voyage, nombre de passagers,
                  type de conduite et budget. Ensuite, comparez les offres
                  disponibles en ligne, vérifiez les avis clients et lisez
                  attentivement les conditions générales de location. Réservez
                  en ligne et assurez-vous de bien inspecter le véhicule avant
                  de partir.
                </p>
              </div>
            )}
            {activeTab === 3 && (
              <div className='bg-gray-100 p-4 sm:p-8 rounded-3xl shadow-md'>
                <div className='flex items-center space-x-4 mb-8 relative'>
                  <div className='bg-darkBlue-dark text-white w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center rounded-full absolute -right-3 sm:-right-6 -top-3 sm:-top-6'>
                    <span className='font-bold text-lg sm:text-xl'>
                      0{tab.id}
                    </span>
                  </div>
                  <h2 className='text-xl sm:text-2xl font-semibold'>
                    {tab.title}
                  </h2>
                </div>
                <img
                  src={about}
                  alt=''
                  className='object-contain w-auto h-[320px] m-auto rounded-md mb-4'
                />
                <h2 className='text-lg sm:text-2xl font-semibold mb-4'>
                  Remplir le formulaire
                </h2>
                <p>
                  Pour une réservation réussie, merci de renseigner toutes les
                  informations demandées avec exactitude. Vos coordonnées sont
                  indispensables et seront traitées conformément à notre
                  politique de confidentialité. N'hésitez pas à nous contacter
                  si vous avez des questions.
                </p>
              </div>
            )}
            {activeTab === 4 && (
              <div className='bg-gray-100 p-4 sm:p-8 rounded-3xl shadow-md'>
                <div className='flex items-center space-x-4 mb-8 relative'>
                  <div className='bg-darkBlue-dark text-white w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center rounded-full absolute -right-3 sm:-right-6 -top-3 sm:-top-6'>
                    <span className='font-bold text-lg sm:text-xl'>
                      0{tab.id}
                    </span>
                  </div>
                  <h2 className='text-xl sm:text-2xl font-semibold'>
                    {tab.title}
                  </h2>
                </div>
                <img
                  src={about}
                  alt=''
                  className='object-contain w-auto h-[320px] m-auto rounded-md mb-4'
                />
                <h2 className='text-lg sm:text-2xl font-semibold mb-4'>
                  Paiement en Ligne ou Sur Place
                </h2>
                <p>
                  Le paiement peut être effectué en ligne lors de la réservation
                  via notre plateforme sécurisée ou directement sur place au
                  comptoir de location. Nous acceptons les principales cartes de
                  crédit. Pour les paiements en ligne, assurez-vous d'utiliser
                  une connexion Internet sécurisée et de vérifier les détails de
                  votre transaction avant de confirmer.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
