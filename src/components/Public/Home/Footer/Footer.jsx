import React from "react";
import logo from "../../../../assets/img/logo.png"; // Update the path to your logo
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className='bg-darkBlue-dark text-white py-12 w-full'>
      <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8'>
        {/* Logo and Text */}
        <div className='col-span-1'>
          <img src={logo} alt='Logo' className='w-32 mb-4' />
          <p className='text-gray-400'>
            We provide the best car rental services to ensure you have a smooth
            and enjoyable experience.
          </p>
          <div className='flex space-x-4 mt-4'>
            <a
              href='https://www.facebook.com/100054575163941'
              className='text-gray-400 hover:text-white'>
              <FaFacebook size={24} />
            </a>
            <a
              href='https://www.facebook.com/profile.php?id=100054575163941&mibextid=LQQJ4d'
              className='text-gray-400 hover:text-white'>
              <FaInstagram size={24} />
            </a>
            <a
              href='https://api.whatsapp.com/send?phone=21654665453&text='
              className='text-gray-400 hover:text-white'>
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div className='col-span-1'>
          <h3 className='text-xl font-bold mb-4'>Website</h3>
          <ul>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                Home
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                Services
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                Pricing
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div className='col-span-1'>
          <h3 className='text-xl font-bold mb-4'>Company</h3>
          <ul>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                About Us
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                Careers
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                Blog
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                Press
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className='col-span-1'>
          <h3 className='text-xl font-bold mb-4'>Support</h3>
          <ul>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                Help Center
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                Safety Center
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                Community Guidelines
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-400 hover:text-white'>
                Chat support
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className='col-span-1'>
          <h3 className='text-xl font-bold mb-4'>Contact Us</h3>
          <ul>
            <li className='mb-2'>
              <p className='text-gray-400 hover:text-white'>
                contact@afrahcar.com
              </p>
            </li>
            <li className='mb-2'>
              <p className='text-gray-400 hover:text-white'>+216 54 665 453</p>
            </li>
            <li className='mb-2'>
              <p className='text-gray-400 hover:text-white flex items-center'>
                <IoLocationOutline className='mr-2' />
                Ariana Tunisia
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Horizontal Line and All Rights Reserved */}
      <div className='container mx-auto px-4 mt-8'>
        <hr className='border-gray-700' />
        <p className='text-gray-400 text-right mt-4'>
          All rights reserved | Terms and services | Privacy Policy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
