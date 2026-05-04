import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Navigation, Wallet, ExternalLink, ShieldAlert, PhoneCall, Sparkles } from 'lucide-react';
import { adminStorage } from '../utils/adminStorage';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  type: 'user' | 'bot';
  content: string | React.ReactNode;
  timestamp: Date;
}

interface ChatbotProps {
  currentLanguage: string;
  isOpen: boolean;
  onClose: () => void;
  theme: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ currentLanguage, isOpen, onClose, theme }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Hello! I am Saarthi. How can I assist you with your Sikkim trip today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (currentLanguage !== 'English' && messages.length === 1) {
       // Optional: Could trigger translating the greeting on language change,
       // but for simplicity, we let the user start typing.
    }
  }, [currentLanguage]);

  const getBotResponse = async (userMessage: string): Promise<Message> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, language: currentLanguage })
      });
      const data = await response.json();
      
      let reply: string = data.reply || "I couldn't process that request.";
      let showPackages = false;
      let showEmergency = false;

      // Extract special tokens injected by our strong Gemini system prompt
      if (reply.includes('[SHOW_PACKAGES]')) {
         showPackages = true;
         reply = reply.replace('[SHOW_PACKAGES]', '').trim();
      }
      if (reply.includes('[SHOW_EMERGENCY]')) {
         showEmergency = true;
         reply = reply.replace('[SHOW_EMERGENCY]', '').trim();
      }

      return {
        type: 'bot',
        timestamp: new Date(),
        content: (
          <div className="space-y-3">
             <div className={`whitespace-pre-wrap text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'}`}>{reply}</div>
             
             {showPackages && (
                <div className={`mt-4 p-3 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-green-50/50 border-green-100'}`}>
                  <div className="flex items-center text-green-700 font-bold mb-2">
                    <Wallet className="h-4 w-4 mr-2" />
                    <span className="text-xs uppercase">Available Tour Packages</span>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                    {adminStorage.getPackages().length > 0 ? (
                      adminStorage.getPackages().map((p, i) => (
                        <div key={i} className={`p-2.5 rounded-lg border flex justify-between items-center shadow-sm transition-colors ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-green-100'}`}>
                          <div>
                            <span className={`block text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'}`}>{p.title}</span>
                            <span className={`text-[10px] ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>{p.duration}</span>
                          </div>
                          <div className="text-right">
                            <span className="block text-xs font-bold text-green-700">{p.price}</span>
                            <button className="text-[10px] bg-green-600 text-white px-2 py-1 rounded-md mt-1 hover:bg-green-700 transition-colors">Book Now</button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-gray-500 italic">No special packages found at the moment. Try our standard tours!</div>
                    )}
                  </div>
                </div>
             )}

             {showEmergency && (
                <div className={`mt-4 p-4 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-red-950/20 border-red-900/40' : 'bg-red-50 border-red-100'}`}>
                  <div className={`flex items-center font-bold mb-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <ShieldAlert className="h-5 w-5 mr-2" />
                    <span>EMERGENCY HELPLINE</span>
                  </div>
                  <div className={`flex align-center justify-between px-4 py-3 border rounded-lg shadow-sm ${theme === 'dark' ? 'bg-slate-800 border-red-900/40' : 'bg-white border-red-200'}`}>
                    <div className="flex items-center">
                       <Navigation className="h-5 w-5 text-red-600 mr-3" />
                       <span className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'}`}>Tourist Police</span>
                    </div>
                    <a href="tel:1097" className="flex items-center bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors">
                      <PhoneCall className="h-4 w-4 mr-1 text-red-700" />
                      <span className="text-sm font-black tracking-widest">1097</span>
                    </a>
                  </div>
                </div>
             )}
          </div>
        )
      };
    } catch (error: any) {
      console.error("Saarthi Backend Error, attempting Frontend AI fallback...");
      
      const frontendApiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (frontendApiKey) {
        try {
          const genAI = new GoogleGenerativeAI(frontendApiKey);
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const prompt = `Identity: Saarthi (Sikkim AI Guide). You are running in FRONTEND FALLBACK mode.
          Knowledge: Sikkim travel, monasteries, food, permits.
          User: ${userMessage}
          Saarthi:`;
          
          const result = await model.generateContent(prompt);
          const text = result.response.text();
          
          return {
            type: 'bot',
            timestamp: new Date(),
            content: (
              <div className="space-y-2">
                <div className="flex items-center text-[10px] text-orange-500 font-bold mb-1">
                   <Sparkles className="h-3 w-3 mr-1" />
                   SATELLITE LINK ACTIVE
                </div>
                <p>{text}</p>
              </div>
            )
          };
        } catch (fe) {
          console.error("Frontend AI also failed:", fe);
        }
      }

      // Final local fallback if all AI fails
      const msgLower = userMessage.toLowerCase();
      let localReply = "Namaste! I'm currently operating in a low-connectivity zone of the Himalayas. ";

      if (msgLower.includes('food') || msgLower.includes('eat')) {
        localReply += "I can tell you that Sikkim is famous for Momos, Thukpa, and Phagshapa. You should also try the local tea!";
      } else if (msgLower.includes('monaster') || msgLower.includes('place') || msgLower.includes('visit')) {
        localReply += "I highly recommend Rumtek Monastery and the giant Guru Rinpoche statue in Namchi.";
      } else if (msgLower.includes('package') || msgLower.includes('tour') || msgLower.includes('price')) {
        localReply += "We have several spiritual packages available. [SHOW_PACKAGES]";
      } else if (msgLower.includes('emergency') || msgLower.includes('help') || msgLower.includes('police')) {
        localReply += "For any emergency, please call the Tourist Police at 1097. [SHOW_EMERGENCY]";
      } else {
        localReply += "I can still help you with information about food, monasteries, or tours! What would you like to know?";
      }

      return {
        type: 'bot',
        timestamp: new Date(),
        content: (
          <div className="space-y-2">
            <p>{localReply}</p>
            <div className="mt-2 p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg text-[10px] text-orange-800 dark:text-orange-300">
              Note: AI brain offline. Using local knowledge.
            </div>
            <button 
              onClick={async () => {
                try {
                  await adminStorage.saveHelpRequest({ 
                    name: 'Chatbot User', 
                    subject: 'Offline Query', 
                    message: userMessage 
                  });
                  alert('Your question has been saved locally! We will get back to you.');
                } catch (e) {
                  alert('Could not save at this time.');
                }
              }}
              className="mt-2 text-[10px] bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition-colors"
            >
              Save question for later
            </button>
          </div>
        )
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg: Message = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    const response = await getBotResponse(userMsg.content as string);
    setMessages(prev => [...prev, response]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full h-full sm:w-[420px] sm:h-[650px] sm:rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] border flex flex-col z-50 overflow-hidden transition-all duration-300 ${
      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-gray-900'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white p-6 pb-8 flex justify-between items-center shrink-0 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex items-center space-x-4 relative z-10">
          <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-xl border border-white/20 shadow-inner">
            <Bot className="h-7 w-7 text-white" />
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight text-white mb-0 leading-tight">Saarthi</h3>
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"></span>
              <p className="text-[10px] text-white/80 uppercase tracking-widest font-black">AI Gemini Guide</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-white hover:bg-white/20 p-2.5 rounded-full transition-all hover:rotate-90 relative z-10"><X className="h-6 w-6" /></button>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin rounded-t-[2.5rem] -mt-6 relative z-20 ${
        theme === 'dark' ? 'bg-slate-800/80' : 'bg-gray-50/80'
      }`}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {m.type === 'bot' && (
               <div className="w-9 h-9 bg-gradient-to-tr from-red-600 to-orange-500 rounded-2xl flex items-center justify-center mr-3 shrink-0 shadow-md">
                  <Bot className="h-5 w-5 text-white" />
               </div>
            )}
            <div className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-sm shadow-sm transition-all ${
              m.type === 'user' 
                ? 'bg-red-600 text-white rounded-br-none font-medium' 
                : `${theme === 'dark' ? 'bg-slate-700 border-slate-600 text-slate-200' : 'bg-white border-gray-200 text-gray-800'} border rounded-bl-none ring-4 ring-black/0 shadow-md`
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start items-center space-x-3">
            <div className="w-9 h-9 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="bg-white border border-gray-100 rounded-3xl px-6 py-3 shadow-sm animate-pulse flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className={`px-5 py-3 backdrop-blur-md flex flex-wrap gap-2 border-t overflow-x-auto scrollbar-hide max-h-32 ${
        theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-100'
      }`}>
        {[
          { l: '🗺️ Local Food', q: 'What are the famous local dishes in Sikkim?' },
          { l: '🚠 Tour Packages', q: 'What are the available tour packages right now?' },
          { l: '🚑 Emergency', q: 'I need emergency police help!' },
          { l: '🌄 Best Monasteries', q: 'Tell me about the best monasteries to visit.' }
        ].map((btn, i) => (
          <button 
            key={i} 
            onClick={() => { setInputMessage(btn.q); setTimeout(handleSendMessage, 50); }} 
            className={`text-[10px] whitespace-nowrap border px-4 py-2.5 rounded-2xl transition-all active:scale-95 shadow-sm font-bold tracking-tight ${
              theme === 'dark' 
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-red-500 hover:text-red-400 hover:bg-red-900/20' 
                : 'bg-white border-gray-200 text-gray-700 hover:border-red-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            {btn.l}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className={`p-5 border-t relative ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
        <div className={`flex items-center rounded-[2rem] p-1.5 focus-within:ring-2 focus-within:ring-red-500/20 transition-all border ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your Gemini Saarthi..."
            className={`flex-1 bg-transparent border-none px-5 py-2.5 text-sm focus:outline-none font-medium ${
              theme === 'dark' ? 'text-slate-100 placeholder:text-slate-500' : 'text-gray-800 placeholder:text-gray-400'
            }`}
          />
          <button 
            onClick={handleSendMessage} 
            disabled={!inputMessage.trim()}
            className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700 disabled:bg-gray-300 shadow-md transition-all active:scale-95 disabled:shadow-none"
          >
            <Send className="h-5 w-5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;