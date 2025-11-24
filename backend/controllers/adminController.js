/*import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js"

// API for admin login
import Admin from "../models/adminModel.js";

// Admin login controller
const loginAdmin = async (req, res) => {
    // Assuming required imports (Admin, bcrypt, jwt) are present
    // import Admin from '../models/adminModel.js'; 
    // import bcrypt from 'bcrypt';
    // import jwt from 'jsonwebtoken';

    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Clean email and password
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        // Case-insensitive email search
        const admin = await Admin.findOne({ email: { $regex: `^${cleanEmail}$`, $options: 'i' } });

        if (!admin) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(cleanPassword, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        print("Signing Secret:", process.env.JWT_SECRET);
        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("Admin login successful:", admin.email);

        // Return success and token
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token, // ⬅️ Token is correctly returned
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
// API for adding Doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(200).json({ success: true, message: "Doctor Added" });

  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        
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

const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export {loginAdmin, addDoctor, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard}*/


/*import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js"

// API for admin login
import Admin from "../models/adminModel.js";

// =======================================================
// 🟢 TEMPORARY CONTROLLER: USE ONCE AND DELETE/REMOVE
// =======================================================
const createInitialAdmin = async (req, res) => {
    try {
        // 🚨 USE THESE CREDENTIALS FOR LOGIN 🚨
        const tempEmail = "admin@newcompany.com"; 
        const tempPassword = "NewSecurePassword123!";
        const tempName = "Super Admin";
        // -----------------------------------------------------------

        if (!tempEmail || !tempPassword) {
            return res.status(400).json({ success: false, message: "Missing temporary credentials." });
        }

        // 1. Check if the admin already exists (optional, but prevents duplicates)
        const existingAdmin = await Admin.findOne({ email: tempEmail });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin user already exists." });
        }

        // 2. Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(tempPassword, salt);

        // 3. Create and save the new Admin instance
        const newAdmin = new Admin({
            name: tempName,
            email: tempEmail,
            password: hashedPassword,
        });

        await newAdmin.save();

        console.log(`New Admin Created: ${tempEmail}`);
        return res.status(201).json({ success: true, message: `New Admin Created: ${tempEmail}` });

    } catch (error) {
        console.error("Error creating initial admin:", error);
        return res.status(500).json({ success: false, message: "Server error during admin creation." });
    }
};


// Admin login controller
const loginAdmin = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Clean email and password
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        // Case-insensitive email search
        const admin = await Admin.findOne({ email: { $regex: `^${cleanEmail}$`, $options: 'i' } });

        if (!admin) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(cleanPassword, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("Admin login successful:", admin.email);

        // Return success and token
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token, // ⬅️ Token is correctly returned
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// API for adding Doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }
    
    // Ensure the email isn't already registered
    const exists = await doctorModel.findOne({ email });
    if (exists) {
        return res.status(400).json({ success: false, message: "A doctor with this email already exists." });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(200).json({ success: true, message: "Doctor Added" });

  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        
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

const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export {loginAdmin, addDoctor, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard, createInitialAdmin}*/

import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js"

// API for admin login
import Admin from "../models/adminModel.js";

// 🔑 THE SECRET KEY VARIABLE:
// This is the short, simple string used to sign (create) and verify (check) tokens.
// It MUST be the same in this file and in middleware/adminAuth.js.
const JWT_SECRET_FIXED = "Kalaivani08"; 

// =======================================================
// 🟢 TEMPORARY CONTROLLER: USE ONCE AND DELETE/REMOVE
// =======================================================
const createInitialAdmin = async (req, res) => {
    try {
        // 🚨 USE THESE CREDENTIALS FOR LOGIN 🚨
        const tempEmail = "admin@newcompany.com"; 
        const tempPassword = "NewSecurePassword123!";
        const tempName = "Super Admin";
        // -----------------------------------------------------------

        if (!tempEmail || !tempPassword) {
            return res.status(400).json({ success: false, message: "Missing temporary credentials." });
        }

        // 1. Check if the admin already exists (optional, but prevents duplicates)
        const existingAdmin = await Admin.findOne({ email: tempEmail });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin user already exists." });
        }

        // 2. Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(tempPassword, salt);

        // 3. Create and save the new Admin instance
        const newAdmin = new Admin({
            name: tempName,
            email: tempEmail,
            password: hashedPassword,
        });

        await newAdmin.save();

        console.log(`New Admin Created: ${tempEmail}`);
        return res.status(201).json({ success: true, message: `New Admin Created: ${tempEmail}` });

    } catch (error) {
        console.error("Error creating initial admin:", error);
        return res.status(500).json({ success: false, message: "Server error during admin creation." });
    }
};


// Admin login controller
const loginAdmin = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Clean email and password
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        // Case-insensitive email search
        const admin = await Admin.findOne({ email: { $regex: `^${cleanEmail}$`, $options: 'i' } });

        if (!admin) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(cleanPassword, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        
        // Generate JWT token
        // 🚨 FIX: Use the fixed secret key to SIGN the token.
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            JWT_SECRET_FIXED, 
            { expiresIn: "1d" }
        );

        console.log("Admin login successful:", admin.email);

        // Return success and token
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token, // ⬅️ This is the LONG TOKEN string the client receives
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// API for adding Doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        
        // Ensure the email isn't already registered
        const exists = await doctorModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "A doctor with this email already exists." });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(200).json({ success: true, message: "Doctor Added" });

    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        
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

const allDoctors = async (req, res) => {
    try {
        // Find all doctors in the database
        const doctors = await Doctor.find({});

        if (!doctors) {
            return res.json({ success: false, message: "No doctors found." });
        }

        // Return the list of doctors
        res.json({
            success: true,
            data: doctors,
            message: "Doctor list retrieved successfully."
        });

    } catch (error) {
        console.log("Error in allDoctors controller:", error);
        res.json({
            success: false,
            message: "Error retrieving doctors list."
        });
    }
};

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export {loginAdmin, addDoctor, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard, createInitialAdmin}