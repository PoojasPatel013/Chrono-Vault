import { Router } from 'express';
const router = Router();
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
router.post('/ai-session', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Prepare the prompt for Gemini
    const prompt = `You are a supportive and empathetic AI therapist. Respond to the following message from a client:
    
    Client: ${message}
    
    Provide a thoughtful and helpful response as a therapist would. Be empathetic, offer support, and suggest constructive ways to address any concerns or issues mentioned.`;

    // ✅ API Call to Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });

    console.log("✅ AI API Raw Response:", JSON.stringify(result, null, 2));

    // ✅ Corrected Response Extraction
    const response = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!response) {
      console.error("❌ AI Response Missing or Undefined");
      return res.status(500).json({ error: "Failed to generate AI response" });
    }

    res.json({ message: response });
  } catch (err) {
    console.error("❌ AI Session Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
