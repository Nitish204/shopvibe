const express = require('express');
const { getStats, getRecentOrders, getSalesData } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.get('/stats', protect, admin, getStats);
router.get('/orders', protect, admin, getRecentOrders);
router.get('/sales', protect, admin, getSalesData);

module.exports = router;