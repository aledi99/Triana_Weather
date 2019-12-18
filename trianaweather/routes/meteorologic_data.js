'use strict'

const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/auth');
const roleManagerMiddleware = require('../middleware/has_role_manager');
const mDataController = require('../controllers/meteorologic_data');

router.post('/weather', authMiddleware.ensureAuthenticated, roleManagerMiddleware.ensureRoleManager, mDataController.nuevaData);
router.get('/weather/:id', authMiddleware.ensureAuthenticated, mDataController.getDataById);
router.get('/stations/:id/weather/', authMiddleware.ensureAuthenticated, mDataController.getDataByStationId);
router.get('/stations/:id/weather/from/:from/to/:to', authMiddleware.ensureAuthenticated, mDataController.getDataByStationId);
router.get('/weather/today', authMiddleware.ensureAuthenticated, mDataController.getDataFromToday);

module.exports = router
