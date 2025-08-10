// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("./models/user-model");
require("dotenv").config(); // Loads .env variables

(async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // 2. Read admin credentials from .env
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("❌ ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env");
      process.exit(1);
    }

    // 3. Check if admin already exists
    const existing = await userModel.findOne({ email: adminEmail });
    if (existing) {
      console.log("⚠️ Admin already exists.");
      process.exit(0);
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // 5. Create admin
    const admin = await userModel.create({
      fullname: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
    });

    console.log("🎉 Admin created successfully:", admin);
    process.exit(0);

  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
})();
