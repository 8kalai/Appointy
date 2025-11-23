import { createContext, useState } from "react";

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

export default DoctorContextProvider;