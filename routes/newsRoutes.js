import express from 'express';
import factory from '../controllers/crudControllerFactory.js';
import News from '../models/News.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(factory.getAll(News))
  .post(protect, factory.create(News));

router.route('/:id')
  .get(factory.getOne(News))
  .put(protect, factory.update(News))
  .delete(protect, factory.deleteOne(News));

export default router;
