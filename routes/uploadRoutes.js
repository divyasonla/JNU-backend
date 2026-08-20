import express from 'express';
import upload from '../middleware/upload.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), (req, res) => {
  res.json({
    message: 'Image uploaded successfully',
    image: `/${req.file.path}`,
  });
});

export default router;
