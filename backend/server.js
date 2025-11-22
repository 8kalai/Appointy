/*import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000

// Connect to database (CALL THE FUNCTION)
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use("/api/user", userRouter)


app.get("/", (req, res) => {
  res.send("API Working")
});

app.get('/test-db', (req, res) => {
  const state = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (state === 1) {
    res.send('Database is connected');
  } else {
    res.status(500).send('Database is NOT connected');
  }
});


app.listen(port, () => console.log(`Server started on PORT:${port}`))*/

/*import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'   // ⬅️ required for test-db route
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import bcrypt from 'bcrypt'                 // ⬅️ needed
//import adminModel from './models/adminModel.js'   // ⬅️ admin schema

// app config
const app = express()
const port = process.env.PORT || 4000

// Connect to database
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
  res.send("API Working")
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

    const existingAdmin = await adminModel.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      const newAdmin = new adminModel({
        email: adminEmail,
        password: hashedPassword,
        name: "Admin"
      });

      await newAdmin.save();
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


// start server
app.listen(port, () => console.log(`Server started on PORT:${port}`))*/

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';   // required for test-db route
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// ❗ REQUIRED for creating hashed admin password
import bcrypt from "bcrypt";
// ❗ REQUIRED for auto-creating admin
import adminModel from "./models/adminModel.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// Connect to database
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

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

// start server
app.listen(port, () => console.log(`Server started on PORT:${port}`));
