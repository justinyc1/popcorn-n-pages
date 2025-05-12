import express from 'express';
import { recommendMedias, tasteDive, geminiAi } from '../controllers/MediasController.js';

const router = express.Router();

router.get("/recommend", recommendMedias);

router.get("/tastedive", tasteDive);

router.get("/gemini", geminiAi);

export default router;