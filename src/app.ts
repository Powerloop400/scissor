import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import authRoutes from './routes/authRoutes';
import path from 'path';
import urlRoutes from './routes/urlRoutes';
import * as userService from './services/userService';
import cookieParser from 'cookie-parser';
import { getAllUrls } from './services/urlService';
import * as urlService from './services/urlService';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload type

const secretKey = 'fv9rh293skiwsv'; // Replace with a secure secret key

// Initialize Express app
const app = express();
app.use(cookieParser());

app.use(express.static('public'));

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', userService.authenticateWithCookies, async (req, res) => {
  try {
    const token = req.cookies.token;
    const { userId } = jwt.verify(token, secretKey) as JwtPayload; // Specify return type as JwtPayload

    const baseUrl = `${req.get('host')}`;

    const links = await urlService.getAllUrls(userId); // Pass userId to getAllUrls
    res.render('home', { links, baseUrl });
    console.log(baseUrl);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/shorten', userService.authenticateWithCookies, (req, res) => {
    res.render('shorten');
});

app.get('/custom', userService.authenticateWithCookies, (req, res) => {
    res.render('custom');
});


// Mount authentication routes
app.use('/auth', authRoutes);

// Mount other routes (e.g., URL routes)
app.use('/urls', urlRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://mabdurrahmanbalogun:pass.word123@cluster0.w65suaf.mongodb.net/scissor', { // Use 'as string' to assert type
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
