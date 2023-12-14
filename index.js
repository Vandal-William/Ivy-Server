const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors'); // Importez le module cors

app.use(cors());

app.get('/fetch-rss', async (req, res) => {
  try {
    const response = await axios.get('http://javascript.developpez.com/index/rss', {
      responseType: 'stream' // Indique à axios de retourner le contenu sous forme de flux
    });

    res.type('application/xml'); // Définit le type de contenu de la réponse comme XML
    response.data.pipe(res); // Redirige le contenu reçu de la requête externe vers la réponse du serveur
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération du flux RSS');
  }
});

app.listen(3002, () => {
  console.log('http://localhost:3002');
});
