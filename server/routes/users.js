import express from 'express';
import { 
    registerUser,
    loginUser,
    logoutUser
} from '../controllers/UsersController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/auth", authenticateToken, (req, res) => {
    res.status(200).json(req.user);
});

// delete account from db

export default router;