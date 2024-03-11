"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var urlRoutes_1 = __importDefault(require("./routes/urlRoutes"));
var app = (0, express_1.default)();
// Middleware for parsing JSON bodies
app.use(express_1.default.json());
// Define base URL for the routes
app.use('/api/url', urlRoutes_1.default);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
