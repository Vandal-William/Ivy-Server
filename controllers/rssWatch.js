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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const xml2js_1 = require("xml2js");
const rssWatch = {
    languages: [
        'ajax',
        'apache',
        'asp',
        'css',
        'dart',
        'flash',
        'javascript',
        'nodejs',
        'php',
        'ruby',
        'typescript',
        'web-semantique',
        'webmarketing',
        'xhtml'
    ],
    getRss: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const itemsArray = [];
            for (const language of rssWatch.languages) {
                const response = yield axios_1.default.get(`http://${language}.developpez.com/index/rss`, {
                    responseType: 'text'
                });
                (0, xml2js_1.parseString)(response.data, (err, result) => {
                    if (err) {
                        throw new Error('Erreur lors de l\'analyse XML');
                    }
                    if (result && result.rss && result.rss.channel && result.rss.channel[0] && result.rss.channel[0].item) {
                        const items = result.rss.channel[0].item;
                        for (const item of items) {
                            const title = item.title[0];
                            const link = item.link[0];
                            const pub = new Date(item.pubDate[0]); // Convertir la date en objet Date
                            const lang = language;
                            // Comparaison avec le mois actuel
                            const currentDate = new Date();
                            const currentYear = currentDate.getFullYear();
                            const currentMonth = currentDate.getMonth();
                            if (pub.getFullYear() === currentYear && pub.getMonth() === currentMonth) {
                                itemsArray.push({ title, pub, link, lang, status: 'new' });
                            }
                            else {
                                itemsArray.push({ title, pub, link, lang, status: 'old' });
                            }
                        }
                    }
                });
            }
            // Trier le tableau par date la plus récente
            itemsArray.sort((a, b) => b.pub.getTime() - a.pub.getTime());
            res.json(itemsArray);
        }
        catch (error) {
            res.status(500).send('Erreur lors de la récupération du flux RSS');
        }
    })
};
exports.default = rssWatch;
