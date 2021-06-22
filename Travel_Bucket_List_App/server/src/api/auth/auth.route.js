const express = require('express');

const router = express.Router();

// Load Controllers
const { registerController } = require('../controllers/auth.controller.js');

// Auth routes
// /api/register Register
router.post('/register', registerController);

module.exports = router;
