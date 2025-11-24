/*import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary'  


    

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment 
const bookAppointment = async (req, res) => {

    try {

        const { userId, docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select("-password")

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor Not Available' })
        }

        let slots_booked = docData.slots_booked

        // checking for slot availablity 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user 
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot 
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})




export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment}
*/
/*import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

// API to register user
const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Enter a valid email' })
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: 'enter a strong password' })
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name, email, password: hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ success: true, token })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

// API for user login
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid Credentials' })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

// API to get user profile data
const getProfile = async (req, res) => {

  try {

    const { userId } = req.body
    const userData = await userModel.findById(userId).select('-password')

    res.json({ success: true, userData })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

// API to update user profile
const updateProfile = async (req, res) => {

  try {

    const { userId, name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: 'Data Missing' })
    }

    await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

    if (imageFile) {

      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
      const imageURL = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId, { image: imageURL })
    }

    res.json({ success: true, message: 'Profile Updated' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

// API to book appointment
const bookAppointment = async (req, res) => {

  try {

    const { userId, docId, slotDate, slotTime } = req.body

    const docData = await doctorModel.findById(docId).select('-password')

    if (!docData.available) {
      return res.json({ success: false, message: 'Doctor not available' })
    }

    let slots_booked = docData.slots_booked

    // checking for slot availablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot not available' })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appointmentData = {
      userId, docId,
      userData, docData,
      amount: docData.fees,
      slotTime, slotDate,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: 'Appointment Booked' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {

  try {

    const { userId } = req.body
    const appointments = await appointmentModel.find({ userId })

    res.json({ success: true, appointments })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

// API to cancel appointment
const cancelAppointment = async (req, res) => {

  try {

    const { userId, appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: 'Unauthorized action' })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData
    const doctorData = await doctorModel.findById(docId)
    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: 'Appointment Cancelled' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment }*/

/*import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

// --- REGISTER ---
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.json({ success: false, message: 'Missing Details' })
    if (!validator.isEmail(email)) return res.json({ success: false, message: 'Enter a valid email' })
    if (password.length < 8) return res.json({ success: false, message: 'Enter a strong password' })

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))
    const user = await new userModel({ name, email, password: hashedPassword }).save()
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// --- LOGIN ---
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) return res.json({ success: false, message: 'User does not exist' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.json({ success: false, message: 'Invalid Credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// --- GET PROFILE ---
const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findById(req.user.id).select('-password')
    res.json({ success: true, userData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// --- UPDATE PROFILE ---
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.file
    if (!name || !phone || !dob || !gender) return res.json({ success: false, message: 'Data Missing' })

    await userModel.findByIdAndUpdate(req.user.id, { name, phone, address: JSON.parse(address), dob, gender })

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
      await userModel.findByIdAndUpdate(req.user.id, { image: imageUpload.secure_url })
    }

    res.json({ success: true, message: 'Profile Updated' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// --- BOOK APPOINTMENT ---
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id
    const { docId, slotDate, slotTime } = req.body

    const docData = await doctorModel.findById(docId).select('-password')
    if (!docData.available) return res.json({ success: false, message: 'Doctor not available' })

    let slots_booked = docData.slots_booked || {}

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot not available' })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = [slotTime]
    }

    const userData = await userModel.findById(userId).select('-password')

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: 'Appointment Booked' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// --- LIST APPOINTMENTS ---

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body; // comes from authUser
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};





// --- CANCEL APPOINTMENT ---
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id
    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData.userId.toString() !== userId) return res.json({ success: false, message: 'Unauthorized action' })

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointmentData
    const doctorData = await doctorModel.findById(docId)
    doctorData.slots_booked[slotDate] = doctorData.slots_booked[slotDate].filter(e => e !== slotTime)
    await doctorModel.findByIdAndUpdate(docId, { slots_booked: doctorData.slots_booked })

    res.json({ success: true, message: 'Appointment Cancelled' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export {
  registerUser, loginUser, getProfile, updateProfile,
  bookAppointment, listAppointment, cancelAppointment
}*/

import userModel from '../models/userModel.js';
import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { v2 as cloudinary } from 'cloudinary';

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ success: false, message: 'Missing Details' });

    if (!validator.isEmail(email))
      return res.json({ success: false, message: 'Invalid email' });

    if (password.length < 8)
      return res.json({ success: false, message: 'Password too short' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new userModel({ name, email, password: hashedPassword }).save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: 'Invalid Credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select('-password');
    res.json({ success: true, userData: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// List User Appointments
export const listAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ userId: req.userId }).sort({ date: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Book Appointment
export const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;

    const doctor = await doctorModel.findById(docId);
    if (!doctor.available) return res.json({ success: false, message: 'Doctor not available' });

    // initialize slots_booked if undefined
    doctor.slots_booked = doctor.slots_booked || {};
    doctor.slots_booked[slotDate] = doctor.slots_booked[slotDate] || [];

    if (doctor.slots_booked[slotDate].includes(slotTime))
      return res.json({ success: false, message: 'Slot not available' });

    doctor.slots_booked[slotDate].push(slotTime);
    await doctor.save();

    const user = await userModel.findById(req.userId).select('-password');
    const appointment = await new appointmentModel({
      userId: req.userId,
      docId,
      userData: user,
      docData: doctor,
      amount: doctor.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    }).save();

    res.json({ success: true, message: 'Appointment booked', appointment });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Cancel Appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment || appointment.userId.toString() !== req.userId)
      return res.json({ success: false, message: 'Unauthorized action' });

    appointment.cancelled = true;
    await appointment.save();

    // remove slot from doctor
    const doctor = await doctorModel.findById(appointment.docId);
    doctor.slots_booked[appointment.slotDate] = doctor.slots_booked[appointment.slotDate].filter(
      t => t !== appointment.slotTime
    );
    await doctor.save();

    res.json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

