import express from 'express';
import factory from '../controllers/crudControllerFactory.js';
import Event from '../models/Event.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(factory.getAll(Event))
  .post(protect, factory.create(Event));

router.route('/:id')
  .get(factory.getOne(Event))
  .put(protect, factory.update(Event))
  .delete(protect, factory.deleteOne(Event));

export default router;
