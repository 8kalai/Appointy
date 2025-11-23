/*import React, { useContext, useEffect } from 'react'
import { DoctorContext } from './context/DoctorContext'
import { AdminContext } from './context/AdminContext'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
//import Login from './pages/Login'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import LoginTest from './pages/LoginTest'
const App = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)
  const location = useLocation()

  // Redirect "/" to the proper dashboard
  if (location.pathname === '/') {
    if (aToken) return <Navigate to="/admin-dashboard" replace />
    if (dToken) return <Navigate to="/doctor-dashboard" replace />
  }

  // Admin layout and routes
  if (aToken) {
    return (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
            <Route path="*" element={<Navigate to="/admin-dashboard" />} />
            <Route path='/login' element={<LoginTest />} />
          </Routes>
        </div>
      </div>
    )
  }

  // Doctor layout and routes
  if (dToken) {
    return (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="*" element={<Navigate to="/doctor-dashboard" />} />
          </Routes>
        </div>
      </div>
    )
  }

  // No one is logged in
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default <App*/

// src/App.jsx

import React, { useContext } from 'react';
import { DoctorContext } from './context/DoctorContext.jsx';
import { AdminContext } from './context/AdminContext.jsx';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🟢 FIX BUILD PATHS HERE - Check case-sensitivity and folder structure
import Navbar from './components/Navbar.jsx'; 
import Sidebar from './components/Sidebar.jsx'; 

// Admin Pages
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllAppointments from './pages/Admin/AllAppointments.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorsList from './pages/Admin/DoctorsList.jsx';

// Doctor Pages
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';

// Login Page
import Login from './pages/Login.jsx'; // Using the fixed Login component

const App = () => {
  // Read tokens from Context
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);
  const location = useLocation();

  // 1. Initial Redirect: If accessing root ('/') or the login page with a token
  if (aToken || dToken) {
    if (aToken) {
        // Only redirect to admin dashboard if the current token is for an admin
        if (location.pathname !== '/admin-dashboard') return <Navigate to="/admin-dashboard" replace />;
    }
    if (dToken) {
        // Only redirect to doctor dashboard if the current token is for a doctor
        if (location.pathname !== '/doctor-dashboard') return <Navigate to="/doctor-dashboard" replace />;
    }
  }
  
  // 2. Admin Layout (aToken exists)
  if (aToken) {
    return (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
            
            {/* Catch-all for Admin */}
            <Route path="*" element={<Navigate to="/admin-dashboard" />} />
          </Routes>
        </div>
      </div>
    );
  }

  // 3. Doctor Layout (dToken exists)
  if (dToken) {
    return (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            
            {/* Catch-all for Doctor */}
            <Route path="*" element={<Navigate to="/doctor-dashboard" />} />
          </Routes>
        </div>
      </div>
    );
  }

  // 4. Public Layout (No one is logged in)
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Only allow access to the login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Redirect root and all other paths to the login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} /> 
      </Routes>
    </>
  );
};

export default App;