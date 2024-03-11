// src/server.ts

import express from 'express';
import urlRoutes from './routes/urlRoutes';

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Define base URL for the routes
app.use('/api/url', urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
