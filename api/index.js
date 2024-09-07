const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const passport = require('passport');
require('../config/passport');
const session = require('express-session');

dotenv.config();
connectDB();

const app = express();



// Middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Session middleware (required if using Passport sessions)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret', // Secure your session secret
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Successful authentication, redirect or return token
    const token = req.user.token; // Make sure you set token in passport strategy
    res.redirect(`/login/callback?token=${token}`);
  }
);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
