import express from 'express';
import {
  addResult,
  uploadResult,
  addBulkResults,
  getAllResults,
  updateResult,
  deleteResult,
  getAllLeads,
  getDashboardStats,
  updateLeadStatus,
  deleteLead
} from '../controllers/adminController.js';

const router = express.Router();

router.route('/results')
  .get(getAllResults)
  .post(addResult);

router.post('/upload-result', uploadResult);

router.post('/results/bulk', addBulkResults);
router.put('/results/:id', updateResult);
router.delete('/results/:id', deleteResult);

router.get('/dashboard-stats', getDashboardStats);
router.get('/leads', getAllLeads);
router.patch('/leads/:id/status', updateLeadStatus);
router.delete('/leads/:id', deleteLead);

export default router;
