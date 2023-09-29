import express from 'express';
import {createVideo} from '../controllers/videos.js';

const router = express.Router();

// http://localhost:5000/videos/
router.post('/', createVideo)

export default router;