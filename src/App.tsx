import React, { useState, useEffect } from 'react';
import { Mountain, MapPin, MessageCircle, X, Star, Camera, Phone, Mail, MapPin as LocationIcon, Clock, Heart, Award, Menu, Shield, Users, Sparkles, BookOpen, Music, Sun, Moon, LogOut } from 'lucide-react';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import '@google/model-viewer';
import ARModal from './components/ARModal';
import Packages from './components/Packages';
import AdminPanel from './components/Admin/AdminPanel';

// TypeScript declaration for model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean;
          'ar-modes'?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          'shadow-intensity'?: string;
          'ios-src'?: string;
        },
        HTMLElement
      >;
    }
  }
}

const translations = {
  English: {
    appName: 'SikkimTrails',
    tagline: 'Sacred Monasteries of Sikkim',
    heroTitle: 'Sacred Monasteries of Sikkim',
    heroSubtitle: 'Discover ancient wisdom, peaceful meditation, and spiritual enlightenment in the heart of the Himalayas.',
    beginJourney: 'Begin Spiritual Journey',
    exploreMonasteries: 'Explore Monasteries',
    nav: {
      home: 'Home',
      monasteries: 'Monasteries',
      spiritualJourney: 'Spiritual Journey',
      traditions: 'Buddhist Traditions',
      packages: 'Tour Packages',
      experiences: 'Experiences',
      about: 'About',
      contact: 'Contact',
    },
    monasteryShowcase: 'Sacred Monasteries',
    monasteryShowcaseSubtitle: 'Explore ancient Buddhist monasteries nestled in the Himalayan landscape',
    spiritualExperiences: 'Spiritual Experiences',
    spiritualExperiencesSubtitle: 'Immerse yourself in authentic Buddhist practices and Sikkimese culture',
    bookExperience: 'Book Experience',
    chatWithSaarthi: 'Chat with Saarthi!',
    monasteries: {
      rumtek: {
        name: 'Rumtek Monastery',
        description: 'The seat of the Gyalwang Karmapa, a masterpiece of Tibetan architecture.',
        location: 'Marchak, Sikkim'
      },
      enchey: {
        name: 'Enchey Monastery',
        description: 'Beautiful monastery overlooking Gangtok, established in 1909.',
        location: 'Gangtok, East Sikkim'
      },
      peman: {
        name: 'Pemayangtse Monastery',
        description: 'The premier monastery of the Nyingma tradition in West Sikkim.',
        location: 'Pelling, Sikkim'
      }
    },
    experiences: {
      meditation: 'Meditation Retreat',
      philosophy: 'Buddhist Philosophy',
      homestay: 'Monastery Homestay',
      crafts: 'Traditional Crafts'
    },
    footer: {
      description: 'Discover the sacred monasteries and spiritual heritage of Sikkim.',
      copyright: '© 2025 Sikkim Trails. All rights reserved.',
      ar: { viewInAr: 'View in AR' }
    }
  },
  हिंदी: {
    appName: 'घूमो इंडिया',
    tagline: 'सिक्किम के पवित्र मठ',
    heroTitle: 'सिक्किम के पवित्र मठ',
    heroSubtitle: 'हिमालय के हृदय में प्राचीन ज्ञान, शांतिपूर्ण ध्यान और आध्यात्मिक ज्ञान की खोज करें।',
    beginJourney: 'आध्यात्मिक यात्रा शुरू करें',
    exploreMonasteries: 'मठों का अन्वेषण करें',
    nav: {
      home: 'होम',
      monasteries: 'मठ',
      spiritualJourney: 'आध्यात्मिक यात्रा',
      traditions: 'बौद्ध परंपराएं',
      packages: 'टूर पैकेज',
      experiences: 'अनुभव',
      about: 'हमारे बारे में',
      contact: 'संपर्क'
    },
    monasteryShowcase: 'पवित्र मठ',
    monasteryShowcaseSubtitle: 'हिमालयी परिदृश्य में बसे प्राचीन बौद्ध मठों का अन्वेषण करें',
    spiritualExperiences: 'आध्यात्मिक अनुभव',
    spiritualExperiencesSubtitle: 'प्रामाणिक बौद्ध प्रथाओं और सिक्किमी संस्कृति में डूब जाएं',
    bookExperience: 'अनुभव बुक करें',
    chatWithSaarthi: 'सारथी के साथ चैट करें!',
    monasteries: {
      rumtek: { name: 'रुमटेक मठ', description: 'ग्यालवांग कर्मापा की सीट, तिब्बती वास्तुकला की एक उत्कृष्ट कृति।', location: 'मारचक, सिक्किम' },
      enchey: { name: 'एनचेय मठ', description: 'गंगटोक के ऊपर सुंदर मठ, 1909 में स्थापित।', location: 'गंगटोक, सिक्किम' },
      peman: { name: 'पेमायंगत्से मठ', description: 'पश्चिमी सिक्किम में न्यिंग्मा परंपरा का प्रमुख मठ।', location: 'पेलिंग, सिक्किम' }
    },
    experiences: { meditation: 'ध्यान साधना', philosophy: 'बौद्ध दर्शन', homestay: 'मठ होमस्टे', crafts: 'पारंपरिक शिल्प' },
    footer: { description: 'सिक्किम के पवित्र मठों और आध्यात्मिक विरासत की खोज करें।', copyright: '© 2025 सिक्किम ट्रेल्स। सर्वाधिकार सुरक्षित।', ar: { viewInAr: 'AR में देखें' } }
  },
  नेपाली: {
    appName: 'घुम्मो इन्डिया',
    tagline: 'सिक्किमका पवित्र गुम्बाहरू',
    heroTitle: 'सिक्किमका पवित्र गुम्बाहरू',
    heroSubtitle: 'हिमालयको मुटुमा प्राचीन ज्ञान, शान्तिपूर्ण ध्यान र आध्यात्मिक ज्ञानको खोज गर्नुहोस्।',
    beginJourney: 'आध्यात्मिक यात्रा सुरु गर्नुहोस्',
    exploreMonasteries: 'गुम्बाहरूको अन्वेषण गर्नुहोस्',
    nav: {
      home: 'घर',
      monasteries: 'गुम्बाहरू',
      spiritualJourney: 'आध्यात्मिक यात्रा',
      traditions: 'बौद्ध परम्पराहरू',
      packages: 'टूर प्याकेजहरू',
      experiences: 'अनुभवहरू',
      about: 'हाम्रो बारेमा',
      contact: 'सम्पर्क'
    },
    monasteryShowcase: 'पवित्र गुम्बाहरू',
    monasteryShowcaseSubtitle: 'हिमालयी परिदृश्यमा रहेका प्राचीन बौद्ध गुम्बाहरू अन्वेषण गर्नुहोस्',
    spiritualExperiences: 'आध्यात्मिक अनुभवहरू',
    spiritualExperiencesSubtitle: 'सिक्किमी संस्कृति र बौद्ध अभ्यासहरूमा डुब्नुहोस्',
    bookExperience: 'अनुभव बुक गर्नुहोस्',
    chatWithSaarthi: 'सारथीसँग कुरा गर्नुहोस्!',
    monasteries: {
      rumtek: { name: 'रुमटेक गुम्बा', description: 'ग्याल्वाङ कर्मापाको मुख्य स्थान, तिब्बती वास्तुकलाको नमुना।', location: 'मार्चक, सिक्किम' },
      enchey: { name: 'एनचेय गुम्बा', description: 'गान्तोक माथि अवस्थित सुन्दर गुम्बा, १९०९ मा स्थापित।', location: 'गान्तोक, सिक्किम' },
      peman: { name: 'पेमायंगत्से गुम्बा', description: 'पश्चिम सिक्किममा न्यिङ्मा परम्पराको प्रमुख गुम्बा।', location: 'पेलिङ, सिक्किम' }
    },
    experiences: { meditation: 'ध्यान शिविर', philosophy: 'बौद्ध दर्शन', homestay: 'गुम्बा होमस्टे', crafts: 'पारम्परिक हस्तकला' },
    footer: { description: 'सिक्किमको आध्यात्मिक विरासत र पवित्र गुम्बाहरू अन्वेषण गर्नुहोस्।', copyright: '© २०२५ सिक्किम ट्रेल्स। सबै अधिकार सुरक्षित।', ar: { viewInAr: 'AR मा हेर्नुहोस्' } }
  }
};

const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<keyof typeof translations>('English');
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [arModelId, setArModelId] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');
  const [currentUser, setCurrentUser] = useState<{name: string, email: string} | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const handleLogout = () => { localStorage.removeItem('user'); setCurrentUser(null); showNotification('Logged out successfully', 'info'); };
  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const t = translations[currentLanguage] as any;
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-300">
      {notification && (
        <div className={`fixed top-24 right-5 z-[100] px-6 py-3 rounded-xl shadow-2xl animate-fade-in-up flex items-center gap-3 ${notification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'}`}>
          <Sparkles size={20} />
          <p className="font-medium">{notification.message}</p>
        </div>
      )}

      <Header 
        currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}
        activeSection={activeSection} scrollToSection={scrollToSection}
        isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}
        theme={theme} toggleTheme={toggleTheme}
        currentUser={currentUser} handleLogout={handleLogout}
        setIsLoginOpen={setIsLoginOpen} setIsSignupOpen={() => {}}
      />

      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-100/50 to-orange-50/20 dark:from-slate-900/50 dark:to-slate-950/20 -z-10"></div>
        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400 font-medium mb-8 animate-fade-in">
            <Sparkles size={18} />
            <span>{t.tagline}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 dark:from-orange-400 dark:via-yellow-400 dark:to-orange-400">{t.heroTitle}</h1>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">{t.heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => scrollToSection('monasteries')} className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-semibold shadow-xl transition-all hover:-translate-y-1">{t.exploreMonasteries}</button>
            <button onClick={() => setIsChatOpen(true)} className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-2xl font-semibold shadow-xl transition-all hover:-translate-y-1"><MessageCircle className="text-orange-600" />{t.beginJourney}</button>
          </div>
        </div>
      </section>

      <section id="monasteries" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.monasteryShowcase}</h2>
            <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">{t.monasteryShowcaseSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(t.monasteries).map(([id, data]: [string, any]) => (
              <div key={id} className="group bg-orange-50 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg transition-all hover:-translate-y-2">
                <div className="h-64 bg-orange-200 dark:bg-slate-700 flex items-center justify-center"><Mountain size={64} className="text-orange-400 opacity-20" /></div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{data.name}</h3>
                  <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 text-sm mb-4"><MapPin size={14} />{data.location}</div>
                  <p className="text-gray-600 dark:text-slate-400 mb-6 line-clamp-2">{data.description}</p>
                  <button onClick={() => { setArModelId(id); setIsARModalOpen(true); }} className="w-full py-3 bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 rounded-xl font-semibold border-2 border-orange-100 dark:border-slate-600 transition-all hover:bg-orange-50">View AR</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="py-24 bg-orange-50 dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.spiritualExperiences}</h2>
            <p className="text-gray-600 dark:text-slate-400">{t.spiritualExperiencesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {Object.entries(t.experiences).map(([key, value]) => (
              <div key={key} className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-orange-100 dark:border-slate-700 transition-all hover:-translate-y-2">
                <div className="w-14 h-14 bg-orange-100 dark:bg-slate-700 flex items-center justify-center rounded-2xl mb-6 text-orange-600 dark:text-orange-400"><Heart size={28} /></div>
                <h4 className="text-xl font-bold mb-3">{value as string}</h4>
                <button className="text-orange-600 dark:text-orange-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">{t.bookExperience} <Star size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Packages currentLanguage={currentLanguage} />

      <div className="fixed bottom-8 right-8 z-50">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="group flex items-center gap-3 px-6 py-4 bg-orange-600 text-white rounded-2xl shadow-2xl transition-all hover:scale-105"><MessageCircle size={24} /><span className="font-semibold">{t.chatWithSaarthi}</span></button>
      </div>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} currentLanguage={currentLanguage} showNotification={showNotification} />
      {isARModalOpen && <ARModal isOpen={isARModalOpen} onClose={() => setIsARModalOpen(false)} modelId={arModelId} />}
      {isAdminOpen && <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />}
      <button onClick={() => setIsAdminOpen(true)} className="fixed bottom-8 left-8 opacity-20 hover:opacity-100 transition-opacity bg-slate-800 text-white p-3 rounded-full"><Shield size={20} /></button>

      <footer className="py-12 bg-slate-900 text-slate-400 text-center">
        <Mountain className="mx-auto mb-6 text-orange-500" size={40} />
        <p className="max-w-xl mx-auto mb-8">{t.footer.description}</p>
        <div className="pt-8 border-t border-slate-800"><p>{t.footer.copyright}</p></div>
      </footer>
    </div>
  );
};
export default App;
