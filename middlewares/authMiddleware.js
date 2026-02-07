const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // 1. Check if the authorization header exists at all
    // This prevents the "split of undefined" error
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Please provide Auth Token",
      });
    }

    // 2. Extract the token
    const token = authHeader.split(" ")[1];

    // 3. Verify the token
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorize User",
        });
      } else {
        // 4. FIX: Ensure req.body is an object before setting 'id'
        // GET requests often have an undefined req.body
        console.log("1. Decoded ID from Token:", decode.id);
        if (!req.body) {
          req.body = {};
        }
        
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log("Middleware Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Auth Middleware",
      error: error.message,
    });
  }
};