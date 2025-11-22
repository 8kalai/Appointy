/*import mongoose from "mongoose";
import bcrypt from "bcrypt";
import adminModel from "./models/adminModel.js";
import 'dotenv/config';

const resetOrCreateAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const email = "admin@gmail.com";
  const plainPassword = "admin123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const updated = await adminModel.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true }
  );

  if (!updated) {
    await adminModel.create({ email, password: hashedPassword });
    console.log("Admin created with new password!");
  } else {
    console.log("Admin password reset successfully!");
  }

  process.exit();
};

resetOrCreateAdmin();*/

/*import mongoose from "mongoose";
import adminModel from "./models/adminModel.js";
import 'dotenv/config';

const checkAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const admin = await adminModel.findOne({ email: "admin@gmail.com" });
  if (!admin) {
    console.log("Admin not found!");
  } else {
    console.log("Stored password hash:", admin.password);
  }

  process.exit();
};

checkAdmin();*/

import bcrypt from "bcrypt";

const testPassword = async () => {
  const hashedPassword = "$2b$10$61UelfHSstaaBsFeHdMTheEDjj7lLagqkDrsk8xqfNIuupTyJtwNG"; // replace with stored hash
  const inputPassword = "admin123";

  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  console.log("Password match?", isMatch);
};

testPassword();


