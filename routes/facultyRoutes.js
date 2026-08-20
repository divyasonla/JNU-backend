import express from 'express';
import factory from '../controllers/crudControllerFactory.js';
import Faculty from '../models/Faculty.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(factory.getAll(Faculty))
  .post(protect, factory.create(Faculty));

router.route('/:id')
  .get(factory.getOne(Faculty))
  .put(protect, factory.update(Faculty))
  .delete(protect, factory.deleteOne(Faculty));

export default router;
