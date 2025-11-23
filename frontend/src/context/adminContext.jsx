import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    // Admin token state: Loads from 'aToken' in localStorage
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');

    const value = {
        aToken, 
        setAToken,
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;