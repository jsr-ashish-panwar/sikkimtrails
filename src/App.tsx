import React, { useState } from 'react';
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



// Language translations
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
    about: {
      title: 'About Sikkim Trails',
      subtitle: 'Your Gateway to Sikkim\'s Spiritual Heritage',
      description: 'Sikkim Trails is dedicated to preserving and sharing the sacred Buddhist heritage of Sikkim. We connect spiritual seekers with authentic monastery experiences, guided by local wisdom and centuries-old traditions.',
      mission: 'Our Mission',
      missionText: 'To make Sikkim\'s spiritual treasures accessible to all seekers while preserving the sanctity and traditions of these sacred spaces.',
      vision: 'Our Vision',
      visionText: 'A world where ancient wisdom guides modern souls toward peace, compassion, and enlightenment.',
      values: 'Our Values',
      valuesText: 'Respect for tradition, authentic experiences, sustainable tourism, and spiritual growth.',
      team: 'Our Team',
      teamText: 'Local guides, Buddhist scholars, and travel experts working together to create meaningful spiritual journeys.'
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Begin Your Spiritual Journey Today',
      getInTouch: 'Get in Touch',
      address: 'Address',
      addressText: 'Gangtok, Sikkim 737101, India',
      phone: 'Phone',
      phoneText: '+91 8650882398',
      email: 'Email',
      emailText: 'namaste@ghoomo.india',
      hours: 'Office Hours',
      hoursText: 'Mon - Sat: 9:00 AM - 6:00 PM',
      sendMessage: 'Send Message',
      name: 'Your Name',
      subject: 'Subject',
      message: 'Your Message',
      submit: 'Send Message'
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
    itineraryResult: {
      title: 'Your Sacred Journey Itinerary',
      generatedBy: 'Generated by Saarthi',
      day: 'Day',
      close: 'Close'
    },
    footer: {
      description: 'Discover the sacred monasteries and spiritual heritage of Sikkim. Your guide to Buddhist wisdom in the Himalayas.',
      sacredPlaces: 'Sacred Places',
      support: 'Support',
      connect: 'Connect',
      followUs: 'Follow us for spiritual inspiration',
      copyright: '© 2025 Sikkim Trails. All rights reserved. Made by The Techies for spiritual seekers.',
      ar: {
        viewInAr: 'View in AR',
        instructions: 'AR Instructions',
        close: 'Close AR View'
      },
    },
    tourPackages: {
      title: 'Tour Packages',
      subtitle: 'Discover the magic of Sikkim Trails with our curated spiritual and adventure journeys.',
      basic: {
        title: 'Basic Package',
        duration: '3 Days / 2 Nights',
        services: ['Budget hotel stay', 'Local sightseeing (Gangtok)', 'Shared transport', 'No meals included']
      },
      premium: {
        title: 'Premium Package',
        duration: '5 Days / 4 Nights',
        services: ['3-star hotel stay', 'Gangtok + Tsomgo Lake + Baba Mandir', 'Breakfast & Dinner included', 'Private/shared transport', 'Guided tours']
      },
      luxury: {
        title: 'Luxury Package',
        duration: '7 Days / 6 Nights',
        services: ['5-star hotel / resort stay', 'Gangtok + North Sikkim (Lachung, Yumthang)', 'All meals included', 'Private cab & personal guide', 'Priority bookings & VIP experience']
      },
      safetySection: {
        title: 'Safety & Tracking System',
        description: "Your safety is our spiritual commitment. We've built a robust digital infrastructure to ensure every traveler is protected 24/7.",
        features: {
          gps: { title: 'Live GPS Tracking', desc: 'Real-time location monitoring.' },
          sos: { title: 'Emergency SOS', desc: 'Instant SOS response.' },
          support: { title: '24/7 Support', desc: 'Dedicated assistance team.' },
          partners: { title: 'Verified Partners', desc: 'Strictly vetted drivers and guides.' }
        }
      }
    },
    monasteries: {
      rumtek: {
        name: 'Rumtek Monastery',
        description: 'The largest monastery in Sikkim, seat of the Karmapa',
        history: 'Built in 1966, Rumtek is the largest monastery in Sikkim and serves as the main seat of the Karma Kagyu lineage. It houses precious relics and ancient Buddhist artifacts.',
        traditions: 'Follows Karma Kagyu tradition with daily prayers, meditation sessions, and annual festivals including Tibetan New Year celebrations.',
        hours: '6:00 AM - 6:00 PM',
        location: '24 km from Gangtok',
        attractions: 'Golden Stupa, Monastery Museum, Prayer Wheels'
      },
      namchi: {
         name: 'Namchi Monastery',
         description: 'A renowned Buddhist monastery in South Sikkim, famous for its serene atmosphere and the towering statue of Guru Padmasambhava.',
         history: 'Established to preserve the teachings of Guru Padmasambhava and promote Buddhism in the region, Namchi Monastery serves as an important spiritual and cultural hub of South Sikkim.',
         traditions: 'The monastery hosts annual Buddhist festivals, traditional Cham dances, and prayer gatherings attended by devotees from across the region.',
         hours: '8:00 AM - 6:00 PM',
         location: 'Namchi, South Sikkim',
         attractions: '135-feet tall statue of Guru Padmasambhava, Solophok Chorten, and panoramic Himalayan views'
       },
      tashiding: {
        name: 'Tashiding Monastery',
        description: 'Sacred monastery on a hilltop between two rivers',
        history: 'Established in 1717, Tashiding means "the devoted central glory" and is considered one of the most sacred monasteries in Sikkim.',
        traditions: 'Famous for the Bumchu ceremony where sacred water is distributed to devotees, believed to predict the coming year.',
        hours: '6:00 AM - 6:00 PM',
        location: 'Between Rangit and Rathong rivers',
        attractions: 'Sacred Bumchu vase, Chortens, River confluence views'
      },
      enchey: {
        name: 'Enchey Monastery',
        description: 'Beautiful monastery overlooking Gangtok',
        history: 'Built in 1909, Enchey means "solitary temple" and was established by Lama Druptob Karpo who was believed to have flying powers.',
        traditions: 'Nyingma tradition with annual Cham dance performances and special prayers for protection of Gangtok city.',
        hours: '6:00 AM - 6:00 PM',
        location: 'Gangtok, East Sikkim',
        attractions: 'City views, Prayer flags, Traditional architecture'
      },
      dubdi: {
        name: 'Dubdi Monastery',
        description: 'The first monastery built in Sikkim',
        history: 'Founded in 1701 by Chogyal Namgyal, Dubdi is the oldest monastery in Sikkim and marks the beginning of Buddhism in the region.',
        traditions: 'Nyingma tradition preserving the original teachings brought to Sikkim, with ancient manuscripts and relics.',
        hours: '7:00 AM - 5:00 PM',
        location: 'Yuksom, West Sikkim',
        attractions: 'Ancient manuscripts, Historical significance, Trekking trails'
      },
      ralang: {
        name: 'Ralang Monastery',
        description: 'Known for its sacred Cham dance performances',
        history: 'Established in 1768, Ralang monastery is famous for its annual Pang Lhabsol festival and traditional Cham dances.',
        traditions: 'Kagyu tradition with spectacular masked dance festivals and ceremonies honoring Mount Khangchendzonga.',
        hours: '6:00 AM - 6:00 PM',
        location: 'Ravangla, South Sikkim',
        attractions: 'Cham dance arena, Festival grounds, Mountain views'
      }
    },
    experiences: {
      meditation: 'Meditation Retreat at Rumtek',
      philosophy: 'Buddhist Philosophy Classes',
      homestay: 'Monastery Homestay Experience',
      crafts: 'Handcrafted Prayer Wheels'
    },
    traditions: {
      nyingma: {
        title: 'Nyingma Tradition',
        description: 'The oldest school of Tibetan Buddhism, emphasizing meditation and tantric practices. Most monasteries in Sikkim follow this tradition.'
      },
      kagyu: {
        title: 'Kagyu Tradition',
        description: 'Known for its emphasis on meditation and the transmission of teachings from teacher to student through oral tradition.'
      },
      festivals: {
        title: 'Sacred Festivals',
        description: 'Experience colorful Buddhist festivals with traditional Cham dances, prayers, and community celebrations.'
      }
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
    tourPackages: {
      title: 'टूर पैकेज',
      subtitle: 'सिक्किम ट्रेल्स के जादू को हमारी आध्यात्मिक और साहसिक यात्राओं के साथ खोजें।',
      basic: {
        title: 'बेसिक पैकेज',
        duration: '3 दिन / 2 रात',
        services: ['बजट होटल स्टे', 'स्थानीय दर्शनीय स्थल (गंगटोक)', 'साझा परिवहन', 'भोजन शामिल नहीं']
      },
      premium: {
        title: 'प्रीमियम पैकेज',
        duration: '5 दिन / 4 रात',
        services: ['3-सितारा होटल स्टे', 'गंगटोक + त्सोमगो झील + बाबा मंदिर', 'नाश्ता और रात का खाना शामिल', 'निजी/साझा परिवहन', 'निर्देशित टूर']
      },
      luxury: {
        title: 'लक्जरी पैकेज',
        duration: '7 दिन / 6 रात',
        services: ['5-सितारा होटल / रिसॉर्ट स्टे', 'गंगटोक + उत्तरी सिक्किम (लाचुंग, युमथांग)', 'सभी भोजन शामिल', 'निजी टैब और व्यक्तिगत गाइड', 'प्राथमिकता बुकिंग और VIP अनुभव']
      },
      safetySection: {
        title: 'सुरक्षा और ट्रैकिंग प्रणाली',
        description: "आपकी सुरक्षा हमारी आध्यात्मिक प्रतिबद्धता है। हमने हर यात्री की 24/7 सुरक्षा सुनिश्चित करने के लिए एक मजबूत डिजिटल ढांचा तैयार किया है।",
        features: {
          gps: { title: 'लाइव GPS ट्रैकिंग', desc: 'वास्तविक समय स्थान निगरानी।' },
          sos: { title: 'इमरजेंसी SOS', desc: 'तुरंत SOS प्रतिक्रिया।' },
          support: { title: '24/7 सहायता', desc: 'समर्पित सहायता टीम।' },
          partners: { title: 'सत्यापित भागीदार', desc: 'पूरी तरह से जांचे गए ड्राइवर और गाइड।' }
        }
      }
    },
    planJourney: 'अपनी आध्यात्मिक यात्रा की योजना बनाएं',
    planJourneySubtitle: 'सारथी को सिक्किम भर में व्यक्तिगत मठ तीर्थयात्रा के माध्यम से आपका मार्गदर्शन करने दें',
    startingPoint: 'प्रारंभिक स्थान',
    primaryMonastery: 'मुख्य मठ',
    duration: 'अवधि',
    spiritualFocus: 'आध्यात्मिक फोकस',
    createJourney: 'सारथी के साथ पवित्र यात्रा बनाएं',
    monasteryShowcase: 'सिक्किम के पवित्र मठ',
    monasteryShowcaseSubtitle: 'हिमालयी परिदृश्य में बसे प्राचीन बौद्ध मठों का अन्वेषण करें',
    exploreMonastery: 'मठ का अन्वेषण करें',
    spiritualExperiences: 'आध्यात्मिक अनुभव और स्थानीय संस्कृति',
    spiritualExperiencesSubtitle: 'प्रामाणिक बौद्ध प्रथाओं और सिक्किमी संस्कृति में खुद को डुबो दें',
    bookExperience: 'अनुभव बुक करें',
    buddhist: 'सिक्किम में बौद्ध परंपराएं',
    buddhistSubtitle: 'सिक्किम की समृद्ध बौद्ध विरासत और आध्यात्मिक प्रथाओं के बारे में जानें',
    routePlanner: 'मठ मार्ग योजनाकार',
    routePlannerSubtitle: 'सारथी के मार्गदर्शन के साथ सिक्किम भर में अपने मठ तीर्थयात्रा मार्ग की योजना बनाएं',
    interactiveMap: 'इंटरैक्टिव मठ मानचित्र',
    generateItinerary: 'सारथी के साथ यात्रा कार्यक्रम बनाएं',
    saarthiGreeting: "नमस्ते! मैं सारथी हूं, आपका आध्यात्मिक मार्गदर्शक। आज आप किस मठ का अन्वेषण करना चाहेंगे?",
    chatWithSaarthi: 'सारथी से बात करें!',
    spiritualGuide: 'आध्यात्मिक मार्गदर्शक',
    askAbout: 'मठों, ध्यान के बारे में पूछें...',
    about: {
      title: 'घूमो इंडिया के बारे में',
      subtitle: 'सिक्किम की आध्यात्मिक विरासत का आपका द्वार',
      description: 'घूमो इंडिया सिक्किम की पवित्र बौद्ध विरासत को संरक्षित करने और साझा करने के लिए समर्पित है। हम आध्यात्मिक साधकों को स्थानीय ज्ञान और सदियों पुरानी परंपराओं द्वारा निर्देशित प्रामाणिक मठ अनुभवों से जोड़ते हैं।',
      mission: 'हमारा मिशन',
      missionText: 'इन पवित्र स्थानों की पवित्रता और परंपराओं को संरक्षित करते हुए सिक्किम के आध्यात्मिक खजाने को सभी साधकों के लिए सुलभ बनाना।',
      vision: 'हमारी दृष्टि',
      visionText: 'एक ऐसी दुनिया जहां प्राचीन ज्ञान आधुनिक आत्माओं को शांति, करुणा और ज्ञान की ओर मार्गदर्शन करे।',
      values: 'हमारे मूल्य',
      valuesText: 'परंपरा के लिए सम्मान, प्रामाणिक अनुभव, टिकाऊ पर्यटन, और आध्यात्मिक विकास।',
      team: 'हमारी टीम',
      teamText: 'स्थानीय गाइड, बौद्ध विद्वान, और यात्रा विशेषज्ञ सार्थक आध्यात्मिक यात्राएं बनाने के लिए मिलकर काम कर रहे हैं।'
    },
    contact: {
      title: 'संपर्क करें',
      subtitle: 'आज ही अपनी आध्यात्मिक यात्रा शुरू करें',
      getInTouch: 'संपर्क में रहें',
      address: 'पता',
      addressText: 'गंगटोक, सिक्किम 737101, भारत',
      phone: 'फोन',
      phoneText: '+91 98765 43210',
      email: 'ईमेल',
      emailText: 'namaste@ghoomo.india',
      hours: 'कार्यालय समय',
      hoursText: 'सोम - शनि: सुबह 9:00 - शाम 6:00',
      sendMessage: 'संदेश भेजें',
      name: 'आपका नाम',
      subject: 'विषय',
      message: 'आपका संदेश',
      submit: 'संदेश भेजें'
    },
    bookingModal: {
      title: 'अपना अनुभव बुक करें',
      selectDate: 'तारीख चुनें',
      selectTime: 'समय चुनें',
      participants: 'प्रतिभागियों की संख्या',
      specialRequests: 'विशेष अनुरोध',
      totalCost: 'कुल लागत',
      bookNow: 'अभी बुक करें',
      close: 'बंद करें'
    },
    monasteryModal: {
      history: 'इतिहास',
      traditions: 'परंपराएं',
      visitingHours: 'दर्शन समय',
      location: 'स्थान',
      nearbyAttractions: 'नजदीकी आकर्षण',
      close: 'बंद करें'
    },
    itineraryResult: {
      title: 'आपका पवित्र यात्रा कार्यक्रम',
      generatedBy: 'सारथी द्वारा तैयार',
      day: 'दिन',
      close: 'बंद करें'
    },
    footer: {
      description: 'सिक्किम के पवित्र मठों और आध्यात्मिक विरासत की खोज करें। हिमालय में बौद्ध ज्ञान के लिए आपका मार्गदर्शक।',
      sacredPlaces: 'पवित्र स्थान',
      support: 'सहायता',
      connect: 'जुड़ें',
      followUs: 'आध्यात्मिक प्रेरणा के लिए हमें फॉलो करें',
      copyright: '© 2024 घूमो इंडिया। सभी अधिकार सुरक्षित। आध्यात्मिक साधकों के लिए 🙏 के साथ बनाया गया।',
      ar: {
        viewInAr: 'AR में देखें',
        instructions: 'AR निर्देश',
        close: 'AR दृश्य बंद करें'
      }
    },
    monasteries: {
      rumtek: {
        name: 'रुमटेक मठ',
        description: 'सिक्किम का सबसे बड़ा मठ, कर्मापा की गद्दी',
        history: '1966 में निर्मित, रुमटेक सिक्किम का सबसे बड़ा मठ है और कर्मा कग्यू वंश की मुख्य गद्दी है। यहां बहुमूल्य अवशेष और प्राचीन बौद्ध कलाकृतियां हैं।',
        traditions: 'कर्मा कग्यू परंपरा का पालन करता है जिसमें दैनिक प्रार्थना, ध्यान सत्र, और तिब्बती नव वर्ष समारोह सहित वार्षिक त्योहार शामिल हैं।',
        hours: 'सुबह 6:00 - शाम 6:00',
        location: 'गंगटोक से 24 किमी',
        attractions: 'स्वर्ण स्तूप, मठ संग्रहालय, प्रार्थना चक्र'
      },
      namchi: {
    name: 'नमची मठ',
    description: 'दक्षिण सिक्किम में स्थित एक प्रसिद्ध बौद्ध मठ, जो अपने शांत वातावरण और विशाल गुरु पद्मसंभव प्रतिमा के लिए प्रसिद्ध है।',
    history: 'नमची मठ की स्थापना गुरु पद्मसंभव की शिक्षाओं के संरक्षण और बौद्ध धर्म के प्रचार हेतु की गई थी। यह क्षेत्र में एक प्रमुख धार्मिक और सांस्कृतिक केंद्र है।',
    traditions: 'यहां वार्षिक बौद्ध त्योहार, पारंपरिक नृत्य और प्रार्थना सभाएं आयोजित की जाती हैं, जिनमें दूर-दूर से श्रद्धालु आते हैं।',
    hours: 'सुबह 8:00 - शाम 6:00',
    location: 'नमची, दक्षिण सिक्किम',
    attractions: 'गुरु पद्मसंभव की 135 फीट ऊंची प्रतिमा, सोलोफोक चोएतें, और आसपास के पर्वतीय दृश्य'
},
      tashiding: {
        name: 'ताशिदिंग मठ',
        description: 'दो नदियों के बीच पहाड़ी पर पवित्र मठ',
        history: '1717 में स्थापित, ताशिदिंग का अर्थ है "समर्पित केंद्रीय गौरव" और इसे सिक्किम के सबसे पवित्र मठों में से एक माना जाता है।',
        traditions: 'बुमचू समारोह के लिए प्रसिद्ध जहां भक्तों को पवित्र जल वितरित किया जाता है, जो आने वाले वर्ष की भविष्यवाणी करने में विश्वास किया जाता है।',
        hours: 'सुबह 6:00 - शाम 6:00',
        location: 'रंगित और रथोंग नदियों के बीच',
        attractions: 'पवित्र बुमचू कलश, चोर्तेन, नदी संगम दृश्य'
      },
      enchey: {
        name: 'एन्चे मठ',
        description: 'गंगटोक को देखने वाला सुंदर मठ',
        history: '1909 में निर्मित, एन्चे का अर्थ है "एकांत मंदिर" और इसकी स्थापना लामा द्रुप्तोब कार्पो द्वारा की गई थी जिनके बारे में माना जाता था कि उनके पास उड़ने की शक्ति थी।',
        traditions: 'न्यिंगमा परंपरा के साथ वार्षिक छम नृत्य प्रदर्शन और गंगटोक शहर की सुरक्षा के लिए विशेष प्रार्थनाएं।',
        hours: 'सुबह 6:00 - शाम 6:00',
        location: 'गंगटोक, पूर्वी सिक्किम',
        attractions: 'शहर के दृश्य, प्रार्थना झंडे, पारंपरिक वास्तुकला'
      },
      dubdi: {
        name: 'दुब्दी मठ',
        description: 'सिक्किम में निर्मित पहला मठ',
        history: '1701 में च्योग्याल नामग्याल द्वारा स्थापित, दुब्दी सिक्किम का सबसे पुराना मठ है और इस क्षेत्र में बौद्ध धर्म की शुरुआत का प्रतीक है।',
        traditions: 'न्यिंगमा परंपरा सिक्किम में लाई गई मूल शिक्षाओं को संरक्षित करती है, जिसमें प्राचीन पांडुलिपियां और अवशेष हैं।',
        hours: 'सुबह 7:00 - शाम 5:00',
        location: 'युक्सोम, पश्चिम सिक्किम',
        attractions: 'प्राचीन पांडुलिपियां, ऐतिहासिक महत्व, ट्रेकिंग ट्रेल्स'
      },
      ralang: {
        name: 'रालांग मठ',
        description: 'अपने पवित्र छम नृत्य प्रदर्शन के लिए प्रसिद्ध',
        history: '1768 में स्थापित, रालांग मठ अपने वार्षिक पांग ल्हाब्सोल त्योहार और पारंपरिक छम नृत्य के लिए प्रसिद्ध है।',
        traditions: 'कग्यू परंपरा के साथ शानदार मुखौटा नृत्य त्योहार और खांगचेंदज़ोंगा पर्वत का सम्मान करने वाले समारोह।',
        hours: 'सुबह 6:00 - शाम 6:00',
        location: 'रावंगला, दक्षिण सिक्किम',
        attractions: 'छम नृत्य मंच, त्योहार मैदान, पर्वत दृश्य'
      }
    },
    experiences: {
      meditation: 'रुमटेक में ध्यान रिट्रीट',
      philosophy: 'बौद्ध दर्शन कक्षाएं',
      homestay: 'मठ होमस्टे अनुभव',
      crafts: 'हस्तनिर्मित प्रार्थना चक्र'
    },
    traditions: {
      nyingma: {
        title: 'न्यिंगमा परंपरा',
        description: 'तिब्बती बौद्ध धर्म का सबसे पुराना स्कूल, ध्यान और तांत्रिक प्रथाओं पर जोर देता है। सिक्किम के अधिकांश मठ इस परंपरा का पालन करते हैं।'
      },
      kagyu: {
        title: 'कग्यू परंपरा',
        description: 'ध्यान और शिक्षक से छात्र तक मौखिक परंपरा के माध्यम से शिक्षाओं के प्रसारण पर जोर देने के लिए जाना जाता है।'
      },
      festivals: {
        title: 'पवित्र त्योहार',
        description: 'पारंपरिक छम नृत्य, प्रार्थना और सामुदायिक उत्सव के साथ रंगबिरंगे बौद्ध त्योहारों का अनुभव करें।'
      }
    }
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
    planJourney: 'तपाईंको आध्यात्मिक यात्राको योजना बनाउनुहोस्',
    planJourneySubtitle: 'सारथीलाई सिक्किमभरि व्यक्तिगत गुम्बा तीर्थयात्राको माध्यमबाट तपाईंको मार्गदर्शन गर्न दिनुहोस्',
    startingPoint: 'सुरुवाती स्थान',
    primaryMonastery: 'मुख्य गुम्बा',
    duration: 'अवधि',
    spiritualFocus: 'आध्यात्मिक फोकस',
    createJourney: 'सारथीसँग पवित्र यात्रा सिर्जना गर्नुहोस्',
    monasteryShowcase: 'सिक्किमका पवित्र गुम्बाहरू',
    monasteryShowcaseSubtitle: 'हिमालयी परिदृश्यमा बसेका प्राचीन बौद्ध गुम्बाहरूको अन्वेषण गर्नुहोस्',
    exploreMonastery: 'गुम्बाको अन्वेषण गर्नुहोस्',
    spiritualExperiences: 'आध्यात्मिक अनुभवहरू र स्थानीय संस्कृति',
    spiritualExperiencesSubtitle: 'प्रामाणिक बौद्ध अभ्यासहरू र सिक्किमी संस्कृतिमा आफूलाई डुबाउनुहोस्',
    bookExperience: 'अनुभव बुक गर्नुहोस्',
    buddhist: 'सिक्किममा बौद्ध परम्पराहरू',
    buddhistSubtitle: 'सिक्किमको समृद्ध बौद्ध सम्पदा र आध्यात्मिक अभ्यासहरूको बारेमा जान्नुहोस्',
    routePlanner: 'गुम्बा मार्ग योजनाकार',
    routePlannerSubtitle: 'सारथीको मार्गदर्शनमा सिक्किमभरि तपाईंको गुम्बा तीर्थयात्रा मार्गको योजना बनाउनुहोस्',
    interactiveMap: 'अन्तरक्रियात्मक गुम्बा नक्सा',
    generateItinerary: 'सारथीसँग यात्रा कार्यक्रम बनाउनुहोस्',
    saarthiGreeting: "नमस्ते! म सारथी हुँ, तपाईंको आध्यात्मिक मार्गदर्शक। आज तपाईं कुन गुम्बाको अन्वेषण गर्न चाहनुहुन्छ?",
    chatWithSaarthi: 'सारथीसँग कुरा गर्नुहोस्!',
    spiritualGuide: 'आध्यात्मिक मार्गदर्शक',
    askAbout: 'गुम्बाहरू, ध्यानको बारेमा सोध्नुहोस्...',
    about: {
      title: 'घुम्मो इन्डियाको बारेमा',
      subtitle: 'सिक्किमको आध्यात्मिक सम्पदाको तपाईंको ढोका',
      description: 'घुम्मो इन्डिया सिक्किमको पवित्र बौद्ध सम्पदालाई संरक्षण र साझेदारी गर्न समर्पित छ। हामी आध्यात्मिक खोजीहरूलाई स्थानीय ज्ञान र शताब्दीयौं पुरानो परम्पराहरूद्वारा निर्देशित प्रामाणिक गुम्बा अनुभवहरूसँग जोड्छौं।',
      mission: 'हाम्रो मिशन',
      missionText: 'यी पवित्र स्थानहरूको पवित्रता र परम्पराहरूलाई संरक्षण गर्दै सिक्किमका आध्यात्मिक खजानाहरूलाई सबै खोजीहरूका लागि पहुँचयोग्य बनाउनु।',
      vision: 'हाम्रो दृष्टिकोण',
      visionText: 'एक संसार जहाँ प्राचीन ज्ञानले आधुनिक आत्माहरूलाई शान्ति, करुणा र ज्ञानतर्फ मार्गदर्शन गर्छ।',
      values: 'हाम्रा मूल्यहरू',
      valuesText: 'परम्पराको सम्मान, प्रामाणिक अनुभवहरू, दिगो पर्यटन, र आध्यात्मिक विकास।',
      team: 'हाम्रो टोली',
      teamText: 'स्थानीय गाइडहरू, बौद्ध विद्वानहरू, र यात्रा विशेषज्ञहरू अर्थपूर्ण आध्यात्मिक यात्राहरू सिर्जना गर्न सँगै काम गरिरहेका छन्।'
    },
    contact: {
      title: 'सम्पर्क गर्नुहोस्',
      subtitle: 'आज नै तपाईंको आध्यात्मिक यात्रा सुरु गर्नुहोस्',
      getInTouch: 'सम्पर्कमा रहनुहोस्',
      address: 'ठेगाना',
      addressText: 'गंगटोक, सिक्किम 737101, भारत',
      phone: 'फोन',
      phoneText: '+91 8650882398',
      email: 'इमेल',
      emailText: 'namaste@ghoomo.india',
      hours: 'कार्यालय समय',
      hoursText: 'सोम - शनि: बिहान 9:00 - साँझ 6:00',
      sendMessage: 'सन्देश पठाउनुहोस्',
      name: 'तपाईंको नाम',
      subject: 'विषय',
      message: 'तपाईंको सन्देश',
      submit: 'सन्देश पठाउनुहोस्'
    },
    bookingModal: {
      title: 'तपाईंको अनुभव बुक गर्नुहोस्',
      selectDate: 'मिति छान्नुहोस्',
      selectTime: 'समय छान्नुहोस्',
      participants: 'सहभागीहरूको संख्या',
      specialRequests: 'विशेष अनुरोधहरू',
      totalCost: 'कुल लागत',
      bookNow: 'अहिले बुक गर्नुहोस्',
      close: 'बन्द गर्नुहोस्'
    },
    monasteryModal: {
      history: 'इतिहास',
      traditions: 'परम्पराहरू',
      visitingHours: 'भ्रमण समय',
      location: 'स्थान',
      nearbyAttractions: 'नजिकका आकर्षणहरू',
      close: 'बन्द गर्नुहोस्'
    },
    itineraryResult: {
      title: 'तपाईंको पवित्र यात्रा कार्यक्रम',
      generatedBy: 'सारथीद्वारा तयार गरिएको',
      day: 'दिन',
      close: 'बन्द गर्नुहोस्'
    },
    footer: {
      description: 'सिक्किमका पवित्र गुम्बाहरू र आध्यात्मिक सम्पदाको खोज गर्नुहोस्। हिमालयमा बौद्ध ज्ञानका लागि तपाईंको मार्गदर्शक।',
      sacredPlaces: 'पवित्र स्थानहरू',
      support: 'सहयोग',
      connect: 'जडान',
      followUs: 'आध्यात्मिक प्रेरणाका लागि हामीलाई फलो गर्नुहोस्',
      copyright: '© 2025 घुम्मो इन्डिया। सबै अधिकार सुरक्षित। आध्यात्मिक खोजीहरूका लागि 🙏 सँग बनाइएको।',
      tourPackages: {
        title: 'टूर प्याकेजहरू',
        subtitle: 'सिक्किम ट्रेल्सको जादू हाम्रो क्युरेट गरिएको आध्यात्मिक र साहसिक यात्राहरूको साथ पत्ता लगाउनुहोस्।',
        basic: {
          title: 'आधारभूत प्याकेज',
          duration: '३ दिन / २ रात',
          services: ['बजेट होटल बसाई', 'स्थानीय भ्रमण (गंगटोक)', 'साझा यातायात', 'खाना समावेश छैन']
        },
        premium: {
          title: 'प्रिमियम प्याकेज',
          duration: '५ दिन / ४ रात',
          services: ['३-तारे होटल बसाई', 'गंगटोक + छोगु ताल + बाबा मन्दिर', 'बिहानको खाजा र बेलुकाको खाना समावेश', 'निजी/साझा यातायात', 'गाइडेड टुरहरू']
        },
        luxury: {
          title: 'लक्जरी प्याकेज',
          duration: '७ दिन / ६ रात',
          services: ['५-तारे होटल / रिसोर्ट बसाई', 'गंगटोक + उत्तर सिक्किम (लाचुङ, युमथाङ)', 'सबै खाना समावेश', 'निजी क्याब र व्यक्तिगत गाइड', 'प्राथमिकता बुकिंग र VIP अनुभव']
        },
        safetySection: {
          title: 'सुरक्षा र ट्र्याकिङ प्रणाली',
          description: "तपाईंको सुरक्षा हाम्रो आध्यात्मिक प्रतिबद्धता हो। हामीले प्रत्येक यात्रीलाई २४/७ सुरक्षित राख्नको लागि एउटा बलियो डिजिटल पूर्वाधार निर्माण गरेका छौं।",
          features: {
            gps: { title: 'प्रत्यक्ष GPS ट्र्याकिङ', desc: 'वास्तविक-समय स्थान निगरानी।' },
            sos: { title: 'आपतकालीन SOS', desc: 'तत्काल SOS प्रतिक्रिया।' },
            support: { title: '२४/७ समर्थन', desc: 'समर्पित सहायता टोली।' },
            partners: { title: 'प्रमाणित साझेदारहरू', desc: 'कडा रूपमा जाँच गरिएका चालक र गाइडहरू।' }
          }
        }
      }
    },
    monasteries: {
      rumtek: {
        name: 'रुमटेक गुम्बा',
        description: 'सिक्किमको सबैभन्दा ठूलो गुम्बा, कर्मापाको गद्दी',
        history: '1966 मा निर्मित, रुमटेक सिक्किमको सबैभन्दा ठूलो गुम्बा हो र कर्मा कग्यू वंशको मुख्य गद्दी हो। यहाँ बहुमूल्य अवशेषहरू र प्राचीन बौद्ध कलाकृतिहरू छन्।',
        traditions: 'कर्मा कग्यू परम्पराको पालना गर्छ जसमा दैनिक प्रार्थना, ध्यान सत्रहरू, र तिब्बती नयाँ वर्ष समारोह सहित वार्षिक चाडपर्वहरू समावेश छन्।',
        hours: 'बिहान 6:00 - साँझ 6:00',
        location: 'गंगटोकबाट 24 किमी',
        attractions: 'सुनको स्तूप, गुम्बा संग्रहालय, प्रार्थना चक्रहरू'
      },
      namchi: {
    name: 'नामची गुम्बा',
    description: 'दक्षिण सिक्किममा अवस्थित एक प्रसिद्ध बौद्ध गुम्बा, शान्त वातावरण र गुरु पद्मसम्भवको विशाल मूर्तिका लागि प्रसिद्ध।',
    history: 'गुरु पद्मसम्भवका शिक्षाहरूको संरक्षण र बौद्ध धर्मको प्रचारका लागि स्थापना गरिएको यो गुम्बा दक्षिण सिक्किमको एक महत्वपूर्ण धार्मिक र सांस्कृतिक केन्द्र हो।',
    traditions: 'यहाँ वार्षिक बौद्ध पर्वहरू, पारम्परिक छाम नृत्य र प्रार्थना सभाहरू आयोजना गरिन्छन्, जहाँ विभिन्न स्थानबाट भक्तजन आउँछन्।',
    hours: 'बिहान ८:०० - बेलुकी ६:००',
    location: 'नामची, दक्षिण सिक्किम',
    attractions: '१३५ फिट अग्लो गुरु पद्मसम्भवको मूर्ति, सोलोफोक छोर्तेन, र हिमालयका मनोरम दृश्यहरू'
},
      tashiding: {
        name: 'ताशिदिङ गुम्बा',
        description: 'दुई नदीहरूको बीचमा पहाडमा पवित्र गुम्बा',
        history: '1717 मा स्थापित, ताशिदिङको अर्थ "समर्पित केन्द्रीय गौरव" हो र यसलाई सिक्किमका सबैभन्दा पवित्र गुम्बाहरू मध्ये एक मानिन्छ।',
        traditions: 'बुमचु समारोहका लागि प्रसिद्ध जहाँ भक्तहरूलाई पवित्र पानी वितरण गरिन्छ, जसले आउने वर्षको भविष्यवाणी गर्छ भन्ने विश्वास गरिन्छ।',
        hours: 'बिहान 6:00 - साँझ 6:00',
        location: 'रङ्गित र रथोङ नदीहरूको बीचमा',
        attractions: 'पवित्र बुमचु कलश, चोर्तेनहरू, नदी संगम दृश्यहरू'
      },
      enchey: {
        name: 'एन्चे गुम्बा',
        description: 'गंगटोकलाई हेर्ने सुन्दर गुम्बा',
        history: '1909 मा निर्मित, एन्चेको अर्थ "एकान्त मन्दिर" हो र यसको स्थापना लामा द्रुप्तोब कार्पोले गरेका थिए जसलाई उड्ने शक्ति भएको विश्वास गरिन्थ्यो।',
        traditions: 'न्यिङमा परम्पराको साथ वार्षिक छम नृत्य प्रदर्शनहरू र गंगटोक शहरको सुरक्षाका लागि विशेष प्रार्थनाहरू।',
        hours: 'बिहान 6:00 - साँझ 6:00',
        location: 'गंगटोक, पूर्वी सिक्किम',
        attractions: 'शहरका दृश्यहरू, प्रार्थना झण्डाहरू, परम्परागत वास्तुकला'
      },
      dubdi: {
        name: 'दुब्दी गुम्बा',
        description: 'सिक्किममा निर्मित पहिलो गुम्बा',
        history: '1701 मा च्योग्याल नामग्यालले स्थापना गरेको, दुब्दी सिक्किमको सबैभन्दा पुरानो गुम्बा हो र यस क्षेत्रमा बौद्ध धर्मको सुरुवातको प्रतीक हो।',
        traditions: 'न्यिङमा परम्पराले सिक्किममा ल्याइएका मूल शिक्षाहरूलाई संरक्षण गर्छ, जसमा प्राचीन पाण्डुलिपिहरू र अवशेषहरू छन्।',
        hours: 'बिहान 7:00 - साँझ 5:00',
        location: 'युक्सोम, पश्चिम सिक्किम',
        attractions: 'प्राचीन पाण्डुलिपिहरू, ऐतिहासिक महत्व, ट्रेकिङ ट्रेलहरू'
      },
      ralang: {
        name: 'रालाङ गुम्बा',
        description: 'आफ्ना पवित्र छम नृत्य प्रदर्शनहरूका लागि प्रसिद्ध',
        history: '1768 मा स्थापित, रालाङ गुम्बा आफ्नो वार्षिक पाङ ल्हाब्सोल चाड र परम्परागत छम नृत्यहरूका लागि प्रसिद्ध छ।',
        traditions: 'कग्यू परम्पराको साथ शानदार मुखौटा नृत्य चाडपर्वहरू र खाङचेन्दजोङ्गा पर्वतको सम्मान गर्ने समारोहहरू।',
        hours: 'बिहान 6:00 - साँझ 6:00',
        location: 'रावाङला, दक्षिण सिक्किम',
        attractions: 'छम नृत्य मञ्च, चाडपर्व मैदान, पर्वत दृश्यहरू'
      }
    },
    experiences: {
      meditation: 'रुमटेकमा ध्यान रिट्रीट',
      philosophy: 'बौद्ध दर्शन कक्षाहरू',
      homestay: 'गुम्बा होमस्टे अनुभव',
      crafts: 'हस्तनिर्मित प्रार्थना चक्रहरू'
    },
    traditions: {
      nyingma: {
        title: 'न्यिङमा परम्परा',
        description: 'तिब्बती बौद्ध धर्मको सबैभन्दा पुरानो स्कूल, ध्यान र तान्त्रिक अभ्यासहरूमा जोड दिन्छ। सिक्किमका अधिकांश गुम्बाहरूले यो परम्पराको पालना गर्छन्।'
      },
      kagyu: {
        title: 'कग्यू परम्परा',
        description: 'ध्यान र शिक्षकबाट विद्यार्थीलाई मौखिक परम्पराको माध्यमबाट शिक्षाहरूको प्रसारणमा जोड दिनका लागि प्रसिद्ध।'
      },
      festivals: {
        title: 'पवित्र चाडपर्वहरू',
        description: 'परम्परागत छम नृत्यहरू, प्रार्थनाहरू, र सामुदायिक उत्सवहरूको साथ रंगबिरंगी बौद्ध चाडपर्वहरूको अनुभव गर्नुहोस्।'
      }
    }
  },
  "འབྲུག་ཁ": {
    appName: 'གྷུམ་མོ་ཨིན་ཌི་ཡ',
    tagline: 'སི་ཀིམ་གྱི་དམ་པའི་དགོན་པ་ཚུ',
    heroTitle: 'སི་ཀིམ་གྱི་དམ་པའི་དགོན་པ་ཚུ',
    heroSubtitle: 'ཧི་མ་ལ་ཡའི་སྙིང་པོ་ནང་ལུ་ རྙིང་པའི་ཤེས་རབ་དང་ ཞི་བདེའི་བསམ་གཏན་ དེ་ལས་ སྤྱོད་པའི་བྱང་ཆུབ་ཀྱི་ཚོལ་ཞིབ་འབད།',
    beginJourney: 'སྤྱོད་པའི་འགྲུལ་བསྐྱོད་འགོ་བཙུགས',
    exploreMonasteries: 'དགོན་པ་ཚུ་ཚོལ་ཞིབ་འབད',
    nav: {
      home: 'ཁྱིམ',
      monasteries: 'དགོན་པ་ཚུ',
      spiritualJourney: 'སྤྱོད་པའི་འགྲུལ་བསྐྱོད',
      traditions: 'ནང་པའི་གཏན་ཚིགས',
      packages: 'སྐོར་བསྐྱོད་ཐུམ་སྒྲིལ།',
      experiences: 'མྱོང་ཚོར',
      about: 'ང་བཅས་ཀྱི་སྐོར',
      contact: 'འབྲེལ་བ'
    },
    tourPackages: {
      title: 'སྐོར་བསྐྱོད་ཐུམ་སྒྲིལ།',
      subtitle: 'ང་བཅས་ཀྱི་སྤྱོད་པའི་འགྲུལ་བསྐྱོད་དང་ལྷན་དུ་སི་ཀིམ་གྱི་ལེགས་ཆ་ཚུ་ཤེས།',
      basic: {
        title: 'གཞི་རྩའི་ཐུམ་སྒྲིལ།',
        duration: 'ཉིན་མ་ ༣ / ཕྱི་རུ་ ༢',
        services: ['ཧོ་ཊེལ་ཕོག་ཚོད', 'ས་གནས་ལྟ་བཤལ (སྒང་ཏོག་)', 'མཉམ་སྤྱོད་འགྲུལ་འཁོར', 'བཞེས་སྒོ་མེད']
      },
      premium: {
        title: 'གཙོ་བོའི་ཐུམ་སྒྲིལ།',
        duration: 'ཉིན་མ་ ༥ / ཕྱི་རུ་ ༤',
        services: ['སྐར་མ་ ༣ ཅན་གྱི་ཧོ་ཊེལ', 'སྒང་ཏོག་ + མཚོ་མོ་ + བཱ་བཱ་ལྷ་ཁང', 'དྲོ་བཞེས་དང་ཕྱི་བཞེས་ཡོད', 'སྒེར་གྱི་འགྲུལ་འཁོར', 'ལམ་སྟོན་པ']
      },
      luxury: {
        title: 'མཐོ་རིམ་ཐུམ་སྒྲིལ།',
        duration: 'ཉིན་མ་ ༧ / ཕྱི་རུ་ ༦',
        services: ['སྐར་མ་ ༥ ཅན་གྱི་ཧོ་ཊེལ', 'བྱང་སི་ཀིམ (ལ་ཅུང་ ཡུམ་ཐང)', 'བཞེས་སྒོ་ག་ར་ཡོད', 'སྒེར་གྱི་ཁེབ་དང་ལམ་སྟོན་པ', 'VIP མྱོང་བ']
      },
      safetySection: {
        title: 'ཉེན་སྲུང་དང་རྗེས་བཤེར་ལམ་ལུགས།',
        description: "ཁྱོད་ཀྱི་ཉེན་སྲུང་འདི་ང་བཅས་ཀྱི་དམ་བཅའ་ཨིན།",
        features: {
          gps: { title: 'GPS རྗེས་བཤེར།', desc: 'དངོས་གཞིའི་ས་གནས་ལྟ་རྟོག' },
          sos: { title: 'ཉེན་བརྡ་ SOS', desc: 'འཕྲལ་ལས་ལན་གསལ།' },
          support: { title: '༢༤/༧ རྒྱབ་སྐྱོར།', desc: 'རྟག་པར་རོགས་རམ་སྡེ་ཚན།' },
          partners: { title: 'ངོ་སྦྱོར་ཅན་གྱི་ཆ་རོགས།', desc: 'བློ་གཏད་ཅན་གྱི་ལམ་སྟོན་པ།' }
        }
      }
    },
    planJourney: 'ཁྱོད་ཀྱི་སྤྱོད་པའི་འགྲུལ་བསྐྱོད་ཀྱི་འཆར་གཞི་བཟོ',
    planJourneySubtitle: 'སཱར་ཐི་གིས་སི་ཀིམ་ཡོངས་རྫོགས་ནང་ལུ་ སྒེར་གྱི་དགོན་པ་གནས་སྐོར་གྱི་ལམ་ལུ་ལམ་སྟོན་འབད་གེ',
    startingPoint: 'འགོ་བཙུགས་ས',
    primaryMonastery: 'གཙོ་བོའི་དགོན་པ',
    duration: 'དུས་ཚོད',
    spiritualFocus: 'སྤྱོད་པའི་གཙོ་གནད',
    createJourney: 'སཱར་ཐི་དང་ལྷན་དུ་དམ་པའི་འགྲུལ་བསྐྱོད་གསར་བསྐྲུན',
    monasteryShowcase: 'སི་ཀིམ་གྱི་དམ་པའི་དགོན་པ་ཚུ',
    monasteryShowcaseSubtitle: 'ཧི་མ་ལ་ཡའི་ལྟ་ཞིབ་ནང་ལུ་བཞུགས་པའི་རྙིང་པའི་ནང་པའི་དགོན་པ་ཚུ་ཚོལ་ཞིབ་འབད',
    exploreMonastery: 'དགོན་པ་ཚོལ་ཞིབ་འབད',
    spiritualExperiences: 'སྤྱོད་པའི་མྱོང་ཚོར་དང་ས་གནས་རིག་གཞུང',
    spiritualExperiencesSubtitle: 'ངོ་མའི་ནང་པའི་སྤྱོད་པ་དང་སི་ཀིམ་པའི་རིག་གཞུང་ནང་ལུ་ཁྱོད་རང་བཙུད',
    bookExperience: 'མྱོང་ཚོར་སྒྲིག་འཇུག',
    buddhist: 'སི་ཀིམ་ནང་ལུ་ནང་པའི་གཏན་ཚིགས',
    buddhistSubtitle: 'སི་ཀིམ་གྱི་ལེགས་ཤོམ་ནང་པའི་རིང་ལུགས་དང་སྤྱོད་པའི་སྤྱོད་ལམ་ཚུ་གི་སྐོར་ལུ་ཤེས',
    routePlanner: 'དགོན་པ་ལམ་ཁ་འཆར་གཞི་བཟོ་མི',
    routePlannerSubtitle: 'སཱར་ཐི་གི་ལམ་སྟོན་དང་ལྷན་དུ་སི་ཀིམ་ཡོངས་རྫོགས་ནང་ལུ་ཁྱོད་ཀྱི་དགོན་པ་གནས་སྐོར་ལམ་ཁ་འཆར་གཞི་བཟོ',
    interactiveMap: 'འབྲེལ་མཐུད་ཅན་གྱི་དགོན་པ་ས་ཁྲ',
    generateItinerary: 'སཱར་ཐི་དང་ལྷན་དུ་འགྲུལ་བསྐྱོད་ལས་རིམ་བཟོ',
    saarthiGreeting: "བཀྲ་ཤིས་བདེ་ལེགས! ང་སཱར་ཐི་ཨིན་ ཁྱོད་ཀྱི་སྤྱོད་པའི་ལམ་སྟོན་པ། ད་རེས་ཁྱོད་ཀྱིས་ག་ཅི་དགོན་པ་ཚོལ་ཞིབ་འབད་ནི་ཨིན་ན?",
    chatWithSaarthi: 'སཱར་ཐི་དང་ལྷན་དུ་གླེང་སྟེགས!',
    spiritualGuide: 'སྤྱོད་པའི་ལམ་སྟོན་པ',
    askAbout: 'དགོན་པ་ བསམ་གཏན་གྱི་སྐོར་ལུ་དྲི...',
    about: {
      title: 'གྷུམ་མོ་ཨིན་ཌི་ཡའི་སྐོར',
      subtitle: 'སི་ཀིམ་གྱི་སྤྱོད་པའི་རིང་ལུགས་ཀྱི་ཁྱོད་ཀྱི་སྒོ',
      description: 'གྷུམ་མོ་ཨིན་ཌི་ཡ་འདི་སི་ཀིམ་གྱི་དམ་པའི་ནང་པའི་རིང་ལུགས་སྲུང་སྐྱོབ་དང་མཉམ་སྤྱོད་འབད་ནི་ལུ་ཞབས་ཏོག་འབད་དོ། ང་བཅས་ཀྱིས་སྤྱོད་པའི་འཚོལ་མི་ཚུ་ས་གནས་ཀྱི་ཤེས་རབ་དང་བརྒྱ་ཕྲག་མང་པོའི་རྙིང་པའི་གཏན་ཚིགས་ཀྱིས་ལམ་སྟོན་འབད་མི་ངོ་མའི་དགོན་པ་མྱོང་ཚོར་དང་མཐུད་དོ།',
      mission: 'ང་བཅས་ཀྱི་ལས་འགན',
      missionText: 'འ་ནི་དམ་པའི་གནས་ཚུ་གི་དམ་པ་ཉིད་དང་གཏན་ཚིགས་ཚུ་སྲུང་སྐྱོབ་འབད་བའི་སྐབས་ལུ་སི་ཀིམ་གྱི་སྤྱོད་པའི་གཏེར་ཚུ་འཚོལ་མི་ཚུ་ག་ར་ལུ་ལྷོད་ལམ་ཅན་བཟོ་ནི།',
      vision: 'ང་བཅས་ཀྱི་མཐོང་སྣང',
      visionText: 'རྙིང་པའི་ཤེས་རབ་ཀྱིས་ད་ལྟོའི་སེམས་ཚུ་ཞི་བདེ་ སྙིང་རྗེ་ དེ་ལས་བྱང་ཆུབ་ཀྱི་ཕྱོགས་ལུ་ལམ་སྟོན་འབད་མི་འཛམ་གླིང་ཅིག',
      values: 'ང་བཅས་ཀྱི་རིན་ཐང',
      valuesText: 'གཏན་ཚིགས་ལུ་བརྩི་མཐོང་ ངོ་མའི་མྱོང་ཚོར་ རྟག་བརྟན་འགྲུལ་བསྐྱོད་ དེ་ལས་སྤྱོད་པའི་འཕེལ་རྒྱས།',
      team: 'ང་བཅས་ཀྱི་སྡེ་ཚན',
      teamText: 'ས་གནས་ཀྱི་ལམ་སྟོན་པ་ ནང་པའི་མཁས་པ་ དེ་ལས་འགྲུལ་བསྐྱོད་ཀྱི་ཆེད་ལས་པ་ཚུ་དོན་ལྡན་གྱི་སྤྱོད་པའི་འགྲུལ་བསྐྱོད་གསར་བསྐྲུན་འབད་ནི་ལུ་མཉམ་འབྲེལ་འབད་དོ།'
    },
    contact: {
      title: 'འབྲེལ་བ་འབད',
      subtitle: 'ད་རེས་ཁྱོད་ཀྱི་སྤྱོད་པའི་འགྲུལ་བསྐྱོད་འགོ་བཙུགས',
      getInTouch: 'འབྲེལ་བ་འབད',
      address: 'ཁ་བྱང',
      addressText: 'སྒང་ཏོག་ སི་ཀིམ་ 737101, རྒྱ་གར',
      phone: 'ཁ་པར',
      phoneText: '+9108650882398',
      email: 'གློག་འཕྲིན',
      emailText: 'namaste@ghoomo.india',
      hours: 'ལས་ཁུངས་དུས་ཚོད',
      hoursText: 'ཟླ་བ་ - སྤེན་པ: ཞོགས་པ་ 9:00 - དགོང་དག་ 6:00',
      sendMessage: 'འཕྲིན་ཡིག་གཏང',
      name: 'ཁྱོད་ཀྱི་མིང',
      subject: 'བརྗོད་གཞི',
      message: 'ཁྱོད་ཀྱི་འཕྲིན་ཡིག',
      submit: 'འཕྲིན་ཡིག་གཏང'
    },
    bookingModal: {
      title: 'ཁྱོད་ཀྱི་མྱོང་ཚོར་སྒྲིག་འཇུག་འབད',
      selectDate: 'ཚེས་གྲངས་གདམ་ཁ་རྐྱབ',
      selectTime: 'དུས་ཚོད་གདམ་ཁ་རྐྱབ',
      participants: 'མཉམ་ཞུགས་པའི་གྲངས་ཀ',
      specialRequests: 'དམིགས་བསལ་ཞུ་བ',
      totalCost: 'ཆ་ཚང་གི་གོང',
      bookNow: 'ད་ལྟོ་སྒྲིག་འཇུག་འབད',
      close: 'ཁ་རྒྱབ'
    },
    monasteryModal: {
      history: 'ལོ་རྒྱུས',
      traditions: 'གཏན་ཚིགས',
      visitingHours: 'ལྟ་སྐོར་དུས་ཚོད',
      location: 'གནས་ས',
      nearbyAttractions: 'ཉེ་འདབས་ཀྱི་སྐད་འདེགས',
      close: 'ཁ་རྒྱབ'
    },
    itineraryResult: {
      title: 'ཁྱོད་ཀྱི་དམ་པའི་འགྲུལ་བསྐྱོད་ལས་རིམ',
      generatedBy: 'སཱར་ཐི་གིས་བཟོ་བ',
      day: 'ཉིན',
      close: 'ཁ་རྒྱབ'
    },
    footer: {
      description: 'སི་ཀིམ་གྱི་དམ་པའི་དགོན་པ་དང་སྤྱོད་པའི་རིང་ལུགས་ཚོལ་ཞིབ་འབད། ཧི་མ་ལ་ཡ་ནང་ལུ་ནང་པའི་ཤེས་རབ་ཀྱི་ཁྱོད་ཀྱི་ལམ་སྟོན་པ།',
      sacredPlaces: 'དམ་པའི་གནས་ཚུ',
      support: 'རམ་འདེགས',
      connect: 'མཐུད་ལམ',
      followUs: 'སྤྱོད་པའི་བསམ་སྦྱོར་གྱི་དོན་ལུ་ང་བཅས་རྗེས་འབྲང་འབད',
      copyright: '© 202 གྷུམ་མོ་ཨིན་ཌི་ཡ། ཐོབ་ཐང་ག་ར་ཉམས་སྲུང་ཡོད། སྤྱོད་པའི་འཚོལ་མི་ཚུ་གི་དོན་ལུ་ 🙏 དང་ལྷན་དུ་བཟོ་བ།'
    },
    monasteries: {
      rumtek: {
        name: 'རུམ་ཐེག་དགོན་པ',
        description: 'སི་ཀིམ་གྱི་དགོན་པ་ཆེ་ཤོས་ ཀར་མ་པའི་གདན་ས',
        history: '1966 ལུ་བཟོ་བ་ རུམ་ཐེག་འདི་སི་ཀིམ་གྱི་དགོན་པ་ཆེ་ཤོས་ཨིན་མི་དང་ཀར་མ་བཀའ་བརྒྱུད་རིགས་རུས་ཀྱི་གཙོ་བོའི་གདན་ས་ཨིན། འདི་ནང་ལུ་རིན་ཐང་ཅན་གྱི་རིང་བཤུས་དང་རྙིང་པའི་ནང་པའི་རིག་གནས་ཡོད།',
        traditions: 'ཀར་མ་བཀའ་བརྒྱུད་གཏན་ཚིགས་འདི་རྗེས་འབྲང་འབདཝ་ཨིན་ དེ་ནང་ལུ་ཉིན་རེའི་གསོལ་འདེབས་ བསམ་གཏན་ཚོགས་འདུ་ དེ་ལས་བོད་ཀྱི་ལོ་གསར་དུས་སྟོན་ཚུད་པའི་ལོ་རེའི་དུས་སྟོན་ཚུ་ཚུད་དོ།',
        hours: 'ཞོགས་པ་ 6:00 - དགོང་དག་ 6:00',
        location: 'སྒང་ཏོག་ལས་ཀི་ལོ་མི་ཊར་ 24',
        attractions: 'གསེར་གྱི་མཆོད་རྟེན་ དགོན་པ་ཤེས་རིག་ཁང་ མ་ནི་འཁོར་ལོ'
      },
      namchi: {
    name: 'ནམ་ཆི་དགོན་པ།',
    description: 'སུའི་སི་ཀིམ་གྱི་ལྷ་ཁང་གཅིག་ལ་ཡོད་པ་དང་། ཞི་བ་དང་གུ་རུ་པདྨ་འབྱུང་གནས་ཀྱི་མཐོ་བོའི་རྟགས་བརྒྱབ་དེས་གྲགས་པ།',
    history: 'གུ་རུ་པདྨ་འབྱུང་གནས་ཀྱི་བསྟན་པ་ཉམས་སྲུང་དང་། ཆོས་ལུགས་འཕེལ་བའི་དོན་དུ་གསར་བར་བཞུགས་པ་དགོན་པ་འདི་ཡིན།',
    traditions: 'དགོན་པ་འདིར་ལོ་རྒྱུས་ལྟར་བོད་ཀྱི་ཆོས་དབྱིངས་དང་ལྷ་ཆོས་རིགས་ཀྱི་སྒྲུབ་ཆེན་དང་། འཁོར་ལོ་བསྐོར་བ་དང་གསོལ་འདེབས་དུས་ཆེན་བྱུང་བ།',
    hours: 'སྔ་དགུ་ནས་དགོང་དྲོ་༦ བར།',
    location: 'ནམ་ཆི། སུའི་སི་ཀིམ།',
    attractions: 'གུ་རུ་པདྨ་འབྱུང་གནས་ཀྱི་མཐོ་བོའི་ལྷ་རྟགས། སོ་ལོ་ཕོག་ཆོས་རྟེན། ཧི་མ་ལ་ཡའི་རི་བོ་གཞོན་དུས་དང་མཐུན་པའི་མཐུན་སྣང་།'
},
      tashiding: {
        name: 'བཀྲ་ཤིས་སྡིང་དགོན་པ',
        description: 'ཆུ་བོ་གཉིས་ཀྱི་བར་ན་རི་ལུ་དམ་པའི་དགོན་པ',
        history: '1717 ལུ་གཞི་བཙུགས་འབད་བ་ བཀྲ་ཤིས་སྡིང་གི་དོན་ "མཆོད་པའི་དབུས་ཀྱི་དཔལ" ཟེར་མི་ཨིན་མི་དང་སི་ཀིམ་གྱི་དགོན་པ་དམ་པ་ཤོས་ཚུ་ནང་ལས་གཅིག་སྦེ་བརྩིས་དོ།',
        traditions: 'བུམ་ཆུ་དུས་སྟོན་གྱི་དོན་ལུ་གྲགས་ཅན་ དེ་ནང་ལུ་མོས་གུས་ཅན་ཚུ་ལུ་དམ་པའི་ཆུ་བགོ་བཀྲམ་འབདཝ་ཨིན་ འདི་གིས་འོང་མའི་ལོ་གི་ལུང་བསྟན་འབད་ནི་སྦེ་ཡིད་ཆེས་འབདཝ་ཨིན།',
        hours: 'ཞོགས་པ་ 6:00 - དགོང་དག་ 6:00',
        location: 'རང་གིད་དང་ར་ཐོང་ཆུ་བོ་གཉིས་ཀྱི་བར་ན',
        attractions: 'དམ་པའི་བུམ་ཆུ་བུམ་པ་ མཆོད་རྟེན་ ཆུ་བོ་འདུས་ས་ལྟ་ཞིབ'
      },
      enchey: {
        name: 'ཨེན་ཅེ་དགོན་པ',
        description: 'སྒང་ཏོག་ལུ་ལྟ་མི་སྡུག་པའི་དགོན་པ',
        history: '1909 ལུ་བཟོ་བ་ ཨེན་ཅེ་གི་དོན་ "དབེན་པའི་ལྷ་ཁང" ཟེར་མི་ཨིན་མི་དང་འདི་གི་གཞི་བཙུགས་བླ་མ་གྲུབ་ཐོབ་དཀར་པོ་གིས་འབད་བ་ཨིན་ དེ་ལུ་འཕུར་ནུས་པ་ཡོད་པ་སྦེ་ཡིད་ཆེས་འབདཝ་ཨིན།',
        traditions: 'རྙིང་མ་གཏན་ཚིགས་དང་ལྷན་དུ་ལོ་རེའི་འཆམ་སྟོན་དང་སྒང་ཏོག་གྲོང་ཁྱེར་གྱི་སྲུང་སྐྱོབ་ཀྱི་དོན་ལུ་དམིགས་བསལ་གསོལ་འདེབས།',
        hours: 'ཞོགས་པ་ 6:00 - དགོང་དག་ 6:00',
        location: 'སྒང་ཏོག་ ཤར་སི་ཀིམ',
        attractions: 'གྲོང་ཁྱེར་གྱི་ལྟ་ཞིབ་ གསོལ་འདེབས་དར་ཆོ་ སྲོལ་རྒྱུན་བཟོ་རིག'
      },
      dubdi: {
        name: 'སྒྲུབ་སྡེ་དགོན་པ',
        description: 'སི་ཀིམ་ནང་ལུ་བཟོ་བའི་དགོན་པ་དང་པོ',
        history: '1701 ལུ་ཆོས་རྒྱལ་རྣམ་རྒྱལ་གིས་གཞི་བཙུགས་འབད་བ་ སྒྲུབ་སྡེ་འདི་སི་ཀིམ་གྱི་དགོན་པ་རྙིང་ཤོས་ཨིན་མི་དང་འ་ནི་ས་ཁོངས་ནང་ལུ་ནང་པ་སངས་རྒྱས་ཀྱི་ཆོས་ལུགས་འགོ་བཙུགས་པའི་རྟགས་མཚན་ཨིན།',
        traditions: 'རྙིང་མ་གཏན་ཚིགས་ཀྱིས་སི་ཀིམ་ལུ་འབག་འོང་བའི་རྩ་བའི་བསླབ་བྱ་ཚུ་སྲུང་སྐྱོབ་འབདཝ་ཨིན་ དེ་ནང་ལུ་རྙིང་པའི་དཔེ་ཆ་དང་རིང་བཤུས་ཚུ་ཡོད།',
        hours: 'ཞོགས་པ་ 7:00 - དགོང་དག་ 5:00',
        location: 'ཡུག་སོམ་ ནུབ་སི་ཀིམ',
        attractions: 'རྙིང་པའི་དཔེ་ཆ་ ལོ་རྒྱུས་ཀྱི་གལ་ཅན་ཉིད་ རི་རྒྱུགས་ལམ་ཁ'
      },
      ralang: {
        name: 'ར་ལང་དགོན་པ',
        description: 'དམ་པའི་འཆམ་སྟོན་གྱི་དོན་ལུ་གྲགས་ཅན',
        history: '1768 ལུ་གཞི་བཙུགས་འབད་བ་ ར་ལང་དགོན་པ་འདི་ལོ་རེའི་སྤང་ལྷ་བསོལ་དུས་སྟོན་དང་སྲོལ་རྒྱུན་འཆམ་གྱི་དོན་ལུ་གྲགས་ཅན་ཨིན།',
        traditions: 'བཀའ་བརྒྱུད་གཏན་ཚིགས་དང་ལྷན་དུ་ཧ་ལམ་ཅན་གྱི་ཞལ་འཆམ་དུས་སྟོན་དང་གངས་དཀར་པུན་སུམ་གྱི་བརྩི་མཐོང་འབད་མི་དུས་སྟོན།',
        hours: 'ཞོགས་པ་ 6:00 - དགོང་དག་ 6:00',
        location: 'ར་བང་ལ་ ལྷོ་སི་ཀིམ',
        attractions: 'འཆམ་ཞབས་ས་ དུས་སྟོན་ཞིང་ཁ་ རི་ལྟ་ཞིབ'
      }
    },
    experiences: {
      meditation: 'རུམ་ཐེག་ནང་ལུ་བསམ་གཏན་ཁྲོམ་སྒྲིལ',
      philosophy: 'ནང་པ་སངས་རྒྱས་ཀྱི་ལྟ་གྲུབ་སློབ་ཁྲིད',
      homestay: 'དགོན་པ་ཁྱིམ་དུ་སྡོད་མྱོང་ཚོར',
      crafts: 'ལག་བཟོའི་མ་ནི་འཁོར་ལོ'
    },
    traditions: {
      nyingma: {
        title: 'རྙིང་མ་གཏན་ཚིགས',
        description: 'བོད་ཀྱི་ནང་པ་སངས་རྒྱས་ཀྱི་ཆོས་ལུགས་ཀྱི་སློབ་གྲྭ་རྙིང་ཤོས་ བསམ་གཏན་དང་རྒྱུད་སྡེའི་སྤྱོད་པ་ལུ་གཙོ་བོར་བཏོན་དོ། སི་ཀིམ་གྱི་དགོན་པ་མང་ཤོས་ཀྱིས་འ་ནི་གཏན་ཚིགས་འདི་རྗེས་འབྲང་འབདཝ་ཨིན།'
      },
      kagyu: {
        title: 'བཀའ་བརྒྱུད་གཏན་ཚིགས',
        description: 'བསམ་གཏན་དང་དགེ་བའི་བཤེས་གཉེན་ལས་སློབ་ཕྲུག་ལུ་ཁ་གྱུར་སྲོལ་རྒྱུན་གྱི་ལམ་ལུ་བསླབ་བྱ་རྒྱུད་སྤྲོད་འབད་ནི་ལུ་གཙོ་བོར་བཏོན་མི་གི་དོན་ལུ་གྲགས་ཅན།'
      },
      festivals: {
        title: 'དམ་པའི་དུས་སྟོན',
        description: 'སྲོལ་རྒྱུན་འཆམ་ གསོལ་འདེབས་ དེ་ལས་སྤྱི་ཚོགས་ཀྱི་དགའ་སྟོན་དང་ལྷན་དུ་ཁ་དོག་སྣ་ཚོགས་ཅན་གྱི་ནང་པའི་དུས་སྟོན་ཚུ་གི་མྱོང་ཚོར་ལེན།'
      }
    }
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

  // New FAQ / Problem Solving State
  // New FAQ / Problem Solving State
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  
  // Notification State
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  
  // Spiritual Journey Form States
  const [journeyForm, setJourneyForm] = useState({
    startingPoint: '',
    primaryMonastery: '',
    duration: '',
    spiritualFocus: ''
  });
  const [showItinerary, setShowItinerary] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  
  
  // Modal States
  const [selectedMonastery, setSelectedMonastery] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    participants: 1,
    specialRequests: ''
  });

  const t = translations[currentLanguage];

  const monasteries = [
    { 
      id: 'rumtek', 
      name: t.monasteries.rumtek.name, 
      description: t.monasteries.rumtek.description, 
      established: '1966',
      tradition: 'Karma Kagyu',
      image: 'Rumtek.jpg',
      rating: 4.8
    },
    { 
      id: 'namchi', 
      name: t.monasteries.namchi.name, 
      description: t.monasteries.namchi.description, 
      established: '1995',
      tradition: 'Karma Kagyu',
      image: 'NAMCHI.jpg',
      rating: 4.7
    },
   
    { 
      id: 'tashiding', 
      name: t.monasteries.tashiding.name, 
      description: t.monasteries.tashiding.description, 
      established: '1717',
      tradition: 'Nyingma',
      image: 'Tashiding.jpg',
      rating: 4.9
    },
    { 
      id: 'enchey', 
      name: t.monasteries.enchey.name, 
      description: t.monasteries.enchey.description, 
      established: '1909',
      tradition: 'Nyingma',
      image: 'Enchey.jpg',
      rating: 4.6
    },
    { 
      id: 'dubdi', 
      name: t.monasteries.dubdi.name, 
      description: t.monasteries.dubdi.description, 
      established: '1701',
      tradition: 'Nyingma',
      image: 'Dubdi.jpg',
      rating: 4.5
    },
    { 
      id: 'ralang', 
      name: t.monasteries.ralang.name, 
      description: t.monasteries.ralang.description, 
      established: '1768',
      tradition: 'Kagyu',
      image: 'Ralang.jpg',
      rating: 4.7
    }
  ];

  const experiences = [
    { 
      id: 'meditation', 
      name: t.experiences.meditation, 
      price: '₹2,500', 
      duration: '3 days',
      image: 'meditation.webp',
      description: 'Deep meditation retreat with experienced monks'
    },
    { 
      id: 'philosophy', 
      name: t.experiences.philosophy, 
      price: '₹1,800', 
      duration: '2 days',
      image: 'class.jpeg',
      description: 'Learn Buddhist philosophy and teachings'
    },
    { 
      id: 'homestay', 
      name: t.experiences.homestay, 
      price: '₹3,200', 
      duration: '5 days',
      image: 'homestay.jpeg',
      description: 'Live with monks and experience daily monastery life'
    },
    { 
      id: 'crafts', 
      name: t.experiences.crafts, 
      price: '₹800', 
      duration: '1 day',
      image: 'wheel.jpeg',
      description: 'Create traditional prayer wheels with local artisans'
    }
  ];
  

  const handleJourneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!journeyForm.startingPoint || !journeyForm.primaryMonastery || !journeyForm.duration || !journeyForm.spiritualFocus) {
      alert(currentLanguage === 'English' ? 'Please fill all fields' : 
            currentLanguage === 'हिंदी' ? 'कृपया सभी फ़ील्ड भरें' :
            currentLanguage === 'नेपाली' ? 'कृपया सबै फिल्डहरू भर्नुहोस्' :
            'ཁ་སྐོང་ག་ར་བཀང་གནང');
      return;
    }

    // Generate itinerary based on form data
    const itinerary = generateItinerary(journeyForm);
    setGeneratedItinerary(itinerary);
    setShowItinerary(true);
  };

  const generateItinerary = (form: typeof journeyForm) => {
    const days = form.duration === '3-5 days' ? 4 : form.duration === '1-2 weeks' ? 10 : 7;
    const itinerary = [];

    // Detailed activity mapping based on focus with icons
    const focusData = {
      Meditation: {
        activities: [
          'Pre-dawn meditation with the resident monks',
          'Workshop on Anapanasati (Breath Mindfulness)',
          'Dharma talk on "Inner Peace in a Busy World"',
          'Evening candle-lit meditation session',
          'Walking meditation in the herb gardens',
          'Silent self-reflection period'
        ],
        tips: [
          'Wear loose, comfortable clothing.',
          'Bring a personal shawl for early morning sessions.',
          'Focus on your breath if your mind wanders.'
        ]
      },
      Philosophy: {
        activities: [
          'Study session on the Heart Sutra',
          'Interactive Q&A with the Khenpo (Head Scholar)',
          'Observe active monastic debating in the courtyard',
          'Lecture on the Four Noble Truths',
          'Visit to the monastery library and ancient scripts',
          'Comparative study of Buddhist schools in Sikkim'
        ],
        tips: [
          'Cary a notebook for important insights.',
          'Ask questions respectfully during Q&A sessions.',
          'Listen deeply to the nuances of logic.'
        ]
      },
      Culture: {
        activities: [
          'Traditional Thangka painting demonstration',
          'Butter tea and local snack preparation class',
          'Evening Cham (Masked Dance) basics workshop',
          'Village tour focused on monastic interdependence',
          'Learn basic Tibetan/Sikkimese greetings',
          'Visit to the monastery museum of artifacts'
        ],
        tips: [
          'Ask permission before taking photos of people.',
          'Try the local butter tea even if it tastes different.',
          'Respect local customs like removing shoes.'
        ]
      },
      Pilgrimage: {
        activities: [
          'Kora (Circumambulation) around the main shrine',
          'Offering 108 butter lamps for world peace',
          'Consecration ceremony and personal blessing',
          'Hike to Guru Padmasambhava\'s sacred cave',
          'Prayer flag hoisting ceremony',
          'River confluence ritual at Tashiding'
        ],
        tips: [
          'Walk in a clockwise direction around shrines.',
          'Carry a prayer wheel if you have one.',
          'Stay hydrated during high-altitude hikes.'
        ]
      }
    };

    const focusKey = (form.spiritualFocus === 'Meditation' || form.spiritualFocus === 'ध्यान') ? 'Meditation' :
                     (form.spiritualFocus === 'Philosophy' || form.spiritualFocus === 'दर्शन') ? 'Philosophy' :
                     (form.spiritualFocus === 'Culture' || form.spiritualFocus === 'संस्कृति') ? 'Culture' : 'Pilgrimage';

    const selectedFocus = focusData[focusKey as keyof typeof focusData];

    for (let i = 1; i <= days; i++) {
      let dayPlan = {
        day: i,
        monastery: '',
        activities: [] as string[],
        focus: form.spiritualFocus,
        travelTip: selectedFocus.tips[i % selectedFocus.tips.length]
      };

      if (i === 1) {
        dayPlan.monastery = form.primaryMonastery;
        dayPlan.activities = [
          'Sacred arrival and purification ritual',
          'Monastery orientation and protocol briefing',
          'Introductory talk by the resident guide'
        ];
      } else if (i === days) {
        dayPlan.monastery = form.primaryMonastery;
        dayPlan.activities = [
          'Special farewell blessing ceremony',
          'Personal reflection session in the temple',
          'Gratitude offering and departure'
        ];
      } else {
        // Rotate through monasteries for a richer experience
        const monasteryIndex = (i - 2) % monasteries.length;
        dayPlan.monastery = monasteries[monasteryIndex].name;
        
        // Select 2 unique activities for the day
        const act1 = selectedFocus.activities[(i * 2) % selectedFocus.activities.length];
        const act2 = selectedFocus.activities[(i * 2 + 1) % selectedFocus.activities.length];
        dayPlan.activities = [act1, act2];
      }

      itinerary.push(dayPlan);
    }

    return {
      title: currentLanguage === 'English' ? `${days}-Day Sacred ${form.spiritualFocus} Voyage` : `${days} दिवसीय पवित्र ${form.spiritualFocus} यात्रा`,
      startingPoint: form.startingPoint,
      focus: form.spiritualFocus,
      days: itinerary
    };
  };

  const handleOpenAR = (monasteryId: string) => {
    setArModelId(monasteryId);
    setIsARModalOpen(true);
  };

  const handleARView = (monasteryId: string) => {
    setSelectedMonastery(null);
    handleOpenAR(monasteryId);
  };

  const handleExploreMonastery = (monasteryId: string) => {
    setSelectedMonastery(monasteryId);
  };

  const handleBookExperience = (experienceId: string) => {
    setSelectedExperience(experienceId);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to admin storage
    const experience = experiences.find(e => e.id === selectedExperience);
    adminStorage.saveBooking({
      experienceName: experience?.name || 'Experience',
      date: bookingData.date,
      time: bookingData.time,
      participants: bookingData.participants,
      specialRequests: bookingData.specialRequests,
      totalCost: `${experience?.price.replace('₹', '')} × ${bookingData.participants}`
    });

    showNotification(currentLanguage === 'English' ? 'Booking confirmed! We will contact you soon.' : 
          currentLanguage === 'हिंदी' ? 'बुकिंग पुष्ट! हम जल्द ही आपसे संपर्क करेंगे।' :
          currentLanguage === 'नेपाली' ? 'बुकिङ पुष्टि भयो! हामी चाँडै तपाईंलाई सम्पर्क गर्नेछौं।' :
          'སྒྲིག་འཇུག་ངེས་པ་བཟོ་ཡི! ང་བཅས་ཀྱིས་མ་འགྱངས་པར་ཁྱོད་དང་འབྲེལ་བ་འབད་འོང་།');
    setSelectedExperience(null);
    setBookingData({ date: '', time: '', participants: 1, specialRequests: '' });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Let Netlify handle the underlying form, but we capture data locally too
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (name && subject && message) {
      adminStorage.saveHelpRequest({ name, subject, message });
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleBeginJourney = () => {
    scrollToSection('spiritual-journey');
  };

  const handleExploreMonasteriesClick = () => {
    scrollToSection('monasteries');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 animate-bounce-in">
          <div className="bg-white border-l-4 border-red-600 shadow-2xl rounded-lg p-4 flex items-center space-x-3">
            <Star className="h-6 w-6 text-red-600 animate-pulse" />
            <p className="font-bold text-gray-900">{notification.message}</p>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
               <img
          src="/tours.png"
          alt="Sikkim Trails Logo"
          className="h-16 w-16 object-contain"
        />
              <div>
                <h1 className="text-2xl font-bold text-orange-800">{t.appName}</h1>
                <p className="text-sm text-red-600">{t.tagline}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {Object.entries(t.nav).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                  className={`text-gray-700 hover:text-red-600 transition-colors ${
                    activeSection === (key === 'home' ? 'hero' : key) ? 'text-red-600 font-semibold' : ''
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as keyof typeof translations)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="English">🇬🇧 English</option>
                <option value="हिंदी">🇮🇳 हिंदी</option>
                <option value="नेपाली">🇳🇵 नेपाली</option>
                <option value="འབྲུག་ཁ">🏔️ འབྲུག་ཁ</option>
              </select>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-transform active:scale-95"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                {Object.entries(t.nav).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                    className="text-left text-gray-700 hover:text-red-600 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
<section
  id="hero"
  className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: 'url("/sikkim.jpg")' }}
>
  {/* Gradient & dark overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-orange-800 to-red-800 opacity-20"></div> 
  <div className="absolute inset-0 bg-black/40"></div>

  <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
      {t.heroTitle}
    </h1>
    <p className="text-xl md:text-2xl mb-8 text-orange-100 leading-relaxed">
      {t.heroSubtitle}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={handleBeginJourney}
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        {t.beginJourney}
      </button>
      <button
        onClick={handleExploreMonasteriesClick}
        className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
      >
        {t.exploreMonasteries}
      </button>
    </div>
  </div>
</section>


      {/* Spiritual Journey Section */}
      <section id="spiritualJourney" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.planJourney}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.planJourneySubtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleJourneySubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.startingPoint}
                  </label>
                  <select
                    value={journeyForm.startingPoint}
                    onChange={(e) => setJourneyForm({...journeyForm, startingPoint: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value=""disabled selected hidden>Select starting point</option>
                    <option value="Gangtok">Gangtok</option>
                    <option value="Pelling">Pelling</option>
                    <option value="Yuksom">Yuksom</option>
                    <option value="Ravangla">Ravangla</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.primaryMonastery}
                  </label>
                  <select
                    value={journeyForm.primaryMonastery}
                    onChange={(e) => setJourneyForm({...journeyForm, primaryMonastery: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                   <option value="" disabled selected hidden>Select primary monastery</option>
                       {monasteries.map(monastery => (
                       <option key={monastery.id} value={monastery.name}>
                       {monastery.name}
                       </option>
                     ))}
                   </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.duration}
                  </label>
                  <select
                    value={journeyForm.duration}
                    onChange={(e) => setJourneyForm({...journeyForm, duration: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                   <option value="" disabled selected hidden>Select duration</option>
                  <option value="3-5 days">3-5 days</option>
                  <option value="1 week">1 week</option>
                  <option value="1-2 weeks">1-2 weeks</option>

                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.spiritualFocus}
                  </label>
                  <select
                    value={journeyForm.spiritualFocus}
                    onChange={(e) => setJourneyForm({...journeyForm, spiritualFocus: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value=""disabled selected hidden>Select spiritual focus</option>
                    <option value="Meditation">Meditation</option>
                    <option value="Philosophy">Buddhist Philosophy</option>
                    <option value="Culture">Cultural Immersion</option>
                    <option value="Pilgrimage">Sacred Pilgrimage</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 px-8 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t.createJourney}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Monasteries Section */}
      <section id="monasteries" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.monasteryShowcase}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.monasteryShowcaseSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monasteries.map((monastery) => (
              <div key={monastery.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img
                    src={monastery.image}
                    alt={monastery.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{monastery.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Est. {monastery.established}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{monastery.name}</h3>
                  <p className="text-gray-600 mb-4">{monastery.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-orange-600 font-semibold bg-orange-100 px-3 py-1 rounded-full">
                      {monastery.tradition}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExploreMonastery(monastery.id)}
                      className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      {t.exploreMonastery}
                    </button>
                    <button
                      onClick={() => handleOpenAR(monastery.id)}
                      className="bg-orange-100 text-orange-600 p-3 rounded-lg hover:bg-orange-200 transition-colors"
                      title="View in AR"
                    >
                      <Camera className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.spiritualExperiences}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.spiritualExperiencesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img
                    src={experience.image}
                    alt={experience.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-red-600">
                    {experience.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{experience.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{experience.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-orange-600 font-semibold bg-orange-100 px-3 py-1 rounded-full flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {experience.duration}
                    </span>
                  </div>
                  <button
                    onClick={() => handleBookExperience(experience.id)}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    {t.bookExperience}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buddhist Traditions Section */}
      <section id="traditions" className="py-20 bg-gradient-to-br from-red-900 to-orange-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">{t.buddhist}</h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {t.buddhistSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-2xl font-bold mb-4">{t.traditions.nyingma.title}</h4>
              <p className="opacity-90 mb-4">
                {t.traditions.nyingma.description}
              </p>
              <ul className="text-sm opacity-80 space-y-1">
                <li>• {t.monasteries.dubdi.name}</li>
                <li>• {t.monasteries.tashiding.name}</li>
                <li>• {t.monasteries.enchey.name}</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-2xl font-bold mb-4">{t.traditions.kagyu.title}</h4>
              <p className="opacity-90 mb-4">
                {t.traditions.kagyu.description}
              </p>
              <ul className="text-sm opacity-80 space-y-1">
                <li>• {t.monasteries.rumtek.name}</li>
                <li>• {t.monasteries.ralang.name}</li>
                 <li>• {t.monasteries.namchi.name}</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-2xl font-bold mb-4">{t.traditions.festivals.title}</h4>
              <p className="opacity-90 mb-4">
                {t.traditions.festivals.description}
              </p>
              <ul className="text-sm opacity-80 space-y-1">
                <li>• Losar (Tibetan New Year)</li>
                <li>• Saga Dawa Festival</li>
                <li>• Bumchu Ceremony</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
     

      {/* Tour Packages Section */}
      <Packages t={t} />

      {/* About Section */}
<section id="about" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Main About Content */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.about.title}</h2>
      <p className="text-xl text-red-600 font-semibold mb-8">{t.about.subtitle}</p>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">{t.about.description}</p>
    </div>

    {/* Cards for Mission, Vision, etc. */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t.about.mission}</h3>
        <p className="text-gray-600">{t.about.missionText}</p>
      </div>

      <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t.about.vision}</h3>
        <p className="text-gray-600">{t.about.visionText}</p>
      </div>

      <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t.about.values}</h3>
        <p className="text-gray-600">{t.about.valuesText}</p>
      </div>

      <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t.about.team}</h3>
        <p className="text-gray-600">{t.about.teamText}</p>
      </div>
    </div>

    {/* TEAM NAME INTRO */}
   

    {/* OUR TEAM SECTION */}
    <div className="text-center mb-12 mt-10">
      <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h3>
      <p className="text-gray-600 mt-2 text-lg">Innovators • Dreamers • Builders</p>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        The passionate minds behind our vision and success.
      </p>
    </div>

    {/* Team Members */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
  
  {/* 1. Ashish Panwar */}
  <a
    href="https://www.linkedin.com/in/ashish-panwar-2408232b6/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center p-3 sm:p-6 block"
  >
    <img
      src="ashish.jpg"
      alt="Ashish Panwar"
      className="w-20 h-20 sm:w-32 sm:h-32 rounded-full mx-auto mb-2 sm:mb-4 object-cover border-2 sm:border-4 border-orange-200 hover:scale-105 transition duration-300"
    />
    <h4 className="text-sm sm:text-xl font-semibold text-gray-900">Ashish Panwar</h4>
    <p className="text-red-600 font-medium mb-1 sm:mb-2 text-xs sm:text-base">Founder & CEO</p>
    <p className="text-gray-600 text-[10px] sm:text-sm">Leading the team with innovation and vision.</p>
  </a>

  {/* 2. Niharika Pal */}
  <a
    href="https://www.linkedin.com/in/niharika-pal-779969302?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center p-3 sm:p-6 block"
  >
    <img
      src="nikki.jpeg"    
      alt="Niharika Pal"
      className="w-20 h-20 sm:w-32 sm:h-32 rounded-full mx-auto mb-2 sm:mb-4 object-cover border-2 sm:border-4 border-orange-200 hover:scale-105 transition duration-300"
    />
    <h4 className="text-sm sm:text-xl font-semibold text-gray-900">Niharika Pal</h4>  
    <p className="text-red-600 font-medium mb-1 sm:mb-2 text-xs sm:text-base">Creative Director & Strategist</p>
    <p className="text-gray-600 text-[10px] sm:text-sm">Bringing creative ideas and smart strategies.</p>
  </a>

  {/* 3. Puru Sharma */}
  <a
    href="https://www.linkedin.com/in/puru-sharma-5b118432a/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center p-3 sm:p-6 block"
  >
    <img
      src="puru.jpeg"
      alt="Puru Sharma"
      className="w-20 h-20 sm:w-32 sm:h-32 rounded-full mx-auto mb-2 sm:mb-4 object-cover border-2 sm:border-4 border-orange-200 hover:scale-105 transition duration-300"
    />
    <h4 className="text-sm sm:text-xl font-semibold text-gray-900">Puru Sharma</h4>
    <p className="text-red-600 font-medium mb-1 sm:mb-2 text-xs sm:text-base">Technical Lead & Data Manager</p>
    <p className="text-gray-600 text-[10px] sm:text-sm">Building reliable and scalable solutions.</p>
  </a>

</div>

  </div>
</section>

       {/* Interactive Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">{t.routePlanner}</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.routePlannerSubtitle}
            </p>
          </div>

         <div className="max-w-4xl mx-auto bg-gray-100 rounded-2xl p-8 text-center">
  <div className="bg-white rounded-lg p-12 mb-6">
    <MapPin className="w-16 h-16 text-red-600 mx-auto mb-4" />
    <h4 className="text-2xl font-bold text-gray-800 mb-2">{t.interactiveMap}</h4>
    <p className="text-gray-600 mb-4">
      Click on monasteries to create your spiritual journey route with detailed directions and timing
    </p>

    {/* GOOGLE MAP IFRAME */}
    <div className="relative w-full h-[450px] rounded-xl overflow-hidden mb-6">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d453610.04136021645!2d88.2657417!3d27.3498313!3m2!1i1024!2i768!4f13.1!2m1!1ssikkim%20monastery%20MAP%20LINK!5e0!3m2!1sen!2sin!4v1758209245407!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    <button 
      onClick={() => {
        scrollToSection('spiritualJourney');
        const firstInput = document.querySelector('select');
        if (firstInput) firstInput.focus();
        showNotification(currentLanguage === 'English' ? 'Personalize your itinerary here!' : 'यहाँ अपनी यात्रा कार्यक्रम को अनुकूलित करें!');
      }}
      className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-xl flex items-center space-x-2 mx-auto"
    >
      <Sparkles className="h-5 w-5" />
      <span>{t.generateItinerary}</span>
    </button>
  </div>
</div>

        </div>
      </section>
   

      {/* Problem Solving / FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Traveler Essentials</h2>
            <p className="text-xl text-gray-600">Solving the most common problems for your Sikkim journey</p>
          </div>

          <div className="grid gap-6">
            {[
              {
                q: "How do I get a Restricted Area Permit (RAP)?",
                a: "For international travelers, RAP is mandatory and can be obtained at the Rangpo/Melli checkposts (free of charge) or applied through registered travel agents. Indian nationals only need permits for North Sikkim and Nathula. You'll need 2 passport photos and ID proof.",
                icon: <Shield className="h-6 w-6 text-red-600" />
              },
              {
                q: "Best way to prevent altitude sickness?",
                a: "Acclimatize gradually. Rest in Gangtok for a day before heading to North Sikkim. Stay hydrated, avoid alcohol, and carry 'Diamox' if prescribed by your doctor. If you feel dizzy, descend immediately. Garlic soup is a local remedy!",
                icon: <Mountain className="h-6 w-6 text-orange-600" />
              },
              {
                q: "What are the essential packing items?",
                a: "Layered clothing is key! Even in summer, nights can be chilly. Bring sturdy walking shoes, a raincoat, power bank, universal adapter, and your basic first-aid kit. Don't forget sunscreen and sunglasses.",
                icon: <Heart className="h-6 w-6 text-red-500" />
              },
              {
                q: "Is there mobile connectivity in monasteries?",
                a: "In most town monasteries (Rumtek, Enchey), you'll have decent 4G. However, in high-altitude areas like North Sikkim or remote monasteries (Dubdi), signal can be spotty or non-existent. BSNL works best in remote areas.",
                icon: <Phone className="h-6 w-6 text-orange-500" />
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden transition-all hover:shadow-xl">
                <button
                  onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-orange-50/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-50 p-3 rounded-xl">{item.icon}</div>
                    <span className="text-xl font-bold text-gray-900">{item.q}</span>
                  </div>
                  <div className={`transform transition-transform duration-300 ${activeFAQ === idx ? 'rotate-180' : ''}`}>
                    <Star className="h-6 w-6 text-red-500 fill-current" />
                  </div>
                </button>
                {activeFAQ === idx && (
                  <div className="p-8 pt-2 text-gray-700 border-t border-orange-50 bg-white/50 animate-fade-in">
                    <p className="leading-relaxed text-lg">{item.a}</p>
                    <button className="mt-4 text-orange-600 font-bold text-sm hover:underline flex items-center">
                      Read more on Saarthi Guide <Sparkles className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.contact.title}</h2>
            <p className="text-xl text-red-600 font-semibold">{t.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.contact.getInTouch}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <LocationIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{t.contact.address}</h4>
                    <p className="text-gray-600">{t.contact.addressText}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{t.contact.phone}</h4>
                    <p className="text-gray-600">{t.contact.phoneText}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{t.contact.email}</h4>
                    <p className="text-gray-600">{t.contact.emailText}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{t.contact.hours}</h4>
                    <p className="text-gray-600">{t.contact.hoursText}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.sendMessage}</h3>
              
              <form
  name="contact"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  className="space-y-6"
  onSubmit={handleContactSubmit}
>
  {/* Hidden Netlify fields */}
  <input type="hidden" name="form-name" value="contact" />
  <p className="hidden">
    <label>
      Don’t fill this out if you're human: <input name="bot-field" />
    </label>
  </p>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {t.contact.name}
    </label>
    <input
      type="text"
      name="name"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {t.contact.subject}
    </label>
    <input
      type="text"
      name="subject"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {t.contact.message}
    </label>
    <textarea
      name="message"
      rows={5}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      required
    ></textarea>
  </div>

  <button
    type="submit"
    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
  >
    {t.contact.submit}
  </button>
</form>

            </div>
          </div>
        </div>
      </section>

      {/* AR Modal Integration */}
      <ARModal 
        isOpen={isARModalOpen}
        onClose={() => setIsARModalOpen(false)}
        monasteryName={arModelId ? monasteries.find(m => m.id === arModelId)?.name || '' : ''}
        translations={t}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                 <img
          src="/tours.png"
          alt="Sikkim Trails Logo"
          className="h-16 w-16 object-contain"
        />
                <div>
                  <h3 className="text-2xl font-bold">{t.appName}</h3>
                  <p className="text-red-400">{t.tagline}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t.footer.description}
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                  <Heart className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors cursor-pointer">
                  <Mountain className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                  <Star className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">{t.footer.sacredPlaces}</h4>
              <ul className="space-y-3">
                {monasteries.slice(0, 4).map(monastery => (
                  <li key={monastery.id}>
                    <button 
                      onClick={() => handleExploreMonastery(monastery.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors text-left"
                    >
                      {monastery.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">{t.footer.support}</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-red-400 transition-colors">{t.nav.about}</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-red-400 transition-colors">{t.nav.contact}</button></li>
                <li><button onClick={() => scrollToSection('spiritual-journey')} className="text-gray-300 hover:text-red-400 transition-colors">{t.nav.spiritualJourney}</button></li>
                <li><button onClick={() => scrollToSection('experiences')} className="text-gray-300 hover:text-red-400 transition-colors">{t.nav.experiences}</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                {t.footer.copyright}
              </p>
              <div className="flex items-center space-x-6">
                <p className="text-gray-400 text-sm">
                  {t.footer.followUs}
                </p>
                <button 
                  onClick={() => setIsAdminOpen(true)}
                  className="text-gray-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest border border-gray-800 px-3 py-1 rounded-lg hover:border-red-600"
                >
                  Admin Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

     {/* New Chat Bot Toggle Button */}
{!isChatOpen && (
  <button
    onClick={toggleChat}
    className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 z-40 group animate-bounce"
  >
    <MessageCircle className="h-6 w-6" />
    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-2 py-1 animate-pulse">
      Live
    </div>
    <div className="absolute -left-40 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      Chat with Saarthi
    </div>
  </button>
)}

{/* New Chat Bot Component */}
<Chatbot 
  currentLanguage={currentLanguage}
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}
/>

      {/* Itinerary Modal */}
      {showItinerary && generatedItinerary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{t.itineraryResult.title}</h3>
                  <p className="text-orange-100">{t.itineraryResult.generatedBy}</p>
                </div>
                <button
                  onClick={() => setShowItinerary(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{generatedItinerary.title}</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <p><strong>{t.startingPoint}:</strong> {generatedItinerary.startingPoint}</p>
                  <p><strong>{t.spiritualFocus}:</strong> {generatedItinerary.focus}</p>
                </div>
              </div>

              <div className="space-y-6">
                {generatedItinerary.days.map((day: any, index: number) => (
                  <div key={index} className="border-l-4 border-red-500 pl-6 pb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {day.day}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {t.itineraryResult.day} {day.day}: {day.monastery}
                      </h4>
                    </div>
                    <ul className="space-y-4 ml-11">
                      {day.activities.map((activity: string, actIndex: number) => {
                        // Better icon mapping based on activity content
                        let Icon = Sparkles;
                        if (day.focus?.includes('Meditation') || day.focus?.includes('ध्यान')) Icon = Clock;
                        else if (day.focus?.includes('Philosophy') || day.focus?.includes('दर्शन')) Icon = BookOpen;
                        else if (day.focus?.includes('Culture') || day.focus?.includes('संस्कृति')) Icon = Music;
                        else if (day.focus?.includes('Pilgrimage') || day.focus?.includes('तीर्थयात्रा')) Icon = MapPin;
                        
                        return (
                          <li key={actIndex} className="text-gray-700 flex items-start space-x-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                            <div className="bg-orange-100 p-2 rounded-lg group-hover:bg-orange-200 transition-colors">
                              <Icon className="h-5 w-5 text-orange-600" />
                            </div>
                             <span className="font-medium text-lg">{activity}</span>
                          </li>
                        );
                      })}
                    </ul>
                    {day.travelTip && (
                      <div className="mt-3 ml-11 p-3 bg-orange-50 rounded-lg text-sm text-orange-800 flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Tip:</strong> {day.travelTip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  {currentLanguage === 'English' ? 'This itinerary is customized based on your preferences. Contact us to book your spiritual journey!' :
                   currentLanguage === 'हिंदी' ? 'यह यात्रा कार्यक्रम आपकी प्राथमिकताओं के आधार पर अनुकूलित है। अपनी आध्यात्मिक यात्रा बुक करने के लिए हमसे संपर्क करें!' :
                   currentLanguage === 'नेपाली' ? 'यो यात्रा कार्यक्रम तपाईंको प्राथमिकताहरूको आधारमा अनुकूलित छ। तपाईंको आध्यात्मिक यात्रा बुक गर्न हामीलाई सम्पर्क गर्नुहोस्!' :
                   'འ་ནི་འགྲུལ་བསྐྱོད་ལས་རིམ་འདི་ཁྱོད་ཀྱི་དགའ་འདོད་ལུ་གཞི་བཞག་སྟེ་བཟོ་ཡོད། ཁྱོད་ཀྱི་སྤྱོད་པའི་འགྲུལ་བསྐྱོད་སྒྲིག་འཇུག་འབད་ནི་ལུ་ང་བཅས་དང་འབྲེལ་བ་འབད!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monastery Detail Modal */}
{selectedMonastery && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 z-50">
    <div className="bg-white rounded-2xl shadow-2xl w-[95vw] max-w-3xl h-[85vh] overflow-hidden flex flex-col">
      {(() => {
        const monastery = monasteries.find(m => m.id === selectedMonastery);
        const monasteryData = monastery ? t.monasteries[selectedMonastery as keyof typeof t.monasteries] : null;

        if (!monastery || !monasteryData) return null;

        return (
          <>
            {/* Header Image */}
            <div className="relative">
              <img
                src={monastery.image}
                alt={monastery.name}
                className="w-full h-36 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedMonastery(null)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 hover:bg-white text-gray-800 p-1 sm:p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full flex items-center space-x-1 sm:space-x-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <span className="font-semibold text-sm sm:text-base">{monastery.rating}</span>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{monastery.name}</h2>

                  {/* AR View button removed from top on mobile, handled in footer */}
                  <button className="hidden"></button>
                </div>

                <p className="text-gray-600 mb-3 text-sm sm:text-base">{monastery.description}</p>

                <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">
                    Est. {monastery.established}
                  </span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-semibold">
                    {monastery.tradition}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-600" />
                    {t.monasteryModal.history}
                  </h3>
                  <p className="text-gray-600 mb-4">{monasteryData.history}</p>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-600" />
                    {t.monasteryModal.traditions}
                  </h3>
                  <p className="text-gray-600">{monasteryData.traditions}</p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-600" />
                    {t.monasteryModal.visitingHours}
                  </h3>
                  <p className="text-gray-600 mb-4">{monasteryData.hours}</p>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-600" />
                    {t.monasteryModal.location}
                  </h3>
                  <p className="text-gray-600 mb-4">{monasteryData.location}</p>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-600" />
                    {t.monasteryModal.nearbyAttractions}
                  </h3>
                  <p className="text-gray-600">{monasteryData.attractions}</p>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
<div className="p-3 sm:p-4 border-t border-gray-200 flex flex-col gap-2">
  {/* Spiritual Journey - full width */}
  <button
    onClick={() => {
      setSelectedMonastery(null);
      scrollToSection('spiritualJourney'); // <-- match the section ID exactly
    }}
    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-2 px-3 sm:px-4 rounded-md sm:rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105"
  >
    {t.nav.spiritualJourney}
  </button>

  {/* AR View + Contact side by side on desktop, stacked on mobile */}
  <div className="flex flex-col sm:flex-row w-full gap-2">
    <button
      onClick={() => handleARView(monastery.id)}
      className="flex-1 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600 text-white py-2 px-2 rounded-md text-sm font-semibold transition-all duration-300 transform hover:scale-105"
    >
      AR View
    </button>

    <button
      onClick={() => {
        setSelectedMonastery(null);
        scrollToSection('contact');
      }}
      className="flex-1 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 py-2 px-2 rounded-md text-sm font-semibold transition-all duration-300"
    >
      {t.nav.contact}
    </button>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            {(() => {
              const experience = experiences.find(e => e.id === selectedExperience);
              if (!experience) return null;

              return (
                <>
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">{t.bookingModal.title}</h3>
                        <p className="text-orange-100">{experience.name}</p>
                      </div>
                      <button
                        onClick={() => setSelectedExperience(null)}
                        className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.bookingModal.selectDate}
                        </label>
                        <input
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.bookingModal.selectTime}
                        </label>
                        <select
                          value={bookingData.time}
                          onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.bookingModal.participants}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={bookingData.participants}
                        onChange={(e) => setBookingData({...bookingData, participants: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.bookingModal.specialRequests}
                      </label>
                      <textarea
                        rows={3}
                        value={bookingData.specialRequests}
                        onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Any special requirements or dietary restrictions..."
                      ></textarea>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">{t.bookingModal.totalCost}:</span>
                        <span className="text-2xl font-bold text-red-600">
                          {experience.price} × {bookingData.participants}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 px-8 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      {t.bookingModal.bookNow}
                    </button>
                  </form>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* AR View Modal */}
      {isARModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col relative">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                AR Experience: {monasteries.find(m => m.id === arModelId)?.name}
              </h3>
              <button 
                onClick={() => setIsARModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 bg-gray-100 relative">
              <model-viewer
                src="https://modelviewer.dev/shared-assets/models/shishigashira.glb"
                ios-src="https://modelviewer.dev/shared-assets/models/shishigashira.usdz"
                alt="3D Traditional Model"
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                shadow-intensity="1"
                style={{ width: '100%', height: '100%', backgroundColor: '#f3f4f6' }}
              >
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md">
                  Click the AR icon to view in your space
                </div>
              </model-viewer>
            </div>

            <div className="p-4 bg-orange-50 rounded-b-2xl">
              <p className="text-sm text-center text-orange-800">
                <strong>Pro Tip:</strong> Use your phone's camera to place this sacred structure in your room! 
                (Placeholder model shown for architecture visualization)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {isAdminOpen && (
        <AdminPanel onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
};


export default App;