import jwt from "jsonwebtoken";
import DBconfig from "../config/DBconfig.js";
import User from "../models/AuthModel.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // use query object
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ fullname, email, password });
    if (user) {
      const token = generateToken(user._id);
      return res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        token,
      });
    }
    return res.status(400).json({ message: "Invalid data" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // call instance method and await it
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    //  set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  // expects req.user to be set by auth middleware
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  const user = await User.findById(req.user.userId).select("-password");
  return res.status(200).json(user);
};