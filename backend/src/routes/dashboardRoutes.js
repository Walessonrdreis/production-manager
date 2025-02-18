const express = require('express');
const DashboardController = require('../controllers/DashboardController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Todas as rotas do dashboard requerem autenticação
router.use(authMiddleware);

// Rotas para dados do dashboard
router.get('/metrics', DashboardController.getMetrics);
router.get('/activities', DashboardController.getRecentActivities);
router.get('/charts', DashboardController.getChartData);

module.exports = router; 