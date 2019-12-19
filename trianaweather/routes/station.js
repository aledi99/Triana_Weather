'use strict'

const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/auth');
const managerMiddleware = require('../middleware/has_role_manager');
const stationController = require('../controllers/station')

router.get('/stations', authMiddleware.ensureAuthenticated, managerMiddleware.ensureRoleManager, stationController.getStation);
router.post('/stations', authMiddleware.ensureAuthenticated, managerMiddleware.ensureRoleManager, stationController.newStation);
router.delete('/stations/:id',authMiddleware.ensureAuthenticated, managerMiddleware.ensureRoleManager, stationController.delStation);
router.put('/stations/:id' ,authMiddleware.ensureAuthenticated, managerMiddleware.ensureRoleManager,stationController.updateStation);
router.get('/stations/:id', authMiddleware.ensureAuthenticated, managerMiddleware.ensureRoleManager, stationController.getStationById);

module.exports = router