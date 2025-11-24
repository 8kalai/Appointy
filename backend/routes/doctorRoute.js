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
    addDoctor,
    doctorList,
    loginDoctor,
    doctorDashboard,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    doctorProfile,
    updateDoctorProfile,
    changeAvailability,
} from '../controllers/doctorController.js';

const router = express.Router();

router.get('/list', doctorList);
router.post('/login', loginDoctor);

router.post('/add-doctor', addDoctor);


router.post('/profile', doctorProfile);            // expects { doctorId }
router.post('/update-profile', updateDoctorProfile); // expects { doctorId, ... }
router.post('/dashboard', doctorDashboard);        // expects { doctorId }
router.post('/appointments', appointmentsDoctor);  // expects { doctorId }
router.post('/cancel-appointment', appointmentCancel);  // expects { doctorId, appointmentId }
router.post('/complete-appointment', appointmentComplete); // expects { doctorId, appointmentId }
router.post('/change-availability', changeAvailability); // expects { doctorId }

export default router;
