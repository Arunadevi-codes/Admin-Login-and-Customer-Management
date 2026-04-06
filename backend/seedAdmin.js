const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {

  const existing = await Admin.findOne({ username: "superadmin" });

  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    username: "superadmin",
    password: hashedPassword
  });

  console.log("Super Admin Created");

  process.exit();
};

seedAdmin();