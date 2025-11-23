import { createContext, useState } from "react";

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

export default AdminContextProvider;