"use strict";
// src/controllers/urlController.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToLongUrl = exports.generateQRCodeForUrl = exports.createCustomUrl = exports.shortenUrl = void 0;
var urlService = __importStar(require("../services/urlService"));
var shortid_1 = __importDefault(require("shortid")); // Import shortid library
var qrcode_1 = __importDefault(require("qrcode")); // Import QRCode library
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secretKey = 'fv9rh293skiwsv'; // Replace with a secure secret key
// Controller function for shortening URLs
var shortenUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var longUrl, token, decodedToken, userId, shortUrl, url, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                longUrl = req.body.longUrl;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!longUrl) {
                    return [2 /*return*/, res.status(400).json({ error: 'Long URL is required' })];
                }
                // Check if the longUrl starts with "http://" or "https://"
                if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
                    // If not, prepend "http://"
                    longUrl = 'http://' + longUrl;
                }
                token = req.cookies.token;
                decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
                userId = decodedToken.userId;
                shortUrl = shortid_1.default.generate();
                return [4 /*yield*/, urlService.createUrl(longUrl, shortUrl, userId)];
            case 2:
                url = _a.sent();
                res.redirect('/');
                return [2 /*return*/, res.status(201)];
            case 3:
                error_1 = _a.sent();
                console.error('Error shortening URL:', error_1);
                return [2 /*return*/, res.status(500).json({ error: 'Internal server error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.shortenUrl = shortenUrl;
var createCustomUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, longUrl, customAlias, token, decodedToken, userId, url, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, longUrl = _a.longUrl, customAlias = _a.customAlias;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                // Validate the input URL and custom alias
                if (!longUrl || !customAlias) {
                    return [2 /*return*/, res.status(400).json({ error: 'Long URL and Custom Alias are required' })];
                }
                token = req.cookies.token;
                decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
                userId = decodedToken.userId;
                return [4 /*yield*/, urlService.createUrl(longUrl, customAlias, userId)];
            case 2:
                url = _b.sent();
                res.redirect('/');
                return [2 /*return*/, res.status(201)];
            case 3:
                error_2 = _b.sent();
                console.error('Error creating custom URL:', error_2);
                return [2 /*return*/, res.status(500).json({ error: 'Internal server error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createCustomUrl = createCustomUrl;
// Controller function for generating QR code for URL
var generateQRCodeForUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var shortUrl, qrCode, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shortUrl = req.params.shortUrl;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, qrcode_1.default.toDataURL(shortUrl)];
            case 2:
                qrCode = _a.sent();
                // Send the QR code image in the response
                res.type('png').send(Buffer.from(qrCode.split(',')[1], 'base64'));
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error('Error generating QR code:', error_3);
                return [2 /*return*/, res.status(500).json({ error: 'Internal server error' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.generateQRCodeForUrl = generateQRCodeForUrl;
// Redirect endpoint
var redirectToLongUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var shortUrl, url, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                shortUrl = req.params.shortUrl;
                return [4 /*yield*/, urlService.getUrlByShortUrl(shortUrl)];
            case 1:
                url = _a.sent();
                if (!url) return [3 /*break*/, 3];
                url.clicks++;
                return [4 /*yield*/, url.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.redirect(url.longUrl)];
            case 3: return [2 /*return*/, res.status(404).json('Not found')];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.error(err_1);
                return [2 /*return*/, res.status(500).json('Server Error')];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.redirectToLongUrl = redirectToLongUrl;
