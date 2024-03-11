// src/controllers/urlController.ts

import { Request, Response } from 'express';
import * as urlService from '../services/urlService';
import shortid from 'shortid'; // Import shortid library
import qr from 'qrcode'; // Import QRCode library
import jwt from 'jsonwebtoken';
const secretKey = 'fv9rh293skiwsv'; // Replace with a secure secret key


// Controller function for shortening URLs
export const shortenUrl = async (req: Request, res: Response) => {
  var { longUrl } = req.body;

  try {
    if (!longUrl) {
      return res.status(400).json({ error: 'Long URL is required' });
    }

    // Check if the longUrl starts with "http://" or "https://"
    if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
      // If not, prepend "http://"
      longUrl = 'http://' + longUrl;
    }

    // Extract userId from JWT token
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, secretKey) as { userId: string };
    const userId = decodedToken.userId;

    // Generate shortUrl
    const shortUrl = shortid.generate(); 

    // Create URL with userId
    const url = await urlService.createUrl(longUrl, shortUrl, userId);

    res.redirect('/');
    return res.status(201);
  } catch (error) {
    console.error('Error shortening URL:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const createCustomUrl = async (req: Request, res: Response) => {
  const { longUrl, customAlias } = req.body;

  try {
    // Validate the input URL and custom alias
    if (!longUrl || !customAlias) {
      return res.status(400).json({ error: 'Long URL and Custom Alias are required' });
    }
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, secretKey) as { userId: string };
    const userId = decodedToken.userId;


    // Create a new URL record in the database with custom alias
    const url = await urlService.createUrl(longUrl, customAlias, userId);
    res.redirect('/');
    return res.status(201)
  } catch (error) {
    console.error('Error creating custom URL:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function for generating QR code for URL
export const generateQRCodeForUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  try {
    // Generate QR code for the short URL
    const qrCode = await qr.toDataURL(shortUrl);

    // Send the QR code image in the response
    res.type('png').send(Buffer.from(qrCode.split(',')[1], 'base64'));
  } catch (error) {
    console.error('Error generating QR code:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




// Redirect endpoint
export const redirectToLongUrl = async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const url = await urlService.getUrlByShortUrl(shortUrl);

    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('Not found');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('Server Error');
  }
};
