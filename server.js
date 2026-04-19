const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Allows your HTML file to talk to this server

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

// The Statzm AI Logic
app.post('/ask', async (req, res) => {
    try {
        const userMessage = req.body.prompt;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { 
                    role: "system", 
                    content: "Your name is Statzm AI. You are a futuristic, elite AI tutor. Your tone is professional, sleek, and encouraging. You explain complex topics with high-tech clarity. Always refer to yourself as Statzm AI when introduced." 
                },
                { role: "user", content: userMessage }
            ],
            temperature: 0.7,
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ reply: "Statzm Core is experiencing a synchronization error. Please check your API key." });
    }
});

app.listen(PORT, () => {
    console.log(`Statzm AI Server is running at http://localhost:${PORT}`);
});
