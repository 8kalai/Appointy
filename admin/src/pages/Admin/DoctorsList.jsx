/*import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors , aToken , getAllDoctors, changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList*/

import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    } else {
      console.log("No admin token found!");
      toast.error("You must be logged in as admin to view doctors");
    }
  }, [aToken]);

  if (!doctors) return <p className="m-5">Loading doctors...</p>;
  if (doctors.length === 0) return <p className="m-5">No doctors found.</p>;

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium mb-5'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item) => (
          <div
            key={item._id}
            className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group'
          >
            <img
              className='bg-[#EAEFFF] w-full h-48 object-cover group-hover:bg-primary transition-all duration-500'
              src={item.image ? `${import.meta.env.VITE_BACKEND_URL}${item.image}` : '/default-doctor.png'}
              alt={item.name}
            />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              <p className='text-[#5C5C5C] text-sm'>Degree: {item.degree}</p>
              <p className='text-[#5C5C5C] text-sm'>Experience: {item.experience} years</p>
              <p className='text-[#5C5C5C] text-sm'>Fees: ${item.fees}</p>
              <p className='text-[#5C5C5C] text-sm'>About: {item.about}</p>
              <p className='text-[#5C5C5C] text-sm'>
                Address: {item.address?.line1}, {item.address?.line2 || ''}
              </p>
              <div className='mt-2 flex items-center gap-2 text-sm'>
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                />
                <span>Available</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;

