import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
// router.put("/update-role/:id", updateRole);

export default router;
