/*import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// Doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await doctorModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get doctor's appointments
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.user.id;
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.user.id;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment || appointment.docId.toString() !== docId) {
      return res.status(403).json({ success: false, message: "Invalid doctor or appointment" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Complete appointment
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.user.id;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment || appointment.docId.toString() !== docId) {
      return res.status(403).json({ success: false, message: "Invalid doctor or appointment" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
    res.json({ success: true, message: "Appointment Completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all doctors (for frontend list)
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle doctor's availability
  const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID missing" });
    }

    const doctor = await doctorModel.findById(docId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    doctor.available = !doctor.available;
    await doctor.save();

    res.json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get doctor's profile
const doctorProfile = async (req, res) => {
  try {
    const docId = req.user.id;
    const profile = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData: profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update doctor's profile
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.user.id;
    const { fees, address, available, about } = req.body; // ✅ include `about`

    await doctorModel.findByIdAndUpdate(docId, {
      fees,
      address,
      available,
      about, // ✅ update `about`
    });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get dashboard data
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.user.id;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    const patientSet = new Set();

    appointments.forEach((a) => {
      if (a.isCompleted || a.payment) earnings += a.amount;
      patientSet.add(a.userId.toString());
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patientSet.size,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorList,
  changeAvailability,
  doctorProfile,
  updateDoctorProfile,
  doctorDashboard,
};*/


/*import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// ----------------- Multer Setup -----------------
const uploadDir = 'admin/assets';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, JPG allowed.'), false);
    }
};

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        const specialty = req.body.speciality 
            ? req.body.speciality.toLowerCase().replace(/[^a-z0-9]/g, '-') 
            : 'unknown';
        const filename = `${specialty}-${Date.now()}${path.extname(file.originalname)}`;
        req.customFilename = filename;
        cb(null, filename);
    }
});

export const uploadDoctorImage = multer({ 
    storage, 
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter
}).single('image');

// ----------------- Controllers -----------------

// Add new doctor
export const addDoctor = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: "Doctor image is required." });

        const { name, email, password, experience, fees, about, speciality, degree } = req.body;

        let addressData;
        try { addressData = JSON.parse(req.body.address); }
        catch { return res.status(400).json({ success: false, message: "Invalid address format." }); }

        if (!name || !email || !password || !fees || !speciality || !degree || !addressData.line1) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        const exists = await doctorModel.findOne({ email });
        if (exists) {
            fs.unlinkSync(req.file.path);
            return res.status(409).json({ success: false, message: "A doctor with this email already exists." });
        }

        const newDoctor = new doctorModel({
            name,
            email,
            password,
            image: `/images/${req.file.filename}`,
            experience,
            fees: Number(fees),
            about,
            speciality,
            degree,
            address: {
                line1: addressData.line1,
                line2: addressData.line2 || ''
            },
            available: true,
            date: new Date()
        });

        await newDoctor.save();
        res.status(201).json({ success: true, message: "Doctor added successfully!", doctorId: newDoctor._id });

    } catch (error) {
        console.error("Error adding doctor:", error);
        if (req.file) fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);
        res.status(500).json({ success: false, message: "Server error during doctor registration.", error: error.message });
    }
};

// Doctor login
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await doctorModel.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all doctors for frontend
export const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password -email");
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Toggle availability
export const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        if (!docId) return res.status(400).json({ success: false, message: "Doctor ID missing" });

        const doctor = await doctorModel.findById(docId);
        if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

        doctor.available = !doctor.available;
        await doctor.save();
        res.json({ success: true, message: "Availability changed successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Doctor profile & updates
export const doctorProfile = async (req, res) => {
    try {
        const docId = req.user.id;
        const profile = await doctorModel.findById(docId).select("-password");
        res.json({ success: true, profileData: profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.user.id;
        const { fees, address, available, about } = req.body;

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available, about });
        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Dashboard
export const doctorDashboard = async (req, res) => {
    try {
        const docId = req.user.id;
        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;
        const patientSet = new Set();
        appointments.forEach(a => {
            if (a.isCompleted || a.payment) earnings += a.amount;
            patientSet.add(a.userId.toString());
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patientSet.size,
            latestAppointments: appointments.reverse().slice(0, 5),
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Appointments
export const appointmentsDoctor = async (req, res) => {
    try {
        const docId = req.user.id;
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const appointmentCancel = async (req, res) => {
    try {
        const docId = req.user.id;
        const { appointmentId } = req.body;
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment || appointment.docId.toString() !== docId)
            return res.status(403).json({ success: false, message: "Invalid doctor or appointment" });

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        res.json({ success: true, message: "Appointment Cancelled" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const appointmentComplete = async (req, res) => {
    try {
        const docId = req.user.id;
        const { appointmentId } = req.body;
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment || appointment.docId.toString() !== docId)
            return res.status(403).json({ success: false, message: "Invalid doctor or appointment" });

        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
        res.json({ success: true, message: "Appointment Completed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};*/

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import fs from 'fs'; // Used for cleanup in addDoctor

// Helper function to generate JWT token
const createToken = (id) => {
    // The JWT_SECRET must be defined in your environment variables for security.
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

// ----------------- Admin/User Facing Controllers (Doctor Data) -----------------

/**
 * @route POST /api/admin/add-doctor
 * @desc Adds a new doctor to the database, handles image upload and validation.
 * (Note: Multer middleware must be run before this controller)
 */
export const addDoctor = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: "Doctor image is required." });

        const { name, email, password, experience, fees, about, speciality, degree } = req.body;

        let addressData;
        try { 
            // Address data is expected to come as a JSON string from form-data
            addressData = JSON.parse(req.body.address); 
        }
        catch { 
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ success: false, message: "Invalid address format or missing address data." }); 
        }

        // Basic validation for required fields
        if (!name || !email || !password || !fees || !speciality || !degree || !addressData.line1) {
            fs.unlinkSync(req.file.path); // Clean up uploaded file on failure
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        // Check if doctor email already exists
        const exists = await doctorModel.findOne({ email });
        if (exists) {
            fs.unlinkSync(req.file.path); // Clean up uploaded file
            return res.status(409).json({ success: false, message: "A doctor with this email already exists." });
        }

        // Create new doctor instance
        const newDoctor = new doctorModel({
            name,
            email,
            // The doctorModel Mongoose schema handles password hashing via 'pre' save hook
            password, 
            image: `/images/${req.file.filename}`, // Relative path for frontend consumption
            experience,
            fees: Number(fees),
            about,
            speciality,
            degree,
            address: {
                line1: addressData.line1,
                line2: addressData.line2 || ''
            },
            available: true,
            date: new Date()
        });

        await newDoctor.save();
        res.status(201).json({ success: true, message: "Doctor added successfully!", doctorId: newDoctor._id });

    } catch (error) {
        console.error("Error adding doctor:", error);
        // Clean up file if an error occurred after it was uploaded
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path); 
        res.status(500).json({ success: false, message: "Server error during doctor registration.", error: error.message });
    }
};

/**
 * @route GET /api/doctor/list
 * @desc Gets all doctors for the public frontend/user app.
 */
export const doctorList = async (req, res) => {
    try {
        // Exclude sensitive fields like password and email
        const doctors = await doctorModel.find({}).select("-password -email"); 
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @route POST /api/admin/change-availability OR /api/doctor/change-availability
 * @desc Toggles the availability status of a doctor.
 */
export const changeAvailability = async (req, res) => {
    try {
        // Determine doctor ID: Admin passes doctorId in body, Doctor uses ID from token
        const docId = req.body.doctorId || req.user?.id;
        
        if (!docId) return res.status(400).json({ success: false, message: "Doctor ID missing" });

        const doctor = await doctorModel.findById(docId);
        if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

        doctor.available = !doctor.available;
        await doctor.save();
        res.json({ success: true, message: "Availability changed successfully", available: doctor.available });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ----------------- Doctor Protected Controllers -----------------

/**
 * @route POST /api/doctor/login
 * @desc Handles doctor login, verifies credentials, and issues a JWT token.
 */
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await doctorModel.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });
        
        const token = createToken(user._id);
        
        // Return token and safe profile data for frontend context initialization
        res.json({ 
            success: true, 
            token,
            doctorData: {
                id: user._id,
                name: user.name,
                speciality: user.speciality,
                image: user.image
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @route GET /api/doctor/profile
 * @desc Retrieves the profile data for the authenticated doctor.
 */
export const doctorProfile = async (req, res) => {
    try {
        const docId = req.user.id; // ID comes from the authDoctor middleware
        const profile = await doctorModel.findById(docId).select("-password -email"); 
        
        if (!profile) return res.status(404).json({ success: false, message: "Doctor profile not found." });

        res.json({ success: true, profileData: profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @route POST /api/doctor/update-profile
 * @desc Updates fields (fees, address, availability, about) for the authenticated doctor.
 */
export const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.user.id;
        const { fees, address, available, about } = req.body;

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available, about });
        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @route GET /api/doctor/dashboard
 * @desc Retrieves key statistics and latest appointments for the dashboard.
 */
export const doctorDashboard = async (req, res) => {
    try {
        const docId = req.user.id;
        // Populate patient details for the dashboard view
        const appointments = await appointmentModel.find({ docId }).populate('userId', 'name image');

        let earnings = 0;
        const patientSet = new Set();
        
        appointments.forEach(a => {
            // Calculate earnings from completed or paid appointments
            if (a.isCompleted || a.payment) earnings += a.amount;
            patientSet.add(a.userId._id.toString());
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patientSet.size,
            latestAppointments: appointments.reverse().slice(0, 5),
        };

        res.json({ success: true, data: dashData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @route GET /api/doctor/appointments
 * @desc Retrieves all appointments for the authenticated doctor, populated with user info.
 */
export const appointmentsDoctor = async (req, res) => {
    try {
        const docId = req.user.id;
        const appointments = await appointmentModel.find({ docId }).populate('userId', 'name image'); 
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @route POST /api/doctor/cancel-appointment
 * @desc Marks an appointment as cancelled by the doctor.
 */
export const appointmentCancel = async (req, res) => {
    try {
        const docId = req.user.id;
        const { appointmentId } = req.body;
        
        // Find appointment and ensure it belongs to the logged-in doctor
        const appointment = await appointmentModel.findOne({ _id: appointmentId, docId });
        
        if (!appointment)
            return res.status(403).json({ success: false, message: "Invalid doctor or appointment" });

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        res.json({ success: true, message: "Appointment Cancelled" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @route POST /api/doctor/complete-appointment
 * @desc Marks an appointment as completed by the doctor.
 */
export const appointmentComplete = async (req, res) => {
    try {
        const docId = req.user.id;
        const { appointmentId } = req.body;
        
        // Find appointment and ensure it belongs to the logged-in doctor
        const appointment = await appointmentModel.findOne({ _id: appointmentId, docId });
        
        if (!appointment)
            return res.status(403).json({ success: false, message: "Invalid doctor or appointment" });

        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
        res.json({ success: true, message: "Appointment Completed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
