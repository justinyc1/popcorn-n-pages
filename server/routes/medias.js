import express from 'express';
import { recommendMedias } from '../controllers/MediasController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.get("/recommend", recommendMedias);

// delete account from db

export default router;