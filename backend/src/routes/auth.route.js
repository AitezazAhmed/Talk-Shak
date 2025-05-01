import express from "express";
import {restrictToLoggedinUserOnly} from "../middleware/auth.middleware.js"
import{signup,login,logout,updateProfile,checkAuth} from "../controllers/auth.controller.js"

const router=express.Router()
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/update-profile",restrictToLoggedinUserOnly,updateProfile)
router.get("/check", restrictToLoggedinUserOnly, checkAuth);
export default router