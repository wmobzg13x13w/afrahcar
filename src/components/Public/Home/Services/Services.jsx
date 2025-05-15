import React from "react";
import { IoCarSportSharp } from "react-icons/io5";
const Services = () => {
  return (
    <section className='bg-black-dark text-white mx-2 py-8 px-6 sm:px-12 md:px-20 rounded-3xl relative overflow-hidden'>
      {/* Background grid */}
      <div className='absolute inset-0 bg-grid opacity-10 pointer-events-none'></div>

      {/* Content */}
      <div className='relative z-10'>
        {/* Header */}
        <div className='max-w-6xl mx-auto text-center md:text-left'>
          <h4 className='text-orange-dark font-semibold text-2xl mb-2 font-w-600'>
            Nos Services
          </h4>
          <div className='flex items-center justify-between gap-12 flex-col lg:flex-row'>
            <h2 className='font-semibold mb-4 leading-tight text-5xl lg:w-1/2'>
              Nos services premium pour vos besoins de location de voiture.
            </h2>
            <p className=' text-sm md:text-base leading-relaxed lg:w-1/2'>
              Explorez nos services de location de voitures : courte durée pour
              vos escapades, long terme pour plus de confort, et transferts avec
              chauffeur pour un voyage sans tracas. Flexibilité, confort et
              fiabilité à chaque trajet.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12  mx-auto '>
          {/* Card 1 */}
          <div className='bg-darkBlue-light p-6 rounded-xl text-left md:w-[440px] md:h-[336px] w-full h-auto flex items-center justify-center flex-col mx-auto'>
            <div className='flex items-center justify-between gap-8'>
              <div
                className='w-20 h-20 mx-auto bg-grey-dark
               rounded-full flex items-center justify-center mb-4'>
                <div
                  className='w-16 h-16 mx-auto bg-grey-grey
               rounded-full flex items-center justify-center m-auto'>
                  <span className='text-white text-3xl'>
                    <IoCarSportSharp />
                  </span>
                </div>
              </div>
              <h3 className='font-thin  text-lg mb-2'>
                Location de voiture <br /> à courte durée
              </h3>
            </div>
            <p className='font-thin text-xl'>
              Des locations flexibles et pratiques pour vos besoins de courte
              durée, que ce soit pour une escapade le week-end ou un voyage
              d'affaires rapide.
            </p>
          </div>

          {/* Card 2 */}
          <div className='bg-darkBlue-light p-6 rounded-xl text-left md:w-[440px] md:h-[336px] w-full h-auto  flex items-center justify-center flex-col mx-auto'>
            <div className='flex items-center justify-between gap-8'>
              <div
                className='w-20 h-20 mx-auto bg-grey-dark
               rounded-full flex items-center justify-center mb-4'>
                <div
                  className='w-16 h-16 mx-auto bg-grey-grey
               rounded-full flex items-center justify-center m-auto'>
                  <span className='text-white text-3xl'>
                    <IoCarSportSharp />
                  </span>
                </div>
              </div>
              <h3 className='font-thin  text-lg mb-2'>
                Location de voiture <br /> à longue durée
              </h3>
            </div>
            <p className='font-thin text-xl'>
              Des locations de voitures abordables à longue durée, conçues pour
              vous offrir confort et fiabilité sur des périodes prolongées.
            </p>
          </div>

          {/* Card 3 */}
          <div className='bg-darkBlue-light p-6 rounded-xl text-left md:w-[440px] md:h-[336px] w-full h-auto  flex items-center justify-center flex-col mx-auto'>
            <div className='flex items-center justify-between gap-8 '>
              <div
                className='w-20 h-20 mx-auto bg-grey-dark
               rounded-full flex items-center justify-center mb-4'>
                <div
                  className='w-16 h-16 mx-auto bg-grey-grey
               rounded-full flex items-center justify-center m-auto'>
                  <span className='text-white text-3xl'>
                    <IoCarSportSharp />
                  </span>
                </div>
              </div>
              <h3 className='font-thin  text-lg mb-2'>Transfert + chauffeur</h3>
            </div>
            <p className='font-thin text-xl'>
              Bénéficiez d'un transfert avec chauffeur, alliant confort,
              sécurité et ponctualité pour tous vos déplacements professionnels
              ou personnels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
