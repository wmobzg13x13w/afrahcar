import React from "react";
import { Link } from "react-router-dom";
import { FaImage, FaCar, FaCalendarAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-darkBlue text-white h-screen w-64 fixed left-0 top-0 p-4">
      <div className="text-2xl font-bold mb-8">Admin Dashboard</div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/cars"
              className="flex items-center space-x-2 hover:bg-darkBlue-light p-2 rounded">
              <FaCar />
              <span>Cars</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/rentings"
              className="flex items-center space-x-2 hover:bg-darkBlue-light p-2 rounded">
              <FaCalendarAlt />
              <span>Rentings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/hero-image"
              className="flex items-center space-x-2 hover:bg-darkBlue-light p-2 rounded">
              <FaImage />
              <span>Hero Image</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;