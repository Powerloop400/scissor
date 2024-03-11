// src/services/userService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models/userModel';

const saltRounds = 10;
const secretKey = 'fv9rh293skiwsv'; // Replace with a secure secret key

// Function to register a new user
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error('Error registering user');
  }
};

// Function to authenticate a user
export const authenticateUser = async (email: string, password: string) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }
    // Generate an authentication token
    if (!secretKey) {
      throw new Error('Secret key not defined');
    }
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    return { user, token };
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export const authenticateWithCookies = async (req, res, next: Function) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.render('login');
      }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.redirect('/login');
        } else {
          res.redirect('/login'); 
       }
      }

      req.userId = decoded.userId;

      next();
    });
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};