/*import express from 'express';
import { loginDoctor, appointmentsDoctor, appointmentCancel, doctorList,  appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile, changeAvailability } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
const doctorRouter = express.Router();

doctorRouter.post("/login", loginDoctor)
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel)
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor)
doctorRouter.get("/list", doctorList)
doctorRouter.post("/change-availability", authDoctor, changeAvailability)
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete)
doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
doctorRouter.get("/profile", authDoctor, doctorProfile)
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)

export default doctorRouter;*/

import express from 'express';
import { 
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  doctorList,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
  changeAvailability,
  addDoctor,
  uploadDoctorImage
} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
// import authAdmin from '../middlewares/authAdmin.js'; // uncomment if admin auth exists

const doctorRouter = express.Router();

// Admin route for adding a doctor
// doctorRouter.post("/add-doctor", authAdmin, uploadDoctorImage, addDoctor); // if admin auth exists
doctorRouter.post("/add-doctor", uploadDoctorImage, addDoctor);

// Doctor routes
doctorRouter.post("/login", loginDoctor);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.get("/list", doctorList); // no auth, used by frontend
doctorRouter.post("/change-availability", authDoctor, changeAvailability); // change to authAdmin if intended for admin
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
