// src/routes/urlRoutes.ts

import express from 'express';
import * as urlController from '../controllers/urlController';
import * as urlService from '../services/urlService';


const router = express.Router();

// URL shortening routes
router.post('/shorten', urlController.shortenUrl);
router.post('/custom', urlController.createCustomUrl);
router.get('/:shortUrl/qrcode', urlController.generateQRCodeForUrl);
router.get('/:shortUrl', urlController.redirectToLongUrl);

export default router;
