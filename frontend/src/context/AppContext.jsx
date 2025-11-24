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
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = "https://appointy-zxmd.onrender.com";
    const currencySymbol = "₹";

    const [doctors, setDoctors] = useState([]);
    const [uToken, setUToken] = useState(localStorage.getItem("uToken") || "");
    const [userData, setUserData] = useState(null);

    const api = axios.create({
        baseURL: backendUrl
    });

    const getDoctorsData = async () => {
        try {
            const { data } = await api.get("/api/doctor/list");
            if (data.success) setDoctors(data.doctors);
        } catch {
            toast.error("Failed to load doctors");
        }
    };

    const loadUserProfileData = async () => {
        if (!uToken) return;
        try {
            const { data } = await api.get("/api/user/get-profile", {
                headers: { token: uToken }
            });
            if (data.success) setUserData(data.userData);
        } catch {
            toast.error("Failed to load profile");
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (uToken) loadUserProfileData();
    }, [uToken]);

    return (
        <AppContext.Provider
            value={{
                backendUrl,
                currencySymbol,
                doctors,
                getDoctorsData,

                // LOGIN AUTH FIXED
                uToken,
                setUToken,

                userData,
                setUserData
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
