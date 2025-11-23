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


import jwt from "jsonwebtoken";
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
};
