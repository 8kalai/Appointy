/*import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [userData, setUserData] = useState(false)

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: { token }
            })

            if (data.success) {
                const safeUserData = {
                    ...data.userData,
                    address: data.userData.address || { line1: '', line2: '' },
                    gender: data.userData.gender || '',
                    dob: data.userData.dob || ''
                }
                setUserData(safeUserData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
    }, [token])

    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider*/

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '₹';

    // Backend URL
    const backendUrl = "https://appointy-zxmd.onrender.com";

    const [doctors, setDoctors] = useState([]);

    // ✔ FIXED: Use ONLY 'uToken'
    const [uToken, setUToken] = useState(localStorage.getItem("uToken") || "");

    // Logged-in user data
    const [userData, setUserData] = useState(false);

    // Axios instance
    const api = axios.create({
        baseURL: backendUrl
    });

    // =============================
    //   GET ALL DOCTORS
    // =============================
    const getDoctorsData = async () => {
        try {
            const { data } = await api.get("/api/doctor/list");

            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error("Failed to load doctors.");
        }
    };

    // =============================
    //   LOAD USER PROFILE
    // =============================
    const loadUserProfileData = async () => {
        try {
            const { data } = await api.get("/api/user/get-profile", {
                headers: { token: uToken },
            });

            if (data.success) {
                const safeUser = {
                    ...data.userData,
                    address: data.userData.address || { line1: "", line2: "" },
                    gender: data.userData.gender || "",
                    dob: data.userData.dob || "",
                };

                setUserData(safeUser);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error loading user profile:", error);
            toast.error("Could not load user profile.");
        }
    };

    // LOAD DOCTORS ONCE
    useEffect(() => {
        getDoctorsData();
    }, []);

    // LOAD USER PROFILE WHEN LOGGED IN
    useEffect(() => {
        if (uToken) {
            loadUserProfileData();
        }
    }, [uToken]);


    // =============================
    //   CONTEXT VALUE
    // =============================
    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        backendUrl,

        // USER AUTH
        uToken,
        setUToken,
        userData,
        setUserData,
        loadUserProfileData,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
