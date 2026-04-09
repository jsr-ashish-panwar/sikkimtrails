import React, { useState, useEffect } from 'react';
import { Mountain, MapPin, MessageCircle, X, Star, Camera, Phone, Mail, MapPin as LocationIcon, Clock, Heart, Award, Menu, Shield, Users, Sparkles, BookOpen, Music } from 'lucide-react';
import Chatbot from './components/Chatbot';
import '@google/model-viewer';
import ARModal from './components/ARModal';
import Packages from './components/Packages';
import AdminPanel from './components/Admin/AdminPanel';
import { adminStorage } from './utils/adminStorage';

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

// Language translations (SANITIZED & RESTORED)
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
    planJourney: 'Plan Your Spiritual Journey',
    planJourneySubtitle: 'Let Saarthi guide you through a personalized monastery pilgrimage across Sikkim',
    startingPoint: 'Starting Point',
    primaryMonastery: 'Primary Monastery',
    duration: 'Duration',
    spiritualFocus: 'Spiritual Focus',
    createJourney: 'Create Sacred Journey with Saarthi',
    monasteryShowcase: 'Sacred Monasteries of Sikkim',
    monasteryShowcaseSubtitle: 'Explore ancient Buddhist monasteries nestled in the Himalayan landscape',
    exploreMonastery: 'Explore Monastery',
    spiritualExperiences: 'Spiritual Experiences & Local Culture',
    spiritualExperiencesSubtitle: 'Immerse yourself in authentic Buddhist practices and Sikkimese culture',
    bookExperience: 'Book Experience',
    buddhist: 'Buddhist Traditions in Sikkim',
    buddhistSubtitle: 'Learn about the rich Buddhist heritage and spiritual practices of Sikkim',
    routePlanner: 'Monastery Route Planner',
    routePlannerSubtitle: 'Plan your monastery pilgrimage route across Sikkim with Saarthi\'s guidance',
    interactiveMap: 'Interactive Monastery Map',
    generateItinerary: 'Generate Itinerary with Saarthi',
    saarthiGreeting: "Namaste! I'm Saarthi, your spiritual guide. Which monastery would you like to explore today?",
    chatWithSaarthi: 'Chat with Saarthi!',
    spiritualGuide: 'Spiritual Guide',
    askAbout: 'Ask about monasteries, meditation...',
    monasteries: {
      rumtek: {
        name: 'Rumtek Monastery',
        description: 'The largest and most significant monastery in Sikkim, representing the Kagyu sect.',
        location: 'Marchak, Sikkim',
        history: 'Founded in the 16th century, Rumtek served as the main seat of the Karma Kagyu lineage in exile.',
        traditions: 'Known for its sacred Cham dances and the Golden Stupa containing the relics of the 16th Karmapa.',
        hours: '6:00 AM - 6:00 PM',
        attractions: 'Golden Stupa, Nalanda Institute, ancient manuscripts'
      },
      enchey: {
        name: 'Enchey Monastery',
        description: 'Beautiful monastery overlooking Gangtok, established in 1909.',
        location: 'Gangtok, East Sikkim',
        history: 'Built on a site blessed by Lama Drupthob Karpo who was believed to have flying powers.',
        traditions: 'Nyingma tradition with annual Cham dance performances and special city protection prayers.',
        hours: '6:00 AM - 6:00 PM',
        attractions: 'City views, Prayer flags, Traditional architecture'
      },
      peman: {
        name: 'Pemayangtse Monastery',
        description: 'The premier monastery of the Nyingma tradition in West Sikkim.',
        location: 'Pelling, Sikkim',
        history: 'Established in 1705, it was designed for the "pure monks" (ta-sang).',
        traditions: 'Home to the famous Zangdog Palri (Celestial Palace of Guru Rinpoche) wooden structure.',
        hours: '7:00 AM - 6:00 PM',
        attractions: 'Wooden Celestial Palace, ancient statues, Pelling views'
      }
    },
    experiences: {
      meditation: 'Meditation Retreat',
      philosophy: 'Buddhist Philosophy',
      homestay: 'Monastery Homestay',
      crafts: 'Traditional Crafts'
    },
    tourPackages: {
      title: 'Tour Packages',
      subtitle: 'Discover the magic of Sikkim Trails with our spiritual and adventure journeys.',
      basic: {
        title: 'Basic Package',
        duration: '3 Days / 2 Nights',
        services: ['Budget Hotel Stay', 'Local Sightseeing (Gangtok)', 'Shared Transport', 'Meals Not Included']
      },
      premium: {
        title: 'Premium Package',
        duration: '5 Days / 4 Nights',
        services: ['3-Star Hotel Stay', 'Gangtok + Tsomgo Lake + Baba Mandir', 'Breakfast & Dinner Included', 'Private/Shared Transport', 'Guided Tour']
      },
      luxury: {
        title: 'Luxury Package',
        duration: '7 Days / 6 Nights',
        services: ['5-Star Hotel/Resort Stay', 'Gangtok + North Sikkim (Lachung, Yumthang)', 'All Meals Included', 'Private Cab & Personal Guide', 'Priority Booking & VIP Experience']
      },
      safetySection: {
        title: 'Safety & Tracking System',
        description: "Your safety is our spiritual commitment. We've built a robust digital framework for 24/7 security.",
        features: {
          gps: { title: 'Live GPS Tracking', desc: 'Real-time location monitoring.' },
          sos: { title: 'Emergency SOS', desc: 'Instant SOS response.' },
          support: { title: '24/7 Support', desc: 'Dedicated assistance team.' },
          partners: { title: 'Verified Partners', desc: 'Fully vetted drivers & guides.' }
        }
      }
    },
    bookingModal: {
      title: 'Book Your Experience',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      participants: 'Number of Participants',
      specialRequests: 'Special Requests',
      totalCost: 'Total Cost',
      bookNow: 'Book Now',
      close: 'Close'
    },
    monasteryModal: {
      history: 'History',
      traditions: 'Traditions',
      visitingHours: 'Visiting Hours',
      location: 'Location',
      nearbyAttractions: 'Nearby Attractions',
      close: 'Close'
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
    planJourney: 'अपनी आध्यात्मिक यात्रा की योजना बनाएं',
    planJourneySubtitle: 'सारथी को सिक्किम भर में व्यक्तिगत मठ तीर्थयात्रा के माध्यम से आपका मार्गदर्शन करने दें',
    startingPoint: 'प्रारंभिक स्थान',
    primaryMonastery: 'मुख्य मठ',
    duration: 'अवधि',
    spiritualFocus: 'आध्यात्मिक फोकस',
    createJourney: 'सारथी के साथ पवित्र यात्रा सिर्जना करें',
    monasteryShowcase: 'पवित्र मठ',
    monasteryShowcaseSubtitle: 'हिमालयी परिदृश्य में बसे प्राचीन बौद्ध मठों का अन्वेषण करें',
    exploreMonastery: 'मठ का अन्वेषण करें',
    spiritualExperiences: 'आध्यात्मिक अनुभव',
    bookExperience: 'अनुभव बुक करें',
    chatWithSaarthi: 'सारथी के साथ चैट करें!',
    monasteries: {
      rumtek: { name: 'रुमटेक मठ', description: 'ग्यालवांग कर्मापा की सीट, तिब्बती वास्तुकला की एक उत्कृष्ट कृति।', location: 'मारचक, सिक्किम' },
      enchey: { name: 'एनचेय मठ', description: 'गंगटोक के ऊपर सुंदर मठ, 1909 में स्थापित।', location: 'गंगटोक, सिक्किम' },
      peman: { name: 'पेमायंगत्से मठ', description: 'पश्चिमी सिक्किम में न्यिंग्मा परंपरा का प्रमुख मठ।', location: 'पेलिंग, सिक्किम' }
    },
    experiences: { meditation: 'ध्यान साधना', philosophy: 'बौद्ध दर्शन', homestay: 'मठ होमस्टे', crafts: 'पारंपरिक शिल्प' },
    tourPackages: {
      title: 'टूर पैकेज',
      subtitle: 'सिक्किम ट्रेल्स के जादू को हमारी आध्यात्मिक और साहसिक यात्राओं के साथ खोजें।',
      basic: { title: 'बेसिक पैकेज', duration: '3 दिन / 2 रात', services: ['बजट होटल स्टे', 'स्थानीय दर्शनीय स्थल', 'साझा परिवहन', 'भोजन शामिल नहीं'] },
      premium: { title: 'प्रीमियम पैकेज', duration: '5 दिन / 4 रात', services: ['3-सितारा होटल', 'गंगटोक + झील', 'भोजन शामिल', 'निजी परिवहन', 'गाइडेड टूर'] },
      luxury: { title: 'लक्जरी पैकेज', duration: '7 दिन / 6 रात', services: ['5-सितारा होटल', 'उत्तरी सिक्किम', 'सभी भोजन शामिल', 'निजी टैब', 'VIP अनुभव'] },
      safetySection: { title: 'सुरक्षा और ट्रैकिंग', description: "आपकी सुरक्षा हमारी आध्यात्मिक प्रतिबद्धता है।", features: { gps: { title: 'GPS', desc: 'निगरानी' }, sos: { title: 'SOS', desc: 'प्रतिक्रिया' }, support: { title: 'सहायता', desc: 'समर्पित टीम' }, partners: { title: 'भागीदार', desc: 'सत्यापित' } } }
    },
    bookingModal: { title: 'अनुभव बुक करें', selectDate: 'तारीख चुनें', selectTime: 'समय चुनें', participants: 'यात्रियों की संख्या', specialRequests: 'विशेष अनुरोध', totalCost: 'कुल लागत', bookNow: 'अभी बुक करें', close: 'बंद करें' },
    monasteryModal: { history: 'इतिहास', traditions: 'परंपराएं', visitingHours: 'दर्शन का समय', location: 'स्थान', nearbyAttractions: 'आस-पास के आकर्षण', close: 'बंद करें' },
    footer: { description: 'सिक्किम के पवित्र मठों और आध्यात्मिक विरासत की खोज करें।', copyright: '© 2025 सिक्किम ट्रेल्स। सर्वाधिकार सुरक्षित।', ar: { viewInAr: 'AR में देखें' } }
  },
  नेपाली: {
    appName: 'घुम्मो इन्डिया',
    tagline: 'सिक्किमका पवित्र गुम्बाहरू',
    heroTitle: 'सिक्किमका पवित्र गुम्बाहरू',
    heroSubtitle: 'हिमालयको मुटुमा प्राचीन ज्ञान, शान्तिपूर्ण ध्यान र आध्यात्मिक ज्ञानको खोज गर्नुहोस्।',
    beginJourney: 'आध्यात्मिक यात्रा सुरु गर्नुहोस्',
    exploreMonasteries: 'गुम्बाहरूको अन्वेषण गर्नुहोस्',
    nav: { home: 'घर', monasteries: 'गुम्बाहरू', spiritualJourney: 'आध्यात्मिक यात्रा', traditions: 'बौद्ध परम्पराहरू', packages: 'टूर प्याकेजहरू', experiences: 'अनुभवहरू', about: 'हाम्रो बारेमा', contact: 'सम्पर्क' },
    planJourney: 'तपाईंको आध्यात्मिक यात्राको योजना बनाउनुहोस्',
    planJourneySubtitle: 'सारथीलाई सिक्किम भरि व्यक्तिगत गुम्बा तीर्थयात्राको मार्गदर्शन गर्न दिनुहोस्',
    startingPoint: 'सुरुवाती स्थान',
    primaryMonastery: 'मुख्य गुम्बा',
    duration: 'अवधि',
    spiritualFocus: 'आध्यात्मिक फोकस',
    monasteryShowcase: 'सिक्किमका पवित्र गुम्बाहरू',
    exploreMonastery: 'गुम्बाको अन्वेषण गर्नुहोस्',
    spiritualExperiences: 'आध्यात्मिक अनुभवहरू',
    bookExperience: 'अनुभव बुक गर्नुहोस्',
    chatWithSaarthi: 'सारथीसँग कुरा गर्नुहोस्!',
    monasteries: {
      rumtek: { name: 'रुमटेक गुम्बा', description: 'ग्याल्वाङ कर्मापाको मुख्य स्थान, तिब्बती वास्तुकलाको नमुना।', location: 'मार्चक, सिक्किम' },
      enchey: { name: 'एनचेय गुम्बा', description: 'गान्तोक माथि अवस्थित सुन्दर गुम्बा।', location: 'गान्तोक, सिक्किम' },
      peman: { name: 'पेमायंगत्से गुम्बा', description: 'पश्चिम सिक्किममा न्यिङ्मा परम्पराको प्रमुख गुम्बा।', location: 'पेलिङ, सिक्किम' }
    },
    experiences: { meditation: 'ध्यान शिविर', philosophy: 'बौद्ध दर्शन', homestay: 'गुम्बा होमस्टे', crafts: 'पारम्परिक हस्तकला' },
    tourPackages: {
      title: 'टूर प्याकेजहरू',
      subtitle: 'सिक्किम ट्रेल्सको जादू हाम्रो यात्राहरूको साथ पत्ता लगाउनुहोस्।',
      basic: { title: 'आधारभूत प्याकेज', duration: '३ दिन / २ रात', services: ['बजेट होटल', 'स्थानीय भ्रमण', 'यातायात', 'खाना बिना'] },
      premium: { title: 'प्रीमियम प्याकेज', duration: '५ दिन / ४ रात', services: ['३-तारे होटल', 'गान्तोक भ्रमण', 'खाना सहित', 'यातायात', 'गाईड'] },
      luxury: { title: 'लक्जरी प्याकेज', duration: '७ दिन / ६ रात', services: ['५-तारे होटल', 'उत्तरी सिक्किम', 'सबै खाना', 'निजी ट्याक्सी', 'VIP अनुभव'] },
      safetySection: { title: 'सुरक्षा प्रणाली', description: "तपाईको सुरक्षा हाम्रो प्रतिबद्धता हो।", features: { gps: { title: 'GPS', desc: 'निगरानी' }, sos: { title: 'आपतकालीन', desc: 'प्रतिक्रिया' }, support: { title: 'सहयोग', desc: 'टोली' }, partners: { title: 'साझेदार', desc: 'प्रमाणित' } } }
    },
    bookingModal: { title: 'अनुभव बुक गर्नुहोस्', selectDate: 'मिति छान्नुहोस्', selectTime: 'समय छान्नुहोस्', participants: 'सङ्ख्या', specialRequests: 'अनुरोध', totalCost: 'कुल लागत', bookNow: 'बुक गर्नुहोस्', close: 'बन्द गर्नुहोस्' },
    monasteryModal: { history: 'इतिहास', traditions: 'परंपरा', visitingHours: 'समय', location: 'स्थान', nearbyAttractions: 'आकर्षण', close: 'बन्द गर्नुहोस्' },
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
  const [selectedMonastery, setSelectedMonastery] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    participants: 1,
    specialRequests: ''
  });

  const t = (translations[currentLanguage] as any) || translations.English;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const experienceName = translations.English.experiences[selectedExperience as keyof typeof translations.English.experiences];
      await adminStorage.saveBooking({
        experienceId: selectedExperience!,
        experienceName: experienceName || selectedExperience!,
        ...bookingData,
        totalCost: "₹1,500" // Placeholder
      });
      alert('Journey Booked Successfully! Saarthi will contact you soon.');
      setSelectedExperience(null);
    } catch (error) {
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-gray-900">
      {/* Original Simple Header */}
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Mountain className="h-10 w-10 text-orange-600" />
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent italic">
                {t.appName}
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(t.nav).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-orange-600 ${
                    activeSection === key ? 'text-orange-600' : 'text-gray-600'
                  }`}
                >
                  {value as string}
                </button>
              ))}
              
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as any)}
                className="bg-orange-50 border border-orange-200 text-orange-600 text-sm font-bold py-1 px-3 rounded-md outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="English">English</option>
                <option value="हिंदी">हिंदी</option>
                <option value="नेपाली">नेपाली</option>
              </select>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-orange-600"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            {Object.entries(t.nav).map(([key, value]) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className="block w-full text-left px-8 py-4 text-sm font-bold uppercase text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              >
                {value as string}
              </button>
            ))}
            <div className="px-8 py-4 border-t border-gray-100 mt-4">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as any)}
                className="w-full bg-orange-50 border border-orange-200 text-orange-600 text-sm font-bold py-3 px-4 rounded-xl"
              >
                <option value="English">English</option>
                <option value="हिंदी">हिंदी</option>
                <option value="नेपाली">नेपाली</option>
              </select>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544735745-b810f643e9bd?auto=format&fit=crop&q=80&w=2000" 
            alt="Sikkim Himalayan Monastery" 
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md mb-8 border border-white/30">
            <Sparkles className="h-5 w-5 text-orange-300" />
            <span className="text-sm font-bold tracking-widest uppercase">{t.tagline}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter drop-shadow-2xl">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 mb-12 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => scrollToSection('spiritualJourney')}
              className="px-12 py-5 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:shadow-2xl shadow-orange-500/20"
            >
              {t.beginJourney}
            </button>
            <button 
              onClick={() => scrollToSection('monasteries')}
              className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/40 rounded-2xl font-black text-lg transition-all hover:bg-white/20"
            >
              {t.exploreMonasteries}
            </button>
          </div>
        </div>
      </section>

      {/* Journey Planner Section */}
      <section id="spiritualJourney" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-orange-100 text-orange-600 p-3 rounded-2xl inline-block mb-6">
                <BookOpen className="h-8 w-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">{t.planJourney}</h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">{t.planJourneySubtitle}</p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: <LocationIcon />, title: t.startingPoint },
                  { icon: <Mountain />, title: t.primaryMonastery },
                  { icon: <Clock />, title: t.duration },
                  { icon: <Sparkles />, title: t.spiritualFocus }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-red-50 p-2 rounded-xl text-red-600 h-10 w-10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <div className="text-sm text-gray-500">Select preference</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-10 rounded-[3rem] shadow-xl border border-orange-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{t.startingPoint}</label>
                  <select className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-orange-600 font-bold text-gray-700">
                    <option>Gangtok</option>
                    <option>Bagdogra</option>
                    <option>Pelling</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{t.primaryMonastery}</label>
                  <select className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-orange-600 font-bold text-gray-700">
                    <option>Rumtek Monastery</option>
                    <option>Pemayangtse Monastery</option>
                    <option>Enchey Monastery</option>
                  </select>
                </div>
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:bg-black hover:shadow-xl"
                >
                  <Sparkles className="h-5 w-5 text-orange-400" />
                  {t.createJourney}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monasteries Showcase */}
      <section id="monasteries" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">{t.monasteryShowcase}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.monasteryShowcaseSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(translations.English.monasteries).map(([id, monastery]) => {
              const localMonastery = t.monasteries[id as keyof typeof t.monasteries];
              return (
                <div key={id} className="group relative bg-white rounded-3xl overflow-hidden shadow-lg transition-all hover:-translate-y-4 hover:shadow-2xl">
                  <div className="h-80 overflow-hidden relative">
                    <img 
                      src={`https://images.unsplash.com/photo-${id === 'rumtek' ? '1544735745-b810f643e9bd' : id === 'enchey' ? '1527352723447-44bc8f761ca7' : '1505881502353-a1986add373c'}?auto=format&fit=crop&q=80&w=800`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={localMonastery.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <LocationIcon className="h-4 w-4 text-orange-400" />
                        <span className="text-xs font-bold uppercase tracking-widest">{localMonastery.location}</span>
                      </div>
                      <h3 className="text-2xl font-black">{localMonastery.name}</h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed">{localMonastery.description}</p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setSelectedMonastery(id)}
                        className="flex-1 py-4 bg-orange-50 text-orange-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-orange-100"
                      >
                        {t.exploreMonastery}
                      </button>
                      <button 
                         onClick={() => {
                           setArModelId(id);
                           setIsARModalOpen(true);
                         }}
                         className="p-4 bg-gray-50 text-gray-400 rounded-xl hover:text-red-600 hover:bg-red-50 transition-all"
                      >
                        <Camera className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section id="traditions" className="py-24 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/50 -skew-x-12 transform origin-top translate-x-1/2 -z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative">
                <div className="rounded-[3rem] overflow-hidden shadow-2xl skew-y-3">
                   <img src="https://images.unsplash.com/photo-1544735745-b810f643e9bd?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Buddhist Traditions" />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2rem] shadow-2xl max-w-xs animate-bounce-slow">
                   <Music className="h-8 w-8 text-red-600 mb-4" />
                   <p className="font-bold text-gray-900 leading-tight">Hear the morning prayers at Rumtek Monastery</p>
                </div>
             </div>
             <div>
                <h2 className="text-4xl md:text-5xl font-black mb-8 text-gray-900">{t.buddhist}</h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">{t.buddhistSubtitle}</p>
                
                <div className="space-y-6">
                   {[
                     { id: 'nyingma', title: 'Nyingma Tradition', desc: 'The oldest school of Tibetan Buddhism' },
                     { id: 'kagyu', title: 'Kagyu Tradition', desc: 'Known for oral transmissions and meditation' },
                     { id: 'festivals', title: 'Sacred Festivals', desc: 'Cham dance traditions and ceremonies' }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-6 p-6 rounded-3xl hover:bg-orange-50 transition-all group">
                        <div className="bg-red-100 p-4 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all h-fit">
                           <Shield className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="text-xl font-black text-gray-900 mb-1">{item.title}</h4>
                           <p className="text-gray-500 font-medium">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6">{t.spiritualExperiences}</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.spiritualExperiencesSubtitle}</p>
           </div>

           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(t.experiences).map(([key, value]) => (
                <div key={key} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] transition-all hover:bg-white/10 hover:-translate-y-2 group">
                   <div className="bg-orange-600/20 p-4 rounded-2xl text-orange-500 mb-6 w-fit group-hover:bg-orange-600 group-hover:text-white transition-all">
                      <Heart className="h-8 w-8" />
                   </div>
                   <h4 className="text-xl font-black mb-4">{value as string}</h4>
                   <button 
                    onClick={() => setSelectedExperience(key)}
                    className="flex items-center gap-2 text-orange-500 font-black tracking-widest uppercase text-xs hover:gap-4 transition-all"
                   >
                     {t.bookExperience} <Star className="h-4 w-4" />
                   </button>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Packages Section */}
      <Packages t={t} />

      {/* About & Contact Section */}
      <section id="about" className="py-24 bg-white border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20">
               <div>
                  <h2 className="text-4xl font-black mb-8 text-gray-900">{t.about.title}</h2>
                  <p className="text-xl text-gray-600 mb-12 leading-relaxed">{t.about.description}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-10">
                     <div>
                        <div className="flex items-center gap-3 mb-4 text-orange-600">
                           <Award className="h-6 w-6" />
                           <h4 className="font-black text-lg font-black">{t.about.mission}</h4>
                        </div>
                        <p className="text-gray-500 leading-relaxed">{t.about.missionText}</p>
                     </div>
                     <div>
                        <div className="flex items-center gap-3 mb-4 text-red-600">
                           <Users className="h-6 w-6" />
                           <h4 className="font-black text-lg font-black">{t.about.values}</h4>
                        </div>
                        <p className="text-gray-500 leading-relaxed font-medium">{t.about.valuesText}</p>
                     </div>
                  </div>
               </div>
               
               <div id="contact" className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
                  <h3 className="text-3xl font-black mb-4 text-gray-900">{t.contact.title}</h3>
                  <p className="text-gray-500 mb-10 font-bold">{t.contact.subtitle}</p>
                  
                  <form className="space-y-6">
                     <div className="grid sm:grid-cols-2 gap-6">
                        <input type="text" placeholder={t.contact.name} className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-orange-600 font-bold" />
                        <input type="email" placeholder={t.contact.email} className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-orange-600 font-bold" />
                     </div>
                     <input type="text" placeholder={t.contact.subject} className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-orange-600 font-bold" />
                     <textarea placeholder={t.contact.message} rows={4} className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-orange-600 font-bold"></textarea>
                     <button className="w-full py-5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20">{t.contact.submit}</button>
                  </form>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Mountain className="h-12 w-12 text-orange-600 mx-auto mb-8" />
            <p className="text-gray-500 mb-12 max-w-xl mx-auto font-bold leading-relaxed">{t.footer.description}</p>
            <div className="pt-12 border-t border-gray-200">
               <p className="text-gray-400 font-black tracking-widest text-xs uppercase">{t.footer.copyright}</p>
            </div>
         </div>
      </footer>

      {/* Floating Saarthi Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="group flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-[2rem] shadow-2xl transition-all hover:scale-110 active:scale-95 shadow-orange-500/30"
        >
          <MessageCircle className="h-8 w-8" />
          <span className="font-black text-lg tracking-tight pr-2">{t.chatWithSaarthi}</span>
        </button>
      </div>

      {/* Chatbot Interface */}
      <Chatbot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        currentLanguage={currentLanguage} 
      />

      {/* Monastery Detail Modal */}
      {selectedMonastery && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-bounce-in">
      {(() => {
        const monastery = t.monasteries[selectedMonastery as keyof typeof t.monasteries];
        const engMonastery = translations.English.monasteries[selectedMonastery as keyof typeof translations.English.monasteries];
        if (!monastery) return null;

        return (
          <>
            <div className="relative h-72 md:h-96 shrink-0">
              <img 
                src={`https://images.unsplash.com/photo-${selectedMonastery === 'rumtek' ? '1544735745-b810f643e9bd' : selectedMonastery === 'enchey' ? '1527352723447-44bc8f761ca7' : '1505881502353-a1986add373c'}?auto=format&fit=crop&q=80&w=1200`}
                className="w-full h-full object-cover"
                alt={monastery.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <button 
                onClick={() => setSelectedMonastery(null)}
                className="absolute top-6 right-6 p-3 bg-black/20 backdrop-blur-md text-white rounded-full hover:bg-black/40 transition-all"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-orange-400 font-black tracking-widest uppercase mb-2">{monastery.location}</p>
                <h3 className="text-4xl md:text-6xl font-black">{monastery.name}</h3>
              </div>
            </div>

            <div className="p-10 md:p-14 overflow-y-auto custom-scrollbar bg-white">
              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-10">
                  <section>
                    <h4 className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] mb-4">History</h4>
                    <p className="text-xl text-gray-700 leading-relaxed font-bold italic">“{engMonastery.history}”</p>
                  </section>
                  <section>
                    <h4 className="text-xs font-black text-red-600 uppercase tracking-[0.2em] mb-4">Traditions</h4>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                      {engMonastery.traditions}
                    </p>
                  </section>
                </div>
                
                <div className="space-y-10">
                  <div className="bg-orange-50 p-8 rounded-[2rem] border border-orange-100">
                    <h4 className="text-xs font-black text-orange-800 uppercase tracking-widest mb-6">Visiting Info</h4>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <Clock className="h-5 w-5 text-orange-600 mt-1" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-orange-400 tracking-widest">Open Hours</p>
                          <p className="font-bold text-gray-700">{engMonastery.hours}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Sparkles className="h-5 w-5 text-orange-600 mt-1" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-orange-400 tracking-widest">Attractions</p>
                          <p className="font-bold text-gray-700 text-sm">{engMonastery.attractions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setArModelId(selectedMonastery);
                      setIsARModalOpen(true);
                    }}
                    className="w-full py-5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <Camera className="h-6 w-6 text-orange-500" />
                    AR View
                  </button>

                  <button
                    onClick={() => {
                      setSelectedMonastery(null);
                      scrollToSection('contact');
                    }}
                    className="w-full py-4 bg-white border-2 border-red-600 text-red-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-50 transition-all"
                  >
                    Contact Now
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  </div>
)}

      {/* Experience Booking Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in">
            {(() => {
              const experience = t.experiences[selectedExperience as keyof typeof t.experiences];
              if (!experience) return null;

              return (
                <>
                  <div className="bg-gradient-to-br from-red-600 to-orange-600 p-10 text-white text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/30">
                       <Heart className="h-10 w-10" />
                    </div>
                    <h3 className="text-3xl font-black mb-2">{t.bookingModal.title}</h3>
                    <div className="inline-block px-4 py-1.5 bg-black/10 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                      Experience: {experience as string}
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="p-10 space-y-8 bg-white">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                          {t.bookingModal.selectDate}
                        </label>
                        <input
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-bold"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                          {t.bookingModal.selectTime}
                        </label>
                        <select
                          value={bookingData.time}
                          onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-bold"
                          required
                        >
                          <option value="">Select time</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="16:00">04:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                          {t.bookingModal.participants}
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={bookingData.participants}
                          onChange={(e) => setBookingData({...bookingData, participants: parseInt(e.target.value)})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-bold"
                          required
                        />
                      </div>
                      <div className="flex items-end pb-1">
                         <div className="bg-orange-50 px-6 py-4 rounded-2xl flex-1 flex justify-between items-center border border-orange-100">
                             <span className="text-[10px] font-black uppercase text-orange-400">Rate</span>
                             <span className="text-xl font-black text-red-600">₹1,500</span>
                         </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                         Special Note
                      </label>
                      <textarea
                        rows={3}
                        value={bookingData.specialRequests}
                        onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-bold"
                        placeholder="Any special requests..."
                      ></textarea>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedExperience(null)}
                        className="flex-1 py-5 text-gray-400 font-black tracking-widest uppercase text-xs hover:text-gray-600 transition-all"
                      >
                         Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-[2] bg-gray-900 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all"
                      >
                        {t.bookingModal.bookNow}
                      </button>
                    </div>
                  </form>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* AR View Modal */}
      {isARModalOpen && (
        <ARModal 
          isOpen={isARModalOpen} 
          onClose={() => setIsARModalOpen(false)} 
          monasteryName={arModelId ? t.monasteries[arModelId]?.name : 'Monastery'} 
          translations={t}
        />
      )}

      {/* Admin Panel */}
      {isAdminOpen && (
        <AdminPanel onClose={() => setIsAdminOpen(false)} />
      )}
      
      {/* Hidden Admin Trigger */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed top-4 right-4 opacity-0 hover:opacity-10 transition-opacity p-2 bg-black rounded"
      >
        Admin
      </button>
    </div>
  );
};

export default App;
