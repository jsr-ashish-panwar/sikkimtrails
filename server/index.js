import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import Package from './models/Package.js';
import Booking from './models/Booking.js';
import HelpRequest from './models/HelpRequest.js';
import Experience from './models/Experience.js';
import Itinerary from './models/Itinerary.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
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
    
    // Function to call Gemini with a simple retry for 503/429
    const callGeminiWithRetry = async (prompt, maxRetries = 3) => {
      let lastError;
      for (let i = 0; i <= maxRetries; i++) {
        try {
          // gemini-2.5-flash is an experimental high-speed model that worked earlier
          console.log(`[AI REQUEST] Attempt ${i + 1} using gemini-2.5-flash...`);
          const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash" 
          }, { 
            apiVersion: "v1beta" 
          });
          const result = await model.generateContent(prompt);
          return result.response.text();
        } catch (error) {
          lastError = error;
          const isRetryable = error.message?.includes('503') || error.message?.includes('429');
          console.error(`Gemini Attempt ${i + 1} Error:`, error.message);
          if (isRetryable && i < maxRetries) {
            console.log(`[RETRYING] Gemini Busy (Attempt ${i + 1}/${maxRetries}). Waiting 2s...`);
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            continue;
          }
          throw error;
        }
      }
    };

    const combinedPrompt = `${SYSTEM_PROMPT}\n\nUser Language: ${language || 'English'}\nUser: ${message}\nSaarthi:`;
    const responseText = await callGeminiWithRetry(combinedPrompt);
    
    res.json({ reply: responseText });
  } catch (error) {
    console.error('--- Gemini API Error Details ---');
    console.error(error);
    
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

// Experiences CRUD
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/experiences', async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/experiences/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Itineraries CRUD
app.get('/api/itineraries', async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/itineraries', async (req, res) => {
  try {
    const newItinerary = new Itinerary(req.body);
    const savedItinerary = await newItinerary.save();
    res.status(201).json(savedItinerary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/itineraries/:id', async (req, res) => {
  try {
    await Itinerary.findByIdAndDelete(req.params.id);
    res.json({ message: 'Itinerary deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Authentication Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: { name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ 
      message: 'Login successful', 
      user: { 
        id: user._id,
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
