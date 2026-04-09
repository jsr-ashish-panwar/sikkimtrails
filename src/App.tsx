import React, { useState, useEffect } from 'react';
import { 
  Mountain, MapPin, MessageCircle, X, Star, Camera, Phone, Mail, 
  Clock, Heart, Award, Menu, Shield, Users, 
  Sparkles, BookOpen, Music 
} from 'lucide-react';
import Chatbot from './components/Chatbot';
import ARModal from './components/ARModal';
import Packages from './components/Packages';
import { adminStorage } from './utils/adminStorage';

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
    planJourney: 'Plan Your Spiritual Voyage',
    planJourneySubtitle: 'Customized itineraries based on your spiritual interests and time',
    startingPoint: 'Starting Point',
    primaryMonastery: 'Primary Monastery',
    duration: 'Duration',
    spiritualFocus: 'Spiritual Focus',
    createJourney: 'Create My Journey',
    monasteryShowcase: 'Sacred Monasteries',
    monasteryShowcaseSubtitle: 'Explore ancient Buddhist monasteries nestled in the Himalayan landscape',
    exploreMonastery: 'Explore Details',
    spiritualExperiences: 'Spiritual Experiences',
    spiritualExperiencesSubtitle: 'Immerse yourself in authentic Buddhist practices and Sikkimese culture',
    bookExperience: 'Book Experience',
    buddhist: 'Buddhist Traditions of Sikkim',
    buddhistSubtitle: 'Understanding the rich spiritual heritage and lineages of the Himalayas',
    routePlanner: 'Route Planner',
    routePlannerSubtitle: 'Explore the sacred geography of Sikkim through our interactive map',
    interactiveMap: 'Interactive Spiritual Map',
    generateItinerary: 'Generate Itinerary',
    about: {
      title: 'About Sikkim Trails',
      subtitle: 'Your Gateway to Spiritual Enlightenment',
      description: 'Sikkim Trails was born out of a passion for preserving and sharing the sacred heritage of the Himalayas. We bridge the gap between ancient wisdom and modern exploration.',
      mission: 'Our Mission',
      missionText: 'To provide authentic spiritual experiences while supporting local monastic communities.',
      vision: 'Our Vision',
      visionText: 'A world where spiritual travel fosters deeper understanding and global peace.',
      values: 'Our Values',
      valuesText: 'Respect for tradition, environmental stewardship, and community welfare.',
      team: 'Our Team',
      teamText: 'Dedicated experts in Sikkimese culture, Buddhism, and sustainable travel.'
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We are here to help you plan your journey',
      getInTouch: 'Get in Touch',
      address: 'Our Office',
      addressText: 'MG Marg, Gangtok, Sikkim, 737101',
      phone: 'Phone',
      phoneText: '+91 98765 43210',
      email: 'Email',
      emailText: 'sharmaashu9315@gmail.com',
      hours: 'Working Hours',
      hoursText: 'Mon - Sat: 9:00 AM - 6:00 PM',
      sendMessage: 'Send us a Message',
      name: 'Full Name',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Message'
    },
    bookingModal: {
      title: 'Book Your Experience',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      participants: 'Number of Participants',
      specialRequests: 'Special Requests',
      totalCost: 'Estimated Total',
      bookNow: 'Confirm Booking'
    },
    monasteryModal: {
      history: 'History & Significance',
      traditions: 'Traditions & Rituals',
      visitingHours: 'Visiting Hours',
      location: 'Exact Location',
      nearbyAttractions: 'Nearby Sacred Sites'
    },
    itineraryResult: {
      title: 'Your Sacred Journey',
      generatedBy: 'Crafted by Saarthi AI',
      day: 'Day'
    },
    footer: {
      description: 'Discover the sacred monasteries and spiritual heritage of Sikkim through authentic experiences and expert guidance.',
      sacredPlaces: 'Sacred Places',
      support: 'Quick Links',
      followUs: 'Follow our journey',
      copyright: '© 2025 Sikkim Trails. All rights reserved.'
    },
    monasteries: {
      rumtek: {
        name: 'Rumtek Monastery',
        description: 'The seat of the Gyalwang Karmapa, a masterpiece of Tibetan architecture.',
        history: 'Founded in the 16th century and rebuilt in 1966, it is the largest monastery in Sikkim.',
        traditions: 'Main center for the Karma Kagyu lineage, hosting sacred mask dances.',
        hours: '6:00 AM - 6:00 PM',
        location: '24 km from Gangtok',
        attractions: 'Golden Stupa, Ancient Manuscripts, Training Center'
      },
      namchi: {
        name: 'Namchi Monastery',
        description: 'Home to the giant statue of Guru Padmasambhava overlooking the valley.',
        history: 'Established to honor the Patron Saint of Sikkim on Samdruptse Hill.',
        traditions: 'Centers around the worship of Guru Rinpoche and peace meditation.',
        hours: 'Sunrise to Sunset',
        location: 'Namchi, South Sikkim',
        attractions: 'Guru Statue, Rock Garden, Wishing Lake'
      },
      tashiding: {
        name: 'Tashiding Monastery',
        description: 'The holiest monastery in Sikkim where an offering is sufficient to cleanse all sins.',
        history: 'Built in 1717 by Ngadak Sempa Chempo during the reign of Chakdor Namgyal.',
        traditions: 'Famous for the Bumchu (Holy Water) festival held annually.',
        hours: '6:00 AM - 6:00 PM',
        location: 'West Sikkim, Near Yuksom',
        attractions: 'Holy Chortens, Bhumchu Pot, Meditation Caves'
      },
      enchey: {
        name: 'Enchey Monastery',
        description: 'A beautiful Nyingma monastery overlooking Gangtok, established in 1909.',
        history: 'Built on a site blessed by Lama Drupthob Karpo, a tantric master.',
        traditions: 'Follows the Nyingma order, performing the Chaam dance during festivals.',
        hours: '6:00 AM - 6:00 PM',
        location: 'Gangtok, North Sikkim',
        attractions: 'Wheel of Life murals, masked dances, views of Kanchenjunga'
      },
      dubdi: {
        name: 'Dubdi Monastery',
        description: 'The oldest monastery in Sikkim, a silent witness to the history of the land.',
        history: 'Established in 1701, it played a central role in the coronation of the first Chogyal.',
        traditions: 'Oldest school of Nyingma sect in Sikkim, preserved in its original form.',
        hours: '7:00 AM - 5:00 PM',
        location: 'Yuksom, West Sikkim',
        attractions: 'Ancient painted scrolls, historic architecture, forest trek'
      },
      ralang: {
        name: 'Ralang Monastery',
        description: 'Exquisite monastery famous for its annual Pang Lhabsol celebration.',
        history: 'Rebuilt in 1995 to preserve the Kagyu heritage in South Sikkim.',
        traditions: 'Hosts the Mahakala dance and sacred blessings.',
        hours: '6:00 AM - 6:00 PM',
        location: 'Ravangla, South Sikkim',
        attractions: 'New Monastery, Thangka collection, panoramic views'
      }
    },
    experiences: {
      meditation: 'Meditation Rituals',
      philosophy: 'Monastic Philosophy',
      homestay: 'Village Homestays',
      crafts: 'Artisan Workshops'
    },
    traditions: {
      nyingma: {
        title: 'Nyingma Tradition',
        description: 'The "Ancient School" of Tibetan Buddhism, tracing its lineage back to Guru Padmasambhava.'
      },
      kagyu: {
        title: 'Kagyu Tradition',
        description: 'The "Oral Lineage," famous for its emphasis on meditation and yogic practices.'
      },
      festivals: {
        title: 'Sacred Festivals',
        description: 'Witness colorful masked dances, spiritual rituals, and community celebrations.'
      }
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
    }
  },
  'हिन्दी': {
    appName: 'SikkimTrails',
    tagline: 'सिक्किम के पवित्र मठ',
    heroTitle: 'सिक्किम के पवित्र मठ',
    heroSubtitle: 'हिमालय के हृदय में प्राचीन ज्ञान, शांतिपूर्ण ध्यान और आध्यात्मिक जागृति की खोज करें।',
    beginJourney: 'आध्यात्मिक यात्रा शुरू करें',
    exploreMonasteries: 'मठों का अन्वेषण करें',
    nav: {
      home: 'होम',
      monasteries: 'मठ',
      spiritualJourney: 'आध्यात्मिक यात्रा',
      traditions: 'बौद्ध परंपराएं',
      packages: 'टूर पैकेज',
      experiences: 'अनुभव',
      about: 'परिचय',
      contact: 'संपर्क',
    },
    planJourney: 'अपनी आध्यात्मिक यात्रा की योजना बनाएं',
    planJourneySubtitle: 'आपके हितों और समय के आधार पर अनुकूलित यात्रा कार्यक्रम',
    startingPoint: 'प्रस्थान बिंदु',
    primaryMonastery: 'मुख्य मठ',
    duration: 'अवधि',
    spiritualFocus: 'आध्यात्मिक फोकस',
    createJourney: 'मेरी यात्रा बनाएं',
    monasteryShowcase: 'पवित्र मठ',
    monasteryShowcaseSubtitle: 'हिमालय की गोद में बसे प्राचीन बौद्ध मठों का अन्वेषण करें',
    exploreMonastery: 'विवरण देखें',
    spiritualExperiences: 'आध्यात्मिक अनुभव',
    spiritualExperiencesSubtitle: 'प्रामाणिक बौद्ध प्रथाओं और सिक्किमी संस्कृति में खुद को डुबोएं',
    bookExperience: 'अनुभव बुक करें',
    buddhist: 'सिक्किम की बौद्ध परंपराएं',
    buddhistSubtitle: 'हिमालय की समृद्ध आध्यात्मिक विरासत और वंश को समझना',
    routePlanner: 'मार्ग योजनाकार',
    routePlannerSubtitle: 'हमारे इंटरैक्टिव मानचित्र के माध्यम से सिक्किम के पवित्र भूगोल का अन्वेषण करें',
    interactiveMap: 'इंटरैक्टिव आध्यात्मिक मानचित्र',
    generateItinerary: 'यात्रा कार्यक्रम बनाएं',
    about: {
      title: 'Sikkim Trails के बारे में',
      subtitle: 'आध्यात्मिक ज्ञान का आपका प्रवेश द्वार',
      description: 'Sikkim Trails का जन्म हिमालय की पवित्र विरासत को संरक्षित करने और साझा करने के जुनून से हुआ था।',
      mission: 'हमारा लक्ष्य',
      missionText: 'स्थानीय मठवासी समुदायों का समर्थन करते हुए प्रामाणिक आध्यात्मिक अनुभव प्रदान करना।',
      vision: 'हमारा दृष्टिकोण',
      visionText: 'एक ऐसी दुनिया जहाँ आध्यात्मिक यात्रा बेहतर समझ और वैश्विक शांति को बढ़ावा देती है।',
      values: 'हमारे मूल्य',
      valuesText: 'परंपरा के प्रति सम्मान, पर्यावरण संरक्षण और सामुदायिक कल्याण।',
      team: 'हमारी टीम',
      teamText: 'सिक्किमी संस्कृति, बौद्ध धर्म और टिकाऊ यात्रा के समर्पित विशेषज्ञ।'
    },
    contact: {
      title: 'संपर्क करें',
      subtitle: 'हम आपकी यात्रा की योजना बनाने में मदद के लिए यहाँ हैं',
      getInTouch: 'संपर्क में रहें',
      address: 'हमारा कार्यालय',
      addressText: 'MG मार्ग, गंगटोक, सिक्किम, 737101',
      phone: 'फ़ोन',
      phoneText: '+91 98765 43210',
      email: 'ईमेल',
      emailText: 'sharmaashu9315@gmail.com',
      hours: 'कार्य समय',
      hoursText: 'सोम - शनि: सुबह 9:00 - शाम 6:00',
      sendMessage: 'हमें संदेश भेजें',
      name: 'पूरा नाम',
      subject: 'विषय',
      message: 'संदेश',
      submit: 'संदेश भेजें'
    },
    bookingModal: {
      title: 'अपना अनुभव बुक करें',
      selectDate: 'तारीख चुनें',
      selectTime: 'समय चुनें',
      participants: 'प्रतिभागियों की संख्या',
      specialRequests: 'विशेष अनुरोध',
      totalCost: 'अनुमानित लागत',
      bookNow: 'बुकिंग की पुष्टि करें'
    },
    monasteryModal: {
      history: 'इतिहास और महत्व',
      traditions: 'परंपराएं और अनुष्ठान',
      visitingHours: 'दर्शन का समय',
      location: 'सटीक स्थान',
      nearbyAttractions: 'आस-पास के पवित्र स्थल'
    },
    itineraryResult: {
      title: 'आपकी पवित्र यात्रा',
      generatedBy: 'Saarthi AI द्वारा निर्मित',
      day: 'दिन'
    },
    footer: {
      description: 'प्रामाणिक अनुभवों और विशेषज्ञ मार्गदर्शन के माध्यम से सिक्किम के पवित्र मठों और आध्यात्मिक विरासत की खोज करें।',
      sacredPlaces: 'पवित्र स्थान',
      support: 'त्वरित लिंक',
      followUs: 'हमारी यात्रा का अनुसरण करें',
      copyright: '© 2025 Sikkim Trails. सर्वाधिकार सुरक्षित।'
    },
    monasteries: {
      rumtek: {
        name: 'रुमटेक मठ',
        description: 'ग्यालवांग कर्मापा की सीट, तिब्बती वास्तुकला की एक उत्कृष्ट कृति।',
        history: '16वीं शताब्दी में स्थापित और 1966 में पुनर्निर्मित, यह सिक्किम का सबसे बड़ा मठ है।',
        traditions: 'कर्मा काग्यू वंश का मुख्य केंद्र, पवित्र मुखौटा नृत्य की मेजबानी करता है।',
        hours: 'सुबह 6:00 - शाम 6:00',
        location: 'गंगटोक से 24 किमी',
        attractions: 'स्वर्ण स्तूप, प्राचीन पांडुलिपियाँ, प्रशिक्षण केंद्र'
      },
      namchi: {
        name: 'नामची मठ',
        description: 'घाटी की ओर मुख किए हुए गुरु पद्मसंभव की विशाल प्रतिमा का घर।',
        history: 'समुद्रुपत्से पहाड़ी पर सिक्किम के संरक्षक संत के सम्मान में स्थापित।',
        traditions: 'गुरु रिनपोछे की पूजा और शांति ध्यान के इर्द-गिर्द केंद्रित।',
        hours: 'सूर्योदय से सूर्यास्त तक',
        location: 'नामची, दक्षिण सिक्किम',
        attractions: 'गुरु प्रतिमा, रॉक गार्डन, विशिंग लेक'
      },
      tashiding: {
        name: 'ताशिदिंग मठ',
        description: 'सिक्किम का सबसे पवित्र मठ जहाँ दर्शन मात्र से पापों का नाश होता है।',
        history: 'चदोर नामग्याल के शासनकाल के दौरान 1717 में बनाया गया।',
        traditions: 'सालाना आयोजित होने वाले भुमचू (पवित्र जल) उत्सव के लिए प्रसिद्ध।',
        hours: 'सुबह 6:00 - शाम 6:00',
        location: 'पश्चिम सिक्किम, युक्सोम के पास',
        attractions: 'पवित्र चोर्टन, भुमचू पात्र, ध्यान गुफाएं'
      },
      enchey: {
        name: 'एंचे मठ',
        description: 'गंगटोक के पास एक सुंदर नयिंग्मा मठ, 1909 में स्थापित।',
        history: 'एक तांत्रिक गुरु लामा द्रुपथोप कार्पो द्वारा धन्य स्थल पर निर्मित।',
        traditions: 'नयिंग्मा आदेश का पालन करता है, त्योहारों के दौरान चाम नृत्य करता है।',
        hours: 'सुबह 6:00 - शाम 6:00',
        location: 'गंगटोक, उत्तर सिक्किम',
        attractions: 'जीवन चक्र के भित्ति चित्र, मुखौटा नृत्य, कंचनजंगा के दृश्य'
      },
      dubdi: {
        name: 'दुब्दी मठ',
        description: 'सिक्किम का सबसे पुराना मठ, इस भूमि के इतिहास का मूक गवाह।',
        history: '1701 में स्थापित, इसने पहले चोग्याल के राज्याभिषेक में केंद्रीय भूमिका निभाई।',
        traditions: 'सिक्किम में नयिंग्मा संप्रदाय का सबसे पुराना स्कूल, अपने मूल रूप में संरक्षित।',
        hours: 'सुबह 7:00 - शाम 5:00',
        location: 'युक्सोम, पश्चिम सिक्किम',
        attractions: 'प्राचीन चित्रित स्क्रॉल, ऐतिहासिक वास्तुकला, वन पदयात्रा'
      },
      ralang: {
        name: 'रालांग मठ',
        description: 'अपने वार्षिक पांग ल्हाबसोल उत्सव के लिए प्रसिद्ध उत्कृष्ट मठ।',
        history: 'दक्षिण सिक्किम में काग्यू विरासत को संरक्षित करने के लिए 1995 में पुनर्निर्मित।',
        traditions: 'महाकाल नृत्य और पवित्र आशीर्वाद की मेजबानी करता है।',
        hours: 'सुबह 6:00 - शाम 6:00',
        location: 'रवांगला, दक्षिण सिक्किम',
        attractions: 'नया मठ, थंगका संग्रह, मनोरम दृश्य'
      }
    },
    experiences: {
      meditation: 'ध्यान अनुष्ठान',
      philosophy: 'मठवासी दर्शन',
      homestay: 'गाँव का होमस्टे',
      crafts: 'कारीगर कार्यशालाएं'
    },
    traditions: {
      nyingma: {
        title: 'नयिंग्मा परंपरा',
        description: 'तिब्बती बौद्ध धर्म का "प्राचीन स्कूल", जो गुरु पद्मसंभव से अपना वंश जोड़ता है।'
      },
      kagyu: {
        title: 'काग्यू परंपरा',
        description: '"मौखिक वंश," ध्यान और योग साधना पर अपने जोर के लिए प्रसिद्ध।'
      },
      festivals: {
        title: 'पवित्र उत्सव',
        description: 'रंगीन मुखौटा नृत्य, आध्यात्मिक अनुष्ठान और सामुदायिक समारोहों के गवाह बनें।'
      }
    },
    tourPackages: {
      title: 'टूर पैकेज',
      subtitle: 'सिक्किम ट्रेल्स के साथ हमारी क्यूरेटेड आध्यात्मिक और साहसिक यात्राओं के जादू को खोजें।',
      basic: {
        title: 'बेसिक पैकेज',
        duration: '3 दिन / 2 रात',
        services: ['बजट होटल स्टे', 'स्थानीय दर्शनीय स्थल (गंगटोक)', 'साझा परिवहन', 'भोजन शामिल नहीं']
      },
      premium: {
        title: 'प्रीमियम पैकेज',
        duration: '5 दिन / 4 रात',
        services: ['3-सितारा होटल स्टे', 'गंगटोक + सोमगो झील + बाबा मंदिर', 'नाश्ता और रात का भोजन शामिल', 'निजी/साझा परिवहन', 'निर्देशित टूर']
      },
      luxury: {
        title: 'लक्जरी पैकेज',
        duration: '7 दिन / 6 रात',
        services: ['5-सितारा होटल / रिज़ॉर्ट स्टे', 'गंगटोक + उत्तर सिक्किम (लाचुंग, युमथांग)', 'सभी भोजन शामिल', 'निजी कैब और व्यक्तिगत गाइड', 'प्राथमिकता बुकिंग और वीआईपी अनुभव']
      },
      safetySection: {
        title: 'सुरक्षा और ट्रैकिंग प्रणाली',
        description: 'आपकी सुरक्षा हमारी आध्यात्मिक प्रतिबद्धता है। हमने हर यात्री की 24/7 सुरक्षा सुनिश्चित करने के लिए एक मजबूत डिजिटल बुनियादी ढांचा तैयार किया है।',
        features: {
          gps: { title: 'लाइव GPS ट्रैकिंग', desc: 'वास्तविक समय स्थान निगरानी।' },
          sos: { title: 'इमरजेंसी SOS', desc: 'त्वरित SOS प्रतिक्रिया।' },
          support: { title: '24/7 सहायता', desc: 'समर्पित सहायता टीम।' },
          partners: { title: 'सत्यापित भागीदार', desc: 'पूरी तरह से जाँचे गए ड्राइवर और गाइड।' }
        }
      }
    }
  },
  'नेपाली': {
    appName: 'SikkimTrails',
    tagline: 'सिक्किमका पवित्र गुम्बाहरू',
    heroTitle: 'सिक्किमका पवित्र गुम्बाहरू',
    heroSubtitle: 'हिमालयको हृदयमा प्राचीन ज्ञान, शान्तिपूर्ण ध्यान र आध्यात्मिक जागृतिको खोज गर्नुहोस्।',
    beginJourney: 'आध्यात्मिक यात्रा सुरु गर्नुहोस्',
    exploreMonasteries: 'गुम्बाहरूको अन्वेषण गर्नुहोस्',
    nav: {
      home: 'होम',
      monasteries: 'गुम्बा',
      spiritualJourney: 'आध्यात्मिक यात्रा',
      traditions: 'बौद्ध परम्पराहरू',
      packages: 'टूर प्याकेज',
      experiences: 'अनुभव',
      about: 'परिचय',
      contact: 'सम्पर्क',
    },
    planJourney: 'तपाईको आध्यात्मिक यात्राको योजना बनाउनुहोस्',
    planJourneySubtitle: 'तपाईंको रुचि र समयमा आधारित अनुकूलित यात्रा कार्यक्रम',
    startingPoint: 'प्रस्थान विन्दु',
    primaryMonastery: 'मुख्य गुम्बा',
    duration: 'अवधि',
    spiritualFocus: 'आध्यात्मिक फोकस',
    createJourney: 'मेरो यात्रा बनाउनुहोस्',
    monasteryShowcase: 'पवित्र गुम्बाहरू',
    monasteryShowcaseSubtitle: 'हिमालयको काखमा रहेका प्राचीन बौद्ध गुम्बाहरूको अन्वेषण गर्नुहोस्',
    exploreMonastery: 'विवरण हेर्नुहोस्',
    spiritualExperiences: 'आध्यात्मिक अनुभव',
    spiritualExperiencesSubtitle: 'प्रामाणिक बौद्ध प्रथाहरू र सिक्किमी संस्कृतिमा आफूलाई डुबाउनुहोस्',
    bookExperience: 'अनुभव बुक गर्नुहोस्',
    buddhist: 'सिक्किमका बौद्ध परम्पराहरू',
    buddhistSubtitle: 'हिमालयको समृद्ध आध्यात्मिक सम्पदा र वंश बुझ्दै',
    routePlanner: 'मार्ग योजनाकार',
    routePlannerSubtitle: 'हाम्रो अन्तर्क्रियात्मक नक्सा मार्फत सिक्किमको पवित्र भूगोल अन्वेषण गर्नुहोस्',
    interactiveMap: 'अन्तर्क्रियात्मक आध्यात्मिक नक्सा',
    generateItinerary: 'यात्रा कार्यक्रम बनाउनुहोस्',
    about: {
      title: 'Sikkim Trails को बारेमा',
      subtitle: 'आध्यात्मिक ज्ञानको तपाईंको प्रवेशद्वार',
      description: 'Sikkim Trails हिमालयको पवित्र सम्पदा संरक्षण गर्ने र साझा गर्ने उद्देश्यले स्थापना गरिएको हो।',
      mission: 'हाम्रो लक्ष्य',
      missionText: 'स्थानीय गुम्बा समुदायहरूलाई सहयोग गर्दै प्रामाणिक आध्यात्मिक अनुभवहरू प्रदान गर्ने।',
      vision: 'हाम्रो दृष्टिकोण',
      visionText: 'आध्यात्मिक यात्राले विश्वव्यापी शान्ति र समझ बढाउने संसार।',
      values: 'हाम्रा मूल्यहरू',
      valuesText: 'परम्पराको सम्मान, पर्यावरण संरक्षण र सामुदायिक कल्याण।',
      team: 'हाम्रो टोली',
      teamText: 'सिक्किमी संस्कृति, बौद्ध धर्म र दिगो यात्राका समर्पित विशेषज्ञहरू।'
    },
    contact: {
      title: 'सम्पर्क गर्नुहोस्',
      subtitle: 'हामी तपाईंको यात्राको योजना बनाउन मद्दत गर्न यहाँ छौं',
      getInTouch: 'सम्पर्कमा रहनुहोस्',
      address: 'हाम्रो कार्यालय',
      addressText: 'MG मार्ग, गान्तोक, सिक्किम, ७३७१०१',
      phone: 'फोन',
      phoneText: '+91 98765 43210',
      email: 'इमेल',
      emailText: 'sharmaashu9315@gmail.com',
      hours: 'कार्य समय',
      hoursText: 'सोम - शनि: बिहान ९:०० - बेलुका ६:००',
      sendMessage: 'हामीलाई सन्देश पठाउनुहोस्',
      name: 'पूरा नाम',
      subject: 'विषय',
      message: 'सन्देश',
      submit: 'सन्देश पठाउनुहोस्'
    },
    bookingModal: {
      title: 'आफ्नो अनुभव बुक गर्नुहोस्',
      selectDate: 'मिति चयन गर्नुहोस्',
      selectTime: 'समय चयन गर्नुहोस्',
      participants: 'सहभागी संख्या',
      specialRequests: 'विशेष अनुरोध',
      totalCost: 'अनुमानित लागत',
      bookNow: 'बुकिङ पुष्टि गर्नुहोस्'
    },
    monasteryModal: {
      history: 'इतिहास र महत्त्व',
      traditions: 'परम्परा र अनुष्ठान',
      visitingHours: 'दर्शन समय',
      location: 'सटीक स्थान',
      nearbyAttractions: 'वरपरका पवित्र स्थलहरू'
    },
    itineraryResult: {
      title: 'तपाईंको पवित्र यात्रा',
      generatedBy: 'Saarthi AI द्वारा निर्मित',
      day: 'दिन'
    },
    footer: {
      description: 'प्रामाणिक अनुभव र विशेषज्ञ मार्गदर्शन मार्फत सिक्किमका पवित्र गुम्बाहरू र आध्यात्मिक सम्पदा खोज्नुहोस्।',
      sacredPlaces: 'पवित्र स्थानहरू',
      support: 'द्रुत लिङ्कहरू',
      followUs: 'हाम्रो यात्रा पछ्याउनुहोस्',
      copyright: '© २०२५ Sikkim Trails. सबै अधिकार सुरक्षित।'
    },
    monasteries: {
      rumtek: {
        name: 'रुमटेक गुम्बा',
        description: 'ग्यालवाङ कर्मापाको सीट, तिब्बती वास्तुकलाको एक उत्कृष्ट कृति।',
        history: '१६ औं शताब्दीमा स्थापित र १९६६ मा पुनर्निर्माण गरिएको, यो सिक्किमको सबैभन्दा ठूलो गुम्बा हो।',
        traditions: 'कर्मा काग्यू वंशको मुख्य केन्द्र, पवित्र मास्क नृत्यको आयोजना गर्दछ।',
        hours: 'बिहान ६:०० - बेलुका ६:००',
        location: 'गान्तोकबाट २४ किमी',
        attractions: 'सुनौलो स्तूप, प्राचीन पाण्डुलिपिहरू, प्रशिक्षण केन्द्र'
      },
      namchi: {
        name: 'नामची गुम्बा',
        description: 'गुरु पद्मसंभवको विशाल मूर्तिको घर।',
        history: 'समद्रुप्टसे पहाडमा सिक्किमका संरक्षक सन्तको सम्मानमा स्थापित।',
        traditions: 'गुरु रिनपोछेको पूजा र शान्ति ध्यानमा केन्द्रित।',
        hours: 'सूर्योदय देखि सूर्यास्त सम्म',
        location: 'नामची, दक्षिण सिक्किम',
        attractions: 'गुरु मूर्ति, रक गार्डन, विसिङ लेक'
      },
      tashiding: {
        name: 'ताशिदिङ गुम्बा',
        description: 'सिक्किमको सबैभन्दा पवित्र गुम्बा जहाँ दर्शन मात्रले पाप पखालिन्छ।',
        history: '१७१७ मा चदोर् नामग्यालको शासनकालमा निर्माण गरिएको।',
        traditions: 'बार्षिक रूपमा आयोजना हुने भुमचू (पवित्र जल) उत्सवका लागि प्रसिद्ध।',
        hours: 'बिहान ६:०० - बेलुका ६:००',
        location: 'पश्चिम सिक्किम, युक्सोम नजिकै',
        attractions: 'पवित्र चोर्टेन, भुमचू पात्र, ध्यान गुफाहरू'
      },
      enchey: {
        name: 'एन्चे गुम्बा',
        description: 'गान्तोक नजिकैको एक सुन्दर नयिङ्गमा गुम्बा, १९०९ मा स्थापित।',
        history: 'तान्त्रिक गुरु लामा ड्रुपथोप कार्पोले आशीर्वाद दिएको ठाउँमा निर्माण गरिएको।',
        traditions: 'नयिङ्गमा आदेश पालन गर्दछ, चाडपर्वमा चाम नृत्य गर्दछ।',
        hours: 'बिहान ६:०० - बेलुका ६:००',
        location: 'गान्तोक, उत्तर सिक्किम',
        attractions: 'जीवन चक्रका भित्ति चित्रहरू, मास्क नृत्य, कञ्चनजङ्घाको दृश्य'
      },
      dubdi: {
        name: 'दुब्दी गुम्बा',
        description: 'सिक्किमको सबैभन्दा पुरानो गुम्बा, यस भूमिको इतिहासको साक्षी।',
        history: '१७०१ मा स्थापित, यसले पहिलो चोग्यालको राज्याभिषेकमा मुख्य भूमिका खेलेको थियो।',
        traditions: 'सिक्किममा नयिङ्गमा सम्प्रदायको सबैभन्दा पुरानो स्कूल।',
        hours: 'बिहान ७:०० - बेलुका ५:००',
        location: 'युक्सोम, पश्चिम सिक्किम',
        attractions: 'प्राचीन चित्रित स्क्रोलहरू, ऐतिहासिक वास्तुकला, वन पदयात्रा'
      },
      ralang: {
        name: 'रालाङ गुम्बा',
        description: 'यसको वार्षिक पाङ ल्हाबसोल उत्सवका लागि प्रसिद्ध उत्कृष्ट गुम्बा।',
        history: 'दक्षिण सिक्किममा काग्यू सम्पदा जोगाउन १९९५ मा पुनर्निर्माण गरिएको।',
        traditions: 'महाकाल नृत्य र पवित्र आशीर्वाद आयोजना गर्दछ।',
        hours: 'बिहान ६:०० - बेलुका ६:००',
        location: 'रवाङला, दक्षिण सिक्किम',
        attractions: 'नयाँ गुम्बा, थङ्का संग्रह, मनोरम दृश्यहरू'
      }
    },
    experiences: {
      meditation: 'ध्यान अनुष्ठान',
      philosophy: 'मठ दर्शन',
      homestay: 'गाउँको होमस्टे',
      crafts: 'हस्तकला कार्यशाला'
    },
    traditions: {
      nyingma: {
        title: 'नयिङ्गमा परम्परा',
        description: 'तिब्बती बौद्ध धर्मको "प्राचीन विद्यालय", जसको वंश गुरु पद्मसंभवसँग जोडिएको छ।'
      },
      kagyu: {
        title: 'काग्यू परम्परा',
        description: '"मौखिक वंश," ध्यान र योग साधनाका लागि प्रसिद्ध।'
      },
      festivals: {
        title: 'पवित्र चाडपर्व',
        description: 'रंगीन मास्क नृत्य, आध्यात्मिक अनुष्ठान र सामुदायिक उत्सवहरूको साक्षी बन्नुहोस्।'
      }
    },
    tourPackages: {
      title: 'टूर प्याकेजहरू',
      subtitle: 'सिक्किम ट्रेल्सको जादू हाम्रो आध्यात्मिक र साहसिक यात्राहरूको साथ पत्ता लगाउनुहोस्।',
      basic: {
        title: 'आधारभूत प्याकेज',
        duration: '३ दिन / २ रात',
        services: ['बजेट होटल बसाई', 'स्थानीय भ्रमण (गान्तोक)', 'साझा यातायात', 'खाना समावेश छैन']
      },
      premium: {
        title: 'प्रिमियम प्याकेज',
        duration: '५ दिन / ४ रात',
        services: ['३-तारे होटल बसाई', 'गान्तोक + सोमगो ताल + बाबा मन्दिर', 'बिहानको खाजा र बेलुकाको खाना समावेश', 'निजी/साझा यातायात', 'गाइडेड टुरहरू']
      },
      luxury: {
        title: 'लक्जरी प्याकेज',
        duration: '७ दिन / ६ रात',
        services: ['५-तारे होटल / रिसोर्ट बसाई', 'गान्तोक + उत्तर सिक्किम (लाचुङ, युमथाङ)', 'सबै खाना समावेश', 'निजी क्याब र व्यक्तिगत गाइड', 'प्राथमिकता बुकिङ र VIP अनुभव']
      },
      safetySection: {
        title: 'सुरक्षा र ट्र्याकिङ प्रणाली',
        description: 'तपाईंको सुरक्षा हाम्रो आध्यात्मिक प्रतिबद्धता हो। हामीले प्रत्येक यात्रीलाई २४/७ सुरक्षित राख्न एउटा बलियो डिजिटल पूर्वाधार निर्माण गरेका छौं।',
        features: {
          gps: { title: 'प्रत्यक्ष GPS ट्र्याकिङ', desc: 'वास्तविक-समय स्थान निगरानी।' },
          sos: { title: 'आपतकालीन SOS', desc: 'तत्काल SOS प्रतिक्रिया।' },
          support: { title: '२४/७ समर्थन', desc: 'समर्पित सहायता टोली।' },
          partners: { title: 'प्रमाणित साझेदारहरू', desc: 'कडा रूपमा जाँच गरिएका चालक र गाइडहरू।' }
        }
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
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  // Form States
  const [journeyForm, setJourneyForm] = useState({
    startingPoint: '',
    primaryMonastery: '',
    duration: '',
    spiritualFocus: ''
  });
  const [showItinerary, setShowItinerary] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  
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
    { id: 'rumtek', ...t.monasteries.rumtek, image: 'Rumtek.jpg', rating: 4.8, established: '1966', tradition: 'Karma Kagyu' },
    { id: 'namchi', ...t.monasteries.namchi, image: 'NAMCHI.jpg', rating: 4.7, established: '1995', tradition: 'Karma Kagyu' },
    { id: 'tashiding', ...t.monasteries.tashiding, image: 'Tashiding.jpg', rating: 4.9, established: '1717', tradition: 'Nyingma' },
    { id: 'enchey', ...t.monasteries.enchey, image: 'Enchey.jpg', rating: 4.6, established: '1909', tradition: 'Nyingma' },
    { id: 'dubdi', ...t.monasteries.dubdi, image: 'Dubdi.jpg', rating: 4.5, established: '1701', tradition: 'Nyingma' },
    { id: 'ralang', ...t.monasteries.ralang, image: 'Ralang.jpg', rating: 4.7, established: '1768', tradition: 'Karma Kagyu' }
  ];

  const experiences = [
    { id: 'meditation', name: t.experiences.meditation, price: '₹2,500', duration: '3 days', image: 'meditation.webp', description: 'Deep meditation retreat with experienced monks' },
    { id: 'philosophy', name: t.experiences.philosophy, price: '₹1,800', duration: '2 days', image: 'class.jpeg', description: 'Learn Buddhist philosophy and teachings' },
    { id: 'homestay', name: t.experiences.homestay, price: '₹3,200', duration: '5 days', image: 'homestay.jpeg', description: 'Live with monks and experience daily monastery life' },
    { id: 'crafts', name: t.experiences.crafts, price: '₹800', duration: '1 day', image: 'wheel.jpeg', description: 'Create traditional prayer wheels with local artisans' }
  ];

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleJourneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journeyForm.startingPoint || !journeyForm.primaryMonastery || !journeyForm.duration || !journeyForm.spiritualFocus) {
      alert(currentLanguage === 'English' ? 'Please fill all fields' : 'कृपया सभी फ़ील्ड भरें');
      return;
    }
    const itinerary = generateItinerary(journeyForm);
    setGeneratedItinerary(itinerary);
    setShowItinerary(true);
  };

  const generateItinerary = (form: typeof journeyForm) => {
    const days = form.duration === '3-5 days' ? 4 : form.duration === '1-2 weeks' ? 10 : 7;
    const itinerary = [];
    for (let i = 1; i <= days; i++) {
      itinerary.push({
        day: i,
        monastery: i === 1 ? form.primaryMonastery : monasteries[i % monasteries.length].name,
        activities: ['Morning prayers', 'Meditation session', 'Interaction with lamas'],
        focus: form.spiritualFocus,
        travelTip: 'Carry warm clothes and respect silence.'
      });
    }
    return {
      title: `${days}-Day Sacred Journey`,
      startingPoint: form.startingPoint,
      focus: form.spiritualFocus,
      days: itinerary
    };
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const exp = experiences.find(exp => exp.id === selectedExperience);
    await adminStorage.saveBooking({
      experienceName: exp?.name || 'Experience',
      ...bookingData,
      totalCost: `${exp?.price} x ${bookingData.participants}`
    });
    showNotification('Booking confirmed!', 'success');
    setSelectedExperience(null);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleExploreMonastery = (id: string) => {
    setSelectedMonastery(id);
  };

  const handleARView = (id: string) => {
    setArModelId(id);
    setIsARModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {notification && (
        <div className="fixed top-24 right-4 z-50 animate-bounce-in">
          <div className="bg-white border-l-4 border-red-600 shadow-2xl rounded-lg p-4 flex items-center space-x-3 text-gray-900">
            <Star className="h-6 w-6 text-red-600" />
            <p className="font-bold">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img src="/tours.png" alt="Sikkim Trails Logo" className="h-16 w-16 object-contain" />
              <div>
                <h1 className="text-2xl font-bold text-orange-800">{t.appName}</h1>
                <p className="text-sm text-red-600">{t.tagline}</p>
              </div>
            </div>

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
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as keyof typeof translations)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
              >
                <option value="English">🇬🇧 English</option>
                <option value="हिन्दी">🇮🇳 हिन्दी</option>
                <option value="नेपाली">🇳🇵 नेपाली</option>
              </select>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                {Object.entries(t.nav).map(([key, label]) => (
                  <button key={key} onClick={() => scrollToSection(key === 'home' ? 'hero' : key)} className="text-left text-gray-700 hover:text-red-600">
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("/sikkim.jpg")' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">{t.heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollToSection('spiritualJourney')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg">
              {t.beginJourney}
            </button>
            <button onClick={() => scrollToSection('monasteries')} className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm">
              {t.exploreMonasteries}
            </button>
          </div>
        </div>
      </section>

      {/* Journey Form */}
      <section id="spiritualJourney" className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">{t.planJourney}</h2>
          <form onSubmit={handleJourneySubmit} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-6 text-left">
            {['startingPoint', 'primaryMonastery', 'duration', 'spiritualFocus'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t[field as keyof typeof t] as string}</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-900"
                  onChange={(e) => setJourneyForm({...journeyForm, [field]: e.target.value})}
                  required
                >
                  <option value="">Select {t[field as keyof typeof t] as string}</option>
                  {field === 'primaryMonastery' ? monasteries.map(m => <option key={m.id} value={m.name}>{m.name}</option>) : <option value="Option">Placeholder Options</option>}
                </select>
              </div>
            ))}
            <button type="submit" className="md:col-span-2 bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-lg font-bold hover:scale-[1.02] transition-transform">
              {t.createJourney}
            </button>
          </form>
        </div>
      </section>

      {/* Monasteries Showcase */}
      <section id="monasteries" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">{t.monasteryShowcase}</h2>
            <p className="text-gray-600 mt-4">{t.monasteryShowcaseSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {monasteries.map(m => (
              <div key={m.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 text-gray-900">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" /> {m.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{m.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{m.description}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedMonastery(m.id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                      {t.exploreMonastery}
                    </button>
                    <button onClick={() => { setArModelId(m.id); setIsARModalOpen(true); }} className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                      <Camera className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">{t.spiritualExperiences}</h2>
            <p className="text-gray-600 mt-4">{t.spiritualExperiencesSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {experiences.map(e => (
              <div key={e.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
                <img src={e.image} alt={e.name} className="h-32 w-full object-cover" />
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-1">{e.name}</h4>
                  <p className="text-red-600 text-sm font-bold mb-3">{e.price}</p>
                  <button onClick={() => setSelectedExperience(e.id)} className="w-full bg-orange-100 text-orange-700 py-2 rounded-lg text-sm font-bold hover:bg-orange-200">
                    {t.bookExperience}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Packages t={t} />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">{t.about.title}</h2>
            <p className="text-red-600 font-bold mt-2 uppercase tracking-widest text-sm">{t.about.subtitle}</p>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-lg">{t.about.description}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {['mission', 'vision', 'values', 'team'].map((key) => (
              <div key={key} className="p-8 bg-orange-50 rounded-2xl text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {key === 'mission' ? <Heart /> : key === 'vision' ? <Award /> : key === 'values' ? <Shield /> : <Users />}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t.about[key as keyof typeof t.about] as string}</h3>
                <p className="text-sm text-gray-600">{t.about[(key + 'Text') as keyof typeof t.about] as string}</p>
              </div>
            ))}
          </div>
          {/* Team Members */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Team</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Ashish Panwar', role: 'Founder & CEO', img: 'ashish.jpg' },
                { name: 'Niharika Pal', role: 'Creative Director', img: 'nikki.jpeg' },
                { name: 'Puru Sharma', role: 'Technical Lead', img: 'puru.jpeg' }
              ].map(person => (
                <div key={person.name} className="text-center group">
                  <img src={person.img} alt={person.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-200 group-hover:border-red-600 transition-colors" />
                  <h4 className="font-bold text-gray-900">{person.name}</h4>
                  <p className="text-red-600 text-sm">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-orange-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Traveler Essentials</h2>
          <div className="space-y-4">
            {[
              { q: 'How do I get a Restricted Area Permit (RAP)?', a: 'Obtain it at checkposts with 2 photos and ID proof.' },
              { q: 'Best way to prevent altitude sickness?', a: 'Acclimatize gradually in Gangtok and stay hydrated.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)} className="w-full p-6 text-left font-bold flex justify-between items-center text-gray-900">
                  {item.q} <Sparkles className={`h-4 w-4 text-orange-500 transition-transform ${activeFAQ === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFAQ === idx && <div className="px-6 pb-6 text-gray-600 text-sm">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.contact.title}</h2>
            <p className="text-red-600 font-bold mb-8">{t.contact.getInTouch}</p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-red-600 rounded-full text-white"><MapPin /></div>
                <div><h4 className="font-bold text-gray-900">{t.contact.address}</h4><p className="text-gray-600">{t.contact.addressText}</p></div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-orange-600 rounded-full text-white"><Phone /></div>
                <div><h4 className="font-bold text-gray-900">{t.contact.phone}</h4><p className="text-gray-600">{t.contact.phoneText}</p></div>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6 text-gray-900">{t.contact.sendMessage}</h3>
            <form className="space-y-4">
              <input type="text" placeholder={t.contact.name} className="w-full p-3 rounded-lg border text-gray-900" required />
              <input type="text" placeholder={t.contact.subject} className="w-full p-3 rounded-lg border text-gray-900" required />
              <textarea placeholder={t.contact.message} className="w-full p-3 rounded-lg border h-32 text-gray-900" required></textarea>
              <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold">Submit</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img src="/tours.png" alt="Sikkim Trails Logo" className="h-12 mx-auto mb-6" />
          <h3 className="text-xl font-bold mb-2">{t.appName}</h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 font-medium">{t.footer.description}</p>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">{t.footer.copyright}</p>
            <div className="flex gap-4 text-xs text-gray-400">
              <a href="#about" className="hover:text-white">Privacy Policy</a>
              <a href="#about" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <button onClick={() => setIsChatOpen(true)} className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-2xl animate-bounce">
        <MessageCircle size={24} />
      </button>

      <Chatbot currentLanguage={currentLanguage} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {isARModalOpen && (
        <ARModal 
          isOpen={isARModalOpen} 
          onClose={() => setIsARModalOpen(false)} 
          monasteryName={monasteries.find(m => m.id === arModelId)?.name || ''} 
          translations={t} 
        />
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
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-gray-900">
                    <div className="mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{monastery.name}</h2>
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
                    <button
                      onClick={() => {
                        setSelectedMonastery(null);
                        scrollToSection('spiritualJourney');
                      }}
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-2 px-3 sm:px-4 rounded-md sm:rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      {t.nav.spiritualJourney}
                    </button>

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

      {selectedExperience && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 text-gray-900">
            <h3 className="text-2xl font-bold mb-6">{t.bookingModal.title}</h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <input type="date" className="w-full p-3 border rounded-lg" required onChange={(e) => setBookingData({...bookingData, date: e.target.value})} />
              <input type="number" placeholder="Participants" className="w-full p-3 border rounded-lg" required min="1" onChange={(e) => setBookingData({...bookingData, participants: parseInt(e.target.value)})} />
              <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-bold">Book Now</button>
              <button type="button" onClick={() => setSelectedExperience(null)} className="w-full text-gray-500 font-medium">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
