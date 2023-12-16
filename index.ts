import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import cors from 'cors';
import router from './router';

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://ivy-psi.vercel.app'];

app.use(
  cors({
    origin: function (origin, callback) {
      // Vérifie si l'origine de la requête est dans la liste des origines autorisées
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(router);


app.listen(3002, () => {
  console.log('http://localhost:3002');
});
