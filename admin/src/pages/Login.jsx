/*import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => { 
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        {
          state === 'Admin'
            ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login*/

/*import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // ❗ ADDED: Import useNavigate

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    const { setDToken } = useContext(DoctorContext);
    const { setAToken } = useContext(AdminContext);

    const navigate = useNavigate(); // ❗ ADDED: Initialize the navigate hook

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const route = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';

            
            print("Submitting to URL:", `${backendUrl}${route}`);
            console.log("Submitting Data:", { 
              email: email.trim().toLowerCase(), 
              password 
            });

            print("Login Response:", data); // Debug

            if (data.success) {
                const token = data.token;
                if (state === 'Admin') {
                    setAToken(token);
                    localStorage.setItem('aToken', token);
                    
                    // 🔥 FIX: Redirect immediately after saving the token
                    navigate('/admin'); 
                } else {
                    setDToken(token);
                    localStorage.setItem('dToken', token);
                    navigate('/doctor');
                }
                toast.success(data.message);
            } else {
                // Shows error on genuine failure
                toast.error(data.message);
            }
        } catch (err) {
            // Log the specific error message from the backend if available
            console.error(err.response?.data?.message || err.message); 
            toast.error(err.response?.data?.message || "Login failed. Check console for details.");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'>{state}</span> Login
                </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                {state === 'Admin'
                    ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
                    : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
                }
            </div>
        </form>
    );
};

export default Login;*/

/*import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 💡 USING VITE_ADMIN_URL as the variable that holds the Backend API URL
    const backendUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:4000';
    const { setDToken } = useContext(DoctorContext);
    const { setAToken } = useContext(AdminContext);

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const route = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';

            // 🟢 FIX: AXIOS CALL IS NOW ACTIVE
            const { data } = await axios.post(`${backendUrl}${route}`, {
                email: email.trim().toLowerCase(),
                password
            });
            
            if (data.success) {
                const token = data.token;
                if (state === 'Admin') {
                    setAToken(token);
                    // Correctly saving JWT to local storage
                    localStorage.setItem('aToken', token);
                    
                    // Redirects to the authenticated admin route
                    navigate('/admin'); 
                } else {
                    setDToken(token);
                    localStorage.setItem('dToken', token);
                    navigate('/doctor');
                }
                toast.success(data.message);
            } else {
                // Shows error on genuine failure from the backend (e.g., Invalid credentials 401)
                toast.error(data.message);
            }
        } catch (err) {
            // Catches network errors or 4xx responses if the backend doesn't return data.success=false
            console.error("Login attempt failed:", err.response?.data?.message || err.message); 
            toast.error(err.response?.data?.message || "Login failed. Check browser console for network details.");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'>{state}</span> Login
                </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                {state === 'Admin'
                    ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
                    : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
                }
            </div>
        </form>
    );
};

export default Login;*/


import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Using VITE_BACKEND_URL as the variable pointing to your Backend API URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    const { setDToken } = useContext(DoctorContext);
    const { setAToken } = useContext(AdminContext);

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const route = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';

            // 🟢 FIX: The Axios call is now active and sends credentials
            const { data } = await axios.post(`${backendUrl}${route}`, {
                email: email.trim().toLowerCase(),
                password
            });
            
            if (data.success) {
                const token = data.token;
                if (state === 'Admin') {
                    setAToken(token);
                    // ✅ Correctly saving JWT to local storage
                    localStorage.setItem('aToken', token);
                    navigate('/admin'); 
                } else {
                    setDToken(token);
                    localStorage.setItem('dToken', token);
                    navigate('/doctor');
                }
                toast.success(data.message);
            } else {
                // This catches genuine 401s from the backend when credentials are truly wrong
                toast.error(data.message);
            }
        } catch (err) {
            // This catches network errors or other server errors (404 Not Found, 500 Server Error)
            console.error("Login attempt failed:", err.response?.data?.message || err.message); 
            toast.error(err.response?.data?.message || "Login failed. Check browser console for details.");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'>{state}</span> Login
                </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                {state === 'Admin'
                    ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
                    : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
                }
            </div>
        </form>
    );
};

export default Login;