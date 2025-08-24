import bcrypt from "bcryptjs";
import UserModel from "../models/UserSchema.js";
import {
  generateJwtCookie,
  clearJwtCookie,
} from "../middleware/authMiddleware.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      fullName: name,
      email,
      password: hash,
    });
    generateJwtCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateJwtCookie(res, user._id);

    res.json({
      success: true,
      message: "Login successful",
      data: { id: user._id, email: user.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

export const logoutUser = (req, res) => {
  try {
    clearJwtCookie(res);
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Logout failed", error: error.message });
  }
};


export const getCurrentUser = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Fetched current user",
      data: { id: req.userId },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not fetch user",
      error: error.message,
    });
  }
};
