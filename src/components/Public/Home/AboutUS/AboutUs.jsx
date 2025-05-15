import React from "react";
import aboutImage from "../../../../assets/img/about.jpg"; // Update the path to your image

const AboutUs = () => {
  return (
    <div
      className='flex flex-col lg:flex-row justify-center items-stretch py-12 gap-8'
      id='about'>
      <div className='relative flex justify-center'>
        <div className='absolute bg-darkBlue-light rounded-xl md:w-[553px] md:h-[410px] w-[350px] h-[250px]  -translate-x-6 -translate-y-6'></div>

        <div className='relative'>
          <img
            src={aboutImage}
            alt='Car dealership'
            className='rounded-xl md:w-[553px] md:h-[410px]  w-[350px] h-[250px]'
          />
        </div>
      </div>

      <div className='w-full lg:w-1/2 p-4 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold mb-2 text-orange-dark'>
          À propos de nous
        </h3>
        <h2 className='text-3xl font-bold mb-4'>
          Découvrez brièvement mais de manière informative à propos de nous.
        </h2>

        <p className=' mb-4'>
        Nous sommes une entreprise dédiée à fournir les meilleures
              solutions de location de voitures. Notre mission est de vous
              offrir une expérience de location de voiture sans tracas et
              abordable.
        </p>

        <div className=''>
          <button className='bg-white text-darkBlue-dark border-[1px] border-darkBlue-dark py-2 px-6 rounded-lg hover:bg-darkBlue-light'>
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
