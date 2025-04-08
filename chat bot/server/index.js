import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    res.json({ response });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
