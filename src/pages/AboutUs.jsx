import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Public/Home/Footer/Footer";
import aboutImage from "../assets/img/about.jpg"; // Update the path to your image
import { FaPhone } from "react-icons/fa";

const locations = [
  {
    title: "Agence Ennozha",
    src: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1596.078371944072!2d10.195016752645113!3d36.862666822988196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDUxJzQ1LjgiTiAxMMKwMTEnNDcuNCJF!5e0!3m2!1sen!2stn!4v1738620615371!5m2!1sen!2stn",
    phone: "+216 26 107 537",
    phone1: "+216 54 546 653",
  },
  {
    title: "Agence Mégrine",
    src: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3195.976259843349!2d10.225990075837034!3d36.771136972255455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDQ2JzE2LjEiTiAxMMKwMTMnNDIuOCJF!5e0!3m2!1sfr!2stn!4v1738620724146!5m2!1sfr!2stn",
    phone: "+216 29 717 071",
  },
  {
    title: "Agence Ariana",
    src: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1596.078371944072!2d10.195016752645113!3d36.862666822988196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDUxJzQ1LjgiTiAxMMKwMTEnNDcuNCJF!5e0!3m2!1sen!2stn!4v1738620615371!5m2!1sen!2stn",
    phone: "+216 26 207 537",
  },
  {
    title: "Atelier",
    src: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3195.976259843349!2d10.225990075837034!3d36.771136972255455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDQ2JzE2LjEiTiAxMMKwMTMnNDIuOCJF!5e0!3m2!1sfr!2stn!4v1738620724146!5m2!1sfr!2stn",
    phone: "+216 26 107 537",
  },
];

const AboutUs = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <div className='relative'>
      <Navbar />
      <div className='container mx-auto p-4'>
        <div className='flex flex-col lg:flex-row items-center mb-8'>
          <img
            src={aboutImage}
            alt='About Us'
            className='rounded-xl md:w-[553px] md:h-[410px] w-full h-auto'
          />
          <div className='lg:ml-8 mt-4 lg:mt-0'>
            <h2 className='text-3xl font-bold mb-4'>À propos de nous</h2>
            <p className='text-lg'>
              Nous sommes une entreprise dédiée à fournir les meilleures
              solutions de location de voitures. Notre mission est de vous
              offrir une expérience de location de voiture sans tracas et
              abordable.
            </p>
          </div>
        </div>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold mb-4'>Nos Agences</h2>
          <div className='flex flex-col lg:flex-row'>
            <div className='lg:w-1/4 mb-4 lg:mb-0'>
              <ul className='space-y-2'>
                {locations.map((location, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setSelectedLocation(location)}
                      className={`block w-full text-left px-4 py-2 rounded-md ${
                        selectedLocation.title === location.title
                          ? "bg-darkBlue text-white"
                          : "bg-grey"
                      }`}>
                      {location.title}
                      <br />
                      <span className='text-sm text-gray-600 flex items-center'>
                        <FaPhone className='mr-2' />
                        {location.phone}
                      </span>
                      {location.phone1 && (
                        <span className='text-sm text-gray-600 flex items-center'>
                          <FaPhone className='mr-2' />
                          {location.phone1}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className='lg:w-3/4 lg:ml-4'>
              <iframe
                title={selectedLocation.title}
                src={selectedLocation.src}
                width='100%'
                height='450'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
