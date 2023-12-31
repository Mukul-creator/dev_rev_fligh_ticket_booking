const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userInfo = decoded;
    next();
  } catch (error) {
    return res.status(404).json({
      message: "Auth failed",
    });
  }
};

