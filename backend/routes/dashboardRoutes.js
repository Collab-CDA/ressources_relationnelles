const express = require('express');
const { getDashboard, exportDashboard } = require('../controllers/dashboardController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getDashboard);
router.get('/export', authenticate, exportDashboard);

module.exports = router;
