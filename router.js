"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rssWatch_1 = __importDefault(require("./controllers/rssWatch"));
const router = express_1.default.Router();
// Exemple de route GET
router.get('/fetch-rss', rssWatch_1.default.getRss);
// Ajoutez d'autres routes selon vos besoins...
exports.default = router;
