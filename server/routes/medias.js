import express from 'express';
import { recommendMedias, tasteDive } from '../controllers/MediasController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.get("/recommend", recommendMedias);

router.get("/tastedive", tasteDive);

export default router;