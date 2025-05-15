import React, { useRef, useEffect, useState, useContext } from "react";
import {
  FaBars,
  FaTimes,
  FaCar,
  FaHome,
  FaClipboardList,
  FaTruck,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { logout } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Toggle button for small screens */}
      <div className='block md:hidden p-4'>
        <button
          onClick={toggleSidebar}
          className='text-darkBlue-light focus:outline-none'>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-orange text-white w-64 h-full fixed top-0 left-0 transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static flex flex-col`}>
        <div className='p-4 flex-grow'>
          <h2 className='text-2xl font-bold mb-4'>Admin Dashboard</h2>
          <ul>
            {/* <li className='mb-2'>
              <Link
                to='/admin/dashboard'
                className='flex items-center text-gray-300 hover:text-white'
                onClick={() => setIsOpen(false)}>
                <FaHome className='mr-2' />
                Dashboard
              </Link>
            </li> */}
            <li className='mb-2'>
              <Link
                to='/admin/cars/longueduree'
                className='flex items-center text-gray-300 hover:text-white'
                onClick={() => setIsOpen(false)}>
                <FaCar className='mr-2' />
                Voitures Longue Durée
              </Link>
            </li>
            <li className='mb-2'>
              <Link
                to='/admin/cars/courteduree'
                className='flex items-center text-gray-300 hover:text-white'
                onClick={() => setIsOpen(false)}>
                <FaCar className='mr-2' />
                Voitures Courte Durée
              </Link>
            </li>

            <li className='mb-2'>
              <Link
                to='/admin/longueduree'
                className='flex items-center text-gray-300 hover:text-white'
                onClick={() => setIsOpen(false)}>
                <FaClipboardList className='mr-2' />
                Longue Durée
              </Link>
            </li>
            <li className='mb-2'>
              <Link
                to='/admin/courteduree'
                className='flex items-center text-gray-300 hover:text-white'
                onClick={() => setIsOpen(false)}>
                <FaClipboardList className='mr-2' />
                Courte Durée
              </Link>
            </li>
            <li className='mb-2'>
              <Link
                to='/admin/transfert'
                className='flex items-center text-gray-300 hover:text-white'
                onClick={() => setIsOpen(false)}>
                <FaTruck className='mr-2' />
                Transfert
              </Link>
            </li>
          </ul>
        </div>
        <div className='p-4'>
          <button
            onClick={handleLogout}
            className='flex items-center text-gray-300 hover:text-white w-full'>
            <FaSignOutAlt className='mr-2' />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
