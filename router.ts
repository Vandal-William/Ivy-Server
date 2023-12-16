import express from 'express';
import rssWatch from './controllers/rssWatch';
import user from './controllers/user';

const router = express.Router();

// Exemple de route GET
router.get('/fetch-rss', rssWatch.getRss);
router.post('/connect', user.connectUser);



// Ajoutez d'autres routes selon vos besoins...

export default router;
