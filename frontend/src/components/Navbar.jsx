/*import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm pt-2 pb-0 border-b border-b-gray-400'>
      <div className="w-28 h-28 overflow-hidden">
        <img
          onClick={() => navigate('/')}
          src={assets.logo || '/fallback-logo.png'}
          alt="Logo"
          className="w-full h-full object-cover object-center cursor-pointer"
        />
      </div>

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <li className='pb-0.5'>
          <NavLink to='/' className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>HOME</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/doctors' className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>ALL DOCTORS</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>ABOUT</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/contact' className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>CONTACT</NavLink>
        </li>
      </ul>

      <div className='flex items-center gap-4'>

        
        {location.pathname === '/' && (
          <button
            onClick={() => window.open('https://appointy-six.vercel.app', '_blank')}
            className='bg-primary text-white text-xs px-4 py-2 rounded-full hover:bg-gray-700 hidden md:block'
          >
            Admin Panel
          </button>
        )}

        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-12 rounded-full' src={userData.image || '/fallback-user.png'} alt="profile" />
            <img className='w-2.5' src={assets.dropdown_icon || '/fallback-icon.png'} alt="dropdown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            Create Account
          </button>
        )}

        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default <Navbar>*/

import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { DoctorContext } from '../context/doctorContext' // 🟢 NEW: Import DoctorContext

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)

  // Contexts for User and Doctor
  const { token: uToken, setToken: setUToken, userData } = useContext(AppContext) // Renamed token to uToken
  const { dToken, setDToken } = useContext(DoctorContext) // 🟢 NEW: Doctor Token and Setter

  // --- User Logout ---
  const userLogout = () => {
    localStorage.removeItem('uToken') // Use 'uToken' for user
    setUToken(false)
    navigate('/login')
  }

  // --- Doctor Logout ---
  const doctorLogout = () => {
    localStorage.removeItem('dToken') // Use 'dToken' for doctor
    setDToken(false)
    navigate('/doctor/login') // Navigate to Doctor login page
  }

  return (
    <div className='flex items-center justify-between text-sm pt-2 pb-0 border-b border-b-gray-400'>
      <div className="w-28 h-28 overflow-hidden">
        <img
          onClick={() => navigate('/')}
          src={assets.logo || '/fallback-logo.png'}
          alt="Logo"
          className="w-full h-full object-cover object-center cursor-pointer"
        />
      </div>

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <li className='pb-0.5'>
          <NavLink to='/' className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>HOME</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/doctors' className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>ALL DOCTORS</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>ABOUT</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/contact' className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>CONTACT</NavLink>
        </li>
      </ul>

      <div className='flex items-center gap-4'>

        {/* ❌ REMOVED: Admin Panel Button */}
        
        {/* 🟢 NEW: If Doctor is logged in, show Doctor Dashboard and Logout */}
        {dToken ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              {/* Placeholder for Doctor icon/name */}
              <div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold'>Dr</div>
              <img className='w-2.5' src={assets.dropdown_icon || '/fallback-icon.png'} alt="dropdown" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/doctor/dashboard')} className='hover:text-black cursor-pointer'>Doctor Dashboard</p>
                  <p onClick={() => navigate('/doctor/appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={doctorLogout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
        ) : uToken && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-12 rounded-full' src={userData.image || '/fallback-user.png'} alt="profile" />
            <img className='w-2.5' src={assets.dropdown_icon || '/fallback-icon.png'} alt="dropdown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={userLogout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
                {/* 🟢 NEW: Doctor Login Button */}
                <button
                    onClick={() => navigate('/doctor/login')}
                    className='text-primary border border-primary px-4 py-2 rounded-full font-normal hidden md:block hover:bg-primary hover:text-white transition-all duration-200'
                >
                    Doctor Login
                </button>
                {/* User/Patient Login Button */}
                <button
                  onClick={() => navigate('/login')}
                  className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
                >
                  Create Account
                </button>
            </div>
        )}

        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
            {/* Mobile Doctor Link */}
            {!uToken && !dToken && (
                <NavLink onClick={() => setShowMenu(false)} to='/doctor/login' ><p className='px-4 py-2 rounded full inline-block text-primary font-bold border border-primary mt-2'>DOCTOR LOGIN</p></NavLink>
            )}
            {/* Mobile Logout (User or Doctor) */}
            {uToken ? (
                <p onClick={() => { userLogout(); setShowMenu(false); }} className='px-4 py-2 rounded full inline-block text-red-500 font-bold mt-2 cursor-pointer'>LOGOUT (User)</p>
            ) : dToken ? (
                <p onClick={() => { doctorLogout(); setShowMenu(false); }} className='px-4 py-2 rounded full inline-block text-red-500 font-bold mt-2 cursor-pointer'>LOGOUT (Doctor)</p>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
