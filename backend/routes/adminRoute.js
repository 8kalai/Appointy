/*import express from 'express'
import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin,createInitialAdmin} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post("/create-initial-admin", createInitialAdmin);
adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.get("/all-doctors", authAdmin, allDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailability)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/dashboard", authAdmin, adminDashboard)




export default adminRouter;*/

import express from 'express'
import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin,createInitialAdmin} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();



adminRouter.post("/create-initial-admin", createInitialAdmin);
adminRouter.post("/login", loginAdmin)

// Authentication removed:
adminRouter.post("/add-doctor", upload.single('image'), addDoctor)
adminRouter.get("/all-doctors", allDoctors)
adminRouter.post("/change-availability", changeAvailability)
adminRouter.get("/appointments", appointmentsAdmin)
adminRouter.post("/cancel-appointment", appointmentCancel)
adminRouter.get("/dashboard", adminDashboard)


export default adminRouter;


