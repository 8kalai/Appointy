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

// App.jsx
import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// 
// 🟢 CONTEXT IMPORTS
import { AdminContext } from './context/AdminContext'; // For Admin/Doctor login status
import { AppContext } from './context/AppContext'; // For standard user login status

// 
// 🔴 PAGE IMPORTS (Ensure these components exist in your project)
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Doctors from './pages/Doctors/Doctors';
import Login from './pages/Login/Login'; // Assuming this is the Admin/Doctor login page
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import MyProfile from './pages/MyProfile/MyProfile';
import MyAppointment from './pages/MyAppointment/MyAppointment';
import Appointment from './pages/Appointment/Appointment';
import AdminDashboard from './pages/Admin/Dashboard.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx' // You must create this
// ----------------------------------------------------


// ====================================================
// 🟢 1. PROTECTED ROUTE COMPONENTS
// ====================================================

// 🛡️ ADMIN/DOCTOR PROTECTION
const AdminProtectedRoute = ({ element: Component }) => {
    // Check for both tokens (assuming the login page handles which one is set)
    const { aToken, dToken } = useContext(AdminContext);
    
    // Check if EITHER the admin or doctor token exists in Context or localStorage
    const isAuthenticated = aToken || dToken || localStorage.getItem('aToken') || localStorage.getItem('dToken');

    return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

// 🛡️ STANDARD USER PROTECTION
const UserProtectedRoute = ({ element: Component }) => {
    // Check for the standard user token from AppContext
    const { token } = useContext(AppContext);
    
    // Check if the user token exists in Context or localStorage
    const isAuthenticated = token || localStorage.getItem('token');

    return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};


// ====================================================
// 🟢 2. MAIN APP COMPONENT
// ====================================================

const App = () => {
    return (
        <div className='mx-4 sm:mx-[10%]'>
            <ToastContainer />
            <Navbar />
            
            <Routes>
                {/* --------------------------------------------------- */}
                {/* PUBLIC ROUTES */}
                {/* --------------------------------------------------- */}
                <Route path='/' element={<Home />} />
                <Route path='/doctors' element={<Doctors />} />
                <Route path='/doctors/:speciality' element={<Doctors />} />
                <Route path='/login' element={<Login />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />

                {/* --------------------------------------------------- */}
                {/* STANDARD USER PROTECTED ROUTES */}
                {/* --------------------------------------------------- */}
                <Route 
                    path='/my-profile' 
                    element={<UserProtectedRoute element={MyProfile} />} 
                />
                <Route 
                    path='/my-appointments' 
                    element={<UserProtectedRoute element={MyAppointment} />} 
                />
                <Route 
                    path='/appointment/:docId' 
                    element={<UserProtectedRoute element={Appointment} />} 
                />

                {/* --------------------------------------------------- */}
                {/* ADMIN/DOCTOR PROTECTED ROUTES */}
                {/* --------------------------------------------------- */}
                <Route 
                    path='/admin-dashboard' 
                    element={<AdminProtectedRoute element={AdminDashboard} />} 
                />
                
                {/* You may want a separate Doctor Dashboard */}
                <Route 
                    path='/doctor-dashboard' 
                    element={<AdminProtectedRoute element={DoctorDashboard} />} 
                />
                
                {/* Add a 404 Route if you don't have one */}
                <Route path='*' element={<Navigate to="/" replace />} />


            </Routes>
            
            <Footer />
        </div>
    );
}

export default App;
