// LoginTest.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginTest = () => {
    // 🟢 CRITICAL TEST: If this does not show, the crash is in the import or render setup.
    console.log("LoginTest Component is RUNNING."); 
    
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        console.log("Button Clicked. Attempting navigation.");
        navigate('/admin-dashboard');
    }

    return (
        <div className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'>Test Login</p>
                
                {/* 🛑 A simple, non-form button for testing */}
                <button 
                    onClick={handleClick}
                    className='bg-primary text-white w-full py-2 rounded-md text-base'
                >
                    CLICK ME TO TEST
                </button>
            </div>
        </div>
    );
};

export default LoginTest;