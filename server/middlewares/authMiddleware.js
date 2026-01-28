import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  try {
    // Try cookie first, then Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

export default protect;