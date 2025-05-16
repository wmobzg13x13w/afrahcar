import React, { useState } from "react";
import logo from "../../assets/img/logo1.jpg";
import CurrencySelector from "../../contexts/Currencycontext";
import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='bg-white top-0 left-0 w-full z-30 border-b border-black'>
      <nav className='px-4 w-full flex items-center justify-between'>
        {/* Logo */}
        <img src={logo} alt='logo' className='w-24 sm:w-32' />

        {/* Nav Links */}
        <ul className='hidden lg:flex space-x-6 text-darkBlue-dark text-base sm:text-lg'>
          <li>
            <a href='/' className='hover:text-orange'>
              Accueil
            </a>
          </li>
          <li>
            <a href='/search/longueduree' className='hover:text-orange'>
              Location longue durée
            </a>
          </li>
          <li>
            <a href='/search/courteduree' className='hover:text-orange'>
              Notre collection de voitures
            </a>
          </li>
          <li>
            <a href='/transfert' className='hover:text-orange'>
              Transfert
            </a>
          </li>
          <li>
            <a href='/aboutus' className='hover:text-orange'>
              Nos Agences
            </a>
          </li>
        </ul>

        {/* Currency Selector (hidden on smaller screens) */}
        <div className='hidden lg:block'>
          <CurrencySelector />
        </div>

        {/* Hamburger Menu (for mobile screens) */}
        <button
          className='lg:hidden text-text focus:outline-none'
          onClick={toggleSidebar}>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
        </button>

        {/* Contact Us Button */}
        <div className=' md:h-20 h-16 bg-white flex items-center justify-end p-2 sm:p-4 rounded-bl-3xl z-50'>
          <a
            href={`https://wa.me/${process.env.REACT_APP_whatsapp}`}
            className='bg-orange text-white py-2 px-4 sm:px-6 rounded-full hover:bg-orange-light whitespace-nowrap overflow-hidden text-ellipsis text-sm md:text-base'
            target='_blank'
            rel='noopener noreferrer'>
            <FaWhatsapp className='inline-block mr-2' />
            WhatsApp
          </a>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-white h-full z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className='p-4'>
          <button
            className='text-black focus:outline-none'
            onClick={toggleSidebar}>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <ul className='space-y-4 text-black p-4'>
          <li>
            <a href='/' className='hover:text-orange'>
              Accueil
            </a>
          </li>
          <li>
            <a href='/search/longueduree' className='hover:text-orange'>
              Location longue durée
            </a>
          </li>
          <li>
            <a href='/search/courteduree' className='hover:text-orange'>
              Notre collection de voitures
            </a>
          </li>
          <li>
            <a href='/transfert' className='hover:text-orange'>
              Transfert
            </a>
          </li>
          <li>
            <a href='/aboutus' className='hover:text-orange'>
              Nos Agences
            </a>
          </li>
        </ul>
        <div className='w-fit m-auto'>
          <CurrencySelector />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
