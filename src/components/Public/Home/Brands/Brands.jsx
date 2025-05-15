import React from "react";
import brand1 from "../../../../assets/img/mg.png";
import brand2 from "../../../../assets/img/donfeng.png";
import brand3 from "../../../../assets/img/brand4.png";
import brand4 from "../../../../assets/img/hyundai.png";
import brand5 from "../../../../assets/img/dacia.png";
import brand6 from "../../../../assets/img/chevrelet.png";

const Brands = () => {
  return (
    <section className='py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8'>
          {/* Brand 1 */}
          <div className='flex justify-center items-center p-4'>
            <div className='w-40 h-28 relative'>
              <img
                src={brand1}
                alt='Brand 1'
                className='absolute inset-0 w-full h-full object-contain'
              />
            </div>
          </div>
          {/* Brand 2 */}
          <div className='flex justify-center items-center p-4'>
            <div className='w-44 h-32 relative'>
              <img
                src={brand2}
                alt='Brand 2'
                className='absolute inset-0 w-full h-full object-contain'
              />
            </div>
          </div>
          {/* Brand 3 */}
          <div className='flex justify-center items-center p-4'>
            <div className='w-44 h-32 relative'>
              <img
                src={brand3}
                alt='Brand 3'
                className='absolute inset-0 w-full h-full object-contain'
              />
            </div>
          </div>
          {/* Brand 4 */}
          <div className='flex justify-center items-center p-4'>
            <div className='w-44 h-32 relative'>
              <img
                src={brand4}
                alt='Brand 4'
                className='absolute inset-0 w-full h-full object-contain'
              />
            </div>
          </div>
          {/* Brand 5 */}
          <div className='flex justify-center items-center p-4'>
            <div className='w-44 h-32 relative'>
              <img
                src={brand5}
                alt='Brand 5'
                className='absolute inset-0 w-full h-full object-contain'
              />
            </div>
          </div>
          {/* Brand 6 */}
          <div className='flex justify-center items-center p-4'>
            <div className='w-44 h-32 relative'>
              <img
                src={brand6}
                alt='Brand 6'
                className='absolute inset-0 w-full h-full object-contain'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
