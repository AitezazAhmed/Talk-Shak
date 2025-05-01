import User from "../models/user.model.js"
import bcrypt from "bcryptjs"  
import { setUser } from "../services/auth.service.js";
import cloudinary from "../lib/cloudnary.js";
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
      if(!fullName || !email || !password){
        return res.status(400).json({ message: "All field are required" });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }
  
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });
  
      // Save the new user

      await newUser.save();
      const token = setUser(newUser);
      res.cookie("uid", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
  
  
      // Send the response
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,  // Ensure profilePic exists in your model
      });
  
    } catch (error) {
      console.log("Error in signup controller: ", error);
      res.status(500).json({ message: "Server error" });
    }
}
export const login=async(req,res)=>{
  const {email,password}=req.body
   try {
 const user= await User.findOne({email})
 if(!user){
  return res.status(400).json({ message: "Invalid Credentials" });
}
const iscorrectPassword= await bcrypt.compare(password,user.password)
if(!iscorrectPassword){
  return res.status(400).json({ message: "Invalid Credentials" });
}
  const token = setUser(user);
  res.cookie("uid", token, { 
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
   });
   res.status(201).json({
    _id: user._id,
    fullName: user.fullName,
    password:user.password,
    email: user.email,
    profilePic: user.profilePic,  // Ensure profilePic exists in your model
  });
   
  return res.status(200).json({ message: "Login successful" })

   } catch (error) {
    console.error(error);
        return res.status(500).send("Internal Server Error");
   }
}
export const logout = (req, res) => {
  try {
    res.clearCookie("uid", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
   return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateProfile =async (req, res)=>{
try {
  const {profilePic}=req.body
  const userId=req.user._id
if(!profilePic){
  return res.status(400).json({message:"profile pic is required"})
}
const uploadResponse= await cloudinary.uploader.upload(profilePic)
const updateUser= await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
res.status(200).json(updateUser)
} catch (error) {
  console.log("error in  update profile",error)
  res.status(500).json({ message: "Internal Server Error" });
}
}
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




