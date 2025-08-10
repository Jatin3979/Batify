// createadmin.js
const bcrypt = require("bcrypt");
const userModel = require("./models/user-model");

module.exports = async function createAdmin() {
  const existing = await userModel.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log("✅ Admin already exists, skipping creation.");
    return;
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await userModel.create({
    fullname: "Super Admin",
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    isAdmin: true,
  });

  console.log("✅ Admin created successfully.");
};
