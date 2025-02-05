import express from "express";
import { asnwers } from './../controllers/user.controller.js';



const router = express.Router();
router.get("/answer", asnwers);
// router.get("/get-users", verifyToken, getUsers);

export default router;
