import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { Mountain, MapPin, MessageCircle, X, Star, Camera, Phone, Mail, MapPin as LocationIcon, Clock, Heart, Award, Menu, Shield, Users, Sparkles, BookOpen, Music, Sun, Moon, LogIn, UserPlus, LogOut } from 'lucide-react';
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
      copyright: '穢 2025 Sikkim Trails. All rights reserved. Made by The Techies for spiritual seekers.',
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
  鄐嫩凶鄐�丹鄍�: {
    appName: '鄐熈�鄐桌� 鄐��鄐﹤凶鄐能冗',
    tagline: '鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼� 鄐芹今鄐賴中鄍温什 鄐桌�',
    heroTitle: '鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼� 鄐芹今鄐賴中鄍温什 鄐桌�',
    heroSubtitle: '鄐嫩凶鄐桌冗鄐耜仁 鄐𨫼� 鄐嫩�鄐舟仁 鄐桌�鄐� 鄐芹�鄐啤冗鄐𠼭�鄐� 鄐厢�鄐𠒎冗鄐�, 鄐嗣冗鄐�中鄐賴云鄍�什鄍温不 鄐抉�鄐能冗鄐� 鄐𠰍什 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐厢�鄐𠒎冗鄐� 鄐𨫼� 鄐遤�鄐� 鄐𨫼什鄍��鄍�',
    beginJourney: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗 鄐嗣�鄐啤� 鄐𨫼什鄍��',
    exploreMonasteries: '鄐桌�鄍肀� 鄐𨫼冗 鄐�尹鄍温今鄍�仄鄐� 鄐𨫼什鄍��',
    nav: {
      home: '鄐嫩�鄐�',
      monasteries: '鄐桌�',
      spiritualJourney: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗',
      traditions: '鄐眇�鄐舟�鄐� 鄐芹什鄐�云鄐啤冗鄐𥐰�',
      packages: '鄐颴�鄐� 鄐芹�鄐𨫼�鄐�',
      experiences: '鄐�尹鄍�五鄐�',
      about: '鄐嫩亢鄐擒什鄍� 鄐眇冗鄐啤� 鄐桌�鄐�',
      contact: '鄐詮�鄐芹什鄍温�'
    },
    tourPackages: {
      title: '鄐颴�鄐� 鄐芹�鄐𨫼�鄐�',
      subtitle: '鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐颴�鄐啤�鄐耜�鄐� 鄐𨫼� 鄐厢冗鄐舟� 鄐𨫼� 鄐嫩亢鄐擒什鄍� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐𠰍什 鄐詮冗鄐嫩元鄐賴� 鄐能冗鄐戈�鄐啤冗鄐㮙� 鄐𨫼� 鄐詮冗鄐� 鄐遤�鄐厢�鄐�奶',
      basic: {
        title: '鄐眇�鄐詮凶鄐� 鄐芹�鄐𨫼�鄐�',
        duration: '3 鄐舟凶鄐� / 2 鄐啤冗鄐�',
        services: ['鄐眇�鄐� 鄐嫩�鄐颴仆 鄐詮�鄐颴�', '鄐詮�鄐丞冗鄐兒�鄐� 鄐舟什鄍温介鄐兒�鄐� 鄐詮�鄐丞仆 (鄐鉮�鄐鉮�鄍肀�)', '鄐詮冗鄐瞹冗 鄐芹什鄐賴今鄐嫩尹', '鄐冢�鄐厢尹 鄐嗣冗鄐桌凶鄐� 鄐兒允鄍�鄐�']
      },
      premium: {
        title: '鄐芹�鄐啤�鄐桌凶鄐能亢 鄐芹�鄐𨫼�鄐�',
        duration: '5 鄐舟凶鄐� / 4 鄐啤冗鄐�',
        services: ['3-鄐詮凶鄐戈冗鄐啤冗 鄐嫩�鄐颴仆 鄐詮�鄐颴�', '鄐鉮�鄐鉮�鄍肀� + 鄐戈�鄐詮�鄐桌�鄍� 鄐瞹�鄐� + 鄐眇冗鄐眇冗 鄐桌�鄐舟凶鄐�', '鄐兒冗鄐嗣�鄐戈冗 鄐𠰍什 鄐啤冗鄐� 鄐𨫼冗 鄐遤冗鄐兒冗 鄐嗣冗鄐桌凶鄐�', '鄐兒凶鄐厢�/鄐詮冗鄐瞹冗 鄐芹什鄐賴今鄐嫩尹', '鄐兒凶鄐啤�鄐舟�鄐嗣凶鄐� 鄐颴�鄐�']
      },
      luxury: {
        title: '鄐耜�鄍温�鄐啤� 鄐芹�鄐𨫼�鄐�',
        duration: '7 鄐舟凶鄐� / 6 鄐啤冗鄐�',
        services: ['5-鄐詮凶鄐戈冗鄐啤冗 鄐嫩�鄐颴仆 / 鄐啤凶鄐詮�鄐啤�鄐� 鄐詮�鄐颴�', '鄐鉮�鄐鉮�鄍肀� + 鄐凼中鄍温中鄐啤� 鄐詮凶鄐𨫼�鄐𨫼凶鄐� (鄐耜冗鄐𠼭�鄐��, 鄐能�鄐桌丰鄐擒�鄐�)', '鄐詮五鄍� 鄐冢�鄐厢尹 鄐嗣冗鄐桌凶鄐�', '鄐兒凶鄐厢� 鄐颴�鄐� 鄐𠰍什 鄐菽�鄐能�鄍温中鄐賴�鄐� 鄐鉮冗鄐�丑', '鄐芹�鄐啤冗鄐丞亢鄐賴�鄐戈冗 鄐眇�鄐𨫼凶鄐�� 鄐𠰍什 VIP 鄐�尹鄍�五鄐�']
      },
      safetySection: {
        title: '鄐詮�鄐啤�鄍温仄鄐� 鄐𠰍什 鄐颴�鄐啤�鄐𨫼凶鄐�� 鄐芹�鄐啤不鄐擒仆鄍�',
        description: "鄐�云鄐𨫼� 鄐詮�鄐啤�鄍温仄鄐� 鄐嫩亢鄐擒什鄍� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐芹�鄐啤中鄐賴互鄐舟�鄐抉中鄐� 鄐嫩�鄍� 鄐嫩亢鄐兒� 鄐嫩什 鄐能冗鄐戈�鄐啤� 鄐𨫼� 24/7 鄐詮�鄐啤�鄍温仄鄐� 鄐詮�鄐兒凶鄐嗣�鄐𠼭凶鄐� 鄐𨫼什鄐兒� 鄐𨫼� 鄐耜凶鄐� 鄐𥐰� 鄐桌�鄐眇�鄐� 鄐﹤凶鄐厢凶鄐颴仆 鄐Ｒ冗鄐��鄐� 鄐戈�鄐能冗鄐� 鄐𨫼凶鄐能冗 鄐嫩�鄍�",
        features: {
          gps: { title: '鄐耜冗鄐�今 GPS 鄐颴�鄐啤�鄐𨫼凶鄐��', desc: '鄐菽冗鄐詮�鄐戈今鄐賴� 鄐詮亢鄐� 鄐詮�鄐丞冗鄐� 鄐兒凶鄐鉮什鄐擒尹鄍�鄍�' },
          sos: { title: '鄐�亢鄐啤�鄍��鄐詮� SOS', desc: '鄐戈�鄐啤�鄐� SOS 鄐芹�鄐啤中鄐賴�鄍温什鄐賴仁鄐擒奶' },
          support: { title: '24/7 鄐詮允鄐擒仁鄐戈冗', desc: '鄐詮亢鄐啤�鄐芹凶鄐� 鄐詮允鄐擒仁鄐戈冗 鄐颴�鄐桌奶' },
          partners: { title: '鄐詮中鄍温仁鄐擒云鄐賴中 鄐冢冗鄐鉮�鄐舟冗鄐�', desc: '鄐芹�鄐啤� 鄐戈什鄐� 鄐詮� 鄐厢冗鄐��鄍� 鄐鉮� 鄐﹤�鄐啤冗鄐�今鄐� 鄐𠰍什 鄐鉮冗鄐�丑鄍�' }
        }
      }
    },
    planJourney: '鄐�云鄐兒� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗 鄐𨫼� 鄐能�鄐厢尹鄐� 鄐眇尹鄐擒�鄐�',
    planJourneySubtitle: '鄐詮冗鄐啤丰鄍� 鄐𨫼� 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐冢什 鄐桌�鄐� 鄐菽�鄐能�鄍温中鄐賴�鄐� 鄐桌� 鄐戈�鄐啤�鄐丞仁鄐擒中鄍温什鄐� 鄐𨫼� 鄐桌冗鄐抉�鄐能亢 鄐詮� 鄐�云鄐𨫼冗 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣尹 鄐𨫼什鄐兒� 鄐舟�鄐�',
    startingPoint: '鄐芹�鄐啤冗鄐啤�鄐冢凶鄐� 鄐詮�鄐丞冗鄐�',
    primaryMonastery: '鄐桌�鄐遤�鄐� 鄐桌�',
    duration: '鄐�今鄐抉凶',
    spiritualFocus: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐徇�鄐𨫼元',
    createJourney: '鄐詮冗鄐啤丰鄍� 鄐𨫼� 鄐詮冗鄐� 鄐芹今鄐賴中鄍温什 鄐能冗鄐戈�鄐啤冗 鄐眇尹鄐擒�鄐�',
    monasteryShowcase: '鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼� 鄐芹今鄐賴中鄍温什 鄐桌�',
    monasteryShowcaseSubtitle: '鄐嫩凶鄐桌冗鄐耜仁鄍� 鄐芹什鄐賴丹鄍�介鄍温仁 鄐桌�鄐� 鄐眇元鄍� 鄐芹�鄐啤冗鄐𠼭�鄐� 鄐眇�鄐舟�鄐� 鄐桌�鄍肀� 鄐𨫼冗 鄐�尹鄍温今鄍�仄鄐� 鄐𨫼什鄍��',
    exploreMonastery: '鄐桌� 鄐𨫼冗 鄐�尹鄍温今鄍�仄鄐� 鄐𨫼什鄍��',
    spiritualExperiences: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐�尹鄍�五鄐� 鄐𠰍什 鄐詮�鄐丞冗鄐兒�鄐� 鄐詮�鄐詮�鄐𨫼�鄐戈凶',
    spiritualExperiencesSubtitle: '鄐芹�鄐啤冗鄐桌冗鄐␡凶鄐� 鄐眇�鄐舟�鄐� 鄐芹�鄐啤丰鄐擒�鄐� 鄐𠰍什 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌� 鄐詮�鄐詮�鄐𨫼�鄐戈凶 鄐桌�鄐� 鄐遤�鄐� 鄐𨫼� 鄐﹤�鄐眇� 鄐舟�鄐�',
    bookExperience: '鄐�尹鄍�五鄐� 鄐眇�鄐� 鄐𨫼什鄍��',
    buddhist: '鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐桌�鄐� 鄐眇�鄐舟�鄐� 鄐芹什鄐�云鄐啤冗鄐𥐰�',
    buddhistSubtitle: '鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼� 鄐詮亢鄍�丹鄍温之 鄐眇�鄐舟�鄐� 鄐菽凶鄐啤冗鄐詮中 鄐𠰍什 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐芹�鄐啤丰鄐擒�鄐� 鄐𨫼� 鄐眇冗鄐啤� 鄐桌�鄐� 鄐厢冗鄐兒�鄐�',
    routePlanner: '鄐桌� 鄐桌冗鄐啤�鄐� 鄐能�鄐厢尹鄐擒�鄐擒什',
    routePlannerSubtitle: '鄐詮冗鄐啤丰鄍� 鄐𨫼� 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣尹 鄐𨫼� 鄐詮冗鄐� 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐冢什 鄐桌�鄐� 鄐�云鄐兒� 鄐桌� 鄐戈�鄐啤�鄐丞仁鄐擒中鄍温什鄐� 鄐桌冗鄐啤�鄐� 鄐𨫼� 鄐能�鄐厢尹鄐� 鄐眇尹鄐擒�鄐�',
    interactiveMap: '鄐��鄐颴什鄍��鄍温�鄐賴今 鄐桌� 鄐桌冗鄐兒�鄐賴中鄍温什',
    generateItinerary: '鄐詮冗鄐啤丰鄍� 鄐𨫼� 鄐詮冗鄐� 鄐能冗鄐戈�鄐啤冗 鄐𨫼冗鄐啤�鄐能�鄍温什鄐� 鄐眇尹鄐擒�鄐�',
    saarthiGreeting: "鄐兒亢鄐詮�鄐戈�! 鄐桌�鄐� 鄐詮冗鄐啤丰鄍� 鄐嫩�鄐�, 鄐�云鄐𨫼冗 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣�鄍� 鄐�� 鄐�云 鄐𨫼凶鄐� 鄐桌� 鄐𨫼冗 鄐�尹鄍温今鄍�仄鄐� 鄐𨫼什鄐兒冗 鄐𠼭冗鄐嫩�鄐��鄍�?",
    chatWithSaarthi: '鄐詮冗鄐啤丰鄍� 鄐詮� 鄐眇冗鄐� 鄐𨫼什鄍��!',
    spiritualGuide: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣�',
    askAbout: '鄐桌�鄍肀�, 鄐抉�鄐能冗鄐� 鄐𨫼� 鄐眇冗鄐啤� 鄐桌�鄐� 鄐芹�鄐𥔿�鄐�...',
    about: {
      title: '鄐熈�鄐桌� 鄐��鄐﹤凶鄐能冗 鄐𨫼� 鄐眇冗鄐啤� 鄐桌�鄐�',
      subtitle: '鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐菽凶鄐啤冗鄐詮中 鄐𨫼冗 鄐�云鄐𨫼冗 鄐舟�鄐菽冗鄐�',
      description: '鄐熈�鄐桌� 鄐��鄐﹤凶鄐能冗 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼� 鄐芹今鄐賴中鄍温什 鄐眇�鄐舟�鄐� 鄐菽凶鄐啤冗鄐詮中 鄐𨫼� 鄐詮�鄐啤�鄍温仄鄐賴中 鄐𨫼什鄐兒� 鄐𠰍什 鄐詮冗鄐瞹冗 鄐𨫼什鄐兒� 鄐𨫼� 鄐耜凶鄐� 鄐詮亢鄐啤�鄐芹凶鄐� 鄐嫩�鄍� 鄐嫩亢 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐詮冗鄐抉�鄍肀� 鄐𨫼� 鄐詮�鄐丞冗鄐兒�鄐� 鄐厢�鄐𠒎冗鄐� 鄐𠰍什 鄐詮丹鄐賴仁鄍肀� 鄐芹�鄐啤冗鄐兒� 鄐芹什鄐�云鄐啤冗鄐㮙� 鄐舟�鄐菽冗鄐啤冗 鄐兒凶鄐啤�鄐舟�鄐嗣凶鄐� 鄐芹�鄐啤冗鄐桌冗鄐␡凶鄐� 鄐桌� 鄐�尹鄍�五鄐菽�鄐� 鄐詮� 鄐厢�鄐﹤兮鄐戈� 鄐嫩�鄐�奶',
      mission: '鄐嫩亢鄐擒什鄐� 鄐桌凶鄐嗣尹',
      missionText: '鄐�尹 鄐芹今鄐賴中鄍温什 鄐詮�鄐丞冗鄐兒�鄐� 鄐𨫼� 鄐芹今鄐賴中鄍温什鄐戈冗 鄐𠰍什 鄐芹什鄐�云鄐啤冗鄐㮙� 鄐𨫼� 鄐詮�鄐啤�鄍温仄鄐賴中 鄐𨫼什鄐戈� 鄐嫩�鄐� 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐遤�鄐擒尹鄍� 鄐𨫼� 鄐詮五鄍� 鄐詮冗鄐抉�鄍肀� 鄐𨫼� 鄐耜凶鄐� 鄐詮�鄐耜五 鄐眇尹鄐擒尹鄐擒奶',
      vision: '鄐嫩亢鄐擒什鄍� 鄐舟�鄐獅�鄐颴凶',
      visionText: '鄐𥐰� 鄐𩇫元鄍� 鄐舟�鄐兒凶鄐能冗 鄐厢允鄐擒� 鄐芹�鄐啤冗鄐𠼭�鄐� 鄐厢�鄐𠒎冗鄐� 鄐�之鄍�尹鄐賴� 鄐�中鄍温亢鄐擒�鄐� 鄐𨫼� 鄐嗣冗鄐�中鄐�, 鄐𨫼什鄍�不鄐� 鄐𠰍什 鄐厢�鄐𠒎冗鄐� 鄐𨫼� 鄐㮙什 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣尹 鄐𨫼什鄍�奶',
      values: '鄐嫩亢鄐擒什鄍� 鄐桌�鄐耜�鄐�',
      valuesText: '鄐芹什鄐�云鄐啤冗 鄐𨫼� 鄐耜凶鄐� 鄐詮亢鄍温亢鄐擒尹, 鄐芹�鄐啤冗鄐桌冗鄐␡凶鄐� 鄐�尹鄍�五鄐�, 鄐颴凶鄐𨫼冗鄐� 鄐芹什鄍温仁鄐颴尹, 鄐𠰍什 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐菽凶鄐𨫼冗鄐詮奶',
      team: '鄐嫩亢鄐擒什鄍� 鄐颴�鄐�',
      teamText: '鄐詮�鄐丞冗鄐兒�鄐� 鄐鉮冗鄐�丑, 鄐眇�鄐舟�鄐� 鄐菽凶鄐舟�鄐菽冗鄐�, 鄐𠰍什 鄐能冗鄐戈�鄐啤冗 鄐菽凶鄐嗣�鄐獅�鄍温� 鄐詮冗鄐啤�鄐丞� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗鄐𥐰� 鄐眇尹鄐擒尹鄍� 鄐𨫼� 鄐耜凶鄐� 鄐桌凶鄐耜�鄐� 鄐𨫼冗鄐� 鄐𨫼什 鄐啤允鄍� 鄐嫩�鄐�奶'
    },
    contact: {
      title: '鄐詮�鄐芹什鄍温� 鄐𨫼什鄍��',
      subtitle: '鄐�� 鄐嫩� 鄐�云鄐兒� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗 鄐嗣�鄐啤� 鄐𨫼什鄍��',
      getInTouch: '鄐詮�鄐芹什鄍温� 鄐桌�鄐� 鄐啤允鄍��',
      address: '鄐芹中鄐�',
      addressText: '鄐鉮�鄐鉮�鄍肀�, 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 737101, 鄐冢冗鄐啤中',
      phone: '鄐徇�鄐�',
      phoneText: '+91 98765 43210',
      email: '鄐�亢鄍�仆',
      emailText: 'namaste@ghoomo.india',
      hours: '鄐𨫼冗鄐啤�鄐能冗鄐耜仁 鄐詮亢鄐�',
      hoursText: '鄐詮�鄐� - 鄐嗣尹鄐�: 鄐詮�鄐眇允 9:00 - 鄐嗣冗鄐� 6:00',
      sendMessage: '鄐詮�鄐舟�鄐� 鄐冢�鄐厢�鄐�',
      name: '鄐�云鄐𨫼冗 鄐兒冗鄐�',
      subject: '鄐菽凶鄐獅仁',
      message: '鄐�云鄐𨫼冗 鄐詮�鄐舟�鄐�',
      submit: '鄐詮�鄐舟�鄐� 鄐冢�鄐厢�鄐�'
    },
    bookingModal: {
      title: '鄐�云鄐兒冗 鄐�尹鄍�五鄐� 鄐眇�鄐� 鄐𨫼什鄍��',
      selectDate: '鄐戈冗鄐啤�鄐� 鄐𠼭�鄐兒�鄐�',
      selectTime: '鄐詮亢鄐� 鄐𠼭�鄐兒�鄐�',
      participants: '鄐芹�鄐啤中鄐賴五鄐擒�鄐賴仁鄍肀� 鄐𨫼� 鄐詮�鄐遤�鄐能冗',
      specialRequests: '鄐菽凶鄐嗣�鄐� 鄐�尹鄍�什鄍肀之',
      totalCost: '鄐𨫼�鄐� 鄐耜冗鄐鉮中',
      bookNow: '鄐�五鄍� 鄐眇�鄐� 鄐𨫼什鄍��',
      close: '鄐眇�鄐� 鄐𨫼什鄍��'
    },
    monasteryModal: {
      history: '鄐�中鄐賴允鄐擒元',
      traditions: '鄐芹什鄐�云鄐啤冗鄐𥐰�',
      visitingHours: '鄐舟什鄍温介鄐� 鄐詮亢鄐�',
      location: '鄐詮�鄐丞冗鄐�',
      nearbyAttractions: '鄐兒�鄐舟�鄐𨫼� 鄐��鄐啤�鄐獅不',
      close: '鄐眇�鄐� 鄐𨫼什鄍��'
    },
    itineraryResult: {
      title: '鄐�云鄐𨫼冗 鄐芹今鄐賴中鄍温什 鄐能冗鄐戈�鄐啤冗 鄐𨫼冗鄐啤�鄐能�鄍温什鄐�',
      generatedBy: '鄐詮冗鄐啤丰鄍� 鄐舟�鄐菽冗鄐啤冗 鄐戈�鄐能冗鄐�',
      day: '鄐舟凶鄐�',
      close: '鄐眇�鄐� 鄐𨫼什鄍��'
    },
    footer: {
      description: '鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼� 鄐芹今鄐賴中鄍温什 鄐桌�鄍肀� 鄐𠰍什 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐菽凶鄐啤冗鄐詮中 鄐𨫼� 鄐遤�鄐� 鄐𨫼什鄍��鄍� 鄐嫩凶鄐桌冗鄐耜仁 鄐桌�鄐� 鄐眇�鄐舟�鄐� 鄐厢�鄐𠒎冗鄐� 鄐𨫼� 鄐耜凶鄐� 鄐�云鄐𨫼冗 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣�鄍�',
      sacredPlaces: '鄐芹今鄐賴中鄍温什 鄐詮�鄐丞冗鄐�',
      support: '鄐詮允鄐擒仁鄐戈冗',
      connect: '鄐厢�鄐﹤兮鄍��',
      followUs: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐芹�鄐啤�鄐啤不鄐� 鄐𨫼� 鄐耜凶鄐� 鄐嫩亢鄍�� 鄐徇�鄐耜� 鄐𨫼什鄍��',
      copyright: '穢 2024 鄐熈�鄐桌� 鄐��鄐﹤凶鄐能冗鄍� 鄐詮五鄍� 鄐�之鄐賴�鄐擒什 鄐詮�鄐啤�鄍温仄鄐賴中鄍� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐詮冗鄐抉�鄍肀� 鄐𨫼� 鄐耜凶鄐� �� 鄐𨫼� 鄐詮冗鄐� 鄐眇尹鄐擒仁鄐� 鄐鉮仁鄐擒奶',
      ar: {
        viewInAr: 'AR 鄐桌�鄐� 鄐舟�鄐遤�鄐�',
        instructions: 'AR 鄐兒凶鄐啤�鄐舟�鄐�',
        close: 'AR 鄐舟�鄐嗣�鄐� 鄐眇�鄐� 鄐𨫼什鄍��'
      }
    },
    monasteries: {
      rumtek: {
        name: '鄐啤�鄐桌�鄍�� 鄐桌�',
        description: '鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼冗 鄐詮互鄐詮� 鄐眇丑鄐潼冗 鄐桌�, 鄐𨫼什鄍温亢鄐擒云鄐� 鄐𨫼� 鄐鉮丹鄍温丹鄍�',
        history: '1966 鄐桌�鄐� 鄐兒凶鄐啤�鄐桌凶鄐�, 鄐啤�鄐桌�鄍�� 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼冗 鄐詮互鄐詮� 鄐眇丑鄐潼冗 鄐桌� 鄐嫩� 鄐𠰍什 鄐𨫼什鄍温亢鄐� 鄐𨫼�鄍温仁鄍� 鄐菽�鄐� 鄐𨫼� 鄐桌�鄐遤�鄐� 鄐鉮丹鄍温丹鄍� 鄐嫩�鄍� 鄐能允鄐擒� 鄐眇允鄍�亢鄍�仆鄍温仁 鄐�今鄐嗣�鄐� 鄐𠰍什 鄐芹�鄐啤冗鄐𠼭�鄐� 鄐眇�鄐舟�鄐� 鄐𨫼仆鄐擒�鄍�中鄐賴仁鄐擒� 鄐嫩�鄐�奶',
        traditions: '鄐𨫼什鄍温亢鄐� 鄐𨫼�鄍温仁鄍� 鄐芹什鄐�云鄐啤冗 鄐𨫼冗 鄐芹冗鄐耜尹 鄐𨫼什鄐戈冗 鄐嫩� 鄐厢凶鄐詮亢鄍�� 鄐舟�鄐兒凶鄐� 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐�, 鄐抉�鄐能冗鄐� 鄐詮中鄍温什, 鄐𠰍什 鄐戈凶鄐眇�鄐眇中鄍� 鄐兒今 鄐菽什鄍温仄 鄐詮亢鄐擒什鄍肀允 鄐詮允鄐賴中 鄐菽冗鄐啤�鄐獅凶鄐� 鄐戈�鄐能�鄐嫩冗鄐� 鄐嗣冗鄐桌凶鄐� 鄐嫩�鄐�奶',
        hours: '鄐詮�鄐眇允 6:00 - 鄐嗣冗鄐� 6:00',
        location: '鄐鉮�鄐鉮�鄍肀� 鄐詮� 24 鄐𨫼凶鄐桌�',
        attractions: '鄐詮�鄐菽什鄍温不 鄐詮�鄐戈�鄐�, 鄐桌� 鄐詮�鄐鉮�鄐啤允鄐擒仆鄐�, 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐� 鄐𠼭�鄍温什'
      },
      namchi: {
    name: '鄐兒亢鄐𠼭� 鄐桌�',
    description: '鄐舟�鄍温仄鄐賴不 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐桌�鄐� 鄐詮�鄐丞凶鄐� 鄐𥐰� 鄐芹�鄐啤元鄐賴丹鄍温之 鄐眇�鄐舟�鄐� 鄐桌�, 鄐厢� 鄐�云鄐兒� 鄐嗣冗鄐�中 鄐菽冗鄐戈冗鄐菽什鄐� 鄐𠰍什 鄐菽凶鄐嗣冗鄐� 鄐鉮�鄐啤� 鄐芹丹鄍温亢鄐詮�鄐冢今 鄐芹�鄐啤中鄐賴亢鄐� 鄐𨫼� 鄐耜凶鄐� 鄐芹�鄐啤元鄐賴丹鄍温之 鄐嫩�鄍�',
    history: '鄐兒亢鄐𠼭� 鄐桌� 鄐𨫼� 鄐詮�鄐丞冗鄐芹尹鄐� 鄐鉮�鄐啤� 鄐芹丹鄍温亢鄐詮�鄐冢今 鄐𨫼� 鄐嗣凶鄐𨫼�鄐獅冗鄐㮙� 鄐𨫼� 鄐詮�鄐啤�鄍温仄鄐� 鄐𠰍什 鄐眇�鄐舟�鄐� 鄐抉什鄍温亢 鄐𨫼� 鄐芹�鄐啤�鄐擒什 鄐嫩�鄐戈� 鄐𨫼� 鄐鉮� 鄐丞�鄍� 鄐能允 鄐𨫼�鄐獅�鄐戈�鄐� 鄐桌�鄐� 鄐𥐰� 鄐芹�鄐啤亢鄍�� 鄐抉冗鄐啤�鄐桌凶鄐� 鄐𠰍什 鄐詮冗鄐�元鄍温�鄍�中鄐賴� 鄐𨫼�鄐�丹鄍温什 鄐嫩�鄍�',
    traditions: '鄐能允鄐擒� 鄐菽冗鄐啤�鄐獅凶鄐� 鄐眇�鄐舟�鄐� 鄐戈�鄐能�鄐嫩冗鄐�, 鄐芹冗鄐啤�鄐芹什鄐賴� 鄐兒�鄐戈�鄐� 鄐𠰍什 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐� 鄐詮五鄐擒�鄐� 鄐�仁鄍肀�鄐賴中 鄐𨫼� 鄐厢冗鄐戈� 鄐嫩�鄐�, 鄐厢凶鄐兒亢鄍�� 鄐舟�鄐�-鄐舟�鄐� 鄐詮� 鄐嗣�鄐啤丹鄍温之鄐擒仆鄍� 鄐�中鄍� 鄐嫩�鄐�奶',
    hours: '鄐詮�鄐眇允 8:00 - 鄐嗣冗鄐� 6:00',
    location: '鄐兒亢鄐𠼭�, 鄐舟�鄍温仄鄐賴不 鄐詮凶鄐𨫼�鄐𨫼凶鄐�',
    attractions: '鄐鉮�鄐啤� 鄐芹丹鄍温亢鄐詮�鄐冢今 鄐𨫼� 135 鄐徇�鄐� 鄐𢺋�鄐𠼭� 鄐芹�鄐啤中鄐賴亢鄐�, 鄐詮�鄐耜�鄐徇�鄐� 鄐𠼭�鄐𥐰中鄍��, 鄐𠰍什 鄐�元鄐芹冗鄐� 鄐𨫼� 鄐芹什鄍温今鄐戈�鄐� 鄐舟�鄐嗣�鄐�'
},
      tashiding: {
        name: '鄐戈冗鄐嗣凶鄐舟凶鄐�� 鄐桌�',
        description: '鄐舟� 鄐兒丹鄐賴仁鄍肀� 鄐𨫼� 鄐眇�鄐� 鄐芹允鄐擒丑鄐潼� 鄐芹什 鄐芹今鄐賴中鄍温什 鄐桌�',
        history: '1717 鄐桌�鄐� 鄐詮�鄐丞冗鄐芹凶鄐�, 鄐戈冗鄐嗣凶鄐舟凶鄐�� 鄐𨫼冗 鄐�什鄍温丰 鄐嫩� "鄐詮亢鄐啤�鄐芹凶鄐� 鄐𨫼�鄐�丹鄍温什鄍�鄐� 鄐鉮�鄐啤今" 鄐𠰍什 鄐�元鄍� 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼� 鄐詮互鄐詮� 鄐芹今鄐賴中鄍温什 鄐桌�鄍肀� 鄐桌�鄐� 鄐詮� 鄐𥐰� 鄐桌冗鄐兒冗 鄐厢冗鄐戈冗 鄐嫩�鄍�',
        traditions: '鄐眇�鄐桌�鄍� 鄐詮亢鄐擒什鄍肀允 鄐𨫼� 鄐耜凶鄐� 鄐芹�鄐啤元鄐賴丹鄍温之 鄐厢允鄐擒� 鄐冢�鄍温中鄍肀� 鄐𨫼� 鄐芹今鄐賴中鄍温什 鄐厢仆 鄐菽凶鄐戈什鄐賴中 鄐𨫼凶鄐能冗 鄐厢冗鄐戈冗 鄐嫩�, 鄐厢� 鄐�尹鄍� 鄐菽冗鄐耜� 鄐菽什鄍温仄 鄐𨫼� 鄐冢今鄐賴仄鄍温仁鄐菽冗鄐␡� 鄐𨫼什鄐兒� 鄐桌�鄐� 鄐菽凶鄐嗣�鄐菽冗鄐� 鄐𨫼凶鄐能冗 鄐厢冗鄐戈冗 鄐嫩�鄍�',
        hours: '鄐詮�鄐眇允 6:00 - 鄐嗣冗鄐� 6:00',
        location: '鄐啤�鄐鉮凶鄐� 鄐𠰍什 鄐啤丰鄍肀�鄐� 鄐兒丹鄐賴仁鄍肀� 鄐𨫼� 鄐眇�鄐�',
        attractions: '鄐芹今鄐賴中鄍温什 鄐眇�鄐桌�鄍� 鄐𨫼仆鄐�, 鄐𠼭�鄐啤�鄐戈�鄐�, 鄐兒丹鄍� 鄐詮�鄐鉮亢 鄐舟�鄐嗣�鄐�'
      },
      enchey: {
        name: '鄐𥐰尹鄍温�鄍� 鄐桌�',
        description: '鄐鉮�鄐鉮�鄍肀� 鄐𨫼� 鄐舟�鄐遤尹鄍� 鄐菽冗鄐耜冗 鄐詮�鄐�丹鄐� 鄐桌�',
        history: '1909 鄐桌�鄐� 鄐兒凶鄐啤�鄐桌凶鄐�, 鄐𥐰尹鄍温�鄍� 鄐𨫼冗 鄐�什鄍温丰 鄐嫩� "鄐𥐰�鄐擒�鄐� 鄐桌�鄐舟凶鄐�" 鄐𠰍什 鄐�元鄐𨫼� 鄐詮�鄐丞冗鄐芹尹鄐� 鄐耜冗鄐桌冗 鄐舟�鄐啤�鄐芹�鄐戈�鄐� 鄐𨫼冗鄐啤�鄐芹� 鄐舟�鄐菽冗鄐啤冗 鄐𨫼� 鄐鉮� 鄐丞� 鄐厢凶鄐兒�鄍� 鄐眇冗鄐啤� 鄐桌�鄐� 鄐桌冗鄐兒冗 鄐厢冗鄐戈冗 鄐丞冗 鄐𨫼凶 鄐凼尹鄐𨫼� 鄐芹冗鄐� 鄐凼丑鄐潼尹鄍� 鄐𨫼� 鄐嗣�鄍温中鄐� 鄐丞�鄍�',
        traditions: '鄐兒�鄐能凶鄐��鄐桌冗 鄐芹什鄐�云鄐啤冗 鄐𨫼� 鄐詮冗鄐� 鄐菽冗鄐啤�鄐獅凶鄐� 鄐𥔿亢 鄐兒�鄐戈�鄐� 鄐芹�鄐啤丹鄐啤�鄐嗣尹 鄐𠰍什 鄐鉮�鄐鉮�鄍肀� 鄐嗣允鄐� 鄐𨫼� 鄐詮�鄐啤�鄍温仄鄐� 鄐𨫼� 鄐耜凶鄐� 鄐菽凶鄐嗣�鄐� 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐擒�鄐�奶',
        hours: '鄐詮�鄐眇允 6:00 - 鄐嗣冗鄐� 6:00',
        location: '鄐鉮�鄐鉮�鄍肀�, 鄐芹�鄐啤�鄐菽� 鄐詮凶鄐𨫼�鄐𨫼凶鄐�',
        attractions: '鄐嗣允鄐� 鄐𨫼� 鄐舟�鄐嗣�鄐�, 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐� 鄐瞹�鄐﹤�, 鄐芹冗鄐啤�鄐芹什鄐賴� 鄐菽冗鄐詮�鄐戈�鄐𨫼仆鄐�'
      },
      dubdi: {
        name: '鄐舟�鄐眇�鄐舟� 鄐桌�',
        description: '鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐桌�鄐� 鄐兒凶鄐啤�鄐桌凶鄐� 鄐芹允鄐耜冗 鄐桌�',
        history: '1701 鄐桌�鄐� 鄐𠼭�鄐能�鄐鉮�鄐能冗鄐� 鄐兒冗鄐桌�鄍温仁鄐擒仆 鄐舟�鄐菽冗鄐啤冗 鄐詮�鄐丞冗鄐芹凶鄐�, 鄐舟�鄐眇�鄐舟� 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼冗 鄐詮互鄐詮� 鄐芹�鄐啤冗鄐兒冗 鄐桌� 鄐嫩� 鄐𠰍什 鄐�元 鄐𨫼�鄐獅�鄐戈�鄐� 鄐桌�鄐� 鄐眇�鄐舟�鄐� 鄐抉什鄍温亢 鄐𨫼� 鄐嗣�鄐啤�鄐�中 鄐𨫼冗 鄐芹�鄐啤中鄍�鄐� 鄐嫩�鄍�',
        traditions: '鄐兒�鄐能凶鄐��鄐桌冗 鄐芹什鄐�云鄐啤冗 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐桌�鄐� 鄐耜冗鄐� 鄐鉮� 鄐桌�鄐� 鄐嗣凶鄐𨫼�鄐獅冗鄐㮙� 鄐𨫼� 鄐詮�鄐啤�鄍温仄鄐賴中 鄐𨫼什鄐戈� 鄐嫩�, 鄐厢凶鄐詮亢鄍�� 鄐芹�鄐啤冗鄐𠼭�鄐� 鄐芹冗鄐�丑鄍�仆鄐賴云鄐賴仁鄐擒� 鄐𠰍什 鄐�今鄐嗣�鄐� 鄐嫩�鄐�奶',
        hours: '鄐詮�鄐眇允 7:00 - 鄐嗣冗鄐� 5:00',
        location: '鄐能�鄐𨫼�鄐詮�鄐�, 鄐芹介鄍温�鄐賴亢 鄐詮凶鄐𨫼�鄐𨫼凶鄐�',
        attractions: '鄐芹�鄐啤冗鄐𠼭�鄐� 鄐芹冗鄐�丑鄍�仆鄐賴云鄐賴仁鄐擒�, 鄐𩇫中鄐賴允鄐擒元鄐賴� 鄐桌允鄐戈�鄐�, 鄐颴�鄐啤�鄐𨫼凶鄐�� 鄐颴�鄐啤�鄐耜�鄐�'
      },
      ralang: {
        name: '鄐啤冗鄐耜冗鄐�� 鄐桌�',
        description: '鄐�云鄐兒� 鄐芹今鄐賴中鄍温什 鄐𥔿亢 鄐兒�鄐戈�鄐� 鄐芹�鄐啤丹鄐啤�鄐嗣尹 鄐𨫼� 鄐耜凶鄐� 鄐芹�鄐啤元鄐賴丹鄍温之',
        history: '1768 鄐桌�鄐� 鄐詮�鄐丞冗鄐芹凶鄐�, 鄐啤冗鄐耜冗鄐�� 鄐桌� 鄐�云鄐兒� 鄐菽冗鄐啤�鄐獅凶鄐� 鄐芹冗鄐�� 鄐耜�鄐嫩冗鄐眇�鄐詮�鄐� 鄐戈�鄐能�鄐嫩冗鄐� 鄐𠰍什 鄐芹冗鄐啤�鄐芹什鄐賴� 鄐𥔿亢 鄐兒�鄐戈�鄐� 鄐𨫼� 鄐耜凶鄐� 鄐芹�鄐啤元鄐賴丹鄍温之 鄐嫩�鄍�',
        traditions: '鄐𨫼�鄍温仁鄍� 鄐芹什鄐�云鄐啤冗 鄐𨫼� 鄐詮冗鄐� 鄐嗣冗鄐兒丹鄐擒什 鄐桌�鄐遤�鄐颴冗 鄐兒�鄐戈�鄐� 鄐戈�鄐能�鄐嫩冗鄐� 鄐𠰍什 鄐遤冗鄐��鄐𠼭�鄐�丹鄐厢兮鄍肀�鄐鉮冗 鄐芹什鄍温今鄐� 鄐𨫼冗 鄐詮亢鄍温亢鄐擒尹 鄐𨫼什鄐兒� 鄐菽冗鄐耜� 鄐詮亢鄐擒什鄍肀允鄍�',
        hours: '鄐詮�鄐眇允 6:00 - 鄐嗣冗鄐� 6:00',
        location: '鄐啤冗鄐菽�鄐鉮仆鄐�, 鄐舟�鄍温仄鄐賴不 鄐詮凶鄐𨫼�鄐𨫼凶鄐�',
        attractions: '鄐𥔿亢 鄐兒�鄐戈�鄐� 鄐桌�鄐�, 鄐戈�鄐能�鄐嫩冗鄐� 鄐桌�鄐舟冗鄐�, 鄐芹什鄍温今鄐� 鄐舟�鄐嗣�鄐�'
      }
    },
    experiences: {
      meditation: '鄐啤�鄐桌�鄍�� 鄐桌�鄐� 鄐抉�鄐能冗鄐� 鄐啤凶鄐颴�鄐啤�鄐�',
      philosophy: '鄐眇�鄐舟�鄐� 鄐舟什鄍温介鄐� 鄐𨫼�鄍温仄鄐擒�鄐�',
      homestay: '鄐桌� 鄐嫩�鄐桌元鄍温�鄍� 鄐�尹鄍�五鄐�',
      crafts: '鄐嫩元鄍温中鄐兒凶鄐啤�鄐桌凶鄐� 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐� 鄐𠼭�鄍温什'
    },
    traditions: {
      nyingma: {
        title: '鄐兒�鄐能凶鄐��鄐桌冗 鄐芹什鄐�云鄐啤冗',
        description: '鄐戈凶鄐眇�鄐眇中鄍� 鄐眇�鄐舟�鄐� 鄐抉什鄍温亢 鄐𨫼冗 鄐詮互鄐詮� 鄐芹�鄐啤冗鄐兒冗 鄐詮�鄐𨫼�鄐�, 鄐抉�鄐能冗鄐� 鄐𠰍什 鄐戈冗鄐�中鄍温什鄐賴� 鄐芹�鄐啤丰鄐擒�鄐� 鄐芹什 鄐厢�鄐� 鄐舟�鄐戈冗 鄐嫩�鄍� 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐𨫼� 鄐�之鄐賴�鄐擒�鄐� 鄐桌� 鄐�元 鄐芹什鄐�云鄐啤冗 鄐𨫼冗 鄐芹冗鄐耜尹 鄐𨫼什鄐戈� 鄐嫩�鄐�奶'
      },
      kagyu: {
        title: '鄐𨫼�鄍温仁鄍� 鄐芹什鄐�云鄐啤冗',
        description: '鄐抉�鄐能冗鄐� 鄐𠰍什 鄐嗣凶鄐𨫼�鄐獅� 鄐詮� 鄐𥔿冗鄐戈�鄐� 鄐戈� 鄐桌�鄐遤凶鄐� 鄐芹什鄐�云鄐啤冗 鄐𨫼� 鄐桌冗鄐抉�鄐能亢 鄐詮� 鄐嗣凶鄐𨫼�鄐獅冗鄐㮙� 鄐𨫼� 鄐芹�鄐啤元鄐擒什鄐� 鄐芹什 鄐厢�鄐� 鄐舟�鄐兒� 鄐𨫼� 鄐耜凶鄐� 鄐厢冗鄐兒冗 鄐厢冗鄐戈冗 鄐嫩�鄍�'
      },
      festivals: {
        title: '鄐芹今鄐賴中鄍温什 鄐戈�鄐能�鄐嫩冗鄐�',
        description: '鄐芹冗鄐啤�鄐芹什鄐賴� 鄐𥔿亢 鄐兒�鄐戈�鄐�, 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐� 鄐𠰍什 鄐詮冗鄐桌�鄐舟冗鄐能凶鄐� 鄐凼中鄍温元鄐� 鄐𨫼� 鄐詮冗鄐� 鄐啤�鄐鉮互鄐賴什鄐��鄍� 鄐眇�鄐舟�鄐� 鄐戈�鄐能�鄐嫩冗鄐啤�鄐� 鄐𨫼冗 鄐�尹鄍�五鄐� 鄐𨫼什鄍��鄍�'
      }
    }
  },
  鄐兒�鄐芹冗鄐耜�: {
    appName: '鄐熈�鄐桌�鄐桌� 鄐�尹鄍温丑鄐賴仁鄐�',
    tagline: '鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄐� 鄐芹今鄐賴中鄍温什 鄐鉮�鄐桌�鄐眇冗鄐嫩什鄍�',
    heroTitle: '鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄐� 鄐芹今鄐賴中鄍温什 鄐鉮�鄐桌�鄐眇冗鄐嫩什鄍�',
    heroSubtitle: '鄐嫩凶鄐桌冗鄐耜仁鄐𨫼� 鄐桌�鄐颴�鄐桌冗 鄐芹�鄐啤冗鄐𠼭�鄐� 鄐厢�鄐𠒎冗鄐�, 鄐嗣冗鄐兒�鄐戈凶鄐芹�鄐啤�鄐� 鄐抉�鄐能冗鄐� 鄐� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐厢�鄐𠒎冗鄐兒�鄍� 鄐遤�鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍温奶',
    beginJourney: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗 鄐詮�鄐啤� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�',
    exploreMonasteries: '鄐鉮�鄐桌�鄐眇冗鄐嫩什鄍��鄍� 鄐�尹鄍温今鄍�仄鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�',
    nav: {
      home: '鄐熈什',
      monasteries: '鄐鉮�鄐桌�鄐眇冗鄐嫩什鄍�',
      spiritualJourney: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗',
      traditions: '鄐眇�鄐舟�鄐� 鄐芹什鄐桌�鄐芹什鄐擒允鄐啤�',
      packages: '鄐颴�鄐� 鄐芹�鄐能冗鄐𨫼�鄐厢允鄐啤�',
      experiences: '鄐�尹鄍�五鄐菽允鄐啤�',
      about: '鄐嫩冗鄐桌�鄐啤� 鄐眇冗鄐啤�鄐桌冗',
      contact: '鄐詮亢鄍温云鄐啤�鄐�'
    },
    planJourney: '鄐戈云鄐擒�鄐��鄍� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗鄐𨫼� 鄐能�鄐厢尹鄐� 鄐眇尹鄐擒�鄐兒�鄐嫩�鄐詮�',
    planJourneySubtitle: '鄐詮冗鄐啤丰鄍�鄐耜冗鄐� 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌五鄐啤凶 鄐菽�鄐能�鄍温中鄐賴�鄐� 鄐鉮�鄐桌�鄐眇冗 鄐戈�鄐啤�鄐丞仁鄐擒中鄍温什鄐擒�鄍� 鄐桌冗鄐抉�鄐能亢鄐眇冗鄐� 鄐戈云鄐擒�鄐��鄍� 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣尹 鄐鉮什鄍温尹 鄐舟凶鄐兒�鄐嫩�鄐詮�',
    startingPoint: '鄐詮�鄐啤�鄐菽冗鄐戈� 鄐詮�鄐丞冗鄐�',
    primaryMonastery: '鄐桌�鄐遤�鄐� 鄐鉮�鄐桌�鄐眇冗',
    duration: '鄐�今鄐抉凶',
    spiritualFocus: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐徇�鄐𨫼元',
    createJourney: '鄐詮冗鄐啤丰鄍�鄐詮�鄐� 鄐芹今鄐賴中鄍温什 鄐能冗鄐戈�鄐啤冗 鄐詮凶鄐啤�鄐厢尹鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�',
    monasteryShowcase: '鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄐� 鄐芹今鄐賴中鄍温什 鄐鉮�鄐桌�鄐眇冗鄐嫩什鄍�',
    monasteryShowcaseSubtitle: '鄐嫩凶鄐桌冗鄐耜仁鄍� 鄐芹什鄐賴丹鄍�介鄍温仁鄐桌冗 鄐眇元鄍��鄐� 鄐芹�鄐啤冗鄐𠼭�鄐� 鄐眇�鄐舟�鄐� 鄐鉮�鄐桌�鄐眇冗鄐嫩什鄍��鄍� 鄐�尹鄍温今鄍�仄鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�',
    exploreMonastery: '鄐鉮�鄐桌�鄐眇冗鄐𨫼� 鄐�尹鄍温今鄍�仄鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�',
    spiritualExperiences: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐�尹鄍�五鄐菽允鄐啤� 鄐� 鄐詮�鄐丞冗鄐兒�鄐� 鄐詮�鄐詮�鄐𨫼�鄐戈凶',
    spiritualExperiencesSubtitle: '鄐芹�鄐啤冗鄐桌冗鄐␡凶鄐� 鄐眇�鄐舟�鄐� 鄐�五鄍温仁鄐擒元鄐嫩什鄍� 鄐� 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌� 鄐詮�鄐詮�鄐𨫼�鄐戈凶鄐桌冗 鄐�井鄍�仆鄐擒� 鄐﹤�鄐眇冗鄐凼尹鄍�允鄍肀元鄍�',
    bookExperience: '鄐�尹鄍�五鄐� 鄐眇�鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�',
    buddhist: '鄐詮凶鄐𨫼�鄐𨫼凶鄐桌亢鄐� 鄐眇�鄐舟�鄐� 鄐芹什鄐桌�鄐芹什鄐擒允鄐啤�',
    buddhistSubtitle: '鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄍� 鄐詮亢鄍�丹鄍温之 鄐眇�鄐舟�鄐� 鄐詮亢鄍温云鄐舟冗 鄐� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐�五鄍温仁鄐擒元鄐嫩什鄍��鄍� 鄐眇冗鄐啤�鄐桌冗 鄐厢冗鄐兒�鄐兒�鄐嫩�鄐詮�',
    routePlanner: '鄐鉮�鄐桌�鄐眇冗 鄐桌冗鄐啤�鄐� 鄐能�鄐厢尹鄐擒�鄐擒什',
    routePlannerSubtitle: '鄐詮冗鄐啤丰鄍�鄐𨫼� 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣尹鄐桌冗 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌五鄐啤凶 鄐戈云鄐擒�鄐��鄍� 鄐鉮�鄐桌�鄐眇冗 鄐戈�鄐啤�鄐丞仁鄐擒中鄍温什鄐� 鄐桌冗鄐啤�鄐鉮�鄍� 鄐能�鄐厢尹鄐� 鄐眇尹鄐擒�鄐兒�鄐嫩�鄐詮�',
    interactiveMap: '鄐�尹鄍温中鄐啤�鄍温什鄐賴仁鄐擒中鄍温亢鄐� 鄐鉮�鄐桌�鄐眇冗 鄐兒�鄍温元鄐�',
    generateItinerary: '鄐詮冗鄐啤丰鄍�鄐詮�鄐� 鄐能冗鄐戈�鄐啤冗 鄐𨫼冗鄐啤�鄐能�鄍温什鄐� 鄐眇尹鄐擒�鄐兒�鄐嫩�鄐詮�',
    saarthiGreeting: "鄐兒亢鄐詮�鄐戈�! 鄐� 鄐詮冗鄐啤丰鄍� 鄐嫩�鄐�, 鄐戈云鄐擒�鄐��鄍� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣�鄍� 鄐�� 鄐戈云鄐擒�鄐� 鄐𨫼�鄐� 鄐鉮�鄐桌�鄐眇冗鄐𨫼� 鄐�尹鄍温今鄍�仄鄐� 鄐鉮什鄍温尹 鄐𠼭冗鄐嫩尹鄍�允鄍�尹鄍温�?",
    chatWithSaarthi: '鄐詮冗鄐啤丰鄍�鄐詮�鄐� 鄐𨫼�鄐啤冗 鄐鉮什鄍温尹鄍�允鄍肀元鄍�!',
    spiritualGuide: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣�',
    askAbout: '鄐鉮�鄐桌�鄐眇冗鄐嫩什鄍�, 鄐抉�鄐能冗鄐兒�鄍� 鄐眇冗鄐啤�鄐桌冗 鄐詮�鄐抉�鄐兒�鄐嫩�鄐詮�...',
    about: {
      title: '鄐熈�鄐桌�鄐桌� 鄐�尹鄍温丑鄐賴仁鄐擒�鄍� 鄐眇冗鄐啤�鄐桌冗',
      subtitle: '鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄍� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐詮亢鄍温云鄐舟冗鄐𨫼� 鄐戈云鄐擒�鄐��鄍� 鄐Ｒ�鄐𨫼冗',
      description: '鄐熈�鄐桌�鄐桌� 鄐�尹鄍温丑鄐賴仁鄐� 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄍� 鄐芹今鄐賴中鄍温什 鄐眇�鄐舟�鄐� 鄐詮亢鄍温云鄐舟冗鄐耜冗鄐� 鄐詮�鄐啤�鄍温仄鄐� 鄐� 鄐詮冗鄐瞹�鄐舟冗鄐啤� 鄐鉮什鄍温尹 鄐詮亢鄐啤�鄐芹凶鄐� 鄐𥔿奶 鄐嫩冗鄐桌� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐遤�鄐厢�鄐嫩什鄍�仆鄐擒� 鄐詮�鄐丞冗鄐兒�鄐� 鄐厢�鄐𠒎冗鄐� 鄐� 鄐嗣中鄐擒互鄍温丹鄍�鄐能�鄐� 鄐芹�鄐啤冗鄐兒� 鄐芹什鄐桌�鄐芹什鄐擒允鄐啤�鄐舟�鄐菽冗鄐啤冗 鄐兒凶鄐啤�鄐舟�鄐嗣凶鄐� 鄐芹�鄐啤冗鄐桌冗鄐␡凶鄐� 鄐鉮�鄐桌�鄐眇冗 鄐�尹鄍�五鄐菽允鄐啤�鄐詮�鄐� 鄐厢�鄐﹤�鄐𥔿�鄐�奶',
      mission: '鄐嫩冗鄐桌�鄐啤� 鄐桌凶鄐嗣尹',
      missionText: '鄐能� 鄐芹今鄐賴中鄍温什 鄐詮�鄐丞冗鄐兒允鄐啤�鄐𨫼� 鄐芹今鄐賴中鄍温什鄐戈冗 鄐� 鄐芹什鄐桌�鄐芹什鄐擒允鄐啤�鄐耜冗鄐� 鄐詮�鄐啤�鄍温仄鄐� 鄐鉮什鄍温丹鄍� 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄐� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐遤�鄐擒尹鄐擒允鄐啤�鄐耜冗鄐� 鄐詮互鄍� 鄐遤�鄐厢�鄐嫩什鄍��鄐� 鄐耜冗鄐鉮凶 鄐芹允鄍��鄐𠼭仁鄍肀�鄍温仁 鄐眇尹鄐擒�鄐兒�鄍�',
      vision: '鄐嫩冗鄐桌�鄐啤� 鄐舟�鄐獅�鄐颴凶鄐𨫼�鄐�',
      visionText: '鄐𥐰� 鄐詮�鄐詮冗鄐� 鄐厢允鄐擒� 鄐芹�鄐啤冗鄐𠼭�鄐� 鄐厢�鄐𠒎冗鄐兒仆鄍� 鄐�之鄍�尹鄐賴� 鄐�中鄍温亢鄐擒允鄐啤�鄐耜冗鄐� 鄐嗣冗鄐兒�鄐戈凶, 鄐𨫼什鄍�不鄐� 鄐� 鄐厢�鄐𠒎冗鄐兒中鄐啤�鄐� 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣尹 鄐鉮什鄍温�鄍�',
      values: '鄐嫩冗鄐桌�鄐啤冗 鄐桌�鄐耜�鄐能允鄐啤�',
      valuesText: '鄐芹什鄐桌�鄐芹什鄐擒�鄍� 鄐詮亢鄍温亢鄐擒尹, 鄐芹�鄐啤冗鄐桌冗鄐␡凶鄐� 鄐�尹鄍�五鄐菽允鄐啤�, 鄐舟凶鄐鉮� 鄐芹什鄍温仁鄐颴尹, 鄐� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐菽凶鄐𨫼冗鄐詮奶',
      team: '鄐嫩冗鄐桌�鄐啤� 鄐颴�鄐耜�',
      teamText: '鄐詮�鄐丞冗鄐兒�鄐� 鄐鉮冗鄐�丑鄐嫩什鄍�, 鄐眇�鄐舟�鄐� 鄐菽凶鄐舟�鄐菽冗鄐兒允鄐啤�, 鄐� 鄐能冗鄐戈�鄐啤冗 鄐菽凶鄐嗣�鄐獅�鄍温�鄐嫩什鄍� 鄐�什鄍温丰鄐芹�鄐啤�鄐� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗鄐嫩什鄍� 鄐詮凶鄐啤�鄐厢尹鄐� 鄐鉮什鄍温尹 鄐詮�鄐鉮� 鄐𨫼冗鄐� 鄐鉮什鄐賴什鄐嫩�鄐𨫼冗 鄐𥔿尹鄍温奶'
    },
    contact: {
      title: '鄐詮亢鄍温云鄐啤�鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�',
      subtitle: '鄐�� 鄐兒� 鄐戈云鄐擒�鄐��鄍� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗 鄐詮�鄐啤� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�',
      getInTouch: '鄐詮亢鄍温云鄐啤�鄐𨫼亢鄐� 鄐啤允鄐兒�鄐嫩�鄐詮�',
      address: '鄐恷�鄐鉮冗鄐兒冗',
      addressText: '鄐鉮�鄐鉮�鄍肀�, 鄐詮凶鄐𨫼�鄐𨫼凶鄐� 737101, 鄐冢冗鄐啤中',
      phone: '鄐徇�鄐�',
      phoneText: '+91 8650882398',
      email: '鄐�亢鄍�仆',
      emailText: 'namaste@ghoomo.india',
      hours: '鄐𨫼冗鄐啤�鄐能冗鄐耜仁 鄐詮亢鄐�',
      hoursText: '鄐詮�鄐� - 鄐嗣尹鄐�: 鄐眇凶鄐嫩冗鄐� 9:00 - 鄐詮冗鄐�� 6:00',
      sendMessage: '鄐詮尹鄍温丹鄍�介 鄐芹�鄐擒�鄐兒�鄐嫩�鄐詮�',
      name: '鄐戈云鄐擒�鄐��鄍� 鄐兒冗鄐�',
      subject: '鄐菽凶鄐獅仁',
      message: '鄐戈云鄐擒�鄐��鄍� 鄐詮尹鄍温丹鄍�介',
      submit: '鄐詮尹鄍温丹鄍�介 鄐芹�鄐擒�鄐兒�鄐嫩�鄐詮�'
    },
    bookingModal: {
      title: '鄐戈云鄐擒�鄐��鄍� 鄐�尹鄍�五鄐� 鄐眇�鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�',
      selectDate: '鄐桌凶鄐戈凶 鄐𥔿冗鄐兒�鄐兒�鄐嫩�鄐詮�',
      selectTime: '鄐詮亢鄐� 鄐𥔿冗鄐兒�鄐兒�鄐嫩�鄐詮�',
      participants: '鄐詮允鄐冢冗鄐鉮�鄐嫩什鄍��鄍� 鄐詮�鄐遤�鄐能冗',
      specialRequests: '鄐菽凶鄐嗣�鄐� 鄐�尹鄍�什鄍肀之鄐嫩什鄍�',
      totalCost: '鄐𨫼�鄐� 鄐耜冗鄐鉮中',
      bookNow: '鄐�允鄐賴仆鄍� 鄐眇�鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�',
      close: '鄐眇尹鄍温丹 鄐鉮什鄍温尹鄍�允鄍肀元鄍�'
    },
    monasteryModal: {
      history: '鄐�中鄐賴允鄐擒元',
      traditions: '鄐芹什鄐桌�鄐芹什鄐擒允鄐啤�',
      visitingHours: '鄐冢�鄐啤亢鄐� 鄐詮亢鄐�',
      location: '鄐詮�鄐丞冗鄐�',
      nearbyAttractions: '鄐兒�鄐賴�鄐𨫼冗 鄐��鄐啤�鄐獅不鄐嫩什鄍�',
      close: '鄐眇尹鄍温丹 鄐鉮什鄍温尹鄍�允鄍肀元鄍�'
    },
    itineraryResult: {
      title: '鄐戈云鄐擒�鄐��鄍� 鄐芹今鄐賴中鄍温什 鄐能冗鄐戈�鄐啤冗 鄐𨫼冗鄐啤�鄐能�鄍温什鄐�',
      generatedBy: '鄐詮冗鄐啤丰鄍�鄐舟�鄐菽冗鄐啤冗 鄐戈仁鄐擒什 鄐鉮什鄐賴�鄐𨫼�',
      day: '鄐舟凶鄐�',
      close: '鄐眇尹鄍温丹 鄐鉮什鄍温尹鄍�允鄍肀元鄍�'
    },
    footer: {
      description: '鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄐� 鄐芹今鄐賴中鄍温什 鄐鉮�鄐桌�鄐眇冗鄐嫩什鄍� 鄐� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐詮亢鄍温云鄐舟冗鄐𨫼� 鄐遤�鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍温奶 鄐嫩凶鄐桌冗鄐耜仁鄐桌冗 鄐眇�鄐舟�鄐� 鄐厢�鄐𠒎冗鄐兒�鄐� 鄐耜冗鄐鉮凶 鄐戈云鄐擒�鄐��鄍� 鄐桌冗鄐啤�鄐鉮丹鄐啤�鄐嗣�鄍�',
      sacredPlaces: '鄐芹今鄐賴中鄍温什 鄐詮�鄐丞冗鄐兒允鄐啤�',
      support: '鄐詮允鄐能�鄐�',
      connect: '鄐厢丑鄐擒尹',
      followUs: '鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐芹�鄐啤�鄐啤不鄐擒�鄐� 鄐耜冗鄐鉮凶 鄐嫩冗鄐桌�鄐耜冗鄐� 鄐徇仆鄍� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�',
      copyright: '穢 2025 鄐熈�鄐桌�鄐桌� 鄐�尹鄍温丑鄐賴仁鄐擒奶 鄐詮互鄍� 鄐�之鄐賴�鄐擒什 鄐詮�鄐啤�鄍温仄鄐賴中鄍� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐遤�鄐厢�鄐嫩什鄍��鄐� 鄐耜冗鄐鉮凶 �� 鄐詮�鄐� 鄐眇尹鄐擒�鄐𥐰�鄍肀奶',
      tourPackages: {
        title: '鄐颴�鄐� 鄐芹�鄐能冗鄐𨫼�鄐厢允鄐啤�',
        subtitle: '鄐詮凶鄐𨫼�鄐𨫼凶鄐� 鄐颴�鄐啤�鄐耜�鄐詮�鄍� 鄐厢冗鄐舟� 鄐嫩冗鄐桌�鄐啤� 鄐𨫼�鄐能�鄐啤�鄐� 鄐鉮什鄐賴�鄐𨫼� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐� 鄐詮冗鄐嫩元鄐賴� 鄐能冗鄐戈�鄐啤冗鄐嫩什鄍��鄍� 鄐詮冗鄐� 鄐芹中鄍温中鄐� 鄐耜�鄐擒�鄐兒�鄐嫩�鄐詮�鄍�',
        basic: {
          title: '鄐�之鄐擒什鄐冢�鄐� 鄐芹�鄐能冗鄐𨫼�鄐�',
          duration: '鄍� 鄐舟凶鄐� / 鄍� 鄐啤冗鄐�',
          services: ['鄐眇�鄍�� 鄐嫩�鄐颴仆 鄐眇元鄐擒�', '鄐詮�鄐丞冗鄐兒�鄐� 鄐冢�鄐啤亢鄐� (鄐鉮�鄐鉮�鄍肀�)', '鄐詮冗鄐瞹冗 鄐能冗鄐戈冗鄐能冗鄐�', '鄐遤冗鄐兒冗 鄐詮亢鄐擒今鄍�介 鄐𥔿�鄐�']
        },
        premium: {
          title: '鄐芹�鄐啤凶鄐桌凶鄐能亢 鄐芹�鄐能冗鄐𨫼�鄐�',
          duration: '鄍� 鄐舟凶鄐� / 鄍� 鄐啤冗鄐�',
          services: ['鄍�-鄐戈冗鄐啤� 鄐嫩�鄐颴仆 鄐眇元鄐擒�', '鄐鉮�鄐鉮�鄍肀� + 鄐𥔿�鄐鉮� 鄐戈冗鄐� + 鄐眇冗鄐眇冗 鄐桌尹鄍温丹鄐賴什', '鄐眇凶鄐嫩冗鄐兒�鄍� 鄐遤冗鄐厢冗 鄐� 鄐眇�鄐耜�鄐𨫼冗鄐𨫼� 鄐遤冗鄐兒冗 鄐詮亢鄐擒今鄍�介', '鄐兒凶鄐厢�/鄐詮冗鄐瞹冗 鄐能冗鄐戈冗鄐能冗鄐�', '鄐鉮冗鄐�丑鄍�丑 鄐颴�鄐啤允鄐啤�']
        },
        luxury: {
          title: '鄐耜�鄍温�鄐啤� 鄐芹�鄐能冗鄐𨫼�鄐�',
          duration: '鄍� 鄐舟凶鄐� / 鄍� 鄐啤冗鄐�',
          services: ['鄍�-鄐戈冗鄐啤� 鄐嫩�鄐颴仆 / 鄐啤凶鄐詮�鄐啤�鄐� 鄐眇元鄐擒�', '鄐鉮�鄐鉮�鄍肀� + 鄐凼中鄍温中鄐� 鄐詮凶鄐𨫼�鄐𨫼凶鄐� (鄐耜冗鄐𠼭�鄐�, 鄐能�鄐桌丰鄐擒�)', '鄐詮互鄍� 鄐遤冗鄐兒冗 鄐詮亢鄐擒今鄍�介', '鄐兒凶鄐厢� 鄐𨫼�鄐能冗鄐� 鄐� 鄐菽�鄐能�鄍温中鄐賴�鄐� 鄐鉮冗鄐�丑', '鄐芹�鄐啤冗鄐丞亢鄐賴�鄐戈冗 鄐眇�鄐𨫼凶鄐�� 鄐� VIP 鄐�尹鄍�五鄐�']
        },
        safetySection: {
          title: '鄐詮�鄐啤�鄍温仄鄐� 鄐� 鄐颴�鄐啤�鄐能冗鄐𨫼凶鄐� 鄐芹�鄐啤不鄐擒仆鄍�',
          description: "鄐戈云鄐擒�鄐��鄍� 鄐詮�鄐啤�鄍温仄鄐� 鄐嫩冗鄐桌�鄐啤� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐芹�鄐啤中鄐賴互鄐舟�鄐抉中鄐� 鄐嫩�鄍� 鄐嫩冗鄐桌�鄐耜� 鄐芹�鄐啤中鄍温仁鄍�� 鄐能冗鄐戈�鄐啤�鄐耜冗鄐� 鄍兒左/鄍� 鄐詮�鄐啤�鄍温仄鄐賴中 鄐啤冗鄐遤�鄐兒�鄍� 鄐耜冗鄐鉮凶 鄐𥐰�鄐颴冗 鄐眇仆鄐賴仁鄍� 鄐﹤凶鄐厢凶鄐颴仆 鄐芹�鄐啤�鄐菽冗鄐抉冗鄐� 鄐兒凶鄐啤�鄐桌冗鄐� 鄐鉮什鄍��鄐� 鄐𥔿�鄐�奶",
          features: {
            gps: { title: '鄐芹�鄐啤中鄍温仁鄐𨫼�鄐� GPS 鄐颴�鄐啤�鄐能冗鄐𨫼凶鄐�', desc: '鄐菽冗鄐詮�鄐戈今鄐賴�-鄐詮亢鄐� 鄐詮�鄐丞冗鄐� 鄐兒凶鄐鉮什鄐擒尹鄍�鄍�' },
            sos: { title: '鄐�云鄐戈�鄐擒仆鄍�鄐� SOS', desc: '鄐戈中鄍温�鄐擒仆 SOS 鄐芹�鄐啤中鄐賴�鄍温什鄐賴仁鄐擒奶' },
            support: { title: '鄍兒左/鄍� 鄐詮亢鄐啤�鄐丞尹', desc: '鄐詮亢鄐啤�鄐芹凶鄐� 鄐詮允鄐擒仁鄐戈冗 鄐颴�鄐耜�鄍�' },
            partners: { title: '鄐芹�鄐啤亢鄐擒不鄐賴中 鄐詮冗鄐瞹�鄐舟冗鄐啤允鄐啤�', desc: '鄐𨫼丑鄐� 鄐啤�鄐芹亢鄐� 鄐厢冗鄐�� 鄐鉮什鄐賴�鄐𨫼冗 鄐𠼭冗鄐耜� 鄐� 鄐鉮冗鄐�丑鄐嫩什鄍�奶' }
          }
        }
      }
    },
    monasteries: {
      rumtek: {
        name: '鄐啤�鄐桌�鄍�� 鄐鉮�鄐桌�鄐眇冗',
        description: '鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄍� 鄐詮互鄍�五鄐兒�鄐舟冗 鄐恷�鄐耜� 鄐鉮�鄐桌�鄐眇冗, 鄐𨫼什鄍温亢鄐擒云鄐擒�鄍� 鄐鉮丹鄍温丹鄍�',
        history: '1966 鄐桌冗 鄐兒凶鄐啤�鄐桌凶鄐�, 鄐啤�鄐桌�鄍�� 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄍� 鄐詮互鄍�五鄐兒�鄐舟冗 鄐恷�鄐耜� 鄐鉮�鄐桌�鄐眇冗 鄐嫩� 鄐� 鄐𨫼什鄍温亢鄐� 鄐𨫼�鄍温仁鄍� 鄐菽�鄐嗣�鄍� 鄐桌�鄐遤�鄐� 鄐鉮丹鄍温丹鄍� 鄐嫩�鄍� 鄐能允鄐擒� 鄐眇允鄍�亢鄍�仆鄍温仁 鄐�今鄐嗣�鄐獅允鄐啤� 鄐� 鄐芹�鄐啤冗鄐𠼭�鄐� 鄐眇�鄐舟�鄐� 鄐𨫼仆鄐擒�鄍�中鄐賴允鄐啤� 鄐𥔿尹鄍温奶',
        traditions: '鄐𨫼什鄍温亢鄐� 鄐𨫼�鄍温仁鄍� 鄐芹什鄐桌�鄐芹什鄐擒�鄍� 鄐芹冗鄐耜尹鄐� 鄐鉮什鄍温� 鄐厢元鄐桌冗 鄐舟�鄐兒凶鄐� 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐�, 鄐抉�鄐能冗鄐� 鄐詮中鄍温什鄐嫩什鄍�, 鄐� 鄐戈凶鄐眇�鄐眇中鄍� 鄐兒仁鄐擒� 鄐菽什鄍温仄 鄐詮亢鄐擒什鄍肀允 鄐詮允鄐賴中 鄐菽冗鄐啤�鄐獅凶鄐� 鄐𠼭冗鄐﹤云鄐啤�鄐菽允鄐啤� 鄐詮亢鄐擒今鄍�介 鄐𥔿尹鄍温奶',
        hours: '鄐眇凶鄐嫩冗鄐� 6:00 - 鄐詮冗鄐�� 6:00',
        location: '鄐鉮�鄐鉮�鄍肀�鄐眇冗鄐� 24 鄐𨫼凶鄐桌�',
        attractions: '鄐詮�鄐兒�鄍� 鄐詮�鄐戈�鄐�, 鄐鉮�鄐桌�鄐眇冗 鄐詮�鄐鉮�鄐啤允鄐擒仆鄐�, 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐� 鄐𠼭�鄍温什鄐嫩什鄍�'
      },
      namchi: {
    name: '鄐兒冗鄐桌�鄍� 鄐鉮�鄐桌�鄐眇冗',
    description: '鄐舟�鄍温仄鄐賴不 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌亢鄐� 鄐�今鄐詮�鄐丞凶鄐� 鄐𥐰� 鄐芹�鄐啤元鄐賴丹鄍温之 鄐眇�鄐舟�鄐� 鄐鉮�鄐桌�鄐眇冗, 鄐嗣冗鄐兒�鄐� 鄐菽冗鄐戈冗鄐菽什鄐� 鄐� 鄐鉮�鄐啤� 鄐芹丹鄍温亢鄐詮亢鄍温五鄐菽�鄍� 鄐菽凶鄐嗣冗鄐� 鄐桌�鄐啤�鄐戈凶鄐𨫼冗 鄐耜冗鄐鉮凶 鄐芹�鄐啤元鄐賴丹鄍温之鄍�',
    history: '鄐鉮�鄐啤� 鄐芹丹鄍温亢鄐詮亢鄍温五鄐菽�鄐� 鄐嗣凶鄐𨫼�鄐獅冗鄐嫩什鄍��鄍� 鄐詮�鄐啤�鄍温仄鄐� 鄐� 鄐眇�鄐舟�鄐� 鄐抉什鄍温亢鄐𨫼� 鄐芹�鄐啤�鄐擒什鄐𨫼冗 鄐耜冗鄐鉮凶 鄐詮�鄐丞冗鄐芹尹鄐� 鄐鉮什鄐賴�鄐𨫼� 鄐能� 鄐鉮�鄐桌�鄐眇冗 鄐舟�鄍温仄鄐賴不 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄍� 鄐𥐰� 鄐桌允鄐戈�鄐菽云鄍�什鄍温不 鄐抉冗鄐啤�鄐桌凶鄐� 鄐� 鄐詮冗鄐�元鄍温�鄍�中鄐賴� 鄐𨫼�鄐兒�鄐舟�鄐� 鄐嫩�鄍�',
    traditions: '鄐能允鄐擒� 鄐菽冗鄐啤�鄐獅凶鄐� 鄐眇�鄐舟�鄐� 鄐芹什鄍温今鄐嫩什鄍�, 鄐芹冗鄐啤亢鄍温云鄐啤凶鄐� 鄐𥔿冗鄐� 鄐兒�鄐戈�鄐� 鄐� 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐� 鄐詮五鄐擒允鄐啤� 鄐�仁鄍肀�鄐兒冗 鄐鉮什鄐賴尹鄍温�鄐兒�, 鄐厢允鄐擒� 鄐菽凶鄐冢凶鄐兒�鄐� 鄐詮�鄐丞冗鄐兒互鄐擒� 鄐冢�鄍温中鄐厢尹 鄐��鄐��鄐兒�鄍�',
    hours: '鄐眇凶鄐嫩冗鄐� 鄍�:鄍舟它 - 鄐眇�鄐耜�鄐𨫼� 鄍�:鄍舟它',
    location: '鄐兒冗鄐桌�鄍�, 鄐舟�鄍温仄鄐賴不 鄐詮凶鄐𨫼�鄐𨫼凶鄐�',
    attractions: '鄍抉巧鄍� 鄐徇凶鄐� 鄐��鄍温仆鄍� 鄐鉮�鄐啤� 鄐芹丹鄍温亢鄐詮亢鄍温五鄐菽�鄍� 鄐桌�鄐啤�鄐戈凶, 鄐詮�鄐耜�鄐徇�鄐� 鄐𥔿�鄐啤�鄐戈�鄐�, 鄐� 鄐嫩凶鄐桌冗鄐耜仁鄐𨫼冗 鄐桌尹鄍肀什鄐� 鄐舟�鄐嗣�鄐能允鄐啤�'
},
      tashiding: {
        name: '鄐戈冗鄐嗣凶鄐舟凶鄐� 鄐鉮�鄐桌�鄐眇冗',
        description: '鄐舟�鄐� 鄐兒丹鄍�鄐嫩什鄍��鄍� 鄐眇�鄐𠼭亢鄐� 鄐芹允鄐擒丑鄐桌冗 鄐芹今鄐賴中鄍温什 鄐鉮�鄐桌�鄐眇冗',
        history: '1717 鄐桌冗 鄐詮�鄐丞冗鄐芹凶鄐�, 鄐戈冗鄐嗣凶鄐舟凶鄐跃�鄍� 鄐�什鄍温丰 "鄐詮亢鄐啤�鄐芹凶鄐� 鄐𨫼�鄐兒�鄐舟�鄐啤�鄐� 鄐鉮�鄐啤今" 鄐嫩� 鄐� 鄐能元鄐耜冗鄐� 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄐� 鄐詮互鄍�五鄐兒�鄐舟冗 鄐芹今鄐賴中鄍温什 鄐鉮�鄐桌�鄐眇冗鄐嫩什鄍� 鄐桌之鄍温仁鄍� 鄐𥐰� 鄐桌冗鄐兒凶鄐兒�鄐𥔿奶',
        traditions: '鄐眇�鄐桌�鄍� 鄐詮亢鄐擒什鄍肀允鄐𨫼冗 鄐耜冗鄐鉮凶 鄐芹�鄐啤元鄐賴丹鄍温之 鄐厢允鄐擒� 鄐冢�鄍温中鄐嫩什鄍�仆鄐擒� 鄐芹今鄐賴中鄍温什 鄐芹冗鄐兒� 鄐菽凶鄐戈什鄐� 鄐鉮什鄐賴尹鄍温�, 鄐厢元鄐耜� 鄐��鄐兒� 鄐菽什鄍温仄鄐𨫼� 鄐冢今鄐賴仄鄍温仁鄐菽冗鄐␡� 鄐鉮什鄍温� 鄐冢尹鄍温尹鄍� 鄐菽凶鄐嗣�鄐菽冗鄐� 鄐鉮什鄐賴尹鄍温�鄍�',
        hours: '鄐眇凶鄐嫩冗鄐� 6:00 - 鄐詮冗鄐�� 6:00',
        location: '鄐啤�鄍温�鄐賴中 鄐� 鄐啤丰鄍肀� 鄐兒丹鄍�鄐嫩什鄍��鄍� 鄐眇�鄐𠼭亢鄐�',
        attractions: '鄐芹今鄐賴中鄍温什 鄐眇�鄐桌�鄍� 鄐𨫼仆鄐�, 鄐𠼭�鄐啤�鄐戈�鄐兒允鄐啤�, 鄐兒丹鄍� 鄐詮�鄐鉮亢 鄐舟�鄐嗣�鄐能允鄐啤�'
      },
      enchey: {
        name: '鄐𥐰尹鄍温�鄍� 鄐鉮�鄐桌�鄐眇冗',
        description: '鄐鉮�鄐鉮�鄍肀�鄐耜冗鄐� 鄐嫩�鄐啤�鄐兒� 鄐詮�鄐兒�鄐舟什 鄐鉮�鄐桌�鄐眇冗',
        history: '1909 鄐桌冗 鄐兒凶鄐啤�鄐桌凶鄐�, 鄐𥐰尹鄍温�鄍��鄍� 鄐�什鄍温丰 "鄐𥐰�鄐擒尹鄍温中 鄐桌尹鄍温丹鄐賴什" 鄐嫩� 鄐� 鄐能元鄐𨫼� 鄐詮�鄐丞冗鄐芹尹鄐� 鄐耜冗鄐桌冗 鄐舟�鄐啤�鄐芹�鄐戈�鄐� 鄐𨫼冗鄐啤�鄐芹�鄐耜� 鄐鉮什鄍��鄐� 鄐丞凶鄐� 鄐厢元鄐耜冗鄐� 鄐凼丑鄍温尹鄍� 鄐嗣�鄍温中鄐� 鄐冢�鄐𨫼� 鄐菽凶鄐嗣�鄐菽冗鄐� 鄐鉮什鄐賴尹鄍温丰鄍温仁鄍肀奶',
        traditions: '鄐兒�鄐能凶鄐跃亢鄐� 鄐芹什鄐桌�鄐芹什鄐擒�鄍� 鄐詮冗鄐� 鄐菽冗鄐啤�鄐獅凶鄐� 鄐𥔿亢 鄐兒�鄐戈�鄐� 鄐芹�鄐啤丹鄐啤�鄐嗣尹鄐嫩什鄍� 鄐� 鄐鉮�鄐鉮�鄍肀� 鄐嗣允鄐啤�鄍� 鄐詮�鄐啤�鄍温仄鄐擒�鄐� 鄐耜冗鄐鉮凶 鄐菽凶鄐嗣�鄐� 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐擒允鄐啤�鄍�',
        hours: '鄐眇凶鄐嫩冗鄐� 6:00 - 鄐詮冗鄐�� 6:00',
        location: '鄐鉮�鄐鉮�鄍肀�, 鄐芹�鄐啤�鄐菽� 鄐詮凶鄐𨫼�鄐𨫼凶鄐�',
        attractions: '鄐嗣允鄐啤�鄐� 鄐舟�鄐嗣�鄐能允鄐啤�, 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐� 鄐瞹不鄍温丑鄐擒允鄐啤�, 鄐芹什鄐桌�鄐芹什鄐擒�鄐� 鄐菽冗鄐詮�鄐戈�鄐𨫼仆鄐�'
      },
      dubdi: {
        name: '鄐舟�鄐眇�鄐舟� 鄐鉮�鄐桌�鄐眇冗',
        description: '鄐詮凶鄐𨫼�鄐𨫼凶鄐桌亢鄐� 鄐兒凶鄐啤�鄐桌凶鄐� 鄐芹允鄐賴仆鄍� 鄐鉮�鄐桌�鄐眇冗',
        history: '1701 鄐桌冗 鄐𠼭�鄐能�鄐鉮�鄐能冗鄐� 鄐兒冗鄐桌�鄍温仁鄐擒仆鄐耜� 鄐詮�鄐丞冗鄐芹尹鄐� 鄐鉮什鄍��鄍�, 鄐舟�鄐眇�鄐舟� 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄍� 鄐詮互鄍�五鄐兒�鄐舟冗 鄐芹�鄐啤冗鄐兒� 鄐鉮�鄐桌�鄐眇冗 鄐嫩� 鄐� 鄐能元 鄐𨫼�鄐獅�鄐戈�鄐啤亢鄐� 鄐眇�鄐舟�鄐� 鄐抉什鄍温亢鄐𨫼� 鄐詮�鄐啤�鄐菽冗鄐戈�鄍� 鄐芹�鄐啤中鄍�鄐� 鄐嫩�鄍�',
        traditions: '鄐兒�鄐能凶鄐跃亢鄐� 鄐芹什鄐桌�鄐芹什鄐擒仆鄍� 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌亢鄐� 鄐耜�鄐能冗鄐��鄐𨫼冗 鄐桌�鄐� 鄐嗣凶鄐𨫼�鄐獅冗鄐嫩什鄍�仆鄐擒� 鄐詮�鄐啤�鄍温仄鄐� 鄐鉮什鄍温�, 鄐厢元鄐桌冗 鄐芹�鄐啤冗鄐𠼭�鄐� 鄐芹冗鄐␡�鄐﹤�鄐耜凶鄐芹凶鄐嫩什鄍� 鄐� 鄐�今鄐嗣�鄐獅允鄐啤� 鄐𥔿尹鄍温奶',
        hours: '鄐眇凶鄐嫩冗鄐� 7:00 - 鄐詮冗鄐�� 5:00',
        location: '鄐能�鄐𨫼�鄐詮�鄐�, 鄐芹介鄍温�鄐賴亢 鄐詮凶鄐𨫼�鄐𨫼凶鄐�',
        attractions: '鄐芹�鄐啤冗鄐𠼭�鄐� 鄐芹冗鄐␡�鄐﹤�鄐耜凶鄐芹凶鄐嫩什鄍�, 鄐𩇫中鄐賴允鄐擒元鄐賴� 鄐桌允鄐戈�鄐�, 鄐颴�鄐啤�鄐𨫼凶鄐� 鄐颴�鄐啤�鄐耜允鄐啤�'
      },
      ralang: {
        name: '鄐啤冗鄐耜冗鄐� 鄐鉮�鄐桌�鄐眇冗',
        description: '鄐�井鄍温尹鄐� 鄐芹今鄐賴中鄍温什 鄐𥔿亢 鄐兒�鄐戈�鄐� 鄐芹�鄐啤丹鄐啤�鄐嗣尹鄐嫩什鄍��鄐� 鄐耜冗鄐鉮凶 鄐芹�鄐啤元鄐賴丹鄍温之',
        history: '1768 鄐桌冗 鄐詮�鄐丞冗鄐芹凶鄐�, 鄐啤冗鄐耜冗鄐� 鄐鉮�鄐桌�鄐眇冗 鄐�井鄍温尹鄍� 鄐菽冗鄐啤�鄐獅凶鄐� 鄐芹冗鄐� 鄐耜�鄐嫩冗鄐眇�鄐詮�鄐� 鄐𠼭冗鄐� 鄐� 鄐芹什鄐桌�鄐芹什鄐擒�鄐� 鄐𥔿亢 鄐兒�鄐戈�鄐能允鄐啤�鄐𨫼冗 鄐耜冗鄐鉮凶 鄐芹�鄐啤元鄐賴丹鄍温之 鄐𥔿奶',
        traditions: '鄐𨫼�鄍温仁鄍� 鄐芹什鄐桌�鄐芹什鄐擒�鄍� 鄐詮冗鄐� 鄐嗣冗鄐兒丹鄐擒什 鄐桌�鄐遤�鄐颴冗 鄐兒�鄐戈�鄐� 鄐𠼭冗鄐﹤云鄐啤�鄐菽允鄐啤� 鄐� 鄐遤冗鄐跃�鄍�尹鄍温丹鄐厢�鄐跃�鄐鉮冗 鄐芹什鄍温今鄐戈�鄍� 鄐詮亢鄍温亢鄐擒尹 鄐鉮什鄍温尹鄍� 鄐詮亢鄐擒什鄍肀允鄐嫩什鄍�奶',
        hours: '鄐眇凶鄐嫩冗鄐� 6:00 - 鄐詮冗鄐�� 6:00',
        location: '鄐啤冗鄐菽冗鄐跃仆鄐�, 鄐舟�鄍温仄鄐賴不 鄐詮凶鄐𨫼�鄐𨫼凶鄐�',
        attractions: '鄐𥔿亢 鄐兒�鄐戈�鄐� 鄐桌�鄍温�, 鄐𠼭冗鄐﹤云鄐啤�鄐� 鄐桌�鄐舟冗鄐�, 鄐芹什鄍温今鄐� 鄐舟�鄐嗣�鄐能允鄐啤�'
      }
    },
    experiences: {
      meditation: '鄐啤�鄐桌�鄍��鄐桌冗 鄐抉�鄐能冗鄐� 鄐啤凶鄐颴�鄐啤�鄐�',
      philosophy: '鄐眇�鄐舟�鄐� 鄐舟什鄍温介鄐� 鄐𨫼�鄍温仄鄐擒允鄐啤�',
      homestay: '鄐鉮�鄐桌�鄐眇冗 鄐嫩�鄐桌元鄍温�鄍� 鄐�尹鄍�五鄐�',
      crafts: '鄐嫩元鄍温中鄐兒凶鄐啤�鄐桌凶鄐� 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐� 鄐𠼭�鄍温什鄐嫩什鄍�'
    },
    traditions: {
      nyingma: {
        title: '鄐兒�鄐能凶鄐跃亢鄐� 鄐芹什鄐桌�鄐芹什鄐�',
        description: '鄐戈凶鄐眇�鄐眇中鄍� 鄐眇�鄐舟�鄐� 鄐抉什鄍温亢鄐𨫼� 鄐詮互鄍�五鄐兒�鄐舟冗 鄐芹�鄐啤冗鄐兒� 鄐詮�鄐𨫼�鄐�, 鄐抉�鄐能冗鄐� 鄐� 鄐戈冗鄐兒�鄐戈�鄐啤凶鄐� 鄐�五鄍温仁鄐擒元鄐嫩什鄍�亢鄐� 鄐厢�鄐� 鄐舟凶鄐兒�鄐𥔿奶 鄐詮凶鄐𨫼�鄐𨫼凶鄐桌�鄐� 鄐�之鄐賴�鄐擒�鄐� 鄐鉮�鄐桌�鄐眇冗鄐嫩什鄍�仆鄍� 鄐能� 鄐芹什鄐桌�鄐芹什鄐擒�鄍� 鄐芹冗鄐耜尹鄐� 鄐鉮什鄍温�鄐兒�鄍�'
      },
      kagyu: {
        title: '鄐𨫼�鄍温仁鄍� 鄐芹什鄐桌�鄐芹什鄐�',
        description: '鄐抉�鄐能冗鄐� 鄐� 鄐嗣凶鄐𨫼�鄐獅�鄐眇冗鄐� 鄐菽凶鄐舟�鄐能冗鄐啤�鄐丞�鄐耜冗鄐� 鄐桌�鄐遤凶鄐� 鄐芹什鄐桌�鄐芹什鄐擒�鄍� 鄐桌冗鄐抉�鄐能亢鄐眇冗鄐� 鄐嗣凶鄐𨫼�鄐獅冗鄐嫩什鄍��鄍� 鄐芹�鄐啤元鄐擒什鄐␡亢鄐� 鄐厢�鄐� 鄐舟凶鄐兒�鄐� 鄐耜冗鄐鉮凶 鄐芹�鄐啤元鄐賴丹鄍温之鄍�'
      },
      festivals: {
        title: '鄐芹今鄐賴中鄍温什 鄐𠼭冗鄐﹤云鄐啤�鄐菽允鄐啤�',
        description: '鄐芹什鄐桌�鄐芹什鄐擒�鄐� 鄐𥔿亢 鄐兒�鄐戈�鄐能允鄐啤�, 鄐芹�鄐啤冗鄐啤�鄐丞尹鄐擒允鄐啤�, 鄐� 鄐詮冗鄐桌�鄐舟冗鄐能凶鄐� 鄐凼中鄍温元鄐菽允鄐啤�鄐𨫼� 鄐詮冗鄐� 鄐啤�鄐鉮互鄐賴什鄐��鄍� 鄐眇�鄐舟�鄐� 鄐𠼭冗鄐﹤云鄐啤�鄐菽允鄐啤�鄐𨫼� 鄐�尹鄍�五鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍温奶'
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  const [currentUser, setCurrentUser] = useState<{name: string, email: string} | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
    setAuthError(null);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm),
      });
      const data = await response.json();
      if (response.ok) {
        showNotification('Signup successful! Please login.', 'success');
        setIsSignupOpen(false);
        setIsLoginOpen(true);
      } else {
        setAuthError(data.message || 'Signup failed');
      }
    } catch (err) {
      setAuthError('Network error connecting to Saarthi server');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, password: authForm.password }),
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        showNotification(`Welcome back, ${data.user.name}!`, 'success');
        setIsLoginOpen(false);
      } else {
        setAuthError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setAuthError('Network error connecting to Saarthi server');
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    showNotification('Logged out successfully', 'info');
  };

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
      price: '��2,500', 
      duration: '3 days',
      image: 'meditation.webp',
      description: 'Deep meditation retreat with experienced monks'
    },
    { 
      id: 'philosophy', 
      name: t.experiences.philosophy, 
      price: '��1,800', 
      duration: '2 days',
      image: 'class.jpeg',
      description: 'Learn Buddhist philosophy and teachings'
    },
    { 
      id: 'homestay', 
      name: t.experiences.homestay, 
      price: '��3,200', 
      duration: '5 days',
      image: 'homestay.jpeg',
      description: 'Live with monks and experience daily monastery life'
    },
    { 
      id: 'crafts', 
      name: t.experiences.crafts, 
      price: '��800', 
      duration: '1 day',
      image: 'wheel.jpeg',
      description: 'Create traditional prayer wheels with local artisans'
    }
  ];
  

  const handleJourneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!journeyForm.startingPoint || !journeyForm.primaryMonastery || !journeyForm.duration || !journeyForm.spiritualFocus) {
      alert(currentLanguage === 'English' ? 'Please fill all fields' : 
            currentLanguage === '鄐嫩凶鄐�丹鄍�' ? '鄐𨫼�鄐芹仁鄐� 鄐詮五鄍� 鄐徇兮鄍�鄐耜�鄐� 鄐冢什鄍��' :
            currentLanguage === '鄐兒�鄐芹冗鄐耜�' ? '鄐𨫼�鄐芹仁鄐� 鄐詮互鄍� 鄐徇凶鄐耜�鄐﹤允鄐啤� 鄐冢什鄍温尹鄍�允鄍肀元鄍�' :
            '鉠��鉠舟�鉠潼�鉏肀�鉏肀耦鉏肀�鉠�鉠��鉠��鉠�');
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

    const focusKey = (form.spiritualFocus === 'Meditation' || form.spiritualFocus === '鄐抉�鄐能冗鄐�') ? 'Meditation' :
                     (form.spiritualFocus === 'Philosophy' || form.spiritualFocus === '鄐舟什鄍温介鄐�') ? 'Philosophy' :
                     (form.spiritualFocus === 'Culture' || form.spiritualFocus === '鄐詮�鄐詮�鄐𨫼�鄐戈凶') ? 'Culture' : 'Pilgrimage';

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
      title: currentLanguage === 'English' ? `${days}-Day Sacred ${form.spiritualFocus} Voyage` : `${days} 鄐舟凶鄐菽元鄍�鄐� 鄐芹今鄐賴中鄍温什 ${form.spiritualFocus} 鄐能冗鄐戈�鄐啤冗`,
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

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to admin storage
    const experience = experiences.find(e => e.id === selectedExperience);
    try {
      await adminStorage.saveBooking({
        experienceName: experience?.name || 'Experience',
        date: bookingData.date,
        time: bookingData.time,
        participants: bookingData.participants,
        specialRequests: bookingData.specialRequests,
        totalCost: `${experience?.price.replace('��', '')} � ${bookingData.participants}`
      });
    } catch (error) {
      console.error('Booking failed', error);
      showNotification('Booking failed. Please try again.', 'info');
      return;
    }

    showNotification(currentLanguage === 'English' ? 'Booking confirmed! We will contact you soon.' : 
          currentLanguage === '鄐嫩凶鄐�丹鄍�' ? '鄐眇�鄐𨫼凶鄐�� 鄐芹�鄐獅�鄐�! 鄐嫩亢 鄐厢仆鄍温丹 鄐嫩� 鄐�云鄐詮� 鄐詮�鄐芹什鄍温� 鄐𨫼什鄍��鄐鉮�鄍�' :
          currentLanguage === '鄐兒�鄐芹冗鄐耜�' ? '鄐眇�鄐𨫼凶鄐� 鄐芹�鄐獅�鄐颴凶 鄐冢仁鄍�! 鄐嫩冗鄐桌� 鄐𠼭冗鄐�丑鄍� 鄐戈云鄐擒�鄐�仆鄐擒� 鄐詮亢鄍温云鄐啤�鄐� 鄐鉮什鄍温尹鄍��鄍䓃�鄍�' :
          '鉠舟�鉧耜蔡鉠��鉠恷�鉠毯�鉏肀�鉠箋膠鉏肀�鉏肀�鉠颴蝦鉏肀翩鉠�! 鉠��鉠遤�鉠舟�鉠�鉧晤蔡鉠舟�鉠熈�鉠恷�鉧晤�鉠舟�鉠𠰍耦鉏肀�鉧晤蝦鉠𨥬�鉠𨥬�鉏肀�鉠遤噙鉠箋膛鉏肀�鉏肀�鉠遤�鉏肀�鉠潼�鉏肀�');
    setSelectedExperience(null);
    setBookingData({ date: '', time: '', participants: 1, specialRequests: '' });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Let Netlify handle the underlying form, but we capture data locally too
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (name && subject && message) {
      try {
        await adminStorage.saveHelpRequest({ name, subject, message });
      } catch (error) {
        console.error('Failed to submit request', error);
      }
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
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-gradient-to-br from-orange-50 to-red-50 text-gray-900'}`}>
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 animate-bounce-in">
          <div className={`border-l-4 shadow-2xl rounded-lg p-4 flex items-center space-x-3 transition-colors ${
            theme === 'dark' 
              ? 'bg-slate-800 border-orange-500 text-white' 
              : 'bg-white border-red-600 text-gray-900'
          }`}>
            <Star className={`h-6 w-6 animate-pulse ${theme === 'dark' ? 'text-orange-500' : 'text-red-600'}`} />
            <p className="font-bold">{notification.message}</p>
          </div>
        </div>
      )}
      {/* Header */}
      {/* Premium Header */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        translations={translations}
        currentUser={currentUser}
        handleLogout={handleLogout}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
      />

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
      <section id="spiritualJourney" className={`py-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.planJourney}</h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{t.planJourneySubtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleJourneySubmit} className={`rounded-2xl shadow-xl p-8 space-y-6 transition-colors ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white'}`}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
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
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                    {t.primaryMonastery}
                  </label>
<select
                    value={journeyForm.primaryMonastery}
                    onChange={(e) => setJourneyForm({...journeyForm, primaryMonastery: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-500' : 'bg-white border-gray-300 text-gray-900'
                    }`}
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
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                    {t.duration}
                  </label>
                  <select
                    value={journeyForm.duration}
                    onChange={(e) => setJourneyForm({...journeyForm, duration: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-500' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  >
                   <option value="" disabled selected hidden>Select duration</option>
                  <option value="3-5 days">3-5 days</option>
                  <option value="1 week">1 week</option>
                  <option value="1-2 weeks">1-2 weeks</option>

                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                    {t.spiritualFocus}
                  </label>
                  <select
                    value={journeyForm.spiritualFocus}
                    onChange={(e) => setJourneyForm({...journeyForm, spiritualFocus: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-500' : 'bg-white border-gray-300 text-gray-900'
                    }`}
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
      <section id="monasteries" className={`py-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.monasteryShowcase}</h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{t.monasteryShowcaseSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monasteries.map((monastery) => (
              <div key={monastery.id} className={`rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white'
              }`}>
                <div className="relative">
                  <img
                    src={monastery.image}
                    alt={monastery.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 ${
                    theme === 'dark' ? 'bg-slate-900/90 text-white' : 'bg-white/90 text-gray-900'
                  }`}>
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{monastery.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Est. {monastery.established}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{monastery.name}</h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{monastery.description}</p>
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
      <section id="experiences" className={`py-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.spiritualExperiences}</h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{t.spiritualExperiencesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map((experience) => (
              <div key={experience.id} className={`rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white'
              }`}>
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
                  <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{experience.name}</h3>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{experience.description}</p>
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
                <li>�� {t.monasteries.dubdi.name}</li>
                <li>�� {t.monasteries.tashiding.name}</li>
                <li>�� {t.monasteries.enchey.name}</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-2xl font-bold mb-4">{t.traditions.kagyu.title}</h4>
              <p className="opacity-90 mb-4">
                {t.traditions.kagyu.description}
              </p>
              <ul className="text-sm opacity-80 space-y-1">
                <li>�� {t.monasteries.rumtek.name}</li>
                <li>�� {t.monasteries.ralang.name}</li>
                 <li>�� {t.monasteries.namchi.name}</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-2xl font-bold mb-4">{t.traditions.festivals.title}</h4>
              <p className="opacity-90 mb-4">
                {t.traditions.festivals.description}
              </p>
              <ul className="text-sm opacity-80 space-y-1">
                <li>�� Losar (Tibetan New Year)</li>
                <li>�� Saga Dawa Festival</li>
                <li>�� Bumchu Ceremony</li>
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
      <p className="text-gray-600 mt-2 text-lg">Innovators �� Dreamers �� Builders</p>
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
        showNotification(currentLanguage === 'English' ? 'Personalize your itinerary here!' : '鄐能允鄐擒� 鄐�云鄐兒� 鄐能冗鄐戈�鄐啤冗 鄐𨫼冗鄐啤�鄐能�鄍温什鄐� 鄐𨫼� 鄐�尹鄍��鄍�仆鄐賴中 鄐𨫼什鄍��!');
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
      <section id="faq" className={`py-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Traveler Essentials</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Solving the most common problems for your Sikkim journey</p>
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
              <div key={idx} className={`rounded-2xl shadow-lg border overflow-hidden transition-all hover:shadow-xl ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-100'
              }`}>
                <button
                  onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                  className={`w-full text-left p-6 flex justify-between items-center transition-colors ${
                    theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-orange-50/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-orange-50'} p-3 rounded-xl`}>{item.icon}</div>
                    <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.q}</span>
                  </div>
                  <div className={`transform transition-transform duration-300 ${activeFAQ === idx ? 'rotate-180' : ''}`}>
                    <Star className="h-6 w-6 text-red-500 fill-current" />
                  </div>
                </button>
                {activeFAQ === idx && (
                  <div className={`p-8 pt-2 border-t animate-fade-in ${
                    theme === 'dark' ? 'text-slate-300 border-slate-800 bg-slate-900/50' : 'text-gray-700 border-orange-50 bg-white/50'
                  }`}>
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
      <section id="contact" className={`py-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.contact.title}</h2>
            <p className="text-xl text-red-600 font-semibold">{t.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.contact.getInTouch}</h3>
              
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

            <div className={`rounded-2xl p-8 transition-colors ${
              theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-gradient-to-br from-orange-50 to-red-50'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.contact.sendMessage}</h3>
              
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
      Don�脌 fill this out if you're human: <input name="bot-field" />
    </label>
  </p>

  <div>
    <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
      {t.contact.name}
    </label>
    <input
      type="text"
      name="name"
      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
        theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-500' : 'bg-white border-gray-300 text-gray-900'
      }`}
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

      {/* Support / Chatbot */}
      <Chatbot 
        currentLanguage={currentLanguage}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        theme={theme}
      />

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
                        if (day.focus?.includes('Meditation') || day.focus?.includes('鄐抉�鄐能冗鄐�')) Icon = Clock;
                        else if (day.focus?.includes('Philosophy') || day.focus?.includes('鄐舟什鄍温介鄐�')) Icon = BookOpen;
                        else if (day.focus?.includes('Culture') || day.focus?.includes('鄐詮�鄐詮�鄐𨫼�鄐戈凶')) Icon = Music;
                        else if (day.focus?.includes('Pilgrimage') || day.focus?.includes('鄐戈�鄐啤�鄐丞仁鄐擒中鄍温什鄐�')) Icon = MapPin;
                        
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
                   currentLanguage === '鄐嫩凶鄐�丹鄍�' ? '鄐能允 鄐能冗鄐戈�鄐啤冗 鄐𨫼冗鄐啤�鄐能�鄍温什鄐� 鄐�云鄐𨫼� 鄐芹�鄐啤冗鄐丞亢鄐賴�鄐戈冗鄐㮙� 鄐𨫼� 鄐�之鄐擒什 鄐芹什 鄐�尹鄍��鄍�仆鄐賴中 鄐嫩�鄍� 鄐�云鄐兒� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗 鄐眇�鄐� 鄐𨫼什鄐兒� 鄐𨫼� 鄐耜凶鄐� 鄐嫩亢鄐詮� 鄐詮�鄐芹什鄍温� 鄐𨫼什鄍��!' :
                   currentLanguage === '鄐兒�鄐芹冗鄐耜�' ? '鄐能� 鄐能冗鄐戈�鄐啤冗 鄐𨫼冗鄐啤�鄐能�鄍温什鄐� 鄐戈云鄐擒�鄐��鄍� 鄐芹�鄐啤冗鄐丞亢鄐賴�鄐戈冗鄐嫩什鄍��鄍� 鄐�之鄐擒什鄐桌冗 鄐�尹鄍��鄍�仆鄐賴中 鄐𥔿奶 鄐戈云鄐擒�鄐��鄍� 鄐�之鄍温仁鄐擒中鄍温亢鄐賴� 鄐能冗鄐戈�鄐啤冗 鄐眇�鄐� 鄐鉮什鄍温尹 鄐嫩冗鄐桌�鄐耜冗鄐� 鄐詮亢鄍温云鄐啤�鄐� 鄐鉮什鄍温尹鄍�允鄍肀元鄍�!' :
                   '鉠恷�鉠㮙蔡鉏肀�鉠�噙鉠毯膛鉏肀�鉠舟�鉧晤蝦鉠𨥬�鉠␡膠鉏肀耦鉠耜�鉏肀�鉠𨥬蔡鉏肀�鉧晤蝦鉠𨥬�鉠�鉧晤蔡鉏肀�鉠��鉏肀�鉠𨥬蝦鉠𨥬�鉠␡蓬鉏肀�鉠𠒎蔡鉏肀�鉠𠒎�鉏肀膠鉧颴蝶鉏肀�鉠颴蝦鉏肀翩鉠潼�鉏� 鉠�勳鉠潼�鉏肀�鉧晤蔡鉏肀膠鉧戈勳鉠潼�鉏肀�鉠恷蔡鉏肀�鉠�噙鉠毯膛鉏肀�鉠舟�鉧晤蝦鉠𨥬�鉠舟�鉧耜蔡鉠��鉠恷�鉠毯�鉏肀�鉠遤�鉏肀�鉠耜�鉠␡蓬鉏肀�鉏肀�鉠�膠鉏肀�鉠��鉠恷�鉧耜蝶鉠␡�鉠遤�鉠恷�鉠�!'}
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
                          {experience.price} � {bookingData.participants}
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

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4 animate-in fade-in duration-300">
          <div className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
            theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white'
          }`}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-600"></div>
            
            <button 
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-orange-50 dark:bg-orange-900/20 mb-4">
                  <LogIn className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h2>
                <p className="text-gray-500 dark:text-slate-400 mt-2">Login to manage your Sikkim journeys</p>
              </div>

              {authError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-center space-x-3 text-red-600 dark:text-red-400 animate-shake">
                  <Shield className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{authError}</p>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1 text-gray-700 dark:text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={authForm.email}
                      onChange={handleAuthChange}
                      placeholder="name@example.com"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 transition-all outline-none ${
                        theme === 'dark' 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1 text-gray-700 dark:text-slate-300">Password</label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      required
                      value={authForm.password}
                      onChange={handleAuthChange}
                      placeholder="••••••••"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 transition-all outline-none ${
                        theme === 'dark' 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 mt-4 flex items-center justify-center space-x-2"
                >
                  {authLoading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 text-center">
                <p className="text-gray-500 dark:text-slate-400 text-sm">
                  Don't have an account? {' '}
                  <button 
                    onClick={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}
                    className="text-orange-600 font-bold hover:underline"
                  >
                    Create one now
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4 animate-in fade-in duration-300">
          <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
            theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white'
          }`}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-orange-500"></div>
            
            <button 
              onClick={() => setIsSignupOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-orange-50 dark:bg-orange-900/20 mb-4">
                  <UserPlus className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Create Account</h2>
                <p className="text-gray-500 dark:text-slate-400 mt-2">Join GhoomoIndia for exclusive tours</p>
              </div>

              {authError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-center space-x-3 text-red-600 dark:text-red-400">
                  <Shield className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{authError}</p>
                </div>
              )}

              <form onSubmit={handleSignupSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 ml-1 text-gray-700 dark:text-slate-300">Full Name</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={authForm.name}
                      onChange={handleAuthChange}
                      placeholder="Tenzing Norgay"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 transition-all outline-none ${
                        theme === 'dark' 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1 text-gray-700 dark:text-slate-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={authForm.email}
                      onChange={handleAuthChange}
                      placeholder="tenzing@gmail.com"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 transition-all outline-none ${
                        theme === 'dark' 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1 text-gray-700 dark:text-slate-300">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={authForm.phone}
                      onChange={handleAuthChange}
                      placeholder="+91..."
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 transition-all outline-none ${
                        theme === 'dark' 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 ml-1 text-gray-700 dark:text-slate-300">Password</label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      required
                      value={authForm.password}
                      onChange={handleAuthChange}
                      placeholder="Set a strong password"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 transition-all outline-none ${
                        theme === 'dark' 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="md:col-span-2 w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 mt-4 flex items-center justify-center space-x-2"
                >
                  {authLoading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 text-center">
                <p className="text-gray-500 dark:text-slate-400 text-sm">
                  Already have an account? {' '}
                  <button 
                    onClick={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}
                    className="text-orange-600 font-bold hover:underline"
                  >
                    Log In
                  </button>
                </p>
              </div>
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