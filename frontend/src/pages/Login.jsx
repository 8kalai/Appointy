/*import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }}catch(error){
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {state === 'Sign Up'
          ? <div className='w-full '>
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div>
          : null
        }
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login*/

/*import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // ⭐ Password rule states
  const [rules, setRules] = useState({
    length: false,
    number: false,
    upper: false,
    lower: false,
    special: false
  });

  // ⭐ handle password change with validation
  const handlePassword = (value) => {
    setPassword(value);

    setRules({
      length: value.length >= 8,
      number: /[0-9]/.test(value),
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      special: /[@$!%*?&]/.test(value),
    });
  };

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {

        // ⭐ check password rules before API call
        if (!(rules.length && rules.number && rules.upper && rules.lower && rules.special)) {
          return toast.error("Please meet all password requirements.");
        }

        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {

        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>

        {state === 'Sign Up'
          ? <div className='w-full '>
            <p>Full Name</p>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='border border-[#DADADA] rounded w-full p-2 mt-1' 
              type="text" 
              required 
            />
          </div>
          : null
        }

        <div className='w-full '>
          <p>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border border-[#DADADA] rounded w-full p-2 mt-1' 
            type="email" 
            required 
          />
        </div>

        <div className='w-full '>
          <p>Password</p>
          <input
            onChange={(e) => handlePassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="password"
            required
          />
        </div>

        
        {state === "Sign Up" && (
          <div className="text-xs w-full mt-1">
            <p className={rules.length ? "text-green-600" : "text-red-500"}>
              ✓ At least 8 characters
            </p>
            <p className={rules.number ? "text-green-600" : "text-red-500"}>
              ✓ Must contain a number
            </p>
            <p className={rules.upper ? "text-green-600" : "text-red-500"}>
              ✓ Must contain an uppercase letter
            </p>
            <p className={rules.lower ? "text-green-600" : "text-red-500"}>
              ✓ Must contain a lowercase letter
            </p>
            <p className={rules.special ? "text-green-600" : "text-red-500"}>
              ✓ Must include a special character (@$!%*?&)
            </p>
          </div>
        )}

        <button type='submit' className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login*/

// Login.jsx
/*import axios from 'axios';
import React, { useContext, useState } from 'react';
// 🟢 Import the new Context files
import { DoctorContext } from '../context/doctorContext.jsx'; 
import { AdminContext } from '../context/adminContext.jsx'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    console.log("Login Component: Initialization started."); 

    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 🟢 RESTORE USE OF VITE_BACKEND_URL and include a robust default
    const backendUrl = 'https://appointy-zxmd.onrender.com';
    
    // 🟢 Use the tokens from the new contexts
    const { setDToken } = useContext(DoctorContext);
    const { setAToken } = useContext(AdminContext);

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        console.log("1. Submitting Form. Event handler triggered."); 
        event.preventDefault();

        const route = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
        const fullUrl = `${backendUrl}${route}`;
        console.log("2. Attempting POST to URL:", fullUrl); // MUST SHOW HTTPS URL
        
        try {
            const { data } = await axios.post(fullUrl, {
                email: email.trim().toLowerCase(),
                password
            });
            
            if (data.success) {
                const token = data.token;
                if (state === 'Admin') {
                    setAToken(token); // Set token in AdminContext
                    localStorage.setItem('aToken', token); // Save admin token
                    navigate('/admin-dashboard'); 
                } else {
                    setDToken(token); // Set token in DoctorContext
                    localStorage.setItem('dToken', token); // Save doctor token
                    navigate('/doctor-dashboard'); 
                }
                toast.success(data.message);
                console.log("3. Login SUCCESSFUL. Token saved.");
            } else {
                console.log("3. Backend Response: Invalid Credentials.");
                toast.error(data.message);
            }
        } catch (err) {
            console.error("3. Network/Catch Error. Request failed completely.", err); 
            console.error("Failed URL was:", fullUrl);
            toast.error(err.response?.data?.message || "Network Error: Could not reach API. Check console.");
        }
    };

    // ... rest of the return statement (form and inputs) ...
};

export default Login;*/

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  // ✔ FIXED — use uToken and setUToken
  const { backendUrl, uToken, setUToken } = useContext(AppContext);

  const [state, setState] = useState('Sign Up');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Password rules
  const [rules, setRules] = useState({
    length: false,
    number: false,
    upper: false,
    lower: false,
    special: false
  });

  const handlePassword = (value) => {
    setPassword(value);

    setRules({
      length: value.length >= 8,
      number: /[0-9]/.test(value),
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      special: /[@$!%*?&]/.test(value),
    });
  };

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {

        // Validate password rules
        if (!(rules.length && rules.number && rules.upper && rules.lower && rules.special)) {
          return toast.error("Please meet all password requirements.");
        }

        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name, email, password
        });

        if (data.success) {
          // ✔ FIXED — use "uToken"
          localStorage.setItem('uToken', data.token);
          setUToken(data.token);
        } else {
          toast.error(data.message);
        }

      } else {

        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email, password
        });

        if (data.success) {
          // ✔ FIXED — use "uToken"
          localStorage.setItem('uToken', data.token);
          setUToken(data.token);
        } else {
          toast.error(data.message);
        }

      }
    } catch (error) {
      toast.error(error.message);
    }

  };

  // Redirect once logged in
  useEffect(() => {
    if (uToken) {
      navigate('/');
    }
  }, [uToken]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>

        {state === 'Sign Up' &&
          <div className='w-full'>
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='border border-[#DADADA] rounded w-full p-2 mt-1'
              type="text"
              required
            />
          </div>
        }

        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="email"
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => handlePassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="password"
            required
          />
        </div>

        {/* Password rules - only in sign up */}
        {state === "Sign Up" && (
          <div className="text-xs w-full mt-1">
            <p className={rules.length ? "text-green-600" : "text-red-500"}>✓ At least 8 characters</p>
            <p className={rules.number ? "text-green-600" : "text-red-500"}>✓ Must contain a number</p>
            <p className={rules.upper ? "text-green-600" : "text-red-500"}>✓ Must contain an uppercase letter</p>
            <p className={rules.lower ? "text-green-600" : "text-red-500"}>✓ Must contain a lowercase letter</p>
            <p className={rules.special ? "text-green-600" : "text-red-500"}>✓ Must include a special character (@$!%*?&)</p>
          </div>
        )}

        <button type='submit' className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  );
};

export default Login;
