import express from 'express';
import rssWatch from './controllers/rssWatch';

const router = express.Router();

// Exemple de route GET
router.get('/fetch-rss', rssWatch.getRss);


// Ajoutez d'autres routes selon vos besoins...

export default router;
