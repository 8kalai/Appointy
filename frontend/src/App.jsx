/*import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App*/

/*import React, { useContext } from 'react' // Import useContext
import { Route, Routes, Navigate } from 'react-router-dom' // Import Navigate
import { AppContext } from './context/AppContext.jsx' // Import AppContext if it holds the user token
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProtectedRoute = ({ element: Component, ...rest }) => {
    // Note: You may need to change the context import path if AppContext is elsewhere
    const { uToken } = useContext(AppContext); 
    
    // Check if the user token exists in Context or localStorage
    const isAuthenticated = uToken || localStorage.getItem('uToken');

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" replace />;
};
// =======================================================

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        
        
        <Route 
            path='/my-profile' 
            element={<ProtectedRoute element={MyProfile} />} 
        />
        <Route 
            path='/my-appointments' 
            element={<ProtectedRoute element={MyAppointment} />} 
        />
        <Route 
            path='/appointment/:docId' 
            element={<ProtectedRoute element={Appointment} />} 
        />

      </Routes>
      <Footer />
    </div>
  )
}

export default App;*/

import React, { useContext } from 'react' 
import { Route, Routes, Navigate } from 'react-router-dom' 
import { AppContext } from './context/AppContext.jsx' 
import { DoctorContext } from './context/doctorContext.jsx' // 🟢 NEW: Import DoctorContext

// --- User Pages ---
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Doctor Pages (NEW Imports - Placeholder, adjust path if needed) ---
// You will need to create these files in your project structure
import DoctorLogin from './pages/DoctorLogin.jsx'; 
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import DoctorAppointments from './pages/DoctorAppointments.jsx'; 


// =======================================================
// User Protected Route
// =======================================================
const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { uToken } = useContext(AppContext); 
    const isAuthenticated = uToken || localStorage.getItem('uToken');

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

// =======================================================
// 🟢 NEW: Doctor Protected Route
// =======================================================
const DoctorProtectedRoute = ({ element: Component, ...rest }) => {
    // Assuming the doctor token is named 'dToken' in DoctorContext and localStorage
    const { dToken } = useContext(DoctorContext); 
    const isAuthenticated = dToken || localStorage.getItem('dToken');

    // Redirect doctors to their dedicated login page
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/doctor/login" replace />;
};
// =======================================================


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* --- Public Routes (User/General) --- */}
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        {/* --- 🟢 NEW: Doctor Login Route --- */}
        <Route path='/doctor/login' element={<DoctorLogin />} />
        
        {/* --- Protected User Routes --- */}
        <Route 
            path='/my-profile' 
            element={<ProtectedRoute element={MyProfile} />} 
        />
        <Route 
            path='/my-appointments' 
            element={<ProtectedRoute element={MyAppointment} />} 
        />
        <Route 
            path='/appointment/:docId' 
            element={<ProtectedRoute element={Appointment} />} 
        />
        
        {/* --- 🟢 NEW: Protected Doctor Routes --- */}
        <Route 
            path='/doctor/dashboard' 
            element={<DoctorProtectedRoute element={DoctorDashboard} />} 
        />
        <Route 
            path='/doctor/appointments' 
            element={<DoctorProtectedRoute element={DoctorAppointments} />} 
        />

      </Routes>
      <Footer />
    </div>
  )
}

export default App;
