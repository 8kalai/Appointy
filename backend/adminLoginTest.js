import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "./models/adminModel.js";
import 'dotenv/config';

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);

// Admin login function
const adminLogin = async (emailInput, passwordInput) => {
  try {
    // Clean input: trim spaces and lowercase the email
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Invalid credentials: admin not found");
      return;
    }

    // Compare input password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("Invalid credentials: wrong password");
      return;
    }

    console.log("Login successful!");
  } catch (err) {
    console.error("Error during login:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Example usage
adminLogin("admin@gmail.com", "admin123");
