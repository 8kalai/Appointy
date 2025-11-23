// src/context/AdminContext.jsx

import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    // Load tokens from localStorage on initial load
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
    
    // 🛑 IMPORTANT: Replace this with your actual live backend HTTPS URL
    const backendUrl = 'https://appointy-zxmd.onrender.com';

    // Function to clear tokens upon logout
    const logout = () => {
        setAToken('');
        setDToken('');
        localStorage.removeItem('aToken');
        localStorage.removeItem('dToken');
    };

    const value = {
        aToken, setAToken,
        dToken, setDToken,
        backendUrl,
        logout
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;