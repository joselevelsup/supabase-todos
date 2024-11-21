import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Failed to authenticate token",
      });
    }

    req.user = payload;
    next();
  });
};

export default authMiddleware;
