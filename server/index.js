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
  console.log(`[CHAT REQUEST] ${new Date().toISOString()} - Message: ${req.body.message?.substring(0, 50)}...`);
  try {
    const { message, language } = req.body;
    
    // Using v1beta as systemInstruction is a beta feature. 
    // gemini-2.5-flash is confirmed to work with this API key.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT
    }, { 
      apiVersion: "v1beta" 
    });
    
    const userContext = `User Language: ${language || 'English'}\nUser: ${message}`;
    const result = await model.generateContent(userContext);
    const responseText = result.response.text();
    
    res.json({ reply: responseText });
  } catch (error) {
    console.error('Gemini Error Details:', error);
    
    const msgLower = req.body.message?.toLowerCase() || "";
    let fallbackText = "";

    // Check for API Key or Demand issues
    const isApiError = error.message?.includes('API_KEY_INVALID') || error.message?.includes('API Key not found');
    const isOverload = error.message?.includes('503') || error.message?.includes('429');

    if (isApiError || isOverload) {
      if (msgLower.includes('food') || msgLower.includes('dish')) {
         fallbackText = "🍲 **Local Sikkim Cuisine Guide**:\n\n• **Momos**: A staple street food—steamed or fried dumplings.\n• **Thukpa**: Noodle soup with vegetables/meat, perfect for Gangtok's weather.\n• **Phagshapa**: Pork fat stewed with radish and dried chilies.\n\nEnjoy these local delicacies!";
      } else if (msgLower.includes('package') || msgLower.includes('tour')) {
         fallbackText = "🏔️ **Explore Sikkim Tours**:\n\nI can help you find the best journey! Check out our current available packages here: [SHOW_PACKAGES]";
      } else if (msgLower.includes('monaster') || msgLower.includes('rumtek') || msgLower.includes('enchey')) {
         fallbackText = "📍 **Monastery Guide**:\n\n• **Rumtek Monastery**: The largest in Sikkim, seat of the Karmapa.\n• **Enchey Monastery**: Built on a site blessed by Lama Drupthob Karpo.\n\nDon't forget that for restricted areas like **Tsomgo Lake** or **Nathu La**, you will need a **RAP/PAP** (Permit) ready before travel!";
      } else if (msgLower.includes('emergency') || msgLower.includes('help')) {
         fallbackText = "⚠️ I see you need assistance. Please stay calm. Here is the direct line for the **Tourist Police**: [SHOW_EMERGENCY]";
      } else {
         if (isApiError) {
           fallbackText = "Namaste! I am Saarthi. It looks like my AI key is currently invalid. However, I can still assist you with information regarding **local food**, **tour packages**, **monasteries**, or **emergency help**! What would you like to know?";
         } else {
           fallbackText = "Namaste! My AI connection is currently under high demand. Please try again in a few moments, or ask me about **food**, **monasteries**, or **packages** for a quick local answer!";
         }
      }
      res.json({ reply: fallbackText });
    } else {
      res.json({ reply: `I encountered an issue connecting to my AI brain. Detail: ${error.message || 'Unknown Error'}` });
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
