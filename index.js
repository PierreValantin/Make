// proxy-openai-make.js
// Petit serveur proxy pour utiliser une clé OpenAI de type "sk-proj-..." depuis Make

// 1. Installer les dépendances : express + axios + dotenv
// Commande : npm install express axios dotenv

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/gpt', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${process.env.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}`,
          'Content-Type': 'application/json',
          'OpenAI-Project': process.env.proj_hUqS9RZhW1jw6uG7rvOIEZts
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erreur OpenAI :', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Erreur serveur proxy'
    });
  }
});

app.get('/', (req, res) => {
  res.send('Proxy OpenAI est en ligne.');
});

app.listen(port, () => {
  console.log(`Serveur proxy écoute sur le port ${port}`);
});
