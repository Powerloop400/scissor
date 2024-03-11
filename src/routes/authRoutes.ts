// src/routes/authRoutes.ts
import express from 'express';
import * as userService from '../services/userService';
import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(cookieParser());

// Route for user registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await userService.registerUser({ username, email, password });
    const { token } = await userService.authenticateUser(email, password); // Retrieve token from authentication
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
    res.status(201);
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
    console.error('Error registering user:', error);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await userService.authenticateUser(email, password);
    res.cookie('token', token, { httpOnly: true }); // Set the token as a cookie
    res.redirect('/');
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

export default router;
