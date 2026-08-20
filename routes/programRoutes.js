import express from 'express';
import factory from '../controllers/crudControllerFactory.js';
import Program from '../models/Program.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(factory.getAll(Program))
  .post(protect, factory.create(Program));

router.route('/:id')
  .get(factory.getOne(Program))
  .put(protect, factory.update(Program))
  .delete(protect, factory.deleteOne(Program));

export default router;
