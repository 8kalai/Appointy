/*import { createContext, useState } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    // Doctor token state: Loads from 'dToken' in localStorage
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');

    const value = {
        dToken, 
        setDToken,
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;*/

import { createContext, useState, useEffect } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    // 1. Doctor token state: Loads from 'dToken' in localStorage
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || null);

    // 2. State for holding doctor profile data (e.g., name, specialty)
    const [doctorData, setDoctorData] = useState(null);

    // 3. Effect to ensure localStorage reflects the token state
    useEffect(() => {
        if (dToken) {
            localStorage.setItem('dToken', dToken);
        } else {
            localStorage.removeItem('dToken');
            setDoctorData(null); // Clear data upon logout
        }
    }, [dToken]);

    // Note: In a real app, you would add logic here 
    // to fetch doctorData using the dToken after login.
    // For now, we rely on the login component to set dToken and doctorData.

    const value = {
        dToken, 
        setDToken,
        doctorData,       // 🟢 Added doctor data
        setDoctorData,    // 🟢 Added setter for doctor data
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;