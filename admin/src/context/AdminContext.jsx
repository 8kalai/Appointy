/*import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    // Initialize state from local storage to persist login across refreshes
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');

    const value = {
        aToken, setAToken,
        // Add any other admin-specific state/functions here
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;*/

import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

// 1. ⚠️ Development Toggle: Set this to true during local development/testing.
//    Set to false before deploying to production.
const isDevelopment = true; 

// 2. 🔑 STATIC DEVELOPMENT TOKEN:
//    VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
//    PASTE YOUR LONG ADMIN JWT TOKEN FROM POSTMAN BELOW.
//    Ensure the token is inside the double quotes ("").
const DEV_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjJlNzBmYjNiYWZmODFjZjdiMGIyNCIsImVtYWlsIjoiYWRtaW5AbmV3Y29tcGFueS5jb20iLCJpYXQiOjE3NjM5MTMwNzQsImV4cCI6MTc2MzkxNjY3NH0.Gqo173yvVG2tcYJ8XHAZdVsuALU2JxFZv4AWZQcgXDk"; 
//    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


const AdminContextProvider = (props) => {

    // Function to get the initial token state
    const getInitialToken = () => {
        if (isDevelopment) {
            return DEV_TOKEN; // Use static token for dev bypass
        }
        // Fallback to localStorage for standard login flow
        return localStorage.getItem('aToken') || ''; 
    };

    // State initialization
    const [aToken, setAToken] = useState(getInitialToken);
    
    // Assuming backendUrl is also stored here or defined statically
    // You must update "YOUR_DEPLOYED_BACKEND_HTTPS_URL" with your actual Render backend URL
    const [backendUrl, setBackendUrl] = useState(
        isDevelopment 
            ? "http://localhost:4000" // Use your local backend URL for dev
            : "https://appointy-zxmd.onrender.com" // Use your deployed Render URL
    );

    // Effect to keep localStorage updated if the token changes (standard)
    useEffect(() => {
        if (aToken && !isDevelopment) {
            localStorage.setItem('aToken', aToken);
        } else if (!aToken && !isDevelopment) {
            localStorage.removeItem('aToken');
        }
    }, [aToken]);

    const contextValue = {
        aToken,
        setAToken,
        backendUrl,
        setBackendUrl,
        // Add other state variables here (e.g., adminData, etc.)
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;



