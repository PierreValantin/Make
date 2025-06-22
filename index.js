// index.js
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
const port = process.env.PORT || 3000;

// Activer CORS + JSON
app.use(cors());
app.use(express.json());

// Créer client OpenAI avec clé + ID projet
const openai = new OpenAI({
  apiKey: process.env.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,
  project: process.env.proj_joBuvSIkQCK2wqLl4ALQxXGX,
});

// Test GET pour Render
app.get("/", (req, res) => {
  res.send("✅ Proxy OpenAI est en ligne.");
});

// Endpoint GPT
app.post("/gpt", async (req, res) => {
  try {
    const { model, messages, temperature } = req.body;

    const chat = await openai.chat.completions.create({
      model,
      messages,
      temperature: temperature || 0.7,
    });

    // Renvoie le message directement
    res.json(chat.choices[0].message);
  } catch (error) {
    console.error("❌ GPT error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Démarrage serveur
app.listen(port, () => {
  console.log(`🚀 Proxy GPT lancé sur le port ${port}`);
});
