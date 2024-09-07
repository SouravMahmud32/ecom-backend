const express = require('express');
const { registerUser, loginUser, googleAuthSuccess } = require('../controllers/authController');
const passport = require('passport');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// Google OAuth login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google', { session: false }), googleAuthSuccess);

module.exports = router;
