import { Request, Response } from 'express';
import axios from 'axios';
import { parseString } from 'xml2js';

interface RssWatch {
    getRss: (req: Request, res: Response) => Promise<void>;
    languages: string[];
}

const rssWatch: RssWatch = {

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

    getRss: async (req, res) => {
        try {
            const itemsArray: { title: string, link: string, pub: Date, lang: string, status: string }[] = [];
    
            for (const language of rssWatch.languages) {
                const response = await axios.get(`http://${language}.developpez.com/index/rss`, {
                    responseType: 'text'
                });
    
                parseString(response.data, (err, result) => {
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
                            } else {
                                itemsArray.push({ title, pub, link, lang, status: 'old' });
                            }
                        }
                    }
                });
            }

            // Trier le tableau par date la plus récente
            itemsArray.sort((a, b) => b.pub.getTime() - a.pub.getTime());
    
            res.json(itemsArray);
        } catch (error) {
            res.status(500).send('Erreur lors de la récupération du flux RSS');
        }
    }
};


export default rssWatch