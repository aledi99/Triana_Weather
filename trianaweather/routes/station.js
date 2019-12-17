'use strict'

const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/auth');
const managerMiddleware = require('../middleware/has_role_manager');
const stationController = require('../controllers/station')

router.post('/stations',authMiddleware.ensureAuthenticated, stationController.newStation);
router.delete('/stations/:id',authMiddleware.ensureAuthenticated, managerMiddleware.ensureRoleManager, stationController.delStation);
router.put('/stations/:id' ,stationController.updateStation);

module.exports = router