import { createContext, useState } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    // Initialize state from local storage to persist login across refreshes
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');

    const value = {
        dToken, setDToken,
        // Add any other doctor-specific state/functions here
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;