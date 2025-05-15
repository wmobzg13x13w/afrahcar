import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import SidebarTest from "./SidebarTest/SidebarTest";
import ManageCars from "./ManageCars/ManageCars";
import LongueDureeRentings from "./LongueDureeRentings/LongueDureeRentings";
import CourteDureeRentings from "./CourteDureeRentings/CourteDureeRentings";
import Transfert from "./Transfert/Transfert";
import Sidebar from "./Sidebar";
import Rents from "../../pages/Rents";
import ManegeCarTypes from "./ManegeCarTypes";
import HeroImageManager from "./HeroImageManager/HeroImageManager";

const AdminRoutes = () => {
  return (
    <AuthProvider>
      <ProtectedAdminRoutes />
    </AuthProvider>
  );
};

const ProtectedAdminRoutes = () => {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to='/login' />;
  };

  return (
    <PrivateRoute>
      <div className='flex h-screen flex-col md:flex-row'>
        <SidebarTest />
        <div className='flex-1 overflow-auto transition-all duration-300'>
          <Routes>
            <Route path='/cars' element={<ManageCars />} />
            <Route path='/rentings' element={<LongueDureeRentings />} />
            <Route path='/transfert' element={<Transfert />} />
            <Route path='/rents' element={<Rents />} />
            <Route path='/cartypes' element={<ManegeCarTypes />} />
            <Route path='/hero-image' element={<HeroImageManager />} />
          </Routes>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminRoutes;
