const express = require('express');
const router = express.Router();
const { register, login, teamLogin } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/team-login', teamLogin);

module.exports = router;
