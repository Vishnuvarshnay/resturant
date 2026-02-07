const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    // Check req.user.id (from authMiddleware) OR req.body.id
    const userId = req.user ? req.user.id : req.body.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "User ID not found",
      });
    }

    const user = await userModel.findById(userId);
    
    if (!user || user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Access",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Un-Authorized ACCESS",
      error: error.message, // Sending the message helps you debug
    });
  }
};