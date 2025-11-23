/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
    <App />
  </AppContextProvider>
  </BrowserRouter>,
)
*/

// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
// 🟢 NEW IMPORTS
import AdminContextProvider from './context/adminContext.jsx' 
import DoctorContextProvider from './context/doctorContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
        {/* 🟢 NEST THE NEW CONTEXTS AROUND APP */}
        <AdminContextProvider>
            <DoctorContextProvider>
                <App />
            </DoctorContextProvider>
        </AdminContextProvider>
    </AppContextProvider>
  </BrowserRouter>,
)