import React, { useRef, useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import {
  FaBars,
  FaTimes,
  FaCar,
  FaClipboardList,
  FaTruck,
  FaSignOutAlt,
  FaRegCalendarAlt,
  FaCarSide,
  FaImage,
} from "react-icons/fa";
import "./SidebarTest.css";
import { AuthContext } from "../../../contexts/AuthContext";
const SidebarTest = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const navLinks = [
    {
      path: "/admin/cars",
      icon: <FaCar />,
      display: "Toutes Les Voitures",
    },

    {
      path: "/admin/cartypes",
      icon: <FaCarSide />,
      display: "Types de voitures",
    },
    {
      path: "/admin/rentings",
      icon: <FaClipboardList />,
      display: "Réservations",
    },

    {
      path: "/admin/transfert",
      icon: <FaTruck />,
      display: "Transfert",
    },
    {
      path: "/admin/rents",
      icon: <FaRegCalendarAlt />,
      display: "Planning",
    },
    {
      path: "/admin/hero-image",
      icon: <FaImage />,
      display: "Image d'accueil",
    },
  ];

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
      <div className='block md:hidden p-4 h-fit'>
        <button
          onClick={toggleSidebar}
          className='text-darkBlue-light focus:outline-none'>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar bg-orange text-white font-bold w-64 h-full fixed top-0 left-0 transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static flex flex-col overflow-auto`}>
        <div className='sidebar__top p-4 flex items-center'>
          <img src={logo} alt='Logo' className='h-10 w-auto' />
        </div>

        <div className='sidebar__content p-4 flex-grow'>
          <div className='menu'>
            <ul className='nav__list'>
              {navLinks.map((item, index) => (
                <li className='nav__item mb-2' key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "nav__active nav__link flex items-center text-white p-2 rounded"
                        : "nav__link flex items-center text-gray-300 hover:text-white p-2 rounded"
                    }
                    onClick={() => setIsOpen(false)}>
                    {item.icon}
                    <span className='ml-2'>{item.display}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='sidebar__bottom p-4'>
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

export default SidebarTest;
