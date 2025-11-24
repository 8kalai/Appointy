/*import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {

        console.log(response)

        try {
          const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
          if (data.success) {
            navigate('/my-appointments')
            getUserAppointments()
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  // Function to make payment using razorpay
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  // Generate appointment data from doctors
  useEffect(() => {
    if (doctors.length) {
      const generatedAppointments = doctors.slice(0, 3).map((doc, idx) => ({
        _id: `appointment_${idx}`,
        docData: {
          name: doc.name,
          speciality: doc.speciality,
          image: doc.image,
          address: doc.address || { line1: "Street X", line2: "City Y" }
        },
        slotDate: `12_0${idx + 1}_2025`,
        slotTime: `${10 + idx}:00 AM`,
        payment: idx === 1,         // Simulate second one as paid
        isCompleted: idx === 2,     // Simulate third one as completed
        cancelled: false
      }))
      setAppointments(generatedAppointments)
    }
  }, [doctors])



  const simulateStripe = () => toast.info("Redirecting to Stripe...")
  const simulateRazorpay = () => toast.info("Opening Razorpay...")

  return (
    <div>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
      <div className=''>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
            <div>
              <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-[#5E5E5E]'>
              <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-[#464646] font-medium mt-1'>Address:</p>
              <p className=''>{item.docData.address.line1}</p>
              <p className=''>{item.docData.address.line2}</p>
              <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end text-sm text-center'>
              {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && <button onClick={() => setPayment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentRazorpay(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" /></button>}
              {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-[#696969]  bg-[#EAEFFF]'>Paid</button>}

              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}

              {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default <MyAppointments></MyAppointments>*/

/*import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

import { assets } from '../assets/assets' 

const MyAppointments = () => {
 const { backendUrl, token, getDoctorsData } = useContext(AppContext)
 const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  // Removed payment state and setPayment
  // const [payment, setPayment] = useState('') 
 const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

 const slotDateFormat = (slotDate) => {
  const [day, month, year] = slotDate.split('_')
  return `${day} ${months[Number(month)]} ${year}`
 }

 // Getting User Appointments Data Using API
 const getUserAppointments = async () => {
  try {
   const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
   setAppointments(data.appointments.reverse())
  } catch (error) {
   console.log(error)
   toast.error(error.message)
  }
 }

 // Function to cancel appointment Using API
 const cancelAppointment = async (appointmentId) => {
  try {
   const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
   if (data.success) {
    toast.success(data.message)
    getUserAppointments()
    getDoctorsData()
   } else {
    toast.error(data.message)
   }
  } catch (error) {
   console.log(error)
   toast.error(error.message)
  }
 }



 useEffect(() => {
    if (token) {
   getUserAppointments()
  }
 }, [token])

 // Generate appointment data from doctors
 useEffect(() => {
  if (doctors.length) {
   const generatedAppointments = doctors.slice(0, 3).map((doc, idx) => ({
    _id: `appointment_${idx}`,
    docData: {
     name: doc.name,
     speciality: doc.speciality,
     image: doc.image,
     address: doc.address || { line1: "Street X", line2: "City Y" }
    },
    slotDate: `12_0${idx + 1}_2025`,
    slotTime: `${10 + idx}:00 AM`,
    payment: idx === 1,   // Keep simulation for paid/unpaid status
    isCompleted: idx === 2,     // Simulate third one as completed
      cancelled: false
      }))
      setAppointments(generatedAppointments)
    }
  }, [doctors])
 // Kept simulateStripe as an example for online payment, removing Razorpay one
 //const simulateOnlinePayment = () => toast.info("Simulating online payment...") 

 return (
  <div>
   <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
   <div className=''>
    {appointments.map((item, index) => (
     <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
      <div>
       <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="" />
      </div>
      <div className='flex-1 text-sm text-[#5E5E5E]'>
       <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>
       <p>{item.docData.speciality}</p>
       <p className='text-[#464646] font-medium mt-1'>Address:</p>
      <p className=''>{item.docData.address.line1}</p>
      <p className=''>{item.docData.address.line2}</p>
       <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
      </div>
      <div></div>
      <div className='flex flex-col gap-2 justify-end text-sm text-center'>
       
       {!item.cancelled && !item.payment && !item.isCompleted && (
      <button onClick={simulateOnlinePayment} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
       )}
       
       {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-[#696969]  bg-[#EAEFFF]'>Paid</button>}

       {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}

      {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
       {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
      </div>
    </div>
   
   </div>
  </div>
  )
}

export default <MyAppointments>*/

/*import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

import { assets } from '../assets/assets' 

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  // Fetch user appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/user/appointments',
        { headers: { token } }
      )
      
      if (data.success && data.appointments) {
        setAppointments(data.appointments.reverse())
      } else {
        setAppointments([])
      }

    } catch (error) {
      console.log(error)
      toast.error("Failed to load appointments")
    }
  }

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Cancel failed")
    }
  }

  // Placeholder for online payment
  const simulateOnlinePayment = () => {
    toast.info("Simulating online payment...")
  }

  // Load real appointments
  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>
        My Appointments
      </p>

      <div>
        {appointments.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No appointments found.
          </div>
        )}

        {appointments.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'
          >
            
            <div>
              <img
                className='w-36 bg-[#EAEFFF]'
                src={item.docData?.image || assets.doctor_placeholder}
                alt=""
              />
            </div>

            
            <div className='flex-1 text-sm text-[#5E5E5E]'>
              <p className='text-[#262626] text-base font-semibold'>
                {item.docData?.name}
              </p>
              <p>{item.docData?.speciality}</p>

              <p className='text-[#464646] font-medium mt-1'>Address:</p>
              <p>{item.docData?.address?.line1}</p>
              <p>{item.docData?.address?.line2}</p>

              <p className='mt-1'>
                <span className='text-sm text-[#3C3C3C] font-medium'>
                  Date & Time:
                </span>
                {' '}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            
            <div className='flex flex-col gap-2 justify-end text-sm text-center'>

              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={simulateOnlinePayment}
                  className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className='sm:min-w-48 py-2 border rounded bg-[#EAEFFF] text-[#696969]'>
                  Paid
                </button>
              )}

              {item.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                  Completed
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments*/

/*import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/user/appointments',
        { headers: { token } }
      )

      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>

      {appointments.map((item, index) => (
        <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>

          <div>
            <img className='w-36 bg-[#EAEFFF]' src={item.docData?.image} alt='' />
          </div>

          <div className='flex-1 text-sm text-[#5E5E5E]'>
            <p className='text-[#262626] text-base font-semibold'>{item.docData?.name}</p>
            <p>{item.docData?.speciality}</p>

            <p className='text-[#464646] font-medium mt-1'>Address:</p>
            <p>{item.docData?.address?.line1}</p>
            <p>{item.docData?.address?.line2}</p>

            <p className='mt-1'>
              <span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span>
              {' '}{slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>
          </div>

          
          <div className='flex flex-col gap-2 justify-end text-sm text-center'>
            
            {item.isCompleted && (
              <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>
            )}

            {!item.cancelled && !item.isCompleted && (
              <button
                onClick={() => cancelAppointment(item._id)}
                className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
              >
                Cancel appointment
              </button>
            )}

            {item.cancelled && !item.isCompleted && (
              <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                Appointment cancelled
              </button>
            )}

          </div>

        </div>
      ))}
    </div>
  )
}

export default MyAppointments*/

/*import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
  const { backendUrl, uToken, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${day} ${months[Number(month)]} ${year}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/appointments`, {
        headers: { token: uToken },
      });
      if (data.success) setAppointments(data.appointments.reverse());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token: uToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (uToken) getUserAppointments();
  }, [uToken]);

  return (
    <div>
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">My Appointments</p>

      {appointments.length === 0 && (
        <p className="mt-4 text-gray-500">No appointments found.</p>
      )}

      {appointments.map((item) => (
        <div key={item._id} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b">
          <div>
            <img className="w-36 bg-[#EAEFFF]" src={item.docData?.image} alt="" />
          </div>
          <div className="flex-1 text-sm text-[#5E5E5E]">
            <p className="text-[#262626] text-base font-semibold">{item.docData?.name}</p>
            <p>{item.docData?.speciality}</p>
            <p className="text-[#464646] font-medium mt-1">Address:</p>
            <p>{item.docData?.address?.line1}</p>
            <p>{item.docData?.address?.line2}</p>
            <p className="mt-1">
              <span className="text-sm text-[#3C3C3C] font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-end text-sm text-center">
            {!item.cancelled && !item.isCompleted && (
              <button
                onClick={() => cancelAppointment(item._id)}
                className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Cancel appointment
              </button>
            )}
            {item.cancelled && !item.isCompleted && (
              <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment cancelled</button>
            )}
            {item.isCompleted && (
              <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointment;*/


/*import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
  const { backendUrl, uToken } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["", "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${day} ${months[Number(month)]} ${year}`;
  };

  const getAppointments = async () => {
    if (!uToken) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token: uToken },
      });
      if (data.success) setAppointments(data.appointments);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { getAppointments(); }, [uToken]);

  return (
    <div>
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">My appointments</p>
      {appointments.map((item) => (
        <div key={item._id} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b">
          <div>
            <img className="w-36 bg-[#EAEFFF]" src={item.docData?.image} alt="" />
          </div>
          <div className="flex-1 text-sm text-[#5E5E5E]">
            <p className="text-[#262626] text-base font-semibold">{item.docData?.name}</p>
            <p>{item.docData?.speciality}</p>
            <p className="text-[#464646] font-medium mt-1">Address:</p>
            <p>{item.docData?.address?.line1}</p>
            <p>{item.docData?.address?.line2}</p>
            <p className="mt-1"><span className="text-sm font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
          </div>
          <div className="flex flex-col gap-2 justify-end text-sm text-center">
            {!item.cancelled && (
              <button className="text-[#696969] sm:min-w-48 py-2 border rounded cursor-pointer">Cancel</button>
            )}
            {item.cancelled && (
              <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Cancelled</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointment;*/


import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
  const { backendUrl, uToken } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["", "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${day} ${months[Number(month)]} ${year}`;
  };

  const getAppointments = async () => {
    if (!uToken) return;
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/appointments`, {}, {
        headers: { token: uToken },
      });
      if (data.success) setAppointments(data.appointments);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAppointments();
  }, [uToken]);

  return (
    <div>
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">My appointments</p>
      {appointments.map((item) => (
        <div key={item._id} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b">
          <div>
            <img className="w-36 bg-[#EAEFFF]" src={item.docData?.image} alt="" />
          </div>
          <div className="flex-1 text-sm text-[#5E5E5E]">
            <p className="text-[#262626] text-base font-semibold">{item.docData?.name}</p>
            <p>{item.docData?.speciality}</p>
            <p className="text-[#464646] font-medium mt-1">Address:</p>
            <p>{item.docData?.address?.line1}</p>
            <p>{item.docData?.address?.line2}</p>
            <p className="mt-1">
              <span className="text-sm font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-end text-sm text-center">
            {!item.cancelled && (
              <button className="text-[#696969] sm:min-w-48 py-2 border rounded cursor-pointer">Cancel</button>
            )}
            {item.cancelled && (
              <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Cancelled</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointment;
