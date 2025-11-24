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

// Toggle manually
const isDevelopment = true;

// Your dev token
const DEV_TOKEN = "Kalai08";

// Helper for initial token
const getInitialToken = () => {
    if (isDevelopment) {
        return DEV_TOKEN || "";  // always use dev token in dev mode
    }
    return localStorage.getItem("aToken") || "";
};

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(getInitialToken);

    // Backend URL based on environment
    const backendUrl = isDevelopment
        ? "http://localhost:4000"
        : "https://appointy-zxmd.onrender.com";

    // Sync token ONLY when not in development
    useEffect(() => {
        if (!isDevelopment) {
            if (aToken) {
                localStorage.setItem("aToken", aToken);
            } else {
                localStorage.removeItem("aToken");
            }
        }
    }, [aToken]);

    // if dev token is missing, prevent invalid signature
    useEffect(() => {
        if (isDevelopment && !DEV_TOKEN) {
            console.warn("⚠ DEV_TOKEN is empty. Set a valid token to avoid invalid signature.");
        }
    }, []);

    const contextValue = {
        aToken,
        setAToken,
        backendUrl
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
