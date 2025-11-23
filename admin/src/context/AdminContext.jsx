/*import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [appointments, setAppointments] = useState([])

    const [doctors, setDoctors] = useState([])
    const [dashData, setDashData] = useState(false)


    const getAllDoctors = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }
    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Getting all appointment data from Database using API
    const getAllAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }
    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const value = {
        aToken, setAToken,
        backendUrl, doctors,
        getAllDoctors, changeAvailability,
        appointments, setAppointments,
        getAllAppointments, cancelAppointment,
         getDashData, dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>

    )

}
export default AdminContextProvider;*/

import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    print("Loaded Backend URL from .env →", backendUrl);


    useEffect(() => {
        const storedToken = localStorage.getItem('aToken');
        if (storedToken) setAToken(storedToken);
    }, []);

    // Fetch doctors when token is available
    useEffect(() => {
        if (aToken) getAllDoctors();
    }, [aToken]);

    const getConfig = () => ({
        headers: {
            Authorization: `Bearer ${aToken}`
        }
    });

    // Fetch all doctors
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`); // No auth needed
            console.log("Fetched doctors:", data);
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error(error.message);
        }
    };

    // Toggle doctor availability (admin only, backend route might need authAdmin)
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/change-availability`, { docId }, getConfig());
            if (data.success) {
                toast.success(data.message);
                getAllDoctors(); // Refresh list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.error("Error changing availability:", error);
        }
    };

    const value = {
        aToken, setAToken,
        doctors, getAllDoctors, changeAvailability,
        appointments, setAppointments,
        dashData, setDashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
