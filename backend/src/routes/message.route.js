import express from "express";
import {restrictToLoggedinUserOnly} from "../middleware/auth.middleware.js"
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", restrictToLoggedinUserOnly, getUsersForSidebar);
router.get("/:id", restrictToLoggedinUserOnly, getMessages);
router.post("/send/:id", restrictToLoggedinUserOnly, sendMessage);

export default router;