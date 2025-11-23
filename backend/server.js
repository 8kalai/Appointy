/*import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';   // required for test-db route
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// ** NEW IMPORTS FOR FILE HANDLING **
import path from 'path'; 
import { fileURLToPath } from 'url';
import fs from 'fs';
// ------------------------------------

// ❗ REQUIRED for creating hashed admin password
import bcrypt from "bcrypt";
// ❗ REQUIRED for auto-creating admin
import adminModel from "./models/adminModel.js";

// ** NEW: Define __dirname for ES Modules **
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ----------------------------------------


// app config
const app = express();
const port = process.env.PORT || 4000;

// Connect to database
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());

// server.js (Around line 29-33)

// Get the live frontend URL from the environment (Render sets this variable)
const FRONTEND_URL = process.env.FRONTEND_URL; 

// Define the allowed origins as an array
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.0:1", // A common alternative for localhost
    FRONTEND_URL          // <-- CRITICAL: Include the variable here!
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(cors({
    origin: (origin, callback) => {
        // If the origin is in the allowed list or if it's a server-to-server request (no origin header), allow it.
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true 
}));

// ** NEW: Setup static folder to serve doctor images **
// When the frontend requests http://server:port/images/doctor.jpg, it maps to the local uploads/doctors/doctor.jpg file.
app.use('/images', express.static(path.join(__dirname, 'admin', 'assets'))); 
// ----------------------------------------------


// api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.get('/test-db', (req, res) => {
  const state = mongoose.connection.readyState;
  if (state === 1) {
    res.send('Database is connected');
  } else {
    res.status(500).send('Database is NOT connected');
  }
});

// -------------------------------------------
// 🔥 AUTO-CREATE DEFAULT ADMIN (runs 1 time)
// -------------------------------------------

const createDefaultAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    const existing = await adminModel.findOne({ email: adminEmail });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await adminModel.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword
      });

      console.log("🔥 Default admin created:");
      console.log("Email: admin@gmail.com");
      console.log("Password: admin123");
    } else {
      console.log("✔ Admin already exists");
    }
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
};

// Run admin creation after DB connection
mongoose.connection.once("open", () => {
  createDefaultAdmin();
});

// ** NEW: Ensure uploads directory exists on server start **
const uploadDir = path.join(__dirname, 'admin', 'assets');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created uploads directory: ${uploadDir}`);
}
// ---------------------------------------

// start server
app.listen(port, () => console.log(`Server started on PORT:${port}`));*/

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';  
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// ** IMPORTS FOR FILE HANDLING **
import path from 'path'; 
import { fileURLToPath } from 'url';
import fs from 'fs';
// ------------------------------------

// REQUIRED for creating hashed admin password
import bcrypt from "bcrypt";
// REQUIRED for auto-creating admin
import adminModel from "./models/adminModel.js";

// ** Define __dirname for ES Modules **
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ----------------------------------------


// app config
const app = express();
const port = process.env.PORT || 4000;

// Connect to database
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());

// Get the live frontend URL from the environment 
const FRONTEND_URL = process.env.FRONTEND_URL; 
const ADMIN_FRONTEND_URL = process.env.ADMIN_FRONTEND_URL;
console.log(`FRONTEND_URL detected for CORS: ${FRONTEND_URL}`);
console.log(`ADMIN_FRONTEND_URL detected for CORS: ${ADMIN_FRONTEND_URL}`);

// Define the allowed origins as an array
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.0:1", 
    FRONTEND_URL,
    ADMIN_FRONTEND_URL
];

// -------------------------------------------------------------
// 🟢 UPDATED: Using a single, custom CORS middleware block
// -------------------------------------------------------------
app.use(cors({
    origin: (origin, callback) => {
        // If the origin is in the allowed list or if it's a server-to-server request (no origin header), allow it.
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`CORS Error: Origin ${origin} not allowed.`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true 
}));
// -------------------------------------------------------------


// ** Setup static folder to serve doctor images **
app.use('/images', express.static(path.join(__dirname, 'admin', 'assets'))); 
// ----------------------------------------------


// api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.get('/test-db', (req, res) => {
  const state = mongoose.connection.readyState;
  if (state === 1) {
    res.send('Database is connected');
  } else {
    res.status(500).send('Database is NOT connected');
  }
});

// -------------------------------------------
// 🔥 AUTO-CREATE DEFAULT ADMIN (runs 1 time)
// -------------------------------------------

const createDefaultAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    const existing = await adminModel.findOne({ email: adminEmail });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await adminModel.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword
      });

      console.log("🔥 Default admin created:");
      console.log("Email: admin@gmail.com");
      console.log("Password: admin123");
    } else {
      console.log("✔ Admin already exists");
    }
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
};

// Run admin creation after DB connection
mongoose.connection.once("open", () => {
  createDefaultAdmin();
});

// ** Ensure uploads directory exists on server start **
const uploadDir = path.join(__dirname, 'admin', 'assets');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created uploads directory: ${uploadDir}`);
}
// ---------------------------------------

// start server
app.listen(port, () => console.log(`Server started on PORT:${port}`));