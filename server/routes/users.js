import express from 'express';
import { registerUser } from "../controllers/UsersController.js";
import { loginUser } from '../controllers/UsersController.js';
const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

// delete account from db

export default router;