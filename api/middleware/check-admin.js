const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    
    if(decoded.role != "admin"){
      return res.status(400).json({
        message: "You are not Authorised!",
      });

    }

    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};

