import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MapPin, ShieldAlert, Thermometer, Briefcase, Info, PhoneCall, Sparkles } from 'lucide-react';

type LangKey = 'English' | 'हिंदी' | 'नेपाली' | 'འབྲུག་ཁ';

interface Message {
  type: 'user' | 'bot';
  content: string | React.ReactNode;
  timestamp: Date;
  intent?: string;
}

interface ChatbotProps {
  currentLanguage: string;
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ currentLanguage, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage();
      setMessages([{ type: 'bot', content: welcomeMessage, timestamp: new Date() }]);
    }
  }, [isOpen]);

  const getWelcomeMessage = () => {
    const greetings: Record<LangKey, string> = {
      English: "Namaste! I'm Saarthi, your spiritual and logistical guide. I can help with monastery history, travel routes, packing lists, and safety. What's on your mind today?",
      हिंदी: "नमस्ते! मैं सारथी हूं। मैं मठ के इतिहास, यात्रा मार्गों और सुरक्षा में मदद कर सकता हूं। आज आप क्या जानना चाहते हैं?",
      नेपाली: "नमस्ते! म सारथी हुँ। तपाईंको यात्राको लागि म कसरी मद्दत गर्न सक्छु?",
      "འབྲུག་ཁ": "བཀྲ་ཤིས་བདེ་ལེགས! ང་སཱར་ཐི་ཨིན་ ཁྱོད་ཀྱི་སི་ཀིམ་འགྲུལ་བསྐྱོད་ཀྱི་ལམ་སྟོན་པ་ཨིན།"
    };
    return greetings[currentLanguage as LangKey] || greetings.English;
  };

  const getBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    const l = currentLanguage as LangKey;
    const timestamp = new Date();

    // Emergency Intent
    if (lowerMessage.includes('emergency') || lowerMessage.includes('help') || lowerMessage.includes('police') || lowerMessage.includes('hospital')) {
      return {
        type: 'bot',
        timestamp,
        content: (
          <div className="space-y-3">
            <div className="flex items-center text-red-600 font-bold mb-2">
              <ShieldAlert className="h-5 w-5 mr-2" />
              <span>EMERGENCY CONTACTS</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <a href="tel:112" className="flex items-center justify-between bg-red-50 p-2 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
                <span className="text-sm font-medium">General Emergency</span>
                <PhoneCall className="h-4 w-4 text-red-600" />
              </a>
              <a href="tel:1097" className="flex items-center justify-between bg-red-50 p-2 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
                <span className="text-sm font-medium">Tourist Police</span>
                <PhoneCall className="h-4 w-4 text-red-600" />
              </a>
              <a href="tel:102" className="flex items-center justify-between bg-red-50 p-2 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
                <span className="text-sm font-medium">Ambulance</span>
                <PhoneCall className="h-4 w-4 text-red-600" />
              </a>
            </div>
          </div>
        )
      };
    }

    // Distance/Time Intent
    if (lowerMessage.includes('distance') || lowerMessage.includes('far') || lowerMessage.includes('how long') || lowerMessage.includes('route')) {
      const distances = [
        { route: 'Gangtok to Rumtek', d: '24km', t: '1h' },
        { route: 'Gangtok to Pelling', d: '115km', t: '4.5h' },
        { route: 'Gangtok to Lachung', d: '110km', t: '6h' },
        { route: 'Gangtok to Ravangla', d: '65km', t: '2.5h' }
      ];
      
      return {
        type: 'bot',
        timestamp,
        content: (
          <div className="space-y-2">
            <div className="flex items-center text-blue-600 font-bold mb-1">
              <MapPin className="h-4 w-4 mr-2" />
              <span>TRAVEL ROUTES</span>
            </div>
            {distances.map((dist, i) => (
              <div key={i} className="flex justify-between text-xs border-b border-gray-100 py-1">
                <span className="text-gray-600 font-medium">{dist.route}</span>
                <span className="font-bold">{dist.d} ({dist.t})</span>
              </div>
            ))}
            <p className="text-[10px] text-gray-400 mt-2 italic">*Times are estimates based on hill road conditions.</p>
          </div>
        )
      };
    }

    // Packing Intent
    if (lowerMessage.includes('pack') || lowerMessage.includes('clothes') || lowerMessage.includes('checklist')) {
      return {
        type: 'bot',
        timestamp,
        content: (
          <div className="space-y-2">
            <div className="flex items-center text-orange-600 font-bold mb-1">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>PACKING ESSENTIALS</span>
            </div>
            <ul className="text-xs space-y-1 text-gray-700">
              <li className="flex items-center"><Sparkles className="h-3 w-3 text-orange-400 mr-2" /> Layered clothing (Thermal/Fleece)</li>
              <li className="flex items-center"><Sparkles className="h-3 w-3 text-orange-400 mr-2" /> Sturdy walking/hiking shoes</li>
              <li className="flex items-center"><Sparkles className="h-3 w-3 text-orange-400 mr-2" /> Sunscreen & Lip balm (High UV)</li>
              <li className="flex items-center"><Sparkles className="h-3 w-3 text-orange-400 mr-2" /> Raincoat or umbrella (Sudden rain)</li>
              <li className="flex items-center"><Sparkles className="h-3 w-3 text-orange-400 mr-2" /> Personal medicine for altitude</li>
            </ul>
          </div>
        )
      };
    }

    // Weather Intent
    if (lowerMessage.includes('weather') || lowerMessage.includes('cold') || lowerMessage.includes('season')) {
      return {
        type: 'bot',
        timestamp,
        content: (
          <div className="space-y-2">
            <div className="flex items-center text-cyan-600 font-bold mb-1">
              <Thermometer className="h-4 w-4 mr-2" />
              <span>WEATHER ADVISORY</span>
            </div>
            <p className="text-xs text-gray-700">Current season in Sikkim is ideal. Expect 10°C to 20°C in Gangtok, but sub-zero temperatures in North Sikkim.</p>
            <div className="bg-cyan-50 p-2 rounded-lg text-[10px] text-cyan-800 border border-cyan-100">
              <strong>Tip:</strong> Always carry a heavy jacket even in summer if you're visiting high-altitude lake areas!
            </div>
          </div>
        )
      };
    }

    // Etiquette Intent
    if (lowerMessage.includes('etiquette') || lowerMessage.includes('respect') || lowerMessage.includes('rules') || lowerMessage.includes('how to behave')) {
      return {
        type: 'bot',
        timestamp,
        content: (
          <div className="space-y-2">
            <div className="flex items-center text-purple-600 font-bold mb-1">
              <Info className="h-4 w-4 mr-2" />
              <span>MONASTERY RULES</span>
            </div>
            <ul className="text-xs space-y-1 text-gray-700">
              <li className="flex items-start">✅ Remove shoes before entering shrines.</li>
              <li className="flex items-start">✅ Walk clockwise around sacred sites.</li>
              <li className="flex items-start">✅ Photography often allowed outside, not inside.</li>
              <li className="flex items-start">✅ Keep silence and dress modestly.</li>
            </ul>
          </div>
        )
      };
    }

    // Permit Intent
    if (lowerMessage.includes('permit') || lowerMessage.includes('rap')) {
      return {
        type: 'bot',
        timestamp,
        content: l === 'हिंदी' ? 'सिक्किम के लिए RAP/PAP परमिट आवश्यक हैं। आप उन्हें ऑनलाइन या रंगपो चेकपोस्ट पर प्राप्त कर सकते हैं।' : 
               'RAP/PAP permits are required for Sikkim. You can get them online or at Rangpo checkpost. Foreign nationals need an Inner Line Permit (ILP).'
      };
    }
    
    // Default fallback
    return {
      type: 'bot',
      timestamp,
      content: l === 'हिंदी' ? 'मैं इसके बारे में और जान रहा हूँ। आप दूरी, मौसम या इमरजेंसी के बारे में पूछ सकते हैं।' : 
             "I'm Saarthi, your digital travel companion. Ask me about distances, weather, what to pack, or monastery etiquette!"
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg: Message = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(inputMessage);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full h-full sm:w-[400px] sm:h-[600px] bg-white sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col z-50 overflow-hidden text-gray-900 transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white p-5 flex justify-between items-center shrink-0 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight text-white mb-0">Saarthi Digital Guide</h3>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <p className="text-[10px] opacity-90 uppercase tracking-widest font-bold">Online & Ready</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"><X className="h-6 w-6" /></button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scrollbar-thin">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            {m.type === 'bot' && (
               <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2 shrink-0">
                  <Bot className="h-4 w-4 text-red-600" />
               </div>
            )}
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
              m.type === 'user' 
                ? 'bg-red-600 text-white rounded-br-none' 
                : 'bg-white border border-gray-100 rounded-bl-none text-gray-800'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="bg-white border border-gray-100 rounded-full px-4 py-2 animate-pulse text-xs text-gray-400">Saarthi is thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-4 py-2 bg-white/50 flex flex-wrap gap-2 border-t border-gray-100 overflow-x-auto no-scrollbar max-h-24">
        {[
          { l: '🚨 EMERGENCY', q: 'I need emergency help' },
          { l: '📍 Distances', q: 'Tell me travel distances' },
          { l: '🎒 Packing List', q: 'What to pack?' },
          { l: '📜 Rules', q: 'Monastery etiquette' },
          { l: '☁️ Weather', q: 'Sikkim weather' },
          { l: '🍛 Local Food', q: 'Food recommendations' }
        ].map((btn, i) => (
          <button 
            key={i} 
            onClick={() => { setInputMessage(btn.q); setTimeout(handleSendMessage, 50); }} 
            className="text-[10px] whitespace-nowrap bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-xl hover:border-red-600 hover:text-red-600 transition-all active:scale-95 shadow-sm font-semibold"
          >
            {btn.l}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your Saarthi..."
            className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
          />
          <button 
            onClick={handleSendMessage} 
            disabled={!inputMessage.trim()}
            className="bg-red-600 text-white rounded-xl px-4 py-3 hover:bg-red-700 disabled:bg-gray-200 shadow-lg transition-all active:scale-95"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;