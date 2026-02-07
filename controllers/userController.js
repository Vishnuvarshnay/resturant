const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// GET USER INFO
const getUserController = async (req, res) => {
  try {
    // FIX: Simplified findById (it takes the ID string directly)
    console.log("2. Searching for User ID:", req.body.id);
    const user = await userModel.findById(req.body.id);
    if (!user) {
      return res.status(404).send({ success: false, message: "User Not Found" });
    }
    user.password = undefined; // Hide password
    res.status(200).send({ success: true, message: "User get Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in Get User API", error });
  }
};

// UPDATE USER
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();
    res.status(200).send({ success: true, message: "User Updated Successfully" });
  } catch (error) {
    console.log(error); // FIX: Fixed 'erorr' typo
    res.status(500).send({ success: false, message: "Error In Update User API", error });
  }
};

// UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) {
      return res.status(404).send({ success: false, message: "User Not Found" });
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({ success: false, message: "Please Provide Old or New Password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({ success: false, message: "Invalid old password" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ success: true, message: "Password Updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error In Password Update API", error });
  }
};

// RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(400).send({ success: false, message: "Please Provide All Fields" });
    }
    // Find user by email AND security answer
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({ success: false, message: "User Not Found or invalid answer" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ success: true, message: "Password Reset Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in PASSWORD RESET API", error });
  }
};

// DELETE PROFILE ACCOUNT
const deleteProfileController = async (req, res) => {
  try {
    // If your route is /delete/:id use req.params.id, otherwise use req.body.id
    await userModel.findByIdAndDelete(req.body.id || req.params.id);
    return res.status(200).send({ success: true, message: "Your account has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error In Delete Profile API", error });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};