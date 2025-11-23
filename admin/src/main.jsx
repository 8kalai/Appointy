/*import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'
import './axiosConfig.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)*/

// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
// 🟢 NEW IMPORT
import AdminContextProvider from './context/AdminContext.jsx' 

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AppContextProvider>
            {/* 🟢 WRAP THE APP WITH ADMIN CONTEXT */}
            <AdminContextProvider> 
                <App />
            </AdminContextProvider>
    </AppContextProvider>
  </BrowserRouter>,
)
