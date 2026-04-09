import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import Package from './models/Package.js';
import Booking from './models/Booking.js';
import HelpRequest from './models/HelpRequest.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for Gemini
const SYSTEM_PROMPT = `Identity: Saarthi (Sikkim AI Guide).
Logic: High-speed, data-first response. 

INSTRUCTIONS:
- Bypass standard AI greetings. Deliver facts immediately.
- Priority: Local food (🍲), Permits (⚠️), and Monasteries (📍).
- If server load is detected (503), respond in short, impactful fragments.
- Formatting: Use Markdown bolding for places and bullet points for tours.

MANDATORY DATA: 
- Always mention RAP/PAP for Tsomgo/Nathu La.
- Direct non-Sikkim queries back to travel (e.g., "I'm focused on the Himalayas, let's talk about Sikkim travel...").

CRITICAL INSTRUCTIONS FOR UI:
1. If the user asks about booking, tours, or travel packages, you MUST append EXACTLY "[SHOW_PACKAGES]" at the end.
2. If the user asks for emergency help, police, or rescue, you MUST append EXACTLY "[SHOW_EMERGENCY]" at the end.`;

// Routes
// Gemini Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language } = req.body;
    
    // Explicitly target the stable 'v1' and '1.5-flash' with systemInstruction
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT
    }, { 
      apiVersion: "v1" 
    });
    
    // Just pass the user message natively since systemInstruction handles rules
    const userContext = `User Language: ${language || 'English'}\nUser: ${message}`;
    const result = await model.generateContent(userContext);
    const responseText = result.response.text();
    
    res.json({ reply: responseText });
  } catch (error) {
    console.error('Gemini Error:', error);
    
    const msgLower = req.body.message?.toLowerCase() || "";
    let fallbackText = "";

    // 503 or 429 means Google is overloaded or Quota exceeded. Give a high-quality fallback!
    if (error.message && (error.message.includes('503') || error.message.includes('429'))) {
      if (msgLower.includes('food') || msgLower.includes('dish')) {
         fallbackText = "Namaste! While my main AI brain is cooling down from high demand, I can definitely tell you about our food!\n\nHere are some famous local dishes in Sikkim you must try:\n• **Momos:** Steamed or fried dumplings with delicious fillings.\n• **Thukpa:** A hearty traditional noodle soup perfect for the chilly weather.\n• **Phagshapa:** A flavorful pork dish cooked with radish and chili.\n\nEnjoy your culinary journey!";
      } else if (msgLower.includes('package') || msgLower.includes('tour')) {
         fallbackText = "Namaste! My AI connection is slightly congested, but I am still here to help you plan your journey!\n\nHere are some of our best tour packages for exploring Sikkim: [SHOW_PACKAGES]";
      } else if (msgLower.includes('monaster') || msgLower.includes('place')) {
         fallbackText = "While my AI brain handles high demand, I can tell you that **Rumtek Monastery** and **Enchey Monastery** are absolute must-visits when in Gangtok! Do you need help with transport to these locations?";
      } else if (msgLower.includes('emergency') || msgLower.includes('help')) {
         fallbackText = "I see you need help. Here is the direct emergency line for the tourist police: [SHOW_EMERGENCY]";
      } else {
         fallbackText = "Namaste! As your local Saarthi guide, I'd love to help, but currently the AI system is experiencing high demand (Error 503). However, feel free to ask me specifically about **local food**, **tour packages**, **monasteries**, or **emergency assistance** and I will consult my local backup knowledge for you!";
      }
      res.json({ reply: fallbackText });
    } else {
      // Hardware/Network error or Invalid Key (400)
      const errorMessage = error.message || 'Unknown error occurred while contacting AI.';
      res.json({ reply: `I encountered an issue connecting to my AI brain. Detail: ${errorMessage}` });
    }
  }
});

// Packages CRUD
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/packages', async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/packages/:id', async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPackage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/packages/:id', async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bookings CRUD
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Help Requests CRUD
app.get('/api/help-requests', async (req, res) => {
  try {
    const requests = await HelpRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/help-requests', async (req, res) => {
  try {
    const newRequest = new HelpRequest(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/help-requests/:id', async (req, res) => {
  try {
    await HelpRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Help request deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
