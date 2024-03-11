// // src/controllers/urlController.test.ts
// import { Request, Response } from 'express';
// import * as urlController from '../controllers/urlController.ts';
// import * as urlService from '../services/urlService';
// jest.mock('../services/urlService');
// describe('URL Controller', () => {
//   describe('shortenUrl', () => {
//     it('should return a shortened URL', async () => {
//       const req = { body: { longUrl: 'https://example.com' } } as Request;
//       const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
//       await urlController.shortenUrl(req, res);
//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalled();
//     });
//   });
//   // Add more test cases for other controller functions
// });
