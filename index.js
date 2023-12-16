"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost:5173', 'https://ivy-psi.vercel.app'];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Vérifie si l'origine de la requête est dans la liste des origines autorisées
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(3002, () => {
    console.log('http://localhost:3002');
});
