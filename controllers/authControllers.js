const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).send({ success: false, message: "Please Provide All Fields" });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(409).send({ success: false, message: "Email Already Registered" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName, email, password: hashedPassword, address, phone,answer,
    });

    return res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user, // Look at the password field in Postman here!
    });

  } catch (error) {
    return res.status(500).send({ success: false, message: "Error In Register", error: error.message });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ success: false, message: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: "User Not Found" });
    }

    // Compare Hashed Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ success: false, message: "Invalid Credentials" });
    }

    // Generate Token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Sending user directly so you can see the "password" hash in Postman
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user, 
    });

  } catch (error) {
    return res.status(500).send({ success: false, message: "Error In Login", error: error.message });
  }
};

module.exports = { registerController, loginController };