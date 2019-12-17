'use strict'

const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/has_role_admin');
const UserController = require('../controllers/user')

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/users', authMiddleware.ensureAuthenticated ,adminMiddleware.ensureRolAdmin, UserController.getUsers);

module.exports = router