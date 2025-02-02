import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env.JWT_SECRET);
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(401)
        .json({ error: "No token provided. Unauthorized." });
    }

    const verifyuser = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(`verify user Details is `, verifyuser);
    req.user = verifyuser;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ error: "Unauthorized. Invalid or expired token." });
  }
};
