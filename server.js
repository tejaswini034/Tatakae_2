import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Initialize Hugging Face client
const hf = new InferenceClient(process.env.HF_TOKEN);

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await hf.chatCompletion({
      provider: "featherless-ai", // ✅ required for this model
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        {
          role: "system",
          content:
            "You are Tatakae, a helpful and knowledgeable assistant created by students for a research chatbot project.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 1000,
    });

    // Extract the model's reply safely
    const reply =
      response?.choices?.[0]?.message?.content || "No response from model.";
    res.json({ reply });
  } catch (err) {
    console.error("❌ Hugging Face API error:", err);
    res.status(500).json({ reply: "Error generating response." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Tatakae backend running on http://localhost:${PORT}`);
});
