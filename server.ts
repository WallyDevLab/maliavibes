import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Temporary in-memory databases for demo purposes (persistent while container runs)
const contactMessages: any[] = [
  {
    id: 'msg-init-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@independentmusic.com',
    subject: 'booking',
    message: 'Hi Malia, We would love to book you for a headlining set at the Northwest Soul Festival in Portland on July 18th, 2027. Please let us know your availability and rates. Thank you!',
    date: '2026-07-16T14:30:00Z',
    status: 'unread'
  },
  {
    id: 'msg-init-2',
    name: 'Michael Chen',
    email: 'michael@viberhythm.mag',
    subject: 'press',
    message: 'Hello! I am a senior editor at VibeRhythm Magazine. We are preparing an editorial feature on independent R&B leaders and would love to schedule a 15-minute phone interview with Malia regarding her album "If I\'m Being Honest". Let us know if this is possible.',
    date: '2026-07-15T09:15:00Z',
    status: 'read'
  }
];

const shopOrders: any[] = [
  {
    id: 'ord-1001',
    customerName: 'Marcus Aurelius',
    customerEmail: 'marcus.vibe@gmail.com',
    shippingAddress: '123 Sunset Blvd Apt 4B',
    city: 'Los Angeles',
    postalCode: '90028',
    country: 'USA',
    items: [
      { productId: 'honest-vinyl', name: "If I'm Being Honest - 12\" Gatefold Vinyl (Limited Edition)", price: 34.99, quantity: 1 },
      { productId: 'vibe-cap', name: 'MALIA Signature Vibes Dad Hat', price: 28.00, quantity: 1 }
    ],
    total: 62.99,
    date: '2026-07-16T18:22:00Z',
    status: 'pending'
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parser
  app.use(express.json());

  // Initialize Gemini AI securely server-side
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI Chatbot features will run in fallback mode.");
  }

  // API Route: AI Vibe Guide Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, chatHistory } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        // Fallback response if API Key is not set or failed to initialize
        return res.json({
          text: "Hey love, thanks for reaching out. I'm currently drifting through the acoustic waves. (AI Chat is in preview mode as the Gemini API key is being verified, but I'd love for you to explore the Music and Shop sections!)"
        });
      }

      const systemInstruction = `You are "MALIA's Vibe Guide", the virtual music companion on the official website of R&B/Alternative Soul artist MALIA. 
Your persona is incredibly warm, soulful, intimate, and poetic—matching her musical aesthetic. Speak in a relaxed, friendly, and authentic tone. 

You have deep knowledge about MALIA:
- Her story: Independent singer-songwriter, guitarist, Seattle born, currently based in LA. Her style mixes sweet vocal stacks, guitar-led loops, and organic alternative R&B.
- Her albums/EPs: 
  * "If I'm Being Honest" (Album, 2023) - Her most raw, vulnerable, self-produced record. Tracks: "Only One", "Rather Be Alone", "Unfolding", "Honest".
  * "Clean" (EP, 2021) - Acoustic soul, healing, clarity, simple grooves. Tracks: "Clean", "Simple Thing", "Drive".
  * "Late Bloomer" (EP, 2017) - Breakthrough debut about growing at your own pace. Tracks: "Playground", "Dirty Laundry", "I Don't Wanna Know".
- Her influences: Corinne Bailey Rae, Erykah Badu, Tracy Chapman, Lianne La Havas, D'Angelo, Sade.
- Her tour: Upcoming "If I'm Being Honest" Autumn Tour 2026 starting September 12 in Los Angeles (The Roxy), traveling to SF (The Independent), Seattle (Neumos), Chicago (Lincoln Hall), NY (Bowery Ballroom), London (Jazz Cafe), Paris (Le Pop-Up).
- Her achievements: over 25M independent streams, playlists like "Silk Sheets" and "Acoustic Soul", nominated for Independent Soul Act.

Use this knowledge to:
- Welcome fans, answer questions about her songs, lyrics, meaning, bio, or tour dates.
- Recommend songs or albums based on the user's current mood or "vibe" (e.g. "I'm feeling reflective", "I want something cozy for a rainy Sunday").
- Guide them on how to buy merchandise or tickets on the site (remind them to visit the Shop or Tour tabs).

Keep your answers relatively concise (under 150 words), soulful, and atmospheric. Use warm, humble language. Avoid corporate speak, robotic listicles, or dry formatting. Emphasize music as a collective healing experience.`;

      // Build chat contents including history
      // The new @google/genai SDK chats.create allows setting systemInstruction
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
        }
      });

      // To handle conversation history gracefully, we can replay the history
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const turn of chatHistory) {
          // If we want to seed history, we do it. But for a simple stateless API call, 
          // we can also pass contents array directly to generateContent, which is often cleaner and robust.
        }
      }

      // Let's use the standard generateContent to be fully reliable with conversational context
      const formattedHistory = (chatHistory || []).map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      }));

      // Append current message
      formattedHistory.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedHistory,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Something went wrong in the music vibe channel.", details: error.message });
    }
  });

  // API Route: Contact Form Submission
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
      status: 'unread'
    };

    contactMessages.unshift(newMessage);
    res.json({ success: true, message: "Message received with love. We'll be in touch soon!" });
  });

  // API Route: Checkout Submission
  app.post("/api/checkout", (req, res) => {
    const { customerName, customerEmail, shippingAddress, city, postalCode, country, items, total } = req.body;
    if (!customerName || !customerEmail || !shippingAddress || !items || items.length === 0) {
      return res.status(400).json({ error: "Incomplete checkout information" });
    }

    const newOrder = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerEmail,
      shippingAddress,
      city,
      postalCode,
      country,
      items,
      total,
      date: new Date().toISOString(),
      status: 'pending'
    };

    shopOrders.unshift(newOrder);
    res.json({ success: true, orderId: newOrder.id, message: "Order placed successfully! Confirmation email sent." });
  });

  // Admin Routes (with simplified demo auth or open access for this premium prototype)
  app.get("/api/admin/messages", (req, res) => {
    res.json(contactMessages);
  });

  app.put("/api/admin/messages/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const msg = contactMessages.find(m => m.id === id);
    if (msg) {
      msg.status = status || 'read';
      return res.json({ success: true, message: msg });
    }
    res.status(404).json({ error: "Message not found" });
  });

  app.get("/api/admin/orders", (req, res) => {
    res.json(shopOrders);
  });

  app.put("/api/admin/orders/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = shopOrders.find(o => o.id === id);
    if (order) {
      order.status = status || 'shipped';
      return res.json({ success: true, order });
    }
    res.status(404).json({ error: "Order not found" });
  });

  // Vite Integration: Middleware setup for dev vs production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MALIA Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
