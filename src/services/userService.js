"use strict";
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
exports.authenticateWithCookies = exports.authenticateUser = exports.registerUser = void 0;
// src/services/userService.ts
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userModel_1 = require("../models/userModel");
var saltRounds = 10;
var secretKey = 'fv9rh293skiwsv'; // Replace with a secure secret key
// Function to register a new user
var registerUser = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword, newUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, bcrypt_1.default.hash(userData.password, saltRounds)];
            case 1:
                hashedPassword = _a.sent();
                newUser = new userModel_1.User({
                    username: userData.username,
                    email: userData.email,
                    password: hashedPassword,
                });
                return [4 /*yield*/, newUser.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, newUser];
            case 3:
                error_1 = _a.sent();
                throw new Error('Error registering user');
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
// Function to authenticate a user
var authenticateUser = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var user, passwordMatch, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, userModel_1.User.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('User not found');
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                passwordMatch = _a.sent();
                if (!passwordMatch) {
                    throw new Error('Incorrect password');
                }
                // Generate an authentication token
                if (!secretKey) {
                    throw new Error('Secret key not defined');
                }
                token = jsonwebtoken_1.default.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
                return [2 /*return*/, { user: user, token: token }];
            case 3:
                error_2 = _a.sent();
                throw new Error('Authentication failed');
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.authenticateUser = authenticateUser;
var authenticateWithCookies = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        try {
            token = req.cookies.token;
            if (!token) {
                return [2 /*return*/, res.render('login')];
            }
            jsonwebtoken_1.default.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        return res.redirect('/login');
                    }
                    else {
                        res.redirect('/login');
                    }
                }
                req.userId = decoded.userId;
                next();
            });
        }
        catch (error) {
            console.error('Error in authentication middleware:', error);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error' })];
        }
        return [2 /*return*/];
    });
}); };
exports.authenticateWithCookies = authenticateWithCookies;
