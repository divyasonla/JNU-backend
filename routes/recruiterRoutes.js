import express from 'express';
import factory from '../controllers/crudControllerFactory.js';
import Recruiter from '../models/Recruiter.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(factory.getAll(Recruiter))
  .post(protect, factory.create(Recruiter));

router.route('/:id')
  .get(factory.getOne(Recruiter))
  .put(protect, factory.update(Recruiter))
  .delete(protect, factory.deleteOne(Recruiter));

export default router;
