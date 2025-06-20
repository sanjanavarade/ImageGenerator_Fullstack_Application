// routes/dalleRoutes.js
dotenv.config();
import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

const router = express.Router();

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers";
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

// GET Route
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from HuggingFace Stable Diffusion!' });
});

// POST Route
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("👉 Prompt Received:", prompt);
    console.log("👉 Hugging Face API Key present?", HF_API_KEY ? "✅ YES" : "❌ NO");

    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const contentType = response.headers.get('content-type');
    const statusCode = response.status;

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Hugging Face Error Response:", errorText);
      return res.status(500).json({ error: 'Failed Hugging Face response', detail: errorText });
    }

    if (contentType.includes('application/json')) {
      const errorJson = await response.json();
      console.error("❌ Got JSON instead of image:", errorJson);
      return res.status(500).json({ error: 'Unexpected JSON response', data: errorJson });
    }

    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    console.log("✅ Image generated successfully");

    res.status(200).json({ photo: base64Image });

  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ error: 'Something went wrong on server', message: error.message });
  }
});

export default router;

