import express from 'express';
import { checkRollNumber, fetchResult } from '../controllers/resultController.js';

const router = express.Router();

router.post('/check-roll', checkRollNumber);
router.post('/fetch-result', fetchResult);

export default router;
