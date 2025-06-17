import Student from "../models/students.js";
import Faculty from "../models/faculties.js"
import Admin from "../models/admin.js"
import jwt from "jsonwebtoken";
import { generateToken } from "../lib/generateToken.js";

export const login = async (req, res) => {
  const { phoneNumber, password, role } = req.body;
  //  console.log(phoneNumber, password, role)
  
  if (!phoneNumber || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let user;

  try {
    // 1. Find the user *with* password
    if (role === "student") {
      user = await Student.findOne({ phone: phoneNumber });
    } else if (role === "faculty") {
      user = await Faculty.findOne({ phone: phoneNumber });
    } else if (role === "admin") {
      console.log("reached ")
      user = await Admin.findOne({ phone: phoneNumber });
      console.log(user,"user is found")
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }
  //  console.log(user,"user is found")
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user,"user is found")

    // 2. Validate password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    console.log("password id Correct")
    // // 3. Generate token
    //  console.log(user._id)
     generateToken(user._id, res);

    return res.status(200).json({
      message: "Login successful",
      user
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const uiValidation = async(req,res) =>{
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ authenticated: false });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ authenticated: false });
    res.json({ authenticated: true, userId: decoded.userId });
  });
}
