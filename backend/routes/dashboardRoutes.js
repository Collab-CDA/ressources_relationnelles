const express = require('express');
const {
  getDashboard,
  exportDashboard,
  takeSnapshot,
  getHistory
} = require('../controllers/dashboardController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getDashboard);
router.get('/export', authenticate, exportDashboard);

// Nouvelle route pour snapshot manuel
router.post('/snapshot', authenticate, takeSnapshot);

// Nouvelle route pour historique
router.get('/history', authenticate, getHistory);

module.exports = router;
