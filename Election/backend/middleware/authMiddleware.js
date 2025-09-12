
const jwt = require('jsonwebtoken');

// Verify JWT token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Only voter can access
exports.isVoter = (req, res, next) => {
  if (req.user.role !== "voter") return res.status(403).json({ message: "Voter only" });
  next();
};

// Only admin can access
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
  next();
};
