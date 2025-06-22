const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
const port = process.env.PORT; // ✅ pas de valeur par défaut ici

app.use(cors());
app.use(express.json());



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID,
});

app.get("/", (req, res) => {
  res.send("✅ Proxy OpenAI est en ligne.");
});

app.post("/gpt", async (req, res) => {
  try {
    const { model, messages, temperature } = req.body;

    const chat = await openai.chat.completions.create({
      model,
      messages,
      temperature: temperature || 0.7,
    });

    res.json(chat.choices[0].message);
  } catch (error) {
    console.error("❌ GPT error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Proxy GPT lancé sur le port ${port}`);
});
