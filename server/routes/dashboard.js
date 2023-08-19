const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');


router.get('/dashboard',isLoggedIn,dashboardController.dashboard);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewNote);
router.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNote);
module.exports = router;