import express from 'express';
import { applyOnline } from '../controllers/leadController.js';

const router = express.Router();

router.post('/apply', applyOnline);

export default router;
