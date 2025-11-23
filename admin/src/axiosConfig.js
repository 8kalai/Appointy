import axios from 'axios';

// Get the backend URL from environment variables
const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

// Set the default base URL for ALL API calls
axios.defaults.baseURL = baseURL;

// Set up the Request Interceptor
// This runs BEFORE every request your frontend sends
axios.interceptors.request.use(
    (config) => {
        // 1. Get the Admin Token from local storage
        const adminToken = localStorage.getItem('aToken');
        
        // 2. If the token exists, attach it to the Authorization header
        if (adminToken) {
            // The backend's middleware (authAdmin.js) expects this format: "Bearer <token>"
            config.headers.Authorization = `Bearer ${adminToken}`;
        }
        
        return config;
    },
    (error) => {
        // Handle request error (e.g., network issues)
        return Promise.reject(error);
    }
);

console.log('Axios configured with base URL:', baseURL);

// Since we are setting defaults and interceptors globally, 
// we don't necessarily need to export anything, but we need to run the file.