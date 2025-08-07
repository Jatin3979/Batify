// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("./models/user-model"); // adjust path if needed
require("dotenv").config(); // if you're using .env

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10); // strong password recommended

  const existing = await userModel.findOne({ email: "admin@example.com" });
  if (existing) {
    console.log("Admin already exists.");
    process.exit();
  }

  const admin = await userModel.create({
    fullname: "Super Admin",
    email: "admin@example.com",
    password: hashedPassword,
    isAdmin: true,
  });

  console.log("✅ Admin created successfully:", admin);
  process.exit();
});
