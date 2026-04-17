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
      copyright: '┬⌐ 2025 Sikkim Trails. All rights reserved. Made by The Techies for spiritual seekers.',
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
  αñ╣αñ┐αñéαñªαÑÇ: {
    appName: 'αñÿαÑéαñ«αÑï αñçαñéαñíαñ┐αñ»αñ╛',
    tagline: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαÑç αñ¬αñ╡αñ┐αññαÑìαñ░ αñ«αñá',
    heroTitle: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαÑç αñ¬αñ╡αñ┐αññαÑìαñ░ αñ«αñá',
    heroSubtitle: 'αñ╣αñ┐αñ«αñ╛αñ▓αñ» αñòαÑç αñ╣αÑâαñªαñ» αñ«αÑçαñé αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ£αÑìαñ₧αñ╛αñ¿, αñ╢αñ╛αñéαññαñ┐αñ¬αÑéαñ░αÑìαñú αñºαÑìαñ»αñ╛αñ¿ αñöαñ░ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ£αÑìαñ₧αñ╛αñ¿ αñòαÑÇ αñûαÑïαñ£ αñòαñ░αÑçαñéαÑñ',
    beginJourney: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛ αñ╢αÑüαñ░αÑé αñòαñ░αÑçαñé',
    exploreMonasteries: 'αñ«αñáαÑïαñé αñòαñ╛ αñàαñ¿αÑìαñ╡αÑçαñ╖αñú αñòαñ░αÑçαñé',
    nav: {
      home: 'αñ╣αÑïαñ«',
      monasteries: 'αñ«αñá',
      spiritualJourney: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛',
      traditions: 'αñ¼αÑîαñªαÑìαñº αñ¬αñ░αñéαñ¬αñ░αñ╛αñÅαñé',
      packages: 'αñƒαÑéαñ░ αñ¬αÑêαñòαÑçαñ£',
      experiences: 'αñàαñ¿αÑüαñ¡αñ╡',
      about: 'αñ╣αñ«αñ╛αñ░αÑç αñ¼αñ╛αñ░αÑç αñ«αÑçαñé',
      contact: 'αñ╕αñéαñ¬αñ░αÑìαñò'
    },
    tourPackages: {
      title: 'αñƒαÑéαñ░ αñ¬αÑêαñòαÑçαñ£',
      subtitle: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñƒαÑìαñ░αÑçαñ▓αÑìαñ╕ αñòαÑç αñ£αñ╛αñªαÑé αñòαÑï αñ╣αñ«αñ╛αñ░αÑÇ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñöαñ░ αñ╕αñ╛αñ╣αñ╕αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛αñôαñé αñòαÑç αñ╕αñ╛αñÑ αñûαÑïαñ£αÑçαñéαÑñ',
      basic: {
        title: 'αñ¼αÑçαñ╕αñ┐αñò αñ¬αÑêαñòαÑçαñ£',
        duration: '3 αñªαñ┐αñ¿ / 2 αñ░αñ╛αññ',
        services: ['αñ¼αñ£αñƒ αñ╣αÑïαñƒαñ▓ αñ╕αÑìαñƒαÑç', 'αñ╕αÑìαñÑαñ╛αñ¿αÑÇαñ» αñªαñ░αÑìαñ╢αñ¿αÑÇαñ» αñ╕αÑìαñÑαñ▓ (αñùαñéαñùαñƒαÑïαñò)', 'αñ╕αñ╛αñ¥αñ╛ αñ¬αñ░αñ┐αñ╡αñ╣αñ¿', 'αñ¡αÑïαñ£αñ¿ αñ╢αñ╛αñ«αñ┐αñ▓ αñ¿αñ╣αÑÇαñé']
      },
      premium: {
        title: 'αñ¬αÑìαñ░αÑÇαñ«αñ┐αñ»αñ« αñ¬αÑêαñòαÑçαñ£',
        duration: '5 αñªαñ┐αñ¿ / 4 αñ░αñ╛αññ',
        services: ['3-αñ╕αñ┐αññαñ╛αñ░αñ╛ αñ╣αÑïαñƒαñ▓ αñ╕αÑìαñƒαÑç', 'αñùαñéαñùαñƒαÑïαñò + αññαÑìαñ╕αÑïαñ«αñùαÑï αñ¥αÑÇαñ▓ + αñ¼αñ╛αñ¼αñ╛ αñ«αñéαñªαñ┐αñ░', 'αñ¿αñ╛αñ╢αÑìαññαñ╛ αñöαñ░ αñ░αñ╛αññ αñòαñ╛ αñûαñ╛αñ¿αñ╛ αñ╢αñ╛αñ«αñ┐αñ▓', 'αñ¿αñ┐αñ£αÑÇ/αñ╕αñ╛αñ¥αñ╛ αñ¬αñ░αñ┐αñ╡αñ╣αñ¿', 'αñ¿αñ┐αñ░αÑìαñªαÑçαñ╢αñ┐αññ αñƒαÑéαñ░']
      },
      luxury: {
        title: 'αñ▓αñòαÑìαñ£αñ░αÑÇ αñ¬αÑêαñòαÑçαñ£',
        duration: '7 αñªαñ┐αñ¿ / 6 αñ░αñ╛αññ',
        services: ['5-αñ╕αñ┐αññαñ╛αñ░αñ╛ αñ╣αÑïαñƒαñ▓ / αñ░αñ┐αñ╕αÑëαñ░αÑìαñƒ αñ╕αÑìαñƒαÑç', 'αñùαñéαñùαñƒαÑïαñò + αñëαññαÑìαññαñ░αÑÇ αñ╕αñ┐αñòαÑìαñòαñ┐αñ« (αñ▓αñ╛αñÜαÑüαñéαñù, αñ»αÑüαñ«αñÑαñ╛αñéαñù)', 'αñ╕αñ¡αÑÇ αñ¡αÑïαñ£αñ¿ αñ╢αñ╛αñ«αñ┐αñ▓', 'αñ¿αñ┐αñ£αÑÇ αñƒαÑêαñ¼ αñöαñ░ αñ╡αÑìαñ»αñòαÑìαññαñ┐αñùαññ αñùαñ╛αñçαñí', 'αñ¬αÑìαñ░αñ╛αñÑαñ«αñ┐αñòαññαñ╛ αñ¼αÑüαñòαñ┐αñéαñù αñöαñ░ VIP αñàαñ¿αÑüαñ¡αñ╡']
      },
      safetySection: {
        title: 'αñ╕αÑüαñ░αñòαÑìαñ╖αñ╛ αñöαñ░ αñƒαÑìαñ░αÑêαñòαñ┐αñéαñù αñ¬αÑìαñ░αñúαñ╛αñ▓αÑÇ',
        description: "αñåαñ¬αñòαÑÇ αñ╕αÑüαñ░αñòαÑìαñ╖αñ╛ αñ╣αñ«αñ╛αñ░αÑÇ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ¬αÑìαñ░αññαñ┐αñ¼αñªαÑìαñºαññαñ╛ αñ╣αÑêαÑñ αñ╣αñ«αñ¿αÑç αñ╣αñ░ αñ»αñ╛αññαÑìαñ░αÑÇ αñòαÑÇ 24/7 αñ╕αÑüαñ░αñòαÑìαñ╖αñ╛ αñ╕αÑüαñ¿αñ┐αñ╢αÑìαñÜαñ┐αññ αñòαñ░αñ¿αÑç αñòαÑç αñ▓αñ┐αñÅ αñÅαñò αñ«αñ£αñ¼αÑéαññ αñíαñ┐αñ£αñ┐αñƒαñ▓ αñóαñ╛αñéαñÜαñ╛ αññαÑêαñ»αñ╛αñ░ αñòαñ┐αñ»αñ╛ αñ╣αÑêαÑñ",
        features: {
          gps: { title: 'αñ▓αñ╛αñçαñ╡ GPS αñƒαÑìαñ░αÑêαñòαñ┐αñéαñù', desc: 'αñ╡αñ╛αñ╕αÑìαññαñ╡αñ┐αñò αñ╕αñ«αñ» αñ╕αÑìαñÑαñ╛αñ¿ αñ¿αñ┐αñùαñ░αñ╛αñ¿αÑÇαÑñ' },
          sos: { title: 'αñçαñ«αñ░αñ£αÑçαñéαñ╕αÑÇ SOS', desc: 'αññαÑüαñ░αñéαññ SOS αñ¬αÑìαñ░αññαñ┐αñòαÑìαñ░αñ┐αñ»αñ╛αÑñ' },
          support: { title: '24/7 αñ╕αñ╣αñ╛αñ»αññαñ╛', desc: 'αñ╕αñ«αñ░αÑìαñ¬αñ┐αññ αñ╕αñ╣αñ╛αñ»αññαñ╛ αñƒαÑÇαñ«αÑñ' },
          partners: { title: 'αñ╕αññαÑìαñ»αñ╛αñ¬αñ┐αññ αñ¡αñ╛αñùαÑÇαñªαñ╛αñ░', desc: 'αñ¬αÑéαñ░αÑÇ αññαñ░αñ╣ αñ╕αÑç αñ£αñ╛αñéαñÜαÑç αñùαñÅ αñíαÑìαñ░αñ╛αñçαñ╡αñ░ αñöαñ░ αñùαñ╛αñçαñíαÑñ' }
        }
      }
    },
    planJourney: 'αñàαñ¬αñ¿αÑÇ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛ αñòαÑÇ αñ»αÑïαñ£αñ¿αñ╛ αñ¼αñ¿αñ╛αñÅαñé',
    planJourneySubtitle: 'αñ╕αñ╛αñ░αñÑαÑÇ αñòαÑï αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñ¡αñ░ αñ«αÑçαñé αñ╡αÑìαñ»αñòαÑìαññαñ┐αñùαññ αñ«αñá αññαÑÇαñ░αÑìαñÑαñ»αñ╛αññαÑìαñ░αñ╛ αñòαÑç αñ«αñ╛αñºαÑìαñ»αñ« αñ╕αÑç αñåαñ¬αñòαñ╛ αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñ¿ αñòαñ░αñ¿αÑç αñªαÑçαñé',
    startingPoint: 'αñ¬αÑìαñ░αñ╛αñ░αñéαñ¡αñ┐αñò αñ╕αÑìαñÑαñ╛αñ¿',
    primaryMonastery: 'αñ«αÑüαñûαÑìαñ» αñ«αñá',
    duration: 'αñàαñ╡αñºαñ┐',
    spiritualFocus: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ½αÑïαñòαñ╕',
    createJourney: 'αñ╕αñ╛αñ░αñÑαÑÇ αñòαÑç αñ╕αñ╛αñÑ αñ¬αñ╡αñ┐αññαÑìαñ░ αñ»αñ╛αññαÑìαñ░αñ╛ αñ¼αñ¿αñ╛αñÅαñé',
    monasteryShowcase: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαÑç αñ¬αñ╡αñ┐αññαÑìαñ░ αñ«αñá',
    monasteryShowcaseSubtitle: 'αñ╣αñ┐αñ«αñ╛αñ▓αñ»αÑÇ αñ¬αñ░αñ┐αñªαÑâαñ╢αÑìαñ» αñ«αÑçαñé αñ¼αñ╕αÑç αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ¼αÑîαñªαÑìαñº αñ«αñáαÑïαñé αñòαñ╛ αñàαñ¿αÑìαñ╡αÑçαñ╖αñú αñòαñ░αÑçαñé',
    exploreMonastery: 'αñ«αñá αñòαñ╛ αñàαñ¿αÑìαñ╡αÑçαñ╖αñú αñòαñ░αÑçαñé',
    spiritualExperiences: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñàαñ¿αÑüαñ¡αñ╡ αñöαñ░ αñ╕αÑìαñÑαñ╛αñ¿αÑÇαñ» αñ╕αñéαñ╕αÑìαñòαÑâαññαñ┐',
    spiritualExperiencesSubtitle: 'αñ¬αÑìαñ░αñ╛αñ«αñ╛αñúαñ┐αñò αñ¼αÑîαñªαÑìαñº αñ¬αÑìαñ░αñÑαñ╛αñôαñé αñöαñ░ αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αÑÇ αñ╕αñéαñ╕αÑìαñòαÑâαññαñ┐ αñ«αÑçαñé αñûαÑüαñª αñòαÑï αñíαÑüαñ¼αÑï αñªαÑçαñé',
    bookExperience: 'αñàαñ¿αÑüαñ¡αñ╡ αñ¼αÑüαñò αñòαñ░αÑçαñé',
    buddhist: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñ«αÑçαñé αñ¼αÑîαñªαÑìαñº αñ¬αñ░αñéαñ¬αñ░αñ╛αñÅαñé',
    buddhistSubtitle: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαÑÇ αñ╕αñ«αÑâαñªαÑìαñº αñ¼αÑîαñªαÑìαñº αñ╡αñ┐αñ░αñ╛αñ╕αññ αñöαñ░ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ¬αÑìαñ░αñÑαñ╛αñôαñé αñòαÑç αñ¼αñ╛αñ░αÑç αñ«αÑçαñé αñ£αñ╛αñ¿αÑçαñé',
    routePlanner: 'αñ«αñá αñ«αñ╛αñ░αÑìαñù αñ»αÑïαñ£αñ¿αñ╛αñòαñ╛αñ░',
    routePlannerSubtitle: 'αñ╕αñ╛αñ░αñÑαÑÇ αñòαÑç αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñ¿ αñòαÑç αñ╕αñ╛αñÑ αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñ¡αñ░ αñ«αÑçαñé αñàαñ¬αñ¿αÑç αñ«αñá αññαÑÇαñ░αÑìαñÑαñ»αñ╛αññαÑìαñ░αñ╛ αñ«αñ╛αñ░αÑìαñù αñòαÑÇ αñ»αÑïαñ£αñ¿αñ╛ αñ¼αñ¿αñ╛αñÅαñé',
    interactiveMap: 'αñçαñéαñƒαñ░αÑêαñòαÑìαñƒαñ┐αñ╡ αñ«αñá αñ«αñ╛αñ¿αñÜαñ┐αññαÑìαñ░',
    generateItinerary: 'αñ╕αñ╛αñ░αñÑαÑÇ αñòαÑç αñ╕αñ╛αñÑ αñ»αñ╛αññαÑìαñ░αñ╛ αñòαñ╛αñ░αÑìαñ»αñòαÑìαñ░αñ« αñ¼αñ¿αñ╛αñÅαñé',
    saarthiGreeting: "αñ¿αñ«αñ╕αÑìαññαÑç! αñ«αÑêαñé αñ╕αñ╛αñ░αñÑαÑÇ αñ╣αÑéαñé, αñåαñ¬αñòαñ╛ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñòαÑñ αñåαñ£ αñåαñ¬ αñòαñ┐αñ╕ αñ«αñá αñòαñ╛ αñàαñ¿αÑìαñ╡αÑçαñ╖αñú αñòαñ░αñ¿αñ╛ αñÜαñ╛αñ╣αÑçαñéαñùαÑç?",
    chatWithSaarthi: 'αñ╕αñ╛αñ░αñÑαÑÇ αñ╕αÑç αñ¼αñ╛αññ αñòαñ░αÑçαñé!',
    spiritualGuide: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñò',
    askAbout: 'αñ«αñáαÑïαñé, αñºαÑìαñ»αñ╛αñ¿ αñòαÑç αñ¼αñ╛αñ░αÑç αñ«αÑçαñé αñ¬αÑéαñ¢αÑçαñé...',
    about: {
      title: 'αñÿαÑéαñ«αÑï αñçαñéαñíαñ┐αñ»αñ╛ αñòαÑç αñ¼αñ╛αñ░αÑç αñ«αÑçαñé',
      subtitle: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαÑÇ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ╡αñ┐αñ░αñ╛αñ╕αññ αñòαñ╛ αñåαñ¬αñòαñ╛ αñªαÑìαñ╡αñ╛αñ░',
      description: 'αñÿαÑéαñ«αÑï αñçαñéαñíαñ┐αñ»αñ╛ αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαÑÇ αñ¬αñ╡αñ┐αññαÑìαñ░ αñ¼αÑîαñªαÑìαñº αñ╡αñ┐αñ░αñ╛αñ╕αññ αñòαÑï αñ╕αñéαñ░αñòαÑìαñ╖αñ┐αññ αñòαñ░αñ¿αÑç αñöαñ░ αñ╕αñ╛αñ¥αñ╛ αñòαñ░αñ¿αÑç αñòαÑç αñ▓αñ┐αñÅ αñ╕αñ«αñ░αÑìαñ¬αñ┐αññ αñ╣αÑêαÑñ αñ╣αñ« αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ╕αñ╛αñºαñòαÑïαñé αñòαÑï αñ╕αÑìαñÑαñ╛αñ¿αÑÇαñ» αñ£αÑìαñ₧αñ╛αñ¿ αñöαñ░ αñ╕αñªαñ┐αñ»αÑïαñé αñ¬αÑüαñ░αñ╛αñ¿αÑÇ αñ¬αñ░αñéαñ¬αñ░αñ╛αñôαñé αñªαÑìαñ╡αñ╛αñ░αñ╛ αñ¿αñ┐αñ░αÑìαñªαÑçαñ╢αñ┐αññ αñ¬αÑìαñ░αñ╛αñ«αñ╛αñúαñ┐αñò αñ«αñá αñàαñ¿αÑüαñ¡αñ╡αÑïαñé αñ╕αÑç αñ£αÑïαñíαñ╝αññαÑç αñ╣αÑêαñéαÑñ',
      mission: 'αñ╣αñ«αñ╛αñ░αñ╛ αñ«αñ┐αñ╢αñ¿',
      missionText: 'αñçαñ¿ αñ¬αñ╡αñ┐αññαÑìαñ░ αñ╕αÑìαñÑαñ╛αñ¿αÑïαñé αñòαÑÇ αñ¬αñ╡αñ┐αññαÑìαñ░αññαñ╛ αñöαñ░ αñ¬αñ░αñéαñ¬αñ░αñ╛αñôαñé αñòαÑï αñ╕αñéαñ░αñòαÑìαñ╖αñ┐αññ αñòαñ░αññαÑç αñ╣αÑüαñÅ αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαÑç αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñûαñ£αñ╛αñ¿αÑç αñòαÑï αñ╕αñ¡αÑÇ αñ╕αñ╛αñºαñòαÑïαñé αñòαÑç αñ▓αñ┐αñÅ αñ╕αÑüαñ▓αñ¡ αñ¼αñ¿αñ╛αñ¿αñ╛αÑñ',
      vision: 'αñ╣αñ«αñ╛αñ░αÑÇ αñªαÑâαñ╖αÑìαñƒαñ┐',
      visionText: 'αñÅαñò αñÉαñ╕αÑÇ αñªαÑüαñ¿αñ┐αñ»αñ╛ αñ£αñ╣αñ╛αñé αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ£αÑìαñ₧αñ╛αñ¿ αñåαñºαÑüαñ¿αñ┐αñò αñåαññαÑìαñ«αñ╛αñôαñé αñòαÑï αñ╢αñ╛αñéαññαñ┐, αñòαñ░αÑüαñúαñ╛ αñöαñ░ αñ£αÑìαñ₧αñ╛αñ¿ αñòαÑÇ αñôαñ░ αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñ¿ αñòαñ░αÑçαÑñ',
      values: 'αñ╣αñ«αñ╛αñ░αÑç αñ«αÑéαñ▓αÑìαñ»',
      valuesText: 'αñ¬αñ░αñéαñ¬αñ░αñ╛ αñòαÑç αñ▓αñ┐αñÅ αñ╕αñ«αÑìαñ«αñ╛αñ¿, αñ¬αÑìαñ░αñ╛αñ«αñ╛αñúαñ┐αñò αñàαñ¿αÑüαñ¡αñ╡, αñƒαñ┐αñòαñ╛αñè αñ¬αñ░αÑìαñ»αñƒαñ¿, αñöαñ░ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ╡αñ┐αñòαñ╛αñ╕αÑñ',
      team: 'αñ╣αñ«αñ╛αñ░αÑÇ αñƒαÑÇαñ«',
      teamText: 'αñ╕αÑìαñÑαñ╛αñ¿αÑÇαñ» αñùαñ╛αñçαñí, αñ¼αÑîαñªαÑìαñº αñ╡αñ┐αñªαÑìαñ╡αñ╛αñ¿, αñöαñ░ αñ»αñ╛αññαÑìαñ░αñ╛ αñ╡αñ┐αñ╢αÑçαñ╖αñ£αÑìαñ₧ αñ╕αñ╛αñ░αÑìαñÑαñò αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛αñÅαñé αñ¼αñ¿αñ╛αñ¿αÑç αñòαÑç αñ▓αñ┐αñÅ αñ«αñ┐αñ▓αñòαñ░ αñòαñ╛αñ« αñòαñ░ αñ░αñ╣αÑç αñ╣αÑêαñéαÑñ'
    },
    contact: {
      title: 'αñ╕αñéαñ¬αñ░αÑìαñò αñòαñ░αÑçαñé',
      subtitle: 'αñåαñ£ αñ╣αÑÇ αñàαñ¬αñ¿αÑÇ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛ αñ╢αÑüαñ░αÑé αñòαñ░αÑçαñé',
      getInTouch: 'αñ╕αñéαñ¬αñ░αÑìαñò αñ«αÑçαñé αñ░αñ╣αÑçαñé',
      address: 'αñ¬αññαñ╛',
      addressText: 'αñùαñéαñùαñƒαÑïαñò, αñ╕αñ┐αñòαÑìαñòαñ┐αñ« 737101, αñ¡αñ╛αñ░αññ',
      phone: 'αñ½αÑïαñ¿',
      phoneText: '+91 98765 43210',
      email: 'αñêαñ«αÑçαñ▓',
      emailText: 'namaste@ghoomo.india',
      hours: 'αñòαñ╛αñ░αÑìαñ»αñ╛αñ▓αñ» αñ╕αñ«αñ»',
      hoursText: 'αñ╕αÑïαñ« - αñ╢αñ¿αñ┐: αñ╕αÑüαñ¼αñ╣ 9:00 - αñ╢αñ╛αñ« 6:00',
      sendMessage: 'αñ╕αñéαñªαÑçαñ╢ αñ¡αÑçαñ£αÑçαñé',
      name: 'αñåαñ¬αñòαñ╛ αñ¿αñ╛αñ«',
      subject: 'αñ╡αñ┐αñ╖αñ»',
      message: 'αñåαñ¬αñòαñ╛ αñ╕αñéαñªαÑçαñ╢',
      submit: 'αñ╕αñéαñªαÑçαñ╢ αñ¡αÑçαñ£αÑçαñé'
    },
    bookingModal: {
      title: 'αñàαñ¬αñ¿αñ╛ αñàαñ¿αÑüαñ¡αñ╡ αñ¼αÑüαñò αñòαñ░αÑçαñé',
      selectDate: 'αññαñ╛αñ░αÑÇαñû αñÜαÑüαñ¿αÑçαñé',
      selectTime: 'αñ╕αñ«αñ» αñÜαÑüαñ¿αÑçαñé',
      participants: 'αñ¬αÑìαñ░αññαñ┐αñ¡αñ╛αñùαñ┐αñ»αÑïαñé αñòαÑÇ αñ╕αñéαñûαÑìαñ»αñ╛',
      specialRequests: 'αñ╡αñ┐αñ╢αÑçαñ╖ αñàαñ¿αÑüαñ░αÑïαñº',
      totalCost: 'αñòαÑüαñ▓ αñ▓αñ╛αñùαññ',
      bookNow: 'αñàαñ¡αÑÇ αñ¼αÑüαñò αñòαñ░αÑçαñé',
      close: 'αñ¼αñéαñª αñòαñ░αÑçαñé'
    },
    monasteryModal: {
      history: 'αñçαññαñ┐αñ╣αñ╛αñ╕',
      traditions: 'αñ¬αñ░αñéαñ¬αñ░αñ╛αñÅαñé',
      visitingHours: 'αñªαñ░αÑìαñ╢αñ¿ αñ╕αñ«αñ»',
      location: 'αñ╕αÑìαñÑαñ╛αñ¿',
      nearbyAttractions: 'αñ¿αñ£αñªαÑÇαñòαÑÇ αñåαñòαñ░αÑìαñ╖αñú',
      close: 'αñ¼αñéαñª αñòαñ░αÑçαñé'
    },
    itineraryResult: {
      title: 'αñåαñ¬αñòαñ╛ αñ¬αñ╡αñ┐αññαÑìαñ░ αñ»αñ╛αññαÑìαñ░αñ╛ αñòαñ╛αñ░αÑìαñ»αñòαÑìαñ░αñ«',
      generatedBy: 'αñ╕αñ╛αñ░αñÑαÑÇ αñªαÑìαñ╡αñ╛αñ░αñ╛ αññαÑêαñ»αñ╛αñ░',
      day: 'αñªαñ┐αñ¿',
      close: 'αñ¼αñéαñª αñòαñ░αÑçαñé'
    },
    footer: {
      description: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαÑç αñ¬αñ╡αñ┐αññαÑìαñ░ αñ«αñáαÑïαñé αñöαñ░ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ╡αñ┐αñ░αñ╛αñ╕αññ αñòαÑÇ αñûαÑïαñ£ αñòαñ░αÑçαñéαÑñ αñ╣αñ┐αñ«αñ╛αñ▓αñ» αñ«αÑçαñé αñ¼αÑîαñªαÑìαñº αñ£αÑìαñ₧αñ╛αñ¿ αñòαÑç αñ▓αñ┐αñÅ αñåαñ¬αñòαñ╛ αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñòαÑñ',
      sacredPlaces: 'αñ¬αñ╡αñ┐αññαÑìαñ░ αñ╕αÑìαñÑαñ╛αñ¿',
      support: 'αñ╕αñ╣αñ╛αñ»αññαñ╛',
      connect: 'αñ£αÑüαñíαñ╝αÑçαñé',
      followUs: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ¬αÑìαñ░αÑçαñ░αñúαñ╛ αñòαÑç αñ▓αñ┐αñÅ αñ╣αñ«αÑçαñé αñ½αÑëαñ▓αÑï αñòαñ░αÑçαñé',
      copyright: '┬⌐ 2024 αñÿαÑéαñ«αÑï αñçαñéαñíαñ┐αñ»αñ╛αÑñ αñ╕αñ¡αÑÇ αñàαñºαñ┐αñòαñ╛αñ░ αñ╕αÑüαñ░αñòαÑìαñ╖αñ┐αññαÑñ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ╕αñ╛αñºαñòαÑïαñé αñòαÑç αñ▓αñ┐αñÅ ≡ƒÖÅ αñòαÑç αñ╕αñ╛αñÑ αñ¼αñ¿αñ╛αñ»αñ╛ αñùαñ»αñ╛αÑñ',
      ar: {
        viewInAr: 'AR αñ«αÑçαñé αñªαÑçαñûαÑçαñé',
        instructions: 'AR αñ¿αñ┐αñ░αÑìαñªαÑçαñ╢',
        close: 'AR αñªαÑâαñ╢αÑìαñ» αñ¼αñéαñª αñòαñ░αÑçαñé'
      }
    },
    monasteries: {
      rumtek: {
        name: 'αñ░αÑüαñ«αñƒαÑçαñò αñ«αñá',
        description: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαñ╛ αñ╕αñ¼αñ╕αÑç αñ¼αñíαñ╝αñ╛ αñ«αñá, αñòαñ░αÑìαñ«αñ╛αñ¬αñ╛ αñòαÑÇ αñùαñªαÑìαñªαÑÇ',
        history: '1966 αñ«αÑçαñé αñ¿αñ┐αñ░αÑìαñ«αñ┐αññ, αñ░αÑüαñ«αñƒαÑçαñò αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαñ╛ αñ╕αñ¼αñ╕αÑç αñ¼αñíαñ╝αñ╛ αñ«αñá αñ╣αÑê αñöαñ░ αñòαñ░αÑìαñ«αñ╛ αñòαñùαÑìαñ»αÑé αñ╡αñéαñ╢ αñòαÑÇ αñ«αÑüαñûαÑìαñ» αñùαñªαÑìαñªαÑÇ αñ╣αÑêαÑñ αñ»αñ╣αñ╛αñé αñ¼αñ╣αÑüαñ«αÑéαñ▓αÑìαñ» αñàαñ╡αñ╢αÑçαñ╖ αñöαñ░ αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ¼αÑîαñªαÑìαñº αñòαñ▓αñ╛αñòαÑâαññαñ┐αñ»αñ╛αñé αñ╣αÑêαñéαÑñ',
        traditions: 'αñòαñ░αÑìαñ«αñ╛ αñòαñùαÑìαñ»αÑé αñ¬αñ░αñéαñ¬αñ░αñ╛ αñòαñ╛ αñ¬αñ╛αñ▓αñ¿ αñòαñ░αññαñ╛ αñ╣αÑê αñ£αñ┐αñ╕αñ«αÑçαñé αñªαÑêαñ¿αñ┐αñò αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛, αñºαÑìαñ»αñ╛αñ¿ αñ╕αññαÑìαñ░, αñöαñ░ αññαñ┐αñ¼αÑìαñ¼αññαÑÇ αñ¿αñ╡ αñ╡αñ░αÑìαñ╖ αñ╕αñ«αñ╛αñ░αÑïαñ╣ αñ╕αñ╣αñ┐αññ αñ╡αñ╛αñ░αÑìαñ╖αñ┐αñò αññαÑìαñ»αÑïαñ╣αñ╛αñ░ αñ╢αñ╛αñ«αñ┐αñ▓ αñ╣αÑêαñéαÑñ',
        hours: 'αñ╕αÑüαñ¼αñ╣ 6:00 - αñ╢αñ╛αñ« 6:00',
        location: 'αñùαñéαñùαñƒαÑïαñò αñ╕αÑç 24 αñòαñ┐αñ«αÑÇ',
        attractions: 'αñ╕αÑìαñ╡αñ░αÑìαñú αñ╕αÑìαññαÑéαñ¬, αñ«αñá αñ╕αñéαñùαÑìαñ░αñ╣αñ╛αñ▓αñ», αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛ αñÜαñòαÑìαñ░'
      },
      namchi: {
    name: 'αñ¿αñ«αñÜαÑÇ αñ«αñá',
    description: 'αñªαñòαÑìαñ╖αñ┐αñú αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñ«αÑçαñé αñ╕αÑìαñÑαñ┐αññ αñÅαñò αñ¬αÑìαñ░αñ╕αñ┐αñªαÑìαñº αñ¼αÑîαñªαÑìαñº αñ«αñá, αñ£αÑï αñàαñ¬αñ¿αÑç αñ╢αñ╛αñéαññ αñ╡αñ╛αññαñ╛αñ╡αñ░αñú αñöαñ░ αñ╡αñ┐αñ╢αñ╛αñ▓ αñùαÑüαñ░αÑü αñ¬αñªαÑìαñ«αñ╕αñéαñ¡αñ╡ αñ¬αÑìαñ░αññαñ┐αñ«αñ╛ αñòαÑç αñ▓αñ┐αñÅ αñ¬αÑìαñ░αñ╕αñ┐αñªαÑìαñº αñ╣αÑêαÑñ',
    history: 'αñ¿αñ«αñÜαÑÇ αñ«αñá αñòαÑÇ αñ╕αÑìαñÑαñ╛αñ¬αñ¿αñ╛ αñùαÑüαñ░αÑü αñ¬αñªαÑìαñ«αñ╕αñéαñ¡αñ╡ αñòαÑÇ αñ╢αñ┐αñòαÑìαñ╖αñ╛αñôαñé αñòαÑç αñ╕αñéαñ░αñòαÑìαñ╖αñú αñöαñ░ αñ¼αÑîαñªαÑìαñº αñºαñ░αÑìαñ« αñòαÑç αñ¬αÑìαñ░αñÜαñ╛αñ░ αñ╣αÑçαññαÑü αñòαÑÇ αñùαñê αñÑαÑÇαÑñ αñ»αñ╣ αñòαÑìαñ╖αÑçαññαÑìαñ░ αñ«αÑçαñé αñÅαñò αñ¬αÑìαñ░αñ«αÑüαñû αñºαñ╛αñ░αÑìαñ«αñ┐αñò αñöαñ░ αñ╕αñ╛αñéαñ╕αÑìαñòαÑâαññαñ┐αñò αñòαÑçαñéαñªαÑìαñ░ αñ╣αÑêαÑñ',
    traditions: 'αñ»αñ╣αñ╛αñé αñ╡αñ╛αñ░αÑìαñ╖αñ┐αñò αñ¼αÑîαñªαÑìαñº αññαÑìαñ»αÑïαñ╣αñ╛αñ░, αñ¬αñ╛αñ░αñéαñ¬αñ░αñ┐αñò αñ¿αÑâαññαÑìαñ» αñöαñ░ αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛ αñ╕αñ¡αñ╛αñÅαñé αñåαñ»αÑïαñ£αñ┐αññ αñòαÑÇ αñ£αñ╛αññαÑÇ αñ╣αÑêαñé, αñ£αñ┐αñ¿αñ«αÑçαñé αñªαÑéαñ░-αñªαÑéαñ░ αñ╕αÑç αñ╢αÑìαñ░αñªαÑìαñºαñ╛αñ▓αÑü αñåαññαÑç αñ╣αÑêαñéαÑñ',
    hours: 'αñ╕αÑüαñ¼αñ╣ 8:00 - αñ╢αñ╛αñ« 6:00',
    location: 'αñ¿αñ«αñÜαÑÇ, αñªαñòαÑìαñ╖αñ┐αñú αñ╕αñ┐αñòαÑìαñòαñ┐αñ«',
    attractions: 'αñùαÑüαñ░αÑü αñ¬αñªαÑìαñ«αñ╕αñéαñ¡αñ╡ αñòαÑÇ 135 αñ½αÑÇαñƒ αñèαñéαñÜαÑÇ αñ¬αÑìαñ░αññαñ┐αñ«αñ╛, αñ╕αÑïαñ▓αÑïαñ½αÑïαñò αñÜαÑïαñÅαññαÑçαñé, αñöαñ░ αñåαñ╕αñ¬αñ╛αñ╕ αñòαÑç αñ¬αñ░αÑìαñ╡αññαÑÇαñ» αñªαÑâαñ╢αÑìαñ»'
},
      tashiding: {
        name: 'αññαñ╛αñ╢αñ┐αñªαñ┐αñéαñù αñ«αñá',
        description: 'αñªαÑï αñ¿αñªαñ┐αñ»αÑïαñé αñòαÑç αñ¼αÑÇαñÜ αñ¬αñ╣αñ╛αñíαñ╝αÑÇ αñ¬αñ░ αñ¬αñ╡αñ┐αññαÑìαñ░ αñ«αñá',
        history: '1717 αñ«αÑçαñé αñ╕αÑìαñÑαñ╛αñ¬αñ┐αññ, αññαñ╛αñ╢αñ┐αñªαñ┐αñéαñù αñòαñ╛ αñàαñ░αÑìαñÑ αñ╣αÑê "αñ╕αñ«αñ░αÑìαñ¬αñ┐αññ αñòαÑçαñéαñªαÑìαñ░αÑÇαñ» αñùαÑîαñ░αñ╡" αñöαñ░ αñçαñ╕αÑç αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαÑç αñ╕αñ¼αñ╕αÑç αñ¬αñ╡αñ┐αññαÑìαñ░ αñ«αñáαÑïαñé αñ«αÑçαñé αñ╕αÑç αñÅαñò αñ«αñ╛αñ¿αñ╛ αñ£αñ╛αññαñ╛ αñ╣αÑêαÑñ',
        traditions: 'αñ¼αÑüαñ«αñÜαÑé αñ╕αñ«αñ╛αñ░αÑïαñ╣ αñòαÑç αñ▓αñ┐αñÅ αñ¬αÑìαñ░αñ╕αñ┐αñªαÑìαñº αñ£αñ╣αñ╛αñé αñ¡αñòαÑìαññαÑïαñé αñòαÑï αñ¬αñ╡αñ┐αññαÑìαñ░ αñ£αñ▓ αñ╡αñ┐αññαñ░αñ┐αññ αñòαñ┐αñ»αñ╛ αñ£αñ╛αññαñ╛ αñ╣αÑê, αñ£αÑï αñåαñ¿αÑç αñ╡αñ╛αñ▓αÑç αñ╡αñ░αÑìαñ╖ αñòαÑÇ αñ¡αñ╡αñ┐αñ╖αÑìαñ»αñ╡αñ╛αñúαÑÇ αñòαñ░αñ¿αÑç αñ«αÑçαñé αñ╡αñ┐αñ╢αÑìαñ╡αñ╛αñ╕ αñòαñ┐αñ»αñ╛ αñ£αñ╛αññαñ╛ αñ╣αÑêαÑñ',
        hours: 'αñ╕αÑüαñ¼αñ╣ 6:00 - αñ╢αñ╛αñ« 6:00',
        location: 'αñ░αñéαñùαñ┐αññ αñöαñ░ αñ░αñÑαÑïαñéαñù αñ¿αñªαñ┐αñ»αÑïαñé αñòαÑç αñ¼αÑÇαñÜ',
        attractions: 'αñ¬αñ╡αñ┐αññαÑìαñ░ αñ¼αÑüαñ«αñÜαÑé αñòαñ▓αñ╢, αñÜαÑïαñ░αÑìαññαÑçαñ¿, αñ¿αñªαÑÇ αñ╕αñéαñùαñ« αñªαÑâαñ╢αÑìαñ»'
      },
      enchey: {
        name: 'αñÅαñ¿αÑìαñÜαÑç αñ«αñá',
        description: 'αñùαñéαñùαñƒαÑïαñò αñòαÑï αñªαÑçαñûαñ¿αÑç αñ╡αñ╛αñ▓αñ╛ αñ╕αÑüαñéαñªαñ░ αñ«αñá',
        history: '1909 αñ«αÑçαñé αñ¿αñ┐αñ░αÑìαñ«αñ┐αññ, αñÅαñ¿αÑìαñÜαÑç αñòαñ╛ αñàαñ░αÑìαñÑ αñ╣αÑê "αñÅαñòαñ╛αñéαññ αñ«αñéαñªαñ┐αñ░" αñöαñ░ αñçαñ╕αñòαÑÇ αñ╕αÑìαñÑαñ╛αñ¬αñ¿αñ╛ αñ▓αñ╛αñ«αñ╛ αñªαÑìαñ░αÑüαñ¬αÑìαññαÑïαñ¼ αñòαñ╛αñ░αÑìαñ¬αÑï αñªαÑìαñ╡αñ╛αñ░αñ╛ αñòαÑÇ αñùαñê αñÑαÑÇ αñ£αñ┐αñ¿αñòαÑç αñ¼αñ╛αñ░αÑç αñ«αÑçαñé αñ«αñ╛αñ¿αñ╛ αñ£αñ╛αññαñ╛ αñÑαñ╛ αñòαñ┐ αñëαñ¿αñòαÑç αñ¬αñ╛αñ╕ αñëαñíαñ╝αñ¿αÑç αñòαÑÇ αñ╢αñòαÑìαññαñ┐ αñÑαÑÇαÑñ',
        traditions: 'αñ¿αÑìαñ»αñ┐αñéαñùαñ«αñ╛ αñ¬αñ░αñéαñ¬αñ░αñ╛ αñòαÑç αñ╕αñ╛αñÑ αñ╡αñ╛αñ░αÑìαñ╖αñ┐αñò αñ¢αñ« αñ¿αÑâαññαÑìαñ» αñ¬αÑìαñ░αñªαñ░αÑìαñ╢αñ¿ αñöαñ░ αñùαñéαñùαñƒαÑïαñò αñ╢αñ╣αñ░ αñòαÑÇ αñ╕αÑüαñ░αñòαÑìαñ╖αñ╛ αñòαÑç αñ▓αñ┐αñÅ αñ╡αñ┐αñ╢αÑçαñ╖ αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛αñÅαñéαÑñ',
        hours: 'αñ╕αÑüαñ¼αñ╣ 6:00 - αñ╢αñ╛αñ« 6:00',
        location: 'αñùαñéαñùαñƒαÑïαñò, αñ¬αÑéαñ░αÑìαñ╡αÑÇ αñ╕αñ┐αñòαÑìαñòαñ┐αñ«',
        attractions: 'αñ╢αñ╣αñ░ αñòαÑç αñªαÑâαñ╢αÑìαñ», αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛ αñ¥αñéαñíαÑç, αñ¬αñ╛αñ░αñéαñ¬αñ░αñ┐αñò αñ╡αñ╛αñ╕αÑìαññαÑüαñòαñ▓αñ╛'
      },
      dubdi: {
        name: 'αñªαÑüαñ¼αÑìαñªαÑÇ αñ«αñá',
        description: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñ«αÑçαñé αñ¿αñ┐αñ░αÑìαñ«αñ┐αññ αñ¬αñ╣αñ▓αñ╛ αñ«αñá',
        history: '1701 αñ«αÑçαñé αñÜαÑìαñ»αÑïαñùαÑìαñ»αñ╛αñ▓ αñ¿αñ╛αñ«αñùαÑìαñ»αñ╛αñ▓ αñªαÑìαñ╡αñ╛αñ░αñ╛ αñ╕αÑìαñÑαñ╛αñ¬αñ┐αññ, αñªαÑüαñ¼αÑìαñªαÑÇ αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαñ╛ αñ╕αñ¼αñ╕αÑç αñ¬αÑüαñ░αñ╛αñ¿αñ╛ αñ«αñá αñ╣αÑê αñöαñ░ αñçαñ╕ αñòαÑìαñ╖αÑçαññαÑìαñ░ αñ«αÑçαñé αñ¼αÑîαñªαÑìαñº αñºαñ░αÑìαñ« αñòαÑÇ αñ╢αÑüαñ░αÑüαñåαññ αñòαñ╛ αñ¬αÑìαñ░αññαÑÇαñò αñ╣αÑêαÑñ',
        traditions: 'αñ¿αÑìαñ»αñ┐αñéαñùαñ«αñ╛ αñ¬αñ░αñéαñ¬αñ░αñ╛ αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñ«αÑçαñé αñ▓αñ╛αñê αñùαñê αñ«αÑéαñ▓ αñ╢αñ┐αñòαÑìαñ╖αñ╛αñôαñé αñòαÑï αñ╕αñéαñ░αñòαÑìαñ╖αñ┐αññ αñòαñ░αññαÑÇ αñ╣αÑê, αñ£αñ┐αñ╕αñ«αÑçαñé αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ¬αñ╛αñéαñíαÑüαñ▓αñ┐αñ¬αñ┐αñ»αñ╛αñé αñöαñ░ αñàαñ╡αñ╢αÑçαñ╖ αñ╣αÑêαñéαÑñ',
        hours: 'αñ╕αÑüαñ¼αñ╣ 7:00 - αñ╢αñ╛αñ« 5:00',
        location: 'αñ»αÑüαñòαÑìαñ╕αÑïαñ«, αñ¬αñ╢αÑìαñÜαñ┐αñ« αñ╕αñ┐αñòαÑìαñòαñ┐αñ«',
        attractions: 'αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ¬αñ╛αñéαñíαÑüαñ▓αñ┐αñ¬αñ┐αñ»αñ╛αñé, αñÉαññαñ┐αñ╣αñ╛αñ╕αñ┐αñò αñ«αñ╣αññαÑìαñ╡, αñƒαÑìαñ░αÑçαñòαñ┐αñéαñù αñƒαÑìαñ░αÑçαñ▓αÑìαñ╕'
      },
      ralang: {
        name: 'αñ░αñ╛αñ▓αñ╛αñéαñù αñ«αñá',
        description: 'αñàαñ¬αñ¿αÑç αñ¬αñ╡αñ┐αññαÑìαñ░ αñ¢αñ« αñ¿αÑâαññαÑìαñ» αñ¬αÑìαñ░αñªαñ░αÑìαñ╢αñ¿ αñòαÑç αñ▓αñ┐αñÅ αñ¬αÑìαñ░αñ╕αñ┐αñªαÑìαñº',
        history: '1768 αñ«αÑçαñé αñ╕αÑìαñÑαñ╛αñ¬αñ┐αññ, αñ░αñ╛αñ▓αñ╛αñéαñù αñ«αñá αñàαñ¬αñ¿αÑç αñ╡αñ╛αñ░αÑìαñ╖αñ┐αñò αñ¬αñ╛αñéαñù αñ▓αÑìαñ╣αñ╛αñ¼αÑìαñ╕αÑïαñ▓ αññαÑìαñ»αÑïαñ╣αñ╛αñ░ αñöαñ░ αñ¬αñ╛αñ░αñéαñ¬αñ░αñ┐αñò αñ¢αñ« αñ¿αÑâαññαÑìαñ» αñòαÑç αñ▓αñ┐αñÅ αñ¬αÑìαñ░αñ╕αñ┐αñªαÑìαñº αñ╣αÑêαÑñ',
        traditions: 'αñòαñùαÑìαñ»αÑé αñ¬αñ░αñéαñ¬αñ░αñ╛ αñòαÑç αñ╕αñ╛αñÑ αñ╢αñ╛αñ¿αñªαñ╛αñ░ αñ«αÑüαñûαÑîαñƒαñ╛ αñ¿αÑâαññαÑìαñ» αññαÑìαñ»αÑïαñ╣αñ╛αñ░ αñöαñ░ αñûαñ╛αñéαñùαñÜαÑçαñéαñªαñ£αñ╝αÑïαñéαñùαñ╛ αñ¬αñ░αÑìαñ╡αññ αñòαñ╛ αñ╕αñ«αÑìαñ«αñ╛αñ¿ αñòαñ░αñ¿αÑç αñ╡αñ╛αñ▓αÑç αñ╕αñ«αñ╛αñ░αÑïαñ╣αÑñ',
        hours: 'αñ╕αÑüαñ¼αñ╣ 6:00 - αñ╢αñ╛αñ« 6:00',
        location: 'αñ░αñ╛αñ╡αñéαñùαñ▓αñ╛, αñªαñòαÑìαñ╖αñ┐αñú αñ╕αñ┐αñòαÑìαñòαñ┐αñ«',
        attractions: 'αñ¢αñ« αñ¿αÑâαññαÑìαñ» αñ«αñéαñÜ, αññαÑìαñ»αÑïαñ╣αñ╛αñ░ αñ«αÑêαñªαñ╛αñ¿, αñ¬αñ░αÑìαñ╡αññ αñªαÑâαñ╢αÑìαñ»'
      }
    },
    experiences: {
      meditation: 'αñ░αÑüαñ«αñƒαÑçαñò αñ«αÑçαñé αñºαÑìαñ»αñ╛αñ¿ αñ░αñ┐αñƒαÑìαñ░αÑÇαñƒ',
      philosophy: 'αñ¼αÑîαñªαÑìαñº αñªαñ░αÑìαñ╢αñ¿ αñòαñòαÑìαñ╖αñ╛αñÅαñé',
      homestay: 'αñ«αñá αñ╣αÑïαñ«αñ╕αÑìαñƒαÑç αñàαñ¿αÑüαñ¡αñ╡',
      crafts: 'αñ╣αñ╕αÑìαññαñ¿αñ┐αñ░αÑìαñ«αñ┐αññ αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛ αñÜαñòαÑìαñ░'
    },
    traditions: {
      nyingma: {
        title: 'αñ¿αÑìαñ»αñ┐αñéαñùαñ«αñ╛ αñ¬αñ░αñéαñ¬αñ░αñ╛',
        description: 'αññαñ┐αñ¼αÑìαñ¼αññαÑÇ αñ¼αÑîαñªαÑìαñº αñºαñ░αÑìαñ« αñòαñ╛ αñ╕αñ¼αñ╕αÑç αñ¬αÑüαñ░αñ╛αñ¿αñ╛ αñ╕αÑìαñòαÑéαñ▓, αñºαÑìαñ»αñ╛αñ¿ αñöαñ░ αññαñ╛αñéαññαÑìαñ░αñ┐αñò αñ¬αÑìαñ░αñÑαñ╛αñôαñé αñ¬αñ░ αñ£αÑïαñ░ αñªαÑçαññαñ╛ αñ╣αÑêαÑñ αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñòαÑç αñàαñºαñ┐αñòαñ╛αñéαñ╢ αñ«αñá αñçαñ╕ αñ¬αñ░αñéαñ¬αñ░αñ╛ αñòαñ╛ αñ¬αñ╛αñ▓αñ¿ αñòαñ░αññαÑç αñ╣αÑêαñéαÑñ'
      },
      kagyu: {
        title: 'αñòαñùαÑìαñ»αÑé αñ¬αñ░αñéαñ¬αñ░αñ╛',
        description: 'αñºαÑìαñ»αñ╛αñ¿ αñöαñ░ αñ╢αñ┐αñòαÑìαñ╖αñò αñ╕αÑç αñ¢αñ╛αññαÑìαñ░ αññαñò αñ«αÑîαñûαñ┐αñò αñ¬αñ░αñéαñ¬αñ░αñ╛ αñòαÑç αñ«αñ╛αñºαÑìαñ»αñ« αñ╕αÑç αñ╢αñ┐αñòαÑìαñ╖αñ╛αñôαñé αñòαÑç αñ¬αÑìαñ░αñ╕αñ╛αñ░αñú αñ¬αñ░ αñ£αÑïαñ░ αñªαÑçαñ¿αÑç αñòαÑç αñ▓αñ┐αñÅ αñ£αñ╛αñ¿αñ╛ αñ£αñ╛αññαñ╛ αñ╣αÑêαÑñ'
      },
      festivals: {
        title: 'αñ¬αñ╡αñ┐αññαÑìαñ░ αññαÑìαñ»αÑïαñ╣αñ╛αñ░',
        description: 'αñ¬αñ╛αñ░αñéαñ¬αñ░αñ┐αñò αñ¢αñ« αñ¿αÑâαññαÑìαñ», αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛ αñöαñ░ αñ╕αñ╛αñ«αÑüαñªαñ╛αñ»αñ┐αñò αñëαññαÑìαñ╕αñ╡ αñòαÑç αñ╕αñ╛αñÑ αñ░αñéαñùαñ¼αñ┐αñ░αñéαñùαÑç αñ¼αÑîαñªαÑìαñº αññαÑìαñ»αÑïαñ╣αñ╛αñ░αÑïαñé αñòαñ╛ αñàαñ¿αÑüαñ¡αñ╡ αñòαñ░αÑçαñéαÑñ'
      }
    }
  },
  αñ¿αÑçαñ¬αñ╛αñ▓αÑÇ: {
    appName: 'αñÿαÑüαñ«αÑìαñ«αÑï αñçαñ¿αÑìαñíαñ┐αñ»αñ╛',
    tagline: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαñ╛ αñ¬αñ╡αñ┐αññαÑìαñ░ αñùαÑüαñ«αÑìαñ¼αñ╛αñ╣αñ░αÑé',
    heroTitle: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαñ╛ αñ¬αñ╡αñ┐αññαÑìαñ░ αñùαÑüαñ«αÑìαñ¼αñ╛αñ╣αñ░αÑé',
    heroSubtitle: 'αñ╣αñ┐αñ«αñ╛αñ▓αñ»αñòαÑï αñ«αÑüαñƒαÑüαñ«αñ╛ αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ£αÑìαñ₧αñ╛αñ¿, αñ╢αñ╛αñ¿αÑìαññαñ┐αñ¬αÑéαñ░αÑìαñú αñºαÑìαñ»αñ╛αñ¿ αñ░ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ£αÑìαñ₧αñ╛αñ¿αñòαÑï αñûαÑïαñ£ αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑìαÑñ',
    beginJourney: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛ αñ╕αÑüαñ░αÑü αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
    exploreMonasteries: 'αñùαÑüαñ«αÑìαñ¼αñ╛αñ╣αñ░αÑéαñòαÑï αñàαñ¿αÑìαñ╡αÑçαñ╖αñú αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
    nav: {
      home: 'αñÿαñ░',
      monasteries: 'αñùαÑüαñ«αÑìαñ¼αñ╛αñ╣αñ░αÑé',
      spiritualJourney: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛',
      traditions: 'αñ¼αÑîαñªαÑìαñº αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñ╣αñ░αÑé',
      packages: 'αñƒαÑéαñ░ αñ¬αÑìαñ»αñ╛αñòαÑçαñ£αñ╣αñ░αÑé',
      experiences: 'αñàαñ¿αÑüαñ¡αñ╡αñ╣αñ░αÑé',
      about: 'αñ╣αñ╛αñ«αÑìαñ░αÑï αñ¼αñ╛αñ░αÑçαñ«αñ╛',
      contact: 'αñ╕αñ«αÑìαñ¬αñ░αÑìαñò'
    },
    planJourney: 'αññαñ¬αñ╛αñêαñéαñòαÑï αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛αñòαÑï αñ»αÑïαñ£αñ¿αñ╛ αñ¼αñ¿αñ╛αñëαñ¿αÑüαñ╣αÑïαñ╕αÑì',
    planJourneySubtitle: 'αñ╕αñ╛αñ░αñÑαÑÇαñ▓αñ╛αñê αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñ¡αñ░αñ┐ αñ╡αÑìαñ»αñòαÑìαññαñ┐αñùαññ αñùαÑüαñ«αÑìαñ¼αñ╛ αññαÑÇαñ░αÑìαñÑαñ»αñ╛αññαÑìαñ░αñ╛αñòαÑï αñ«αñ╛αñºαÑìαñ»αñ«αñ¼αñ╛αñƒ αññαñ¬αñ╛αñêαñéαñòαÑï αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñ¿ αñùαñ░αÑìαñ¿ αñªαñ┐αñ¿αÑüαñ╣αÑïαñ╕αÑì',
    startingPoint: 'αñ╕αÑüαñ░αÑüαñ╡αñ╛αññαÑÇ αñ╕αÑìαñÑαñ╛αñ¿',
    primaryMonastery: 'αñ«αÑüαñûαÑìαñ» αñùαÑüαñ«αÑìαñ¼αñ╛',
    duration: 'αñàαñ╡αñºαñ┐',
    spiritualFocus: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ½αÑïαñòαñ╕',
    createJourney: 'αñ╕αñ╛αñ░αñÑαÑÇαñ╕αñüαñù αñ¬αñ╡αñ┐αññαÑìαñ░ αñ»αñ╛αññαÑìαñ░αñ╛ αñ╕αñ┐αñ░αÑìαñ£αñ¿αñ╛ αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
    monasteryShowcase: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαñ╛ αñ¬αñ╡αñ┐αññαÑìαñ░ αñùαÑüαñ«αÑìαñ¼αñ╛αñ╣αñ░αÑé',
    monasteryShowcaseSubtitle: 'αñ╣αñ┐αñ«αñ╛αñ▓αñ»αÑÇ αñ¬αñ░αñ┐αñªαÑâαñ╢αÑìαñ»αñ«αñ╛ αñ¼αñ╕αÑçαñòαñ╛ αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ¼αÑîαñªαÑìαñº αñùαÑüαñ«αÑìαñ¼αñ╛αñ╣αñ░αÑéαñòαÑï αñàαñ¿αÑìαñ╡αÑçαñ╖αñú αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
    exploreMonastery: 'αñùαÑüαñ«αÑìαñ¼αñ╛αñòαÑï αñàαñ¿αÑìαñ╡αÑçαñ╖αñú αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
    spiritualExperiences: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñàαñ¿αÑüαñ¡αñ╡αñ╣αñ░αÑé αñ░ αñ╕αÑìαñÑαñ╛αñ¿αÑÇαñ» αñ╕αñéαñ╕αÑìαñòαÑâαññαñ┐',
    spiritualExperiencesSubtitle: 'αñ¬αÑìαñ░αñ╛αñ«αñ╛αñúαñ┐αñò αñ¼αÑîαñªαÑìαñº αñàαñ¡αÑìαñ»αñ╛αñ╕αñ╣αñ░αÑé αñ░ αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αÑÇ αñ╕αñéαñ╕αÑìαñòαÑâαññαñ┐αñ«αñ╛ αñåαñ½αÑéαñ▓αñ╛αñê αñíαÑüαñ¼αñ╛αñëαñ¿αÑüαñ╣αÑïαñ╕αÑì',
    bookExperience: 'αñàαñ¿αÑüαñ¡αñ╡ αñ¼αÑüαñò αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
    buddhist: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñ«αñ╛ αñ¼αÑîαñªαÑìαñº αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñ╣αñ░αÑé',
    buddhistSubtitle: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαÑï αñ╕αñ«αÑâαñªαÑìαñº αñ¼αÑîαñªαÑìαñº αñ╕αñ«αÑìαñ¬αñªαñ╛ αñ░ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñàαñ¡αÑìαñ»αñ╛αñ╕αñ╣αñ░αÑéαñòαÑï αñ¼αñ╛αñ░αÑçαñ«αñ╛ αñ£αñ╛αñ¿αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
    routePlanner: 'αñùαÑüαñ«αÑìαñ¼αñ╛ αñ«αñ╛αñ░αÑìαñù αñ»αÑïαñ£αñ¿αñ╛αñòαñ╛αñ░',
    routePlannerSubtitle: 'αñ╕αñ╛αñ░αñÑαÑÇαñòαÑï αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñ¿αñ«αñ╛ αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñ¡αñ░αñ┐ αññαñ¬αñ╛αñêαñéαñòαÑï αñùαÑüαñ«αÑìαñ¼αñ╛ αññαÑÇαñ░αÑìαñÑαñ»αñ╛αññαÑìαñ░αñ╛ αñ«αñ╛αñ░αÑìαñùαñòαÑï αñ»αÑïαñ£αñ¿αñ╛ αñ¼αñ¿αñ╛αñëαñ¿αÑüαñ╣αÑïαñ╕αÑì',
    interactiveMap: 'αñàαñ¿αÑìαññαñ░αñòαÑìαñ░αñ┐αñ»αñ╛αññαÑìαñ«αñò αñùαÑüαñ«αÑìαñ¼αñ╛ αñ¿αñòαÑìαñ╕αñ╛',
    generateItinerary: 'αñ╕αñ╛αñ░αñÑαÑÇαñ╕αñüαñù αñ»αñ╛αññαÑìαñ░αñ╛ αñòαñ╛αñ░αÑìαñ»αñòαÑìαñ░αñ« αñ¼αñ¿αñ╛αñëαñ¿αÑüαñ╣αÑïαñ╕αÑì',
    saarthiGreeting: "αñ¿αñ«αñ╕αÑìαññαÑç! αñ« αñ╕αñ╛αñ░αñÑαÑÇ αñ╣αÑüαñü, αññαñ¬αñ╛αñêαñéαñòαÑï αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñòαÑñ αñåαñ£ αññαñ¬αñ╛αñêαñé αñòαÑüαñ¿ αñùαÑüαñ«αÑìαñ¼αñ╛αñòαÑï αñàαñ¿αÑìαñ╡αÑçαñ╖αñú αñùαñ░αÑìαñ¿ αñÜαñ╛αñ╣αñ¿αÑüαñ╣αÑüαñ¿αÑìαñ¢?",
    chatWithSaarthi: 'αñ╕αñ╛αñ░αñÑαÑÇαñ╕αñüαñù αñòαÑüαñ░αñ╛ αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì!',
    spiritualGuide: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñò',
    askAbout: 'αñùαÑüαñ«αÑìαñ¼αñ╛αñ╣αñ░αÑé, αñºαÑìαñ»αñ╛αñ¿αñòαÑï αñ¼αñ╛αñ░αÑçαñ«αñ╛ αñ╕αÑïαñºαÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì...',
    about: {
      title: 'αñÿαÑüαñ«αÑìαñ«αÑï αñçαñ¿αÑìαñíαñ┐αñ»αñ╛αñòαÑï αñ¼αñ╛αñ░αÑçαñ«αñ╛',
      subtitle: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαÑï αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ╕αñ«αÑìαñ¬αñªαñ╛αñòαÑï αññαñ¬αñ╛αñêαñéαñòαÑï αñóαÑïαñòαñ╛',
      description: 'αñÿαÑüαñ«αÑìαñ«αÑï αñçαñ¿αÑìαñíαñ┐αñ»αñ╛ αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαÑï αñ¬αñ╡αñ┐αññαÑìαñ░ αñ¼αÑîαñªαÑìαñº αñ╕αñ«αÑìαñ¬αñªαñ╛αñ▓αñ╛αñê αñ╕αñéαñ░αñòαÑìαñ╖αñú αñ░ αñ╕αñ╛αñ¥αÑçαñªαñ╛αñ░αÑÇ αñùαñ░αÑìαñ¿ αñ╕αñ«αñ░αÑìαñ¬αñ┐αññ αñ¢αÑñ αñ╣αñ╛αñ«αÑÇ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñûαÑïαñ£αÑÇαñ╣αñ░αÑéαñ▓αñ╛αñê αñ╕αÑìαñÑαñ╛αñ¿αÑÇαñ» αñ£αÑìαñ₧αñ╛αñ¿ αñ░ αñ╢αññαñ╛αñ¼αÑìαñªαÑÇαñ»αÑîαñé αñ¬αÑüαñ░αñ╛αñ¿αÑï αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñ╣αñ░αÑéαñªαÑìαñ╡αñ╛αñ░αñ╛ αñ¿αñ┐αñ░αÑìαñªαÑçαñ╢αñ┐αññ αñ¬αÑìαñ░αñ╛αñ«αñ╛αñúαñ┐αñò αñùαÑüαñ«αÑìαñ¼αñ╛ αñàαñ¿αÑüαñ¡αñ╡αñ╣αñ░αÑéαñ╕αñüαñù αñ£αÑïαñíαÑìαñ¢αÑîαñéαÑñ',
      mission: 'αñ╣αñ╛αñ«αÑìαñ░αÑï αñ«αñ┐αñ╢αñ¿',
      missionText: 'αñ»αÑÇ αñ¬αñ╡αñ┐αññαÑìαñ░ αñ╕αÑìαñÑαñ╛αñ¿αñ╣αñ░αÑéαñòαÑï αñ¬αñ╡αñ┐αññαÑìαñ░αññαñ╛ αñ░ αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñ╣αñ░αÑéαñ▓αñ╛αñê αñ╕αñéαñ░αñòαÑìαñ╖αñú αñùαñ░αÑìαñªαÑê αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαñ╛ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñûαñ£αñ╛αñ¿αñ╛αñ╣αñ░αÑéαñ▓αñ╛αñê αñ╕αñ¼αÑê αñûαÑïαñ£αÑÇαñ╣αñ░αÑéαñòαñ╛ αñ▓αñ╛αñùαñ┐ αñ¬αñ╣αÑüαñüαñÜαñ»αÑïαñùαÑìαñ» αñ¼αñ¿αñ╛αñëαñ¿αÑüαÑñ',
      vision: 'αñ╣αñ╛αñ«αÑìαñ░αÑï αñªαÑâαñ╖αÑìαñƒαñ┐αñòαÑïαñú',
      visionText: 'αñÅαñò αñ╕αñéαñ╕αñ╛αñ░ αñ£αñ╣αñ╛αñü αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ£αÑìαñ₧αñ╛αñ¿αñ▓αÑç αñåαñºαÑüαñ¿αñ┐αñò αñåαññαÑìαñ«αñ╛αñ╣αñ░αÑéαñ▓αñ╛αñê αñ╢αñ╛αñ¿αÑìαññαñ┐, αñòαñ░αÑüαñúαñ╛ αñ░ αñ£αÑìαñ₧αñ╛αñ¿αññαñ░αÑìαñ½ αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñ¿ αñùαñ░αÑìαñ¢αÑñ',
      values: 'αñ╣αñ╛αñ«αÑìαñ░αñ╛ αñ«αÑéαñ▓αÑìαñ»αñ╣αñ░αÑé',
      valuesText: 'αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñòαÑï αñ╕αñ«αÑìαñ«αñ╛αñ¿, αñ¬αÑìαñ░αñ╛αñ«αñ╛αñúαñ┐αñò αñàαñ¿αÑüαñ¡αñ╡αñ╣αñ░αÑé, αñªαñ┐αñùαÑï αñ¬αñ░αÑìαñ»αñƒαñ¿, αñ░ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ╡αñ┐αñòαñ╛αñ╕αÑñ',
      team: 'αñ╣αñ╛αñ«αÑìαñ░αÑï αñƒαÑïαñ▓αÑÇ',
      teamText: 'αñ╕αÑìαñÑαñ╛αñ¿αÑÇαñ» αñùαñ╛αñçαñíαñ╣αñ░αÑé, αñ¼αÑîαñªαÑìαñº αñ╡αñ┐αñªαÑìαñ╡αñ╛αñ¿αñ╣αñ░αÑé, αñ░ αñ»αñ╛αññαÑìαñ░αñ╛ αñ╡αñ┐αñ╢αÑçαñ╖αñ£αÑìαñ₧αñ╣αñ░αÑé αñàαñ░αÑìαñÑαñ¬αÑéαñ░αÑìαñú αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛αñ╣αñ░αÑé αñ╕αñ┐αñ░αÑìαñ£αñ¿αñ╛ αñùαñ░αÑìαñ¿ αñ╕αñüαñùαÑê αñòαñ╛αñ« αñùαñ░αñ┐αñ░αñ╣αÑçαñòαñ╛ αñ¢αñ¿αÑìαÑñ'
    },
    contact: {
      title: 'αñ╕αñ«αÑìαñ¬αñ░αÑìαñò αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
      subtitle: 'αñåαñ£ αñ¿αÑê αññαñ¬αñ╛αñêαñéαñòαÑï αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛ αñ╕αÑüαñ░αÑü αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
      getInTouch: 'αñ╕αñ«αÑìαñ¬αñ░αÑìαñòαñ«αñ╛ αñ░αñ╣αñ¿αÑüαñ╣αÑïαñ╕αÑì',
      address: 'αñáαÑçαñùαñ╛αñ¿αñ╛',
      addressText: 'αñùαñéαñùαñƒαÑïαñò, αñ╕αñ┐αñòαÑìαñòαñ┐αñ« 737101, αñ¡αñ╛αñ░αññ',
      phone: 'αñ½αÑïαñ¿',
      phoneText: '+91 8650882398',
      email: 'αñçαñ«αÑçαñ▓',
      emailText: 'namaste@ghoomo.india',
      hours: 'αñòαñ╛αñ░αÑìαñ»αñ╛αñ▓αñ» αñ╕αñ«αñ»',
      hoursText: 'αñ╕αÑïαñ« - αñ╢αñ¿αñ┐: αñ¼αñ┐αñ╣αñ╛αñ¿ 9:00 - αñ╕αñ╛αñüαñ¥ 6:00',
      sendMessage: 'αñ╕αñ¿αÑìαñªαÑçαñ╢ αñ¬αñáαñ╛αñëαñ¿αÑüαñ╣αÑïαñ╕αÑì',
      name: 'αññαñ¬αñ╛αñêαñéαñòαÑï αñ¿αñ╛αñ«',
      subject: 'αñ╡αñ┐αñ╖αñ»',
      message: 'αññαñ¬αñ╛αñêαñéαñòαÑï αñ╕αñ¿αÑìαñªαÑçαñ╢',
      submit: 'αñ╕αñ¿αÑìαñªαÑçαñ╢ αñ¬αñáαñ╛αñëαñ¿αÑüαñ╣αÑïαñ╕αÑì'
    },
    bookingModal: {
      title: 'αññαñ¬αñ╛αñêαñéαñòαÑï αñàαñ¿αÑüαñ¡αñ╡ αñ¼αÑüαñò αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
      selectDate: 'αñ«αñ┐αññαñ┐ αñ¢αñ╛αñ¿αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
      selectTime: 'αñ╕αñ«αñ» αñ¢αñ╛αñ¿αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
      participants: 'αñ╕αñ╣αñ¡αñ╛αñùαÑÇαñ╣αñ░αÑéαñòαÑï αñ╕αñéαñûαÑìαñ»αñ╛',
      specialRequests: 'αñ╡αñ┐αñ╢αÑçαñ╖ αñàαñ¿αÑüαñ░αÑïαñºαñ╣αñ░αÑé',
      totalCost: 'αñòαÑüαñ▓ αñ▓αñ╛αñùαññ',
      bookNow: 'αñàαñ╣αñ┐αñ▓αÑç αñ¼αÑüαñò αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
      close: 'αñ¼αñ¿αÑìαñª αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì'
    },
    monasteryModal: {
      history: 'αñçαññαñ┐αñ╣αñ╛αñ╕',
      traditions: 'αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñ╣αñ░αÑé',
      visitingHours: 'αñ¡αÑìαñ░αñ«αñú αñ╕αñ«αñ»',
      location: 'αñ╕αÑìαñÑαñ╛αñ¿',
      nearbyAttractions: 'αñ¿αñ£αñ┐αñòαñòαñ╛ αñåαñòαñ░αÑìαñ╖αñúαñ╣αñ░αÑé',
      close: 'αñ¼αñ¿αÑìαñª αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì'
    },
    itineraryResult: {
      title: 'αññαñ¬αñ╛αñêαñéαñòαÑï αñ¬αñ╡αñ┐αññαÑìαñ░ αñ»αñ╛αññαÑìαñ░αñ╛ αñòαñ╛αñ░αÑìαñ»αñòαÑìαñ░αñ«',
      generatedBy: 'αñ╕αñ╛αñ░αñÑαÑÇαñªαÑìαñ╡αñ╛αñ░αñ╛ αññαñ»αñ╛αñ░ αñùαñ░αñ┐αñÅαñòαÑï',
      day: 'αñªαñ┐αñ¿',
      close: 'αñ¼αñ¿αÑìαñª αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì'
    },
    footer: {
      description: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαñ╛ αñ¬αñ╡αñ┐αññαÑìαñ░ αñùαÑüαñ«αÑìαñ¼αñ╛αñ╣αñ░αÑé αñ░ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ╕αñ«αÑìαñ¬αñªαñ╛αñòαÑï αñûαÑïαñ£ αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑìαÑñ αñ╣αñ┐αñ«αñ╛αñ▓αñ»αñ«αñ╛ αñ¼αÑîαñªαÑìαñº αñ£αÑìαñ₧αñ╛αñ¿αñòαñ╛ αñ▓αñ╛αñùαñ┐ αññαñ¬αñ╛αñêαñéαñòαÑï αñ«αñ╛αñ░αÑìαñùαñªαñ░αÑìαñ╢αñòαÑñ',
      sacredPlaces: 'αñ¬αñ╡αñ┐αññαÑìαñ░ αñ╕αÑìαñÑαñ╛αñ¿αñ╣αñ░αÑé',
      support: 'αñ╕αñ╣αñ»αÑïαñù',
      connect: 'αñ£αñíαñ╛αñ¿',
      followUs: 'αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ¬αÑìαñ░αÑçαñ░αñúαñ╛αñòαñ╛ αñ▓αñ╛αñùαñ┐ αñ╣αñ╛αñ«αÑÇαñ▓αñ╛αñê αñ½αñ▓αÑï αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì',
      copyright: '┬⌐ 2025 αñÿαÑüαñ«αÑìαñ«αÑï αñçαñ¿αÑìαñíαñ┐αñ»αñ╛αÑñ αñ╕αñ¼αÑê αñàαñºαñ┐αñòαñ╛αñ░ αñ╕αÑüαñ░αñòαÑìαñ╖αñ┐αññαÑñ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñûαÑïαñ£αÑÇαñ╣αñ░αÑéαñòαñ╛ αñ▓αñ╛αñùαñ┐ ≡ƒÖÅ αñ╕αñüαñù αñ¼αñ¿αñ╛αñçαñÅαñòαÑïαÑñ',
      tourPackages: {
        title: 'αñƒαÑéαñ░ αñ¬αÑìαñ»αñ╛αñòαÑçαñ£αñ╣αñ░αÑé',
        subtitle: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ« αñƒαÑìαñ░αÑçαñ▓αÑìαñ╕αñòαÑï αñ£αñ╛αñªαÑé αñ╣αñ╛αñ«αÑìαñ░αÑï αñòαÑìαñ»αÑüαñ░αÑçαñƒ αñùαñ░αñ┐αñÅαñòαÑï αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ░ αñ╕αñ╛αñ╣αñ╕αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛αñ╣αñ░αÑéαñòαÑï αñ╕αñ╛αñÑ αñ¬αññαÑìαññαñ╛ αñ▓αñùαñ╛αñëαñ¿αÑüαñ╣αÑïαñ╕αÑìαÑñ',
        basic: {
          title: 'αñåαñºαñ╛αñ░αñ¡αÑéαññ αñ¬αÑìαñ»αñ╛αñòαÑçαñ£',
          duration: 'αÑ⌐ αñªαñ┐αñ¿ / αÑ¿ αñ░αñ╛αññ',
          services: ['αñ¼αñ£αÑçαñƒ αñ╣αÑïαñƒαñ▓ αñ¼αñ╕αñ╛αñê', 'αñ╕αÑìαñÑαñ╛αñ¿αÑÇαñ» αñ¡αÑìαñ░αñ«αñú (αñùαñéαñùαñƒαÑïαñò)', 'αñ╕αñ╛αñ¥αñ╛ αñ»αñ╛αññαñ╛αñ»αñ╛αññ', 'αñûαñ╛αñ¿αñ╛ αñ╕αñ«αñ╛αñ╡αÑçαñ╢ αñ¢αÑêαñ¿']
        },
        premium: {
          title: 'αñ¬αÑìαñ░αñ┐αñ«αñ┐αñ»αñ« αñ¬αÑìαñ»αñ╛αñòαÑçαñ£',
          duration: 'αÑ½ αñªαñ┐αñ¿ / αÑ¬ αñ░αñ╛αññ',
          services: ['αÑ⌐-αññαñ╛αñ░αÑç αñ╣αÑïαñƒαñ▓ αñ¼αñ╕αñ╛αñê', 'αñùαñéαñùαñƒαÑïαñò + αñ¢αÑïαñùαÑü αññαñ╛αñ▓ + αñ¼αñ╛αñ¼αñ╛ αñ«αñ¿αÑìαñªαñ┐αñ░', 'αñ¼αñ┐αñ╣αñ╛αñ¿αñòαÑï αñûαñ╛αñ£αñ╛ αñ░ αñ¼αÑçαñ▓αÑüαñòαñ╛αñòαÑï αñûαñ╛αñ¿αñ╛ αñ╕αñ«αñ╛αñ╡αÑçαñ╢', 'αñ¿αñ┐αñ£αÑÇ/αñ╕αñ╛αñ¥αñ╛ αñ»αñ╛αññαñ╛αñ»αñ╛αññ', 'αñùαñ╛αñçαñíαÑçαñí αñƒαÑüαñ░αñ╣αñ░αÑé']
        },
        luxury: {
          title: 'αñ▓αñòαÑìαñ£αñ░αÑÇ αñ¬αÑìαñ»αñ╛αñòαÑçαñ£',
          duration: 'αÑ¡ αñªαñ┐αñ¿ / αÑ¼ αñ░αñ╛αññ',
          services: ['αÑ½-αññαñ╛αñ░αÑç αñ╣αÑïαñƒαñ▓ / αñ░αñ┐αñ╕αÑïαñ░αÑìαñƒ αñ¼αñ╕αñ╛αñê', 'αñùαñéαñùαñƒαÑïαñò + αñëαññαÑìαññαñ░ αñ╕αñ┐αñòαÑìαñòαñ┐αñ« (αñ▓αñ╛αñÜαÑüαñÖ, αñ»αÑüαñ«αñÑαñ╛αñÖ)', 'αñ╕αñ¼αÑê αñûαñ╛αñ¿αñ╛ αñ╕αñ«αñ╛αñ╡αÑçαñ╢', 'αñ¿αñ┐αñ£αÑÇ αñòαÑìαñ»αñ╛αñ¼ αñ░ αñ╡αÑìαñ»αñòαÑìαññαñ┐αñùαññ αñùαñ╛αñçαñí', 'αñ¬αÑìαñ░αñ╛αñÑαñ«αñ┐αñòαññαñ╛ αñ¼αÑüαñòαñ┐αñéαñù αñ░ VIP αñàαñ¿αÑüαñ¡αñ╡']
        },
        safetySection: {
          title: 'αñ╕αÑüαñ░αñòαÑìαñ╖αñ╛ αñ░ αñƒαÑìαñ░αÑìαñ»αñ╛αñòαñ┐αñÖ αñ¬αÑìαñ░αñúαñ╛αñ▓αÑÇ',
          description: "αññαñ¬αñ╛αñêαñéαñòαÑï αñ╕αÑüαñ░αñòαÑìαñ╖αñ╛ αñ╣αñ╛αñ«αÑìαñ░αÑï αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ¬αÑìαñ░αññαñ┐αñ¼αñªαÑìαñºαññαñ╛ αñ╣αÑïαÑñ αñ╣αñ╛αñ«αÑÇαñ▓αÑç αñ¬αÑìαñ░αññαÑìαñ»αÑçαñò αñ»αñ╛αññαÑìαñ░αÑÇαñ▓αñ╛αñê αÑ¿αÑ¬/αÑ¡ αñ╕αÑüαñ░αñòαÑìαñ╖αñ┐αññ αñ░αñ╛αñûαÑìαñ¿αñòαÑï αñ▓αñ╛αñùαñ┐ αñÅαñëαñƒαñ╛ αñ¼αñ▓αñ┐αñ»αÑï αñíαñ┐αñ£αñ┐αñƒαñ▓ αñ¬αÑéαñ░αÑìαñ╡αñ╛αñºαñ╛αñ░ αñ¿αñ┐αñ░αÑìαñ«αñ╛αñú αñùαñ░αÑçαñòαñ╛ αñ¢αÑîαñéαÑñ",
          features: {
            gps: { title: 'αñ¬αÑìαñ░αññαÑìαñ»αñòαÑìαñ╖ GPS αñƒαÑìαñ░αÑìαñ»αñ╛αñòαñ┐αñÖ', desc: 'αñ╡αñ╛αñ╕αÑìαññαñ╡αñ┐αñò-αñ╕αñ«αñ» αñ╕αÑìαñÑαñ╛αñ¿ αñ¿αñ┐αñùαñ░αñ╛αñ¿αÑÇαÑñ' },
            sos: { title: 'αñåαñ¬αññαñòαñ╛αñ▓αÑÇαñ¿ SOS', desc: 'αññαññαÑìαñòαñ╛αñ▓ SOS αñ¬αÑìαñ░αññαñ┐αñòαÑìαñ░αñ┐αñ»αñ╛αÑñ' },
            support: { title: 'αÑ¿αÑ¬/αÑ¡ αñ╕αñ«αñ░αÑìαñÑαñ¿', desc: 'αñ╕αñ«αñ░αÑìαñ¬αñ┐αññ αñ╕αñ╣αñ╛αñ»αññαñ╛ αñƒαÑïαñ▓αÑÇαÑñ' },
            partners: { title: 'αñ¬αÑìαñ░αñ«αñ╛αñúαñ┐αññ αñ╕αñ╛αñ¥αÑçαñªαñ╛αñ░αñ╣αñ░αÑé', desc: 'αñòαñíαñ╛ αñ░αÑéαñ¬αñ«αñ╛ αñ£αñ╛αñüαñÜ αñùαñ░αñ┐αñÅαñòαñ╛ αñÜαñ╛αñ▓αñò αñ░ αñùαñ╛αñçαñíαñ╣αñ░αÑéαÑñ' }
          }
        }
      }
    },
    monasteries: {
      rumtek: {
        name: 'αñ░αÑüαñ«αñƒαÑçαñò αñùαÑüαñ«αÑìαñ¼αñ╛',
        description: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαÑï αñ╕αñ¼αÑêαñ¡αñ¿αÑìαñªαñ╛ αñáαÑéαñ▓αÑï αñùαÑüαñ«αÑìαñ¼αñ╛, αñòαñ░αÑìαñ«αñ╛αñ¬αñ╛αñòαÑï αñùαñªαÑìαñªαÑÇ',
        history: '1966 αñ«αñ╛ αñ¿αñ┐αñ░αÑìαñ«αñ┐αññ, αñ░αÑüαñ«αñƒαÑçαñò αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαÑï αñ╕αñ¼αÑêαñ¡αñ¿αÑìαñªαñ╛ αñáαÑéαñ▓αÑï αñùαÑüαñ«αÑìαñ¼αñ╛ αñ╣αÑï αñ░ αñòαñ░αÑìαñ«αñ╛ αñòαñùαÑìαñ»αÑé αñ╡αñéαñ╢αñòαÑï αñ«αÑüαñûαÑìαñ» αñùαñªαÑìαñªαÑÇ αñ╣αÑïαÑñ αñ»αñ╣αñ╛αñü αñ¼αñ╣αÑüαñ«αÑéαñ▓αÑìαñ» αñàαñ╡αñ╢αÑçαñ╖αñ╣αñ░αÑé αñ░ αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ¼αÑîαñªαÑìαñº αñòαñ▓αñ╛αñòαÑâαññαñ┐αñ╣αñ░αÑé αñ¢αñ¿αÑìαÑñ',
        traditions: 'αñòαñ░αÑìαñ«αñ╛ αñòαñùαÑìαñ»αÑé αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñòαÑï αñ¬αñ╛αñ▓αñ¿αñ╛ αñùαñ░αÑìαñ¢ αñ£αñ╕αñ«αñ╛ αñªαÑêαñ¿αñ┐αñò αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛, αñºαÑìαñ»αñ╛αñ¿ αñ╕αññαÑìαñ░αñ╣αñ░αÑé, αñ░ αññαñ┐αñ¼αÑìαñ¼αññαÑÇ αñ¿αñ»αñ╛αñü αñ╡αñ░αÑìαñ╖ αñ╕αñ«αñ╛αñ░αÑïαñ╣ αñ╕αñ╣αñ┐αññ αñ╡αñ╛αñ░αÑìαñ╖αñ┐αñò αñÜαñ╛αñíαñ¬αñ░αÑìαñ╡αñ╣αñ░αÑé αñ╕αñ«αñ╛αñ╡αÑçαñ╢ αñ¢αñ¿αÑìαÑñ',
        hours: 'αñ¼αñ┐αñ╣αñ╛αñ¿ 6:00 - αñ╕αñ╛αñüαñ¥ 6:00',
        location: 'αñùαñéαñùαñƒαÑïαñòαñ¼αñ╛αñƒ 24 αñòαñ┐αñ«αÑÇ',
        attractions: 'αñ╕αÑüαñ¿αñòαÑï αñ╕αÑìαññαÑéαñ¬, αñùαÑüαñ«αÑìαñ¼αñ╛ αñ╕αñéαñùαÑìαñ░αñ╣αñ╛αñ▓αñ», αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛ αñÜαñòαÑìαñ░αñ╣αñ░αÑé'
      },
      namchi: {
    name: 'αñ¿αñ╛αñ«αñÜαÑÇ αñùαÑüαñ«αÑìαñ¼αñ╛',
    description: 'αñªαñòαÑìαñ╖αñ┐αñú αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñ«αñ╛ αñàαñ╡αñ╕αÑìαñÑαñ┐αññ αñÅαñò αñ¬αÑìαñ░αñ╕αñ┐αñªαÑìαñº αñ¼αÑîαñªαÑìαñº αñùαÑüαñ«αÑìαñ¼αñ╛, αñ╢αñ╛αñ¿αÑìαññ αñ╡αñ╛αññαñ╛αñ╡αñ░αñú αñ░ αñùαÑüαñ░αÑü αñ¬αñªαÑìαñ«αñ╕αñ«αÑìαñ¡αñ╡αñòαÑï αñ╡αñ┐αñ╢αñ╛αñ▓ αñ«αÑéαñ░αÑìαññαñ┐αñòαñ╛ αñ▓αñ╛αñùαñ┐ αñ¬αÑìαñ░αñ╕αñ┐αñªαÑìαñºαÑñ',
    history: 'αñùαÑüαñ░αÑü αñ¬αñªαÑìαñ«αñ╕αñ«αÑìαñ¡αñ╡αñòαñ╛ αñ╢αñ┐αñòαÑìαñ╖αñ╛αñ╣αñ░αÑéαñòαÑï αñ╕αñéαñ░αñòαÑìαñ╖αñú αñ░ αñ¼αÑîαñªαÑìαñº αñºαñ░αÑìαñ«αñòαÑï αñ¬αÑìαñ░αñÜαñ╛αñ░αñòαñ╛ αñ▓αñ╛αñùαñ┐ αñ╕αÑìαñÑαñ╛αñ¬αñ¿αñ╛ αñùαñ░αñ┐αñÅαñòαÑï αñ»αÑï αñùαÑüαñ«αÑìαñ¼αñ╛ αñªαñòαÑìαñ╖αñ┐αñú αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαÑï αñÅαñò αñ«αñ╣αññαÑìαñ╡αñ¬αÑéαñ░αÑìαñú αñºαñ╛αñ░αÑìαñ«αñ┐αñò αñ░ αñ╕αñ╛αñéαñ╕αÑìαñòαÑâαññαñ┐αñò αñòαÑçαñ¿αÑìαñªαÑìαñ░ αñ╣αÑïαÑñ',
    traditions: 'αñ»αñ╣αñ╛αñü αñ╡αñ╛αñ░αÑìαñ╖αñ┐αñò αñ¼αÑîαñªαÑìαñº αñ¬αñ░αÑìαñ╡αñ╣αñ░αÑé, αñ¬αñ╛αñ░αñ«αÑìαñ¬αñ░αñ┐αñò αñ¢αñ╛αñ« αñ¿αÑâαññαÑìαñ» αñ░ αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛ αñ╕αñ¡αñ╛αñ╣αñ░αÑé αñåαñ»αÑïαñ£αñ¿αñ╛ αñùαñ░αñ┐αñ¿αÑìαñ¢αñ¿αÑì, αñ£αñ╣αñ╛αñü αñ╡αñ┐αñ¡αñ┐αñ¿αÑìαñ¿ αñ╕αÑìαñÑαñ╛αñ¿αñ¼αñ╛αñƒ αñ¡αñòαÑìαññαñ£αñ¿ αñåαñëαñüαñ¢αñ¿αÑìαÑñ',
    hours: 'αñ¼αñ┐αñ╣αñ╛αñ¿ αÑ«:αÑªαÑª - αñ¼αÑçαñ▓αÑüαñòαÑÇ αÑ¼:αÑªαÑª',
    location: 'αñ¿αñ╛αñ«αñÜαÑÇ, αñªαñòαÑìαñ╖αñ┐αñú αñ╕αñ┐αñòαÑìαñòαñ┐αñ«',
    attractions: 'αÑºαÑ⌐αÑ½ αñ½αñ┐αñƒ αñàαñùαÑìαñ▓αÑï αñùαÑüαñ░αÑü αñ¬αñªαÑìαñ«αñ╕αñ«αÑìαñ¡αñ╡αñòαÑï αñ«αÑéαñ░αÑìαññαñ┐, αñ╕αÑïαñ▓αÑïαñ½αÑïαñò αñ¢αÑïαñ░αÑìαññαÑçαñ¿, αñ░ αñ╣αñ┐αñ«αñ╛αñ▓αñ»αñòαñ╛ αñ«αñ¿αÑïαñ░αñ« αñªαÑâαñ╢αÑìαñ»αñ╣αñ░αÑé'
},
      tashiding: {
        name: 'αññαñ╛αñ╢αñ┐αñªαñ┐αñÖ αñùαÑüαñ«αÑìαñ¼αñ╛',
        description: 'αñªαÑüαñê αñ¿αñªαÑÇαñ╣αñ░αÑéαñòαÑï αñ¼αÑÇαñÜαñ«αñ╛ αñ¬αñ╣αñ╛αñíαñ«αñ╛ αñ¬αñ╡αñ┐αññαÑìαñ░ αñùαÑüαñ«αÑìαñ¼αñ╛',
        history: '1717 αñ«αñ╛ αñ╕αÑìαñÑαñ╛αñ¬αñ┐αññ, αññαñ╛αñ╢αñ┐αñªαñ┐αñÖαñòαÑï αñàαñ░αÑìαñÑ "αñ╕αñ«αñ░αÑìαñ¬αñ┐αññ αñòαÑçαñ¿αÑìαñªαÑìαñ░αÑÇαñ» αñùαÑîαñ░αñ╡" αñ╣αÑï αñ░ αñ»αñ╕αñ▓αñ╛αñê αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαñ╛ αñ╕αñ¼αÑêαñ¡αñ¿αÑìαñªαñ╛ αñ¬αñ╡αñ┐αññαÑìαñ░ αñùαÑüαñ«αÑìαñ¼αñ╛αñ╣αñ░αÑé αñ«αñºαÑìαñ»αÑç αñÅαñò αñ«αñ╛αñ¿αñ┐αñ¿αÑìαñ¢αÑñ',
        traditions: 'αñ¼αÑüαñ«αñÜαÑü αñ╕αñ«αñ╛αñ░αÑïαñ╣αñòαñ╛ αñ▓αñ╛αñùαñ┐ αñ¬αÑìαñ░αñ╕αñ┐αñªαÑìαñº αñ£αñ╣αñ╛αñü αñ¡αñòαÑìαññαñ╣αñ░αÑéαñ▓αñ╛αñê αñ¬αñ╡αñ┐αññαÑìαñ░ αñ¬αñ╛αñ¿αÑÇ αñ╡αñ┐αññαñ░αñú αñùαñ░αñ┐αñ¿αÑìαñ¢, αñ£αñ╕αñ▓αÑç αñåαñëαñ¿αÑç αñ╡αñ░αÑìαñ╖αñòαÑï αñ¡αñ╡αñ┐αñ╖αÑìαñ»αñ╡αñ╛αñúαÑÇ αñùαñ░αÑìαñ¢ αñ¡αñ¿αÑìαñ¿αÑç αñ╡αñ┐αñ╢αÑìαñ╡αñ╛αñ╕ αñùαñ░αñ┐αñ¿αÑìαñ¢αÑñ',
        hours: 'αñ¼αñ┐αñ╣αñ╛αñ¿ 6:00 - αñ╕αñ╛αñüαñ¥ 6:00',
        location: 'αñ░αñÖαÑìαñùαñ┐αññ αñ░ αñ░αñÑαÑïαñÖ αñ¿αñªαÑÇαñ╣αñ░αÑéαñòαÑï αñ¼αÑÇαñÜαñ«αñ╛',
        attractions: 'αñ¬αñ╡αñ┐αññαÑìαñ░ αñ¼αÑüαñ«αñÜαÑü αñòαñ▓αñ╢, αñÜαÑïαñ░αÑìαññαÑçαñ¿αñ╣αñ░αÑé, αñ¿αñªαÑÇ αñ╕αñéαñùαñ« αñªαÑâαñ╢αÑìαñ»αñ╣αñ░αÑé'
      },
      enchey: {
        name: 'αñÅαñ¿αÑìαñÜαÑç αñùαÑüαñ«αÑìαñ¼αñ╛',
        description: 'αñùαñéαñùαñƒαÑïαñòαñ▓αñ╛αñê αñ╣αÑçαñ░αÑìαñ¿αÑç αñ╕αÑüαñ¿αÑìαñªαñ░ αñùαÑüαñ«αÑìαñ¼αñ╛',
        history: '1909 αñ«αñ╛ αñ¿αñ┐αñ░αÑìαñ«αñ┐αññ, αñÅαñ¿αÑìαñÜαÑçαñòαÑï αñàαñ░αÑìαñÑ "αñÅαñòαñ╛αñ¿αÑìαññ αñ«αñ¿αÑìαñªαñ┐αñ░" αñ╣αÑï αñ░ αñ»αñ╕αñòαÑï αñ╕αÑìαñÑαñ╛αñ¬αñ¿αñ╛ αñ▓αñ╛αñ«αñ╛ αñªαÑìαñ░αÑüαñ¬αÑìαññαÑïαñ¼ αñòαñ╛αñ░αÑìαñ¬αÑïαñ▓αÑç αñùαñ░αÑçαñòαñ╛ αñÑαñ┐αñÅ αñ£αñ╕αñ▓αñ╛αñê αñëαñíαÑìαñ¿αÑç αñ╢αñòαÑìαññαñ┐ αñ¡αñÅαñòαÑï αñ╡αñ┐αñ╢αÑìαñ╡αñ╛αñ╕ αñùαñ░αñ┐αñ¿αÑìαñÑαÑìαñ»αÑïαÑñ',
        traditions: 'αñ¿αÑìαñ»αñ┐αñÖαñ«αñ╛ αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñòαÑï αñ╕αñ╛αñÑ αñ╡αñ╛αñ░αÑìαñ╖αñ┐αñò αñ¢αñ« αñ¿αÑâαññαÑìαñ» αñ¬αÑìαñ░αñªαñ░αÑìαñ╢αñ¿αñ╣αñ░αÑé αñ░ αñùαñéαñùαñƒαÑïαñò αñ╢αñ╣αñ░αñòαÑï αñ╕αÑüαñ░αñòαÑìαñ╖αñ╛αñòαñ╛ αñ▓αñ╛αñùαñ┐ αñ╡αñ┐αñ╢αÑçαñ╖ αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛αñ╣αñ░αÑéαÑñ',
        hours: 'αñ¼αñ┐αñ╣αñ╛αñ¿ 6:00 - αñ╕αñ╛αñüαñ¥ 6:00',
        location: 'αñùαñéαñùαñƒαÑïαñò, αñ¬αÑéαñ░αÑìαñ╡αÑÇ αñ╕αñ┐αñòαÑìαñòαñ┐αñ«',
        attractions: 'αñ╢αñ╣αñ░αñòαñ╛ αñªαÑâαñ╢αÑìαñ»αñ╣αñ░αÑé, αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛ αñ¥αñúαÑìαñíαñ╛αñ╣αñ░αÑé, αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñùαññ αñ╡αñ╛αñ╕αÑìαññαÑüαñòαñ▓αñ╛'
      },
      dubdi: {
        name: 'αñªαÑüαñ¼αÑìαñªαÑÇ αñùαÑüαñ«αÑìαñ¼αñ╛',
        description: 'αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñ«αñ╛ αñ¿αñ┐αñ░αÑìαñ«αñ┐αññ αñ¬αñ╣αñ┐αñ▓αÑï αñùαÑüαñ«αÑìαñ¼αñ╛',
        history: '1701 αñ«αñ╛ αñÜαÑìαñ»αÑïαñùαÑìαñ»αñ╛αñ▓ αñ¿αñ╛αñ«αñùαÑìαñ»αñ╛αñ▓αñ▓αÑç αñ╕αÑìαñÑαñ╛αñ¬αñ¿αñ╛ αñùαñ░αÑçαñòαÑï, αñªαÑüαñ¼αÑìαñªαÑÇ αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαÑï αñ╕αñ¼αÑêαñ¡αñ¿αÑìαñªαñ╛ αñ¬αÑüαñ░αñ╛αñ¿αÑï αñùαÑüαñ«αÑìαñ¼αñ╛ αñ╣αÑï αñ░ αñ»αñ╕ αñòαÑìαñ╖αÑçαññαÑìαñ░αñ«αñ╛ αñ¼αÑîαñªαÑìαñº αñºαñ░αÑìαñ«αñòαÑï αñ╕αÑüαñ░αÑüαñ╡αñ╛αññαñòαÑï αñ¬αÑìαñ░αññαÑÇαñò αñ╣αÑïαÑñ',
        traditions: 'αñ¿αÑìαñ»αñ┐αñÖαñ«αñ╛ αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñ▓αÑç αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñ«αñ╛ αñ▓αÑìαñ»αñ╛αñçαñÅαñòαñ╛ αñ«αÑéαñ▓ αñ╢αñ┐αñòαÑìαñ╖αñ╛αñ╣αñ░αÑéαñ▓αñ╛αñê αñ╕αñéαñ░αñòαÑìαñ╖αñú αñùαñ░αÑìαñ¢, αñ£αñ╕αñ«αñ╛ αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ¬αñ╛αñúαÑìαñíαÑüαñ▓αñ┐αñ¬αñ┐αñ╣αñ░αÑé αñ░ αñàαñ╡αñ╢αÑçαñ╖αñ╣αñ░αÑé αñ¢αñ¿αÑìαÑñ',
        hours: 'αñ¼αñ┐αñ╣αñ╛αñ¿ 7:00 - αñ╕αñ╛αñüαñ¥ 5:00',
        location: 'αñ»αÑüαñòαÑìαñ╕αÑïαñ«, αñ¬αñ╢αÑìαñÜαñ┐αñ« αñ╕αñ┐αñòαÑìαñòαñ┐αñ«',
        attractions: 'αñ¬αÑìαñ░αñ╛αñÜαÑÇαñ¿ αñ¬αñ╛αñúαÑìαñíαÑüαñ▓αñ┐αñ¬αñ┐αñ╣αñ░αÑé, αñÉαññαñ┐αñ╣αñ╛αñ╕αñ┐αñò αñ«αñ╣αññαÑìαñ╡, αñƒαÑìαñ░αÑçαñòαñ┐αñÖ αñƒαÑìαñ░αÑçαñ▓αñ╣αñ░αÑé'
      },
      ralang: {
        name: 'αñ░αñ╛αñ▓αñ╛αñÖ αñùαÑüαñ«αÑìαñ¼αñ╛',
        description: 'αñåαñ½αÑìαñ¿αñ╛ αñ¬αñ╡αñ┐αññαÑìαñ░ αñ¢αñ« αñ¿αÑâαññαÑìαñ» αñ¬αÑìαñ░αñªαñ░αÑìαñ╢αñ¿αñ╣αñ░αÑéαñòαñ╛ αñ▓αñ╛αñùαñ┐ αñ¬αÑìαñ░αñ╕αñ┐αñªαÑìαñº',
        history: '1768 αñ«αñ╛ αñ╕αÑìαñÑαñ╛αñ¬αñ┐αññ, αñ░αñ╛αñ▓αñ╛αñÖ αñùαÑüαñ«αÑìαñ¼αñ╛ αñåαñ½αÑìαñ¿αÑï αñ╡αñ╛αñ░αÑìαñ╖αñ┐αñò αñ¬αñ╛αñÖ αñ▓αÑìαñ╣αñ╛αñ¼αÑìαñ╕αÑïαñ▓ αñÜαñ╛αñí αñ░ αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñùαññ αñ¢αñ« αñ¿αÑâαññαÑìαñ»αñ╣αñ░αÑéαñòαñ╛ αñ▓αñ╛αñùαñ┐ αñ¬αÑìαñ░αñ╕αñ┐αñªαÑìαñº αñ¢αÑñ',
        traditions: 'αñòαñùαÑìαñ»αÑé αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñòαÑï αñ╕αñ╛αñÑ αñ╢αñ╛αñ¿αñªαñ╛αñ░ αñ«αÑüαñûαÑîαñƒαñ╛ αñ¿αÑâαññαÑìαñ» αñÜαñ╛αñíαñ¬αñ░αÑìαñ╡αñ╣αñ░αÑé αñ░ αñûαñ╛αñÖαñÜαÑçαñ¿αÑìαñªαñ£αÑïαñÖαÑìαñùαñ╛ αñ¬αñ░αÑìαñ╡αññαñòαÑï αñ╕αñ«αÑìαñ«αñ╛αñ¿ αñùαñ░αÑìαñ¿αÑç αñ╕αñ«αñ╛αñ░αÑïαñ╣αñ╣αñ░αÑéαÑñ',
        hours: 'αñ¼αñ┐αñ╣αñ╛αñ¿ 6:00 - αñ╕αñ╛αñüαñ¥ 6:00',
        location: 'αñ░αñ╛αñ╡αñ╛αñÖαñ▓αñ╛, αñªαñòαÑìαñ╖αñ┐αñú αñ╕αñ┐αñòαÑìαñòαñ┐αñ«',
        attractions: 'αñ¢αñ« αñ¿αÑâαññαÑìαñ» αñ«αñ₧αÑìαñÜ, αñÜαñ╛αñíαñ¬αñ░αÑìαñ╡ αñ«αÑêαñªαñ╛αñ¿, αñ¬αñ░αÑìαñ╡αññ αñªαÑâαñ╢αÑìαñ»αñ╣αñ░αÑé'
      }
    },
    experiences: {
      meditation: 'αñ░αÑüαñ«αñƒαÑçαñòαñ«αñ╛ αñºαÑìαñ»αñ╛αñ¿ αñ░αñ┐αñƒαÑìαñ░αÑÇαñƒ',
      philosophy: 'αñ¼αÑîαñªαÑìαñº αñªαñ░αÑìαñ╢αñ¿ αñòαñòαÑìαñ╖αñ╛αñ╣αñ░αÑé',
      homestay: 'αñùαÑüαñ«αÑìαñ¼αñ╛ αñ╣αÑïαñ«αñ╕αÑìαñƒαÑç αñàαñ¿αÑüαñ¡αñ╡',
      crafts: 'αñ╣αñ╕αÑìαññαñ¿αñ┐αñ░αÑìαñ«αñ┐αññ αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛ αñÜαñòαÑìαñ░αñ╣αñ░αÑé'
    },
    traditions: {
      nyingma: {
        title: 'αñ¿αÑìαñ»αñ┐αñÖαñ«αñ╛ αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛',
        description: 'αññαñ┐αñ¼αÑìαñ¼αññαÑÇ αñ¼αÑîαñªαÑìαñº αñºαñ░αÑìαñ«αñòαÑï αñ╕αñ¼αÑêαñ¡αñ¿αÑìαñªαñ╛ αñ¬αÑüαñ░αñ╛αñ¿αÑï αñ╕αÑìαñòαÑéαñ▓, αñºαÑìαñ»αñ╛αñ¿ αñ░ αññαñ╛αñ¿αÑìαññαÑìαñ░αñ┐αñò αñàαñ¡αÑìαñ»αñ╛αñ╕αñ╣αñ░αÑéαñ«αñ╛ αñ£αÑïαñí αñªαñ┐αñ¿αÑìαñ¢αÑñ αñ╕αñ┐αñòαÑìαñòαñ┐αñ«αñòαñ╛ αñàαñºαñ┐αñòαñ╛αñéαñ╢ αñùαÑüαñ«αÑìαñ¼αñ╛αñ╣αñ░αÑéαñ▓αÑç αñ»αÑï αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñòαÑï αñ¬αñ╛αñ▓αñ¿αñ╛ αñùαñ░αÑìαñ¢αñ¿αÑìαÑñ'
      },
      kagyu: {
        title: 'αñòαñùαÑìαñ»αÑé αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛',
        description: 'αñºαÑìαñ»αñ╛αñ¿ αñ░ αñ╢αñ┐αñòαÑìαñ╖αñòαñ¼αñ╛αñƒ αñ╡αñ┐αñªαÑìαñ»αñ╛αñ░αÑìαñÑαÑÇαñ▓αñ╛αñê αñ«αÑîαñûαñ┐αñò αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñòαÑï αñ«αñ╛αñºαÑìαñ»αñ«αñ¼αñ╛αñƒ αñ╢αñ┐αñòαÑìαñ╖αñ╛αñ╣αñ░αÑéαñòαÑï αñ¬αÑìαñ░αñ╕αñ╛αñ░αñúαñ«αñ╛ αñ£αÑïαñí αñªαñ┐αñ¿αñòαñ╛ αñ▓αñ╛αñùαñ┐ αñ¬αÑìαñ░αñ╕αñ┐αñªαÑìαñºαÑñ'
      },
      festivals: {
        title: 'αñ¬αñ╡αñ┐αññαÑìαñ░ αñÜαñ╛αñíαñ¬αñ░αÑìαñ╡αñ╣αñ░αÑé',
        description: 'αñ¬αñ░αñ«αÑìαñ¬αñ░αñ╛αñùαññ αñ¢αñ« αñ¿αÑâαññαÑìαñ»αñ╣αñ░αÑé, αñ¬αÑìαñ░αñ╛αñ░αÑìαñÑαñ¿αñ╛αñ╣αñ░αÑé, αñ░ αñ╕αñ╛αñ«αÑüαñªαñ╛αñ»αñ┐αñò αñëαññαÑìαñ╕αñ╡αñ╣αñ░αÑéαñòαÑï αñ╕αñ╛αñÑ αñ░αñéαñùαñ¼αñ┐αñ░αñéαñùαÑÇ αñ¼αÑîαñªαÑìαñº αñÜαñ╛αñíαñ¬αñ░αÑìαñ╡αñ╣αñ░αÑéαñòαÑï αñàαñ¿αÑüαñ¡αñ╡ αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑìαÑñ'
      }
    }
  },
  "α╜áα╜ûα╛▓α╜┤α╜éα╝ïα╜ü": {
    appName: 'α╜éα╛╖α╜┤α╜ÿα╝ïα╜ÿα╜╝α╝ïα╜¿α╜▓α╜ôα╝ïα╜îα╜▓α╝ïα╜í',
    tagline: 'α╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜Üα╜┤',
    heroTitle: 'α╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜Üα╜┤',
    heroSubtitle: 'α╜ºα╜▓α╝ïα╜ÿα╝ïα╜úα╝ïα╜íα╜áα╜▓α╝ïα╜ªα╛Öα╜▓α╜äα╝ïα╜öα╜╝α╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ï α╜óα╛Öα╜▓α╜äα╝ïα╜öα╜áα╜▓α╝ïα╜ñα╜║α╜ªα╝ïα╜óα╜ûα╝ïα╜æα╜äα╝ï α╜₧α╜▓α╝ïα╜ûα╜æα╜║α╜áα╜▓α╝ïα╜ûα╜ªα╜ÿα╝ïα╜éα╜Åα╜ôα╝ï α╜æα╜║α╝ïα╜úα╜ªα╝ï α╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜ûα╛▒α╜äα╝ïα╜åα╜┤α╜ûα╝ïα╜Çα╛▒α╜▓α╝ïα╜Üα╜╝α╜úα╝ïα╜₧α╜▓α╜ûα╝ïα╜áα╜ûα╜æα╝ì',
    beginJourney: 'α╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜áα╜éα╜╝α╝ïα╜ûα╜Öα╜┤α╜éα╜ª',
    exploreMonasteries: 'α╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜Üα╜┤α╝ïα╜Üα╜╝α╜úα╝ïα╜₧α╜▓α╜ûα╝ïα╜áα╜ûα╜æ',
    nav: {
      home: 'α╜üα╛▒α╜▓α╜ÿ',
      monasteries: 'α╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜Üα╜┤',
      spiritualJourney: 'α╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æ',
      traditions: 'α╜ôα╜äα╝ïα╜öα╜áα╜▓α╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ª',
      packages: 'α╜ªα╛Éα╜╝α╜óα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜Éα╜┤α╜ÿα╝ïα╜ªα╛Æα╛▓α╜▓α╜úα╝ì',
      experiences: 'α╜ÿα╛▒α╜╝α╜äα╝ïα╜Üα╜╝α╜ó',
      about: 'α╜äα╝ïα╜ûα╜àα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ªα╛Éα╜╝α╜ó',
      contact: 'α╜áα╜ûα╛▓α╜║α╜úα╝ïα╜û'
    },
    tourPackages: {
      title: 'α╜ªα╛Éα╜╝α╜óα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜Éα╜┤α╜ÿα╝ïα╜ªα╛Æα╛▓α╜▓α╜úα╝ì',
      subtitle: 'α╜äα╝ïα╜ûα╜àα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜æα╜äα╝ïα╜úα╛╖α╜ôα╝ïα╜æα╜┤α╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜úα╜║α╜éα╜ªα╝ïα╜åα╝ïα╜Üα╜┤α╝ïα╜ñα╜║α╜ªα╝ì',
      basic: {
        title: 'α╜éα╜₧α╜▓α╝ïα╜óα╛⌐α╜áα╜▓α╝ïα╜Éα╜┤α╜ÿα╝ïα╜ªα╛Æα╛▓α╜▓α╜úα╝ì',
        duration: 'α╜ëα╜▓α╜ôα╝ïα╜ÿα╝ï α╝ú / α╜òα╛▒α╜▓α╝ïα╜óα╜┤α╝ï α╝ó',
        services: ['α╜ºα╜╝α╝ïα╜èα╜║α╜úα╝ïα╜òα╜╝α╜éα╝ïα╜Üα╜╝α╜æ', 'α╜ªα╝ïα╜éα╜ôα╜ªα╝ïα╜úα╛ƒα╝ïα╜ûα╜ñα╜ú (α╜ªα╛Æα╜äα╝ïα╜Åα╜╝α╜éα╝ï)', 'α╜ÿα╜ëα╜ÿα╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜áα╜üα╜╝α╜ó', 'α╜ûα╜₧α╜║α╜ªα╝ïα╜ªα╛Æα╜╝α╝ïα╜ÿα╜║α╜æ']
      },
      premium: {
        title: 'α╜éα╜Öα╜╝α╝ïα╜ûα╜╝α╜áα╜▓α╝ïα╜Éα╜┤α╜ÿα╝ïα╜ªα╛Æα╛▓α╜▓α╜úα╝ì',
        duration: 'α╜ëα╜▓α╜ôα╝ïα╜ÿα╝ï α╝Ñ / α╜òα╛▒α╜▓α╝ïα╜óα╜┤α╝ï α╝ñ',
        services: ['α╜ªα╛Éα╜óα╝ïα╜ÿα╝ï α╝ú α╜àα╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜ºα╜╝α╝ïα╜èα╜║α╜ú', 'α╜ªα╛Æα╜äα╝ïα╜Åα╜╝α╜éα╝ï + α╜ÿα╜Üα╜╝α╝ïα╜ÿα╜╝α╝ï + α╜ûα╜▒α╝ïα╜ûα╜▒α╝ïα╜úα╛╖α╝ïα╜üα╜ä', 'α╜æα╛▓α╜╝α╝ïα╜ûα╜₧α╜║α╜ªα╝ïα╜æα╜äα╝ïα╜òα╛▒α╜▓α╝ïα╜ûα╜₧α╜║α╜ªα╝ïα╜íα╜╝α╜æ', 'α╜ªα╛Æα╜║α╜óα╝ïα╜éα╛▒α╜▓α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜áα╜üα╜╝α╜ó', 'α╜úα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜ö']
      },
      luxury: {
        title: 'α╜ÿα╜Éα╜╝α╝ïα╜óα╜▓α╜ÿα╝ïα╜Éα╜┤α╜ÿα╝ïα╜ªα╛Æα╛▓α╜▓α╜úα╝ì',
        duration: 'α╜ëα╜▓α╜ôα╝ïα╜ÿα╝ï α╝º / α╜òα╛▒α╜▓α╝ïα╜óα╜┤α╝ï α╝ª',
        services: ['α╜ªα╛Éα╜óα╝ïα╜ÿα╝ï α╝Ñ α╜àα╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜ºα╜╝α╝ïα╜èα╜║α╜ú', 'α╜ûα╛▒α╜äα╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿ (α╜úα╝ïα╜àα╜┤α╜äα╝ï α╜íα╜┤α╜ÿα╝ïα╜Éα╜ä)', 'α╜ûα╜₧α╜║α╜ªα╝ïα╜ªα╛Æα╜╝α╝ïα╜éα╝ïα╜óα╝ïα╜íα╜╝α╜æ', 'α╜ªα╛Æα╜║α╜óα╝ïα╜éα╛▒α╜▓α╝ïα╜üα╜║α╜ûα╝ïα╜æα╜äα╝ïα╜úα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜ö', 'VIP α╜ÿα╛▒α╜╝α╜äα╝ïα╜û']
      },
      safetySection: {
        title: 'α╜ëα╜║α╜ôα╝ïα╜ªα╛▓α╜┤α╜äα╝ïα╜æα╜äα╝ïα╜óα╛ùα╜║α╜ªα╝ïα╜ûα╜ñα╜║α╜óα╝ïα╜úα╜ÿα╝ïα╜úα╜┤α╜éα╜ªα╝ì',
        description: "α╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜ëα╜║α╜ôα╝ïα╜ªα╛▓α╜┤α╜äα╝ïα╜áα╜æα╜▓α╝ïα╜äα╝ïα╜ûα╜àα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜æα╜ÿα╝ïα╜ûα╜àα╜áα╝ïα╜¿α╜▓α╜ôα╝ì",
        features: {
          gps: { title: 'GPS α╜óα╛ùα╜║α╜ªα╝ïα╜ûα╜ñα╜║α╜óα╝ì', desc: 'α╜æα╜äα╜╝α╜ªα╝ïα╜éα╜₧α╜▓α╜áα╜▓α╝ïα╜ªα╝ïα╜éα╜ôα╜ªα╝ïα╜úα╛ƒα╝ïα╜óα╛ƒα╜╝α╜é' },
          sos: { title: 'α╜ëα╜║α╜ôα╝ïα╜ûα╜óα╛íα╝ï SOS', desc: 'α╜áα╜òα╛▓α╜úα╝ïα╜úα╜ªα╝ïα╜úα╜ôα╝ïα╜éα╜ªα╜úα╝ì' },
          support: { title: 'α╝óα╝ñ/α╝º α╜óα╛Æα╛▒α╜ûα╝ïα╜ªα╛Éα╛▒α╜╝α╜óα╝ì', desc: 'α╜óα╛ƒα╜éα╝ïα╜öα╜óα╝ïα╜óα╜╝α╜éα╜ªα╝ïα╜óα╜ÿα╝ïα╜ªα╛íα╜║α╝ïα╜Üα╜ôα╝ì' },
          partners: { title: 'α╜äα╜╝α╝ïα╜ªα╛ªα╛▒α╜╝α╜óα╝ïα╜àα╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜åα╝ïα╜óα╜╝α╜éα╜ªα╝ì', desc: 'α╜ûα╛│α╜╝α╝ïα╜éα╜Åα╜æα╝ïα╜àα╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜úα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜öα╝ì' }
        }
      }
    },
    planJourney: 'α╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜áα╜åα╜óα╝ïα╜éα╜₧α╜▓α╝ïα╜ûα╜ƒα╜╝',
    planJourneySubtitle: 'α╜ªα╜▒α╜óα╝ïα╜Éα╜▓α╝ïα╜éα╜▓α╜ªα╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜íα╜╝α╜äα╜ªα╝ïα╜óα╛½α╜╝α╜éα╜ªα╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ï α╜ªα╛Æα╜║α╜óα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜éα╜ôα╜ªα╝ïα╜ªα╛Éα╜╝α╜óα╝ïα╜éα╛▒α╜▓α╝ïα╜úα╜ÿα╝ïα╜úα╜┤α╝ïα╜úα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜áα╜ûα╜æα╝ïα╜éα╜║',
    startingPoint: 'α╜áα╜éα╜╝α╝ïα╜ûα╜Öα╜┤α╜éα╜ªα╝ïα╜ª',
    primaryMonastery: 'α╜éα╜Öα╜╝α╝ïα╜ûα╜╝α╜áα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜ö',
    duration: 'α╜æα╜┤α╜ªα╝ïα╜Üα╜╝α╜æ',
    spiritualFocus: 'α╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜éα╜Öα╜╝α╝ïα╜éα╜ôα╜æ',
    createJourney: 'α╜ªα╜▒α╜óα╝ïα╜Éα╜▓α╝ïα╜æα╜äα╝ïα╜úα╛╖α╜ôα╝ïα╜æα╜┤α╝ïα╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜éα╜ªα╜óα╝ïα╜ûα╜ªα╛Éα╛▓α╜┤α╜ô',
    monasteryShowcase: 'α╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜Üα╜┤',
    monasteryShowcaseSubtitle: 'α╜ºα╜▓α╝ïα╜ÿα╝ïα╜úα╝ïα╜íα╜áα╜▓α╝ïα╜úα╛ƒα╝ïα╜₧α╜▓α╜ûα╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜ûα╜₧α╜┤α╜éα╜ªα╝ïα╜öα╜áα╜▓α╝ïα╜óα╛Öα╜▓α╜äα╝ïα╜öα╜áα╜▓α╝ïα╜ôα╜äα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜Üα╜┤α╝ïα╜Üα╜╝α╜úα╝ïα╜₧α╜▓α╜ûα╝ïα╜áα╜ûα╜æ',
    exploreMonastery: 'α╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜Üα╜╝α╜úα╝ïα╜₧α╜▓α╜ûα╝ïα╜áα╜ûα╜æ',
    spiritualExperiences: 'α╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜ÿα╛▒α╜╝α╜äα╝ïα╜Üα╜╝α╜óα╝ïα╜æα╜äα╝ïα╜ªα╝ïα╜éα╜ôα╜ªα╝ïα╜óα╜▓α╜éα╝ïα╜éα╜₧α╜┤α╜ä',
    spiritualExperiencesSubtitle: 'α╜äα╜╝α╝ïα╜ÿα╜áα╜▓α╝ïα╜ôα╜äα╝ïα╜öα╜áα╜▓α╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╝ïα╜æα╜äα╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜óα╜▓α╜éα╝ïα╜éα╜₧α╜┤α╜äα╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜üα╛▒α╜╝α╜æα╝ïα╜óα╜äα╝ïα╜ûα╜Öα╜┤α╜æ',
    bookExperience: 'α╜ÿα╛▒α╜╝α╜äα╝ïα╜Üα╜╝α╜óα╝ïα╜ªα╛Æα╛▓α╜▓α╜éα╝ïα╜áα╜çα╜┤α╜é',
    buddhist: 'α╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜ôα╜äα╝ïα╜öα╜áα╜▓α╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ª',
    buddhistSubtitle: 'α╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜úα╜║α╜éα╜ªα╝ïα╜ñα╜╝α╜ÿα╝ïα╜ôα╜äα╝ïα╜öα╜áα╜▓α╝ïα╜óα╜▓α╜äα╝ïα╜úα╜┤α╜éα╜ªα╝ïα╜æα╜äα╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜úα╜ÿα╝ïα╜Üα╜┤α╝ïα╜éα╜▓α╝ïα╜ªα╛Éα╜╝α╜óα╝ïα╜úα╜┤α╝ïα╜ñα╜║α╜ª',
    routePlanner: 'α╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜úα╜ÿα╝ïα╜üα╝ïα╜áα╜åα╜óα╝ïα╜éα╜₧α╜▓α╝ïα╜ûα╜ƒα╜╝α╝ïα╜ÿα╜▓',
    routePlannerSubtitle: 'α╜ªα╜▒α╜óα╝ïα╜Éα╜▓α╝ïα╜éα╜▓α╝ïα╜úα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜æα╜äα╝ïα╜úα╛╖α╜ôα╝ïα╜æα╜┤α╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜íα╜╝α╜äα╜ªα╝ïα╜óα╛½α╜╝α╜éα╜ªα╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜éα╜ôα╜ªα╝ïα╜ªα╛Éα╜╝α╜óα╝ïα╜úα╜ÿα╝ïα╜üα╝ïα╜áα╜åα╜óα╝ïα╜éα╜₧α╜▓α╝ïα╜ûα╜ƒα╜╝',
    interactiveMap: 'α╜áα╜ûα╛▓α╜║α╜úα╝ïα╜ÿα╜Éα╜┤α╜æα╝ïα╜àα╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜ªα╝ïα╜üα╛▓',
    generateItinerary: 'α╜ªα╜▒α╜óα╝ïα╜Éα╜▓α╝ïα╜æα╜äα╝ïα╜úα╛╖α╜ôα╝ïα╜æα╜┤α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜úα╜ªα╝ïα╜óα╜▓α╜ÿα╝ïα╜ûα╜ƒα╜╝',
    saarthiGreeting: "α╜ûα╜Çα╛▓α╝ïα╜ñα╜▓α╜ªα╝ïα╜ûα╜æα╜║α╝ïα╜úα╜║α╜éα╜ª! α╜äα╝ïα╜ªα╜▒α╜óα╝ïα╜Éα╜▓α╝ïα╜¿α╜▓α╜ôα╝ï α╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜úα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜öα╝ì α╜æα╝ïα╜óα╜║α╜ªα╝ïα╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╜ªα╝ïα╜éα╝ïα╜àα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜Üα╜╝α╜úα╝ïα╜₧α╜▓α╜ûα╝ïα╜áα╜ûα╜æα╝ïα╜ôα╜▓α╝ïα╜¿α╜▓α╜ôα╝ïα╜ô?",
    chatWithSaarthi: 'α╜ªα╜▒α╜óα╝ïα╜Éα╜▓α╝ïα╜æα╜äα╝ïα╜úα╛╖α╜ôα╝ïα╜æα╜┤α╝ïα╜éα╛│α╜║α╜äα╝ïα╜ªα╛ƒα╜║α╜éα╜ª!',
    spiritualGuide: 'α╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜úα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜ö',
    askAbout: 'α╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ï α╜ûα╜ªα╜ÿα╝ïα╜éα╜Åα╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜ªα╛Éα╜╝α╜óα╝ïα╜úα╜┤α╝ïα╜æα╛▓α╜▓...',
    about: {
      title: 'α╜éα╛╖α╜┤α╜ÿα╝ïα╜ÿα╜╝α╝ïα╜¿α╜▓α╜ôα╝ïα╜îα╜▓α╝ïα╜íα╜áα╜▓α╝ïα╜ªα╛Éα╜╝α╜ó',
      subtitle: 'α╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜óα╜▓α╜äα╝ïα╜úα╜┤α╜éα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜ªα╛Æα╜╝',
      description: 'α╜éα╛╖α╜┤α╜ÿα╝ïα╜ÿα╜╝α╝ïα╜¿α╜▓α╜ôα╝ïα╜îα╜▓α╝ïα╜íα╝ïα╜áα╜æα╜▓α╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜ôα╜äα╝ïα╜öα╜áα╜▓α╝ïα╜óα╜▓α╜äα╝ïα╜úα╜┤α╜éα╜ªα╝ïα╜ªα╛▓α╜┤α╜äα╝ïα╜ªα╛Éα╛▒α╜╝α╜ûα╝ïα╜æα╜äα╝ïα╜ÿα╜ëα╜ÿα╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜áα╜ûα╜æα╝ïα╜ôα╜▓α╝ïα╜úα╜┤α╝ïα╜₧α╜ûα╜ªα╝ïα╜Åα╜╝α╜éα╝ïα╜áα╜ûα╜æα╝ïα╜æα╜╝α╝ì α╜äα╝ïα╜ûα╜àα╜ªα╝ïα╜Çα╛▒α╜▓α╜ªα╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜Üα╜╝α╜úα╝ïα╜ÿα╜▓α╝ïα╜Üα╜┤α╝ïα╜ªα╝ïα╜éα╜ôα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ñα╜║α╜ªα╝ïα╜óα╜ûα╝ïα╜æα╜äα╝ïα╜ûα╜óα╛Æα╛▒α╝ïα╜òα╛▓α╜éα╝ïα╜ÿα╜äα╝ïα╜öα╜╝α╜áα╜▓α╝ïα╜óα╛Öα╜▓α╜äα╝ïα╜öα╜áα╜▓α╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ªα╝ïα╜Çα╛▒α╜▓α╜ªα╝ïα╜úα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜áα╜ûα╜æα╝ïα╜ÿα╜▓α╝ïα╜äα╜╝α╝ïα╜ÿα╜áα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜ÿα╛▒α╜╝α╜äα╝ïα╜Üα╜╝α╜óα╝ïα╜æα╜äα╝ïα╜ÿα╜Éα╜┤α╜æα╝ïα╜æα╜╝α╝ì',
      mission: 'α╜äα╝ïα╜ûα╜àα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜úα╜ªα╝ïα╜áα╜éα╜ô',
      missionText: 'α╜áα╝ïα╜ôα╜▓α╝ïα╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜éα╜ôα╜ªα╝ïα╜Üα╜┤α╝ïα╜éα╜▓α╝ïα╜æα╜ÿα╝ïα╜öα╝ïα╜ëα╜▓α╜æα╝ïα╜æα╜äα╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ªα╝ïα╜Üα╜┤α╝ïα╜ªα╛▓α╜┤α╜äα╝ïα╜ªα╛Éα╛▒α╜╝α╜ûα╝ïα╜áα╜ûα╜æα╝ïα╜ûα╜áα╜▓α╝ïα╜ªα╛Éα╜ûα╜ªα╝ïα╜úα╜┤α╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜éα╜Åα╜║α╜óα╝ïα╜Üα╜┤α╝ïα╜áα╜Üα╜╝α╜úα╝ïα╜ÿα╜▓α╝ïα╜Üα╜┤α╝ïα╜éα╝ïα╜óα╝ïα╜úα╜┤α╝ïα╜úα╛╖α╜╝α╜æα╝ïα╜úα╜ÿα╝ïα╜àα╜ôα╝ïα╜ûα╜ƒα╜╝α╝ïα╜ôα╜▓α╝ì',
      vision: 'α╜äα╝ïα╜ûα╜àα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ÿα╜Éα╜╝α╜äα╝ïα╜ªα╛úα╜ä',
      visionText: 'α╜óα╛Öα╜▓α╜äα╝ïα╜öα╜áα╜▓α╝ïα╜ñα╜║α╜ªα╝ïα╜óα╜ûα╝ïα╜Çα╛▒α╜▓α╜ªα╝ïα╜æα╝ïα╜úα╛ƒα╜╝α╜áα╜▓α╝ïα╜ªα╜║α╜ÿα╜ªα╝ïα╜Üα╜┤α╝ïα╜₧α╜▓α╝ïα╜ûα╜æα╜║α╝ï α╜ªα╛Öα╜▓α╜äα╝ïα╜óα╛ùα╜║α╝ï α╜æα╜║α╝ïα╜úα╜ªα╝ïα╜ûα╛▒α╜äα╝ïα╜åα╜┤α╜ûα╝ïα╜Çα╛▒α╜▓α╝ïα╜òα╛▒α╜╝α╜éα╜ªα╝ïα╜úα╜┤α╝ïα╜úα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜áα╜ûα╜æα╝ïα╜ÿα╜▓α╝ïα╜áα╜¢α╜ÿα╝ïα╜éα╛│α╜▓α╜äα╝ïα╜àα╜▓α╜é',
      values: 'α╜äα╝ïα╜ûα╜àα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜óα╜▓α╜ôα╝ïα╜Éα╜ä',
      valuesText: 'α╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ªα╝ïα╜úα╜┤α╝ïα╜ûα╜óα╛⌐α╜▓α╝ïα╜ÿα╜Éα╜╝α╜äα╝ï α╜äα╜╝α╝ïα╜ÿα╜áα╜▓α╝ïα╜ÿα╛▒α╜╝α╜äα╝ïα╜Üα╜╝α╜óα╝ï α╜óα╛ƒα╜éα╝ïα╜ûα╜óα╛ƒα╜ôα╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ï α╜æα╜║α╝ïα╜úα╜ªα╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜òα╜║α╜úα╝ïα╜óα╛Æα╛▒α╜ªα╝ì',
      team: 'α╜äα╝ïα╜ûα╜àα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ªα╛íα╜║α╝ïα╜Üα╜ô',
      teamText: 'α╜ªα╝ïα╜éα╜ôα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜úα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜öα╝ï α╜ôα╜äα╝ïα╜öα╜áα╜▓α╝ïα╜ÿα╜üα╜ªα╝ïα╜öα╝ï α╜æα╜║α╝ïα╜úα╜ªα╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜åα╜║α╜æα╝ïα╜úα╜ªα╝ïα╜öα╝ïα╜Üα╜┤α╝ïα╜æα╜╝α╜ôα╝ïα╜úα╛íα╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜éα╜ªα╜óα╝ïα╜ûα╜ªα╛Éα╛▓α╜┤α╜ôα╝ïα╜áα╜ûα╜æα╝ïα╜ôα╜▓α╝ïα╜úα╜┤α╝ïα╜ÿα╜ëα╜ÿα╝ïα╜áα╜ûα╛▓α╜║α╜úα╝ïα╜áα╜ûα╜æα╝ïα╜æα╜╝α╝ì'
    },
    contact: {
      title: 'α╜áα╜ûα╛▓α╜║α╜úα╝ïα╜ûα╝ïα╜áα╜ûα╜æ',
      subtitle: 'α╜æα╝ïα╜óα╜║α╜ªα╝ïα╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜áα╜éα╜╝α╝ïα╜ûα╜Öα╜┤α╜éα╜ª',
      getInTouch: 'α╜áα╜ûα╛▓α╜║α╜úα╝ïα╜ûα╝ïα╜áα╜ûα╜æ',
      address: 'α╜üα╝ïα╜ûα╛▒α╜ä',
      addressText: 'α╜ªα╛Æα╜äα╝ïα╜Åα╜╝α╜éα╝ï α╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ï 737101, α╜óα╛Æα╛▒α╝ïα╜éα╜ó',
      phone: 'α╜üα╝ïα╜öα╜ó',
      phoneText: '+9108650882398',
      email: 'α╜éα╛│α╜╝α╜éα╝ïα╜áα╜òα╛▓α╜▓α╜ô',
      emailText: 'namaste@ghoomo.india',
      hours: 'α╜úα╜ªα╝ïα╜üα╜┤α╜äα╜ªα╝ïα╜æα╜┤α╜ªα╝ïα╜Üα╜╝α╜æ',
      hoursText: 'α╜ƒα╛│α╝ïα╜ûα╝ï - α╜ªα╛ñα╜║α╜ôα╝ïα╜ö: α╜₧α╜╝α╜éα╜ªα╝ïα╜öα╝ï 9:00 - α╜æα╜éα╜╝α╜äα╝ïα╜æα╜éα╝ï 6:00',
      sendMessage: 'α╜áα╜òα╛▓α╜▓α╜ôα╝ïα╜íα╜▓α╜éα╝ïα╜éα╜Åα╜ä',
      name: 'α╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜ÿα╜▓α╜ä',
      subject: 'α╜ûα╜óα╛ùα╜╝α╜æα╝ïα╜éα╜₧α╜▓',
      message: 'α╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜áα╜òα╛▓α╜▓α╜ôα╝ïα╜íα╜▓α╜é',
      submit: 'α╜áα╜òα╛▓α╜▓α╜ôα╝ïα╜íα╜▓α╜éα╝ïα╜éα╜Åα╜ä'
    },
    bookingModal: {
      title: 'α╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜ÿα╛▒α╜╝α╜äα╝ïα╜Üα╜╝α╜óα╝ïα╜ªα╛Æα╛▓α╜▓α╜éα╝ïα╜áα╜çα╜┤α╜éα╝ïα╜áα╜ûα╜æ',
      selectDate: 'α╜Üα╜║α╜ªα╝ïα╜éα╛▓α╜äα╜ªα╝ïα╜éα╜æα╜ÿα╝ïα╜üα╝ïα╜óα╛Éα╛▒α╜û',
      selectTime: 'α╜æα╜┤α╜ªα╝ïα╜Üα╜╝α╜æα╝ïα╜éα╜æα╜ÿα╝ïα╜üα╝ïα╜óα╛Éα╛▒α╜û',
      participants: 'α╜ÿα╜ëα╜ÿα╝ïα╜₧α╜┤α╜éα╜ªα╝ïα╜öα╜áα╜▓α╝ïα╜éα╛▓α╜äα╜ªα╝ïα╜Ç',
      specialRequests: 'α╜æα╜ÿα╜▓α╜éα╜ªα╝ïα╜ûα╜ªα╜úα╝ïα╜₧α╜┤α╝ïα╜û',
      totalCost: 'α╜åα╝ïα╜Üα╜äα╝ïα╜éα╜▓α╝ïα╜éα╜╝α╜ä',
      bookNow: 'α╜æα╝ïα╜úα╛ƒα╜╝α╝ïα╜ªα╛Æα╛▓α╜▓α╜éα╝ïα╜áα╜çα╜┤α╜éα╝ïα╜áα╜ûα╜æ',
      close: 'α╜üα╝ïα╜óα╛Æα╛▒α╜û'
    },
    monasteryModal: {
      history: 'α╜úα╜╝α╝ïα╜óα╛Æα╛▒α╜┤α╜ª',
      traditions: 'α╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ª',
      visitingHours: 'α╜úα╛ƒα╝ïα╜ªα╛Éα╜╝α╜óα╝ïα╜æα╜┤α╜ªα╝ïα╜Üα╜╝α╜æ',
      location: 'α╜éα╜ôα╜ªα╝ïα╜ª',
      nearbyAttractions: 'α╜ëα╜║α╝ïα╜áα╜æα╜ûα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ªα╛Éα╜æα╝ïα╜áα╜æα╜║α╜éα╜ª',
      close: 'α╜üα╝ïα╜óα╛Æα╛▒α╜û'
    },
    itineraryResult: {
      title: 'α╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜úα╜ªα╝ïα╜óα╜▓α╜ÿ',
      generatedBy: 'α╜ªα╜▒α╜óα╝ïα╜Éα╜▓α╝ïα╜éα╜▓α╜ªα╝ïα╜ûα╜ƒα╜╝α╝ïα╜û',
      day: 'α╜ëα╜▓α╜ô',
      close: 'α╜üα╝ïα╜óα╛Æα╛▒α╜û'
    },
    footer: {
      description: 'α╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜æα╜äα╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜óα╜▓α╜äα╝ïα╜úα╜┤α╜éα╜ªα╝ïα╜Üα╜╝α╜úα╝ïα╜₧α╜▓α╜ûα╝ïα╜áα╜ûα╜æα╝ì α╜ºα╜▓α╝ïα╜ÿα╝ïα╜úα╝ïα╜íα╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜ôα╜äα╝ïα╜öα╜áα╜▓α╝ïα╜ñα╜║α╜ªα╝ïα╜óα╜ûα╝ïα╜Çα╛▒α╜▓α╝ïα╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜úα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜öα╝ì',
      sacredPlaces: 'α╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜éα╜ôα╜ªα╝ïα╜Üα╜┤',
      support: 'α╜óα╜ÿα╝ïα╜áα╜æα╜║α╜éα╜ª',
      connect: 'α╜ÿα╜Éα╜┤α╜æα╝ïα╜úα╜ÿ',
      followUs: 'α╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜ûα╜ªα╜ÿα╝ïα╜ªα╛ªα╛▒α╜╝α╜óα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜╝α╜ôα╝ïα╜úα╜┤α╝ïα╜äα╝ïα╜ûα╜àα╜ªα╝ïα╜óα╛ùα╜║α╜ªα╝ïα╜áα╜ûα╛▓α╜äα╝ïα╜áα╜ûα╜æ',
      copyright: '┬⌐ 202 α╜éα╛╖α╜┤α╜ÿα╝ïα╜ÿα╜╝α╝ïα╜¿α╜▓α╜ôα╝ïα╜îα╜▓α╝ïα╜íα╝ì α╜Éα╜╝α╜ûα╝ïα╜Éα╜äα╝ïα╜éα╝ïα╜óα╝ïα╜ëα╜ÿα╜ªα╝ïα╜ªα╛▓α╜┤α╜äα╝ïα╜íα╜╝α╜æα╝ì α╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜Üα╜╝α╜úα╝ïα╜ÿα╜▓α╝ïα╜Üα╜┤α╝ïα╜éα╜▓α╝ïα╜æα╜╝α╜ôα╝ïα╜úα╜┤α╝ï ≡ƒÖÅ α╜æα╜äα╝ïα╜úα╛╖α╜ôα╝ïα╜æα╜┤α╝ïα╜ûα╜ƒα╜╝α╝ïα╜ûα╝ì'
    },
    monasteries: {
      rumtek: {
        name: 'α╜óα╜┤α╜ÿα╝ïα╜Éα╜║α╜éα╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜ö',
        description: 'α╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜åα╜║α╝ïα╜ñα╜╝α╜ªα╝ï α╜Çα╜óα╝ïα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜éα╜æα╜ôα╝ïα╜ª',
        history: '1966 α╜úα╜┤α╝ïα╜ûα╜ƒα╜╝α╝ïα╜ûα╝ï α╜óα╜┤α╜ÿα╝ïα╜Éα╜║α╜éα╝ïα╜áα╜æα╜▓α╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜åα╜║α╝ïα╜ñα╜╝α╜ªα╝ïα╜¿α╜▓α╜ôα╝ïα╜ÿα╜▓α╝ïα╜æα╜äα╝ïα╜Çα╜óα╝ïα╜ÿα╝ïα╜ûα╜Çα╜áα╝ïα╜ûα╜óα╛Æα╛▒α╜┤α╜æα╝ïα╜óα╜▓α╜éα╜ªα╝ïα╜óα╜┤α╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜éα╜Öα╜╝α╝ïα╜ûα╜╝α╜áα╜▓α╝ïα╜éα╜æα╜ôα╝ïα╜ªα╝ïα╜¿α╜▓α╜ôα╝ì α╜áα╜æα╜▓α╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜óα╜▓α╜ôα╝ïα╜Éα╜äα╝ïα╜àα╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜óα╜▓α╜äα╝ïα╜ûα╜ñα╜┤α╜ªα╝ïα╜æα╜äα╝ïα╜óα╛Öα╜▓α╜äα╝ïα╜öα╜áα╜▓α╝ïα╜ôα╜äα╝ïα╜öα╜áα╜▓α╝ïα╜óα╜▓α╜éα╝ïα╜éα╜ôα╜ªα╝ïα╜íα╜╝α╜æα╝ì',
        traditions: 'α╜Çα╜óα╝ïα╜ÿα╝ïα╜ûα╜Çα╜áα╝ïα╜ûα╜óα╛Æα╛▒α╜┤α╜æα╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ªα╝ïα╜áα╜æα╜▓α╝ïα╜óα╛ùα╜║α╜ªα╝ïα╜áα╜ûα╛▓α╜äα╝ïα╜áα╜ûα╜æα╜¥α╝ïα╜¿α╜▓α╜ôα╝ï α╜æα╜║α╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜ëα╜▓α╜ôα╝ïα╜óα╜║α╜áα╜▓α╝ïα╜éα╜ªα╜╝α╜úα╝ïα╜áα╜æα╜║α╜ûα╜ªα╝ï α╜ûα╜ªα╜ÿα╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜╝α╜éα╜ªα╝ïα╜áα╜æα╜┤α╝ï α╜æα╜║α╝ïα╜úα╜ªα╝ïα╜ûα╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜úα╜╝α╝ïα╜éα╜ªα╜óα╝ïα╜æα╜┤α╜ªα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜Üα╜┤α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜úα╜╝α╝ïα╜óα╜║α╜áα╜▓α╝ïα╜æα╜┤α╜ªα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜Üα╜┤α╝ïα╜Üα╜┤α╜æα╝ïα╜æα╜╝α╝ì',
        hours: 'α╜₧α╜╝α╜éα╜ªα╝ïα╜öα╝ï 6:00 - α╜æα╜éα╜╝α╜äα╝ïα╜æα╜éα╝ï 6:00',
        location: 'α╜ªα╛Æα╜äα╝ïα╜Åα╜╝α╜éα╝ïα╜úα╜ªα╝ïα╜Çα╜▓α╝ïα╜úα╜╝α╝ïα╜ÿα╜▓α╝ïα╜èα╜óα╝ï 24',
        attractions: 'α╜éα╜ªα╜║α╜óα╝ïα╜éα╛▒α╜▓α╝ïα╜ÿα╜åα╜╝α╜æα╝ïα╜óα╛ƒα╜║α╜ôα╝ï α╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜ñα╜║α╜ªα╝ïα╜óα╜▓α╜éα╝ïα╜üα╜äα╝ï α╜ÿα╝ïα╜ôα╜▓α╝ïα╜áα╜üα╜╝α╜óα╝ïα╜úα╜╝'
      },
      namchi: {
    name: 'α╜ôα╜ÿα╝ïα╜åα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ì',
    description: 'α╜ªα╜┤α╜áα╜▓α╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜úα╛╖α╝ïα╜üα╜äα╝ïα╜éα╜àα╜▓α╜éα╝ïα╜úα╝ïα╜íα╜╝α╜æα╝ïα╜öα╝ïα╜æα╜äα╝ïα╝ì α╜₧α╜▓α╝ïα╜ûα╝ïα╜æα╜äα╝ïα╜éα╜┤α╝ïα╜óα╜┤α╝ïα╜öα╜æα╛¿α╝ïα╜áα╜ûα╛▒α╜┤α╜äα╝ïα╜éα╜ôα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ÿα╜Éα╜╝α╝ïα╜ûα╜╝α╜áα╜▓α╝ïα╜óα╛ƒα╜éα╜ªα╝ïα╜ûα╜óα╛Æα╛▒α╜ûα╝ïα╜æα╜║α╜ªα╝ïα╜éα╛▓α╜éα╜ªα╝ïα╜öα╝ì',
    history: 'α╜éα╜┤α╝ïα╜óα╜┤α╝ïα╜öα╜æα╛¿α╝ïα╜áα╜ûα╛▒α╜┤α╜äα╝ïα╜éα╜ôα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ûα╜ªα╛ƒα╜ôα╝ïα╜öα╝ïα╜ëα╜ÿα╜ªα╝ïα╜ªα╛▓α╜┤α╜äα╝ïα╜æα╜äα╝ïα╝ì α╜åα╜╝α╜ªα╝ïα╜úα╜┤α╜éα╜ªα╝ïα╜áα╜òα╜║α╜úα╝ïα╜ûα╜áα╜▓α╝ïα╜æα╜╝α╜ôα╝ïα╜æα╜┤α╝ïα╜éα╜ªα╜óα╝ïα╜ûα╜óα╝ïα╜ûα╜₧α╜┤α╜éα╜ªα╝ïα╜öα╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜áα╜æα╜▓α╝ïα╜íα╜▓α╜ôα╝ì',
    traditions: 'α╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜áα╜æα╜▓α╜óα╝ïα╜úα╜╝α╝ïα╜óα╛Æα╛▒α╜┤α╜ªα╝ïα╜úα╛ƒα╜óα╝ïα╜ûα╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜åα╜╝α╜ªα╝ïα╜æα╜ûα╛▒α╜▓α╜äα╜ªα╝ïα╜æα╜äα╝ïα╜úα╛╖α╝ïα╜åα╜╝α╜ªα╝ïα╜óα╜▓α╜éα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ªα╛Æα╛▓α╜┤α╜ûα╝ïα╜åα╜║α╜ôα╝ïα╜æα╜äα╝ïα╝ì α╜áα╜üα╜╝α╜óα╝ïα╜úα╜╝α╝ïα╜ûα╜ªα╛Éα╜╝α╜óα╝ïα╜ûα╝ïα╜æα╜äα╝ïα╜éα╜ªα╜╝α╜úα╝ïα╜áα╜æα╜║α╜ûα╜ªα╝ïα╜æα╜┤α╜ªα╝ïα╜åα╜║α╜ôα╝ïα╜ûα╛▒α╜┤α╜äα╝ïα╜ûα╝ì',
    hours: 'α╜ªα╛öα╝ïα╜æα╜éα╜┤α╝ïα╜ôα╜ªα╝ïα╜æα╜éα╜╝α╜äα╝ïα╜æα╛▓α╜╝α╝ïα╝ª α╜ûα╜óα╝ì',
    location: 'α╜ôα╜ÿα╝ïα╜åα╜▓α╝ì α╜ªα╜┤α╜áα╜▓α╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ì',
    attractions: 'α╜éα╜┤α╝ïα╜óα╜┤α╝ïα╜öα╜æα╛¿α╝ïα╜áα╜ûα╛▒α╜┤α╜äα╝ïα╜éα╜ôα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ÿα╜Éα╜╝α╝ïα╜ûα╜╝α╜áα╜▓α╝ïα╜úα╛╖α╝ïα╜óα╛ƒα╜éα╜ªα╝ì α╜ªα╜╝α╝ïα╜úα╜╝α╝ïα╜òα╜╝α╜éα╝ïα╜åα╜╝α╜ªα╝ïα╜óα╛ƒα╜║α╜ôα╝ì α╜ºα╜▓α╝ïα╜ÿα╝ïα╜úα╝ïα╜íα╜áα╜▓α╝ïα╜óα╜▓α╝ïα╜ûα╜╝α╝ïα╜éα╜₧α╜╝α╜ôα╝ïα╜æα╜┤α╜ªα╝ïα╜æα╜äα╝ïα╜ÿα╜Éα╜┤α╜ôα╝ïα╜öα╜áα╜▓α╝ïα╜ÿα╜Éα╜┤α╜ôα╝ïα╜ªα╛úα╜äα╝ïα╝ì'
},
      tashiding: {
        name: 'α╜ûα╜Çα╛▓α╝ïα╜ñα╜▓α╜ªα╝ïα╜ªα╛íα╜▓α╜äα╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜ö',
        description: 'α╜åα╜┤α╝ïα╜ûα╜╝α╝ïα╜éα╜ëα╜▓α╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ûα╜óα╝ïα╜ôα╝ïα╜óα╜▓α╝ïα╜úα╜┤α╝ïα╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜ö',
        history: '1717 α╜úα╜┤α╝ïα╜éα╜₧α╜▓α╝ïα╜ûα╜Öα╜┤α╜éα╜ªα╝ïα╜áα╜ûα╜æα╝ïα╜ûα╝ï α╜ûα╜Çα╛▓α╝ïα╜ñα╜▓α╜ªα╝ïα╜ªα╛íα╜▓α╜äα╝ïα╜éα╜▓α╝ïα╜æα╜╝α╜ôα╝ï "α╜ÿα╜åα╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜ûα╜┤α╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜æα╜öα╜ú" α╜ƒα╜║α╜óα╝ïα╜ÿα╜▓α╝ïα╜¿α╜▓α╜ôα╝ïα╜ÿα╜▓α╝ïα╜æα╜äα╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜æα╜ÿα╝ïα╜öα╝ïα╜ñα╜╝α╜ªα╝ïα╜Üα╜┤α╝ïα╜ôα╜äα╝ïα╜úα╜ªα╝ïα╜éα╜àα╜▓α╜éα╝ïα╜ªα╛ªα╜║α╝ïα╜ûα╜óα╛⌐α╜▓α╜ªα╝ïα╜æα╜╝α╝ì',
        traditions: 'α╜ûα╜┤α╜ÿα╝ïα╜åα╜┤α╝ïα╜æα╜┤α╜ªα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜╝α╜ôα╝ïα╜úα╜┤α╝ïα╜éα╛▓α╜éα╜ªα╝ïα╜àα╜ôα╝ï α╜æα╜║α╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜ÿα╜╝α╜ªα╝ïα╜éα╜┤α╜ªα╝ïα╜àα╜ôα╝ïα╜Üα╜┤α╝ïα╜úα╜┤α╝ïα╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜åα╜┤α╝ïα╜ûα╜éα╜╝α╝ïα╜ûα╜Çα╛▓α╜ÿα╝ïα╜áα╜ûα╜æα╜¥α╝ïα╜¿α╜▓α╜ôα╝ï α╜áα╜æα╜▓α╝ïα╜éα╜▓α╜ªα╝ïα╜áα╜╝α╜äα╝ïα╜ÿα╜áα╜▓α╝ïα╜úα╜╝α╝ïα╜éα╜▓α╝ïα╜úα╜┤α╜äα╝ïα╜ûα╜ªα╛ƒα╜ôα╝ïα╜áα╜ûα╜æα╝ïα╜ôα╜▓α╝ïα╜ªα╛ªα╜║α╝ïα╜íα╜▓α╜æα╝ïα╜åα╜║α╜ªα╝ïα╜áα╜ûα╜æα╜¥α╝ïα╜¿α╜▓α╜ôα╝ì',
        hours: 'α╜₧α╜╝α╜éα╜ªα╝ïα╜öα╝ï 6:00 - α╜æα╜éα╜╝α╜äα╝ïα╜æα╜éα╝ï 6:00',
        location: 'α╜óα╜äα╝ïα╜éα╜▓α╜æα╝ïα╜æα╜äα╝ïα╜óα╝ïα╜Éα╜╝α╜äα╝ïα╜åα╜┤α╝ïα╜ûα╜╝α╝ïα╜éα╜ëα╜▓α╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ûα╜óα╝ïα╜ô',
        attractions: 'α╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜ûα╜┤α╜ÿα╝ïα╜åα╜┤α╝ïα╜ûα╜┤α╜ÿα╝ïα╜öα╝ï α╜ÿα╜åα╜╝α╜æα╝ïα╜óα╛ƒα╜║α╜ôα╝ï α╜åα╜┤α╝ïα╜ûα╜╝α╝ïα╜áα╜æα╜┤α╜ªα╝ïα╜ªα╝ïα╜úα╛ƒα╝ïα╜₧α╜▓α╜û'
      },
      enchey: {
        name: 'α╜¿α╜║α╜ôα╝ïα╜àα╜║α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜ö',
        description: 'α╜ªα╛Æα╜äα╝ïα╜Åα╜╝α╜éα╝ïα╜úα╜┤α╝ïα╜úα╛ƒα╝ïα╜ÿα╜▓α╝ïα╜ªα╛íα╜┤α╜éα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜ö',
        history: '1909 α╜úα╜┤α╝ïα╜ûα╜ƒα╜╝α╝ïα╜ûα╝ï α╜¿α╜║α╜ôα╝ïα╜àα╜║α╝ïα╜éα╜▓α╝ïα╜æα╜╝α╜ôα╝ï "α╜æα╜ûα╜║α╜ôα╝ïα╜öα╜áα╜▓α╝ïα╜úα╛╖α╝ïα╜üα╜ä" α╜ƒα╜║α╜óα╝ïα╜ÿα╜▓α╝ïα╜¿α╜▓α╜ôα╝ïα╜ÿα╜▓α╝ïα╜æα╜äα╝ïα╜áα╜æα╜▓α╝ïα╜éα╜▓α╝ïα╜éα╜₧α╜▓α╝ïα╜ûα╜Öα╜┤α╜éα╜ªα╝ïα╜ûα╛│α╝ïα╜ÿα╝ïα╜éα╛▓α╜┤α╜ûα╝ïα╜Éα╜╝α╜ûα╝ïα╜æα╜Çα╜óα╝ïα╜öα╜╝α╝ïα╜éα╜▓α╜ªα╝ïα╜áα╜ûα╜æα╝ïα╜ûα╝ïα╜¿α╜▓α╜ôα╝ï α╜æα╜║α╝ïα╜úα╜┤α╝ïα╜áα╜òα╜┤α╜óα╝ïα╜ôα╜┤α╜ªα╝ïα╜öα╝ïα╜íα╜╝α╜æα╝ïα╜öα╝ïα╜ªα╛ªα╜║α╝ïα╜íα╜▓α╜æα╝ïα╜åα╜║α╜ªα╝ïα╜áα╜ûα╜æα╜¥α╝ïα╜¿α╜▓α╜ôα╝ì',
        traditions: 'α╜óα╛Öα╜▓α╜äα╝ïα╜ÿα╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ªα╝ïα╜æα╜äα╝ïα╜úα╛╖α╜ôα╝ïα╜æα╜┤α╝ïα╜úα╜╝α╝ïα╜óα╜║α╜áα╜▓α╝ïα╜áα╜åα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜æα╜äα╝ïα╜ªα╛Æα╜äα╝ïα╜Åα╜╝α╜éα╝ïα╜éα╛▓α╜╝α╜äα╝ïα╜üα╛▒α╜║α╜óα╝ïα╜éα╛▒α╜▓α╝ïα╜ªα╛▓α╜┤α╜äα╝ïα╜ªα╛Éα╛▒α╜╝α╜ûα╝ïα╜Çα╛▒α╜▓α╝ïα╜æα╜╝α╜ôα╝ïα╜úα╜┤α╝ïα╜æα╜ÿα╜▓α╜éα╜ªα╝ïα╜ûα╜ªα╜úα╝ïα╜éα╜ªα╜╝α╜úα╝ïα╜áα╜æα╜║α╜ûα╜ªα╝ì',
        hours: 'α╜₧α╜╝α╜éα╜ªα╝ïα╜öα╝ï 6:00 - α╜æα╜éα╜╝α╜äα╝ïα╜æα╜éα╝ï 6:00',
        location: 'α╜ªα╛Æα╜äα╝ïα╜Åα╜╝α╜éα╝ï α╜ñα╜óα╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿ',
        attractions: 'α╜éα╛▓α╜╝α╜äα╝ïα╜üα╛▒α╜║α╜óα╝ïα╜éα╛▒α╜▓α╝ïα╜úα╛ƒα╝ïα╜₧α╜▓α╜ûα╝ï α╜éα╜ªα╜╝α╜úα╝ïα╜áα╜æα╜║α╜ûα╜ªα╝ïα╜æα╜óα╝ïα╜åα╜╝α╝ï α╜ªα╛▓α╜╝α╜úα╝ïα╜óα╛Æα╛▒α╜┤α╜ôα╝ïα╜ûα╜ƒα╜╝α╝ïα╜óα╜▓α╜é'
      },
      dubdi: {
        name: 'α╜ªα╛Æα╛▓α╜┤α╜ûα╝ïα╜ªα╛íα╜║α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜ö',
        description: 'α╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜ûα╜ƒα╜╝α╝ïα╜ûα╜áα╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜æα╜äα╝ïα╜öα╜╝',
        history: '1701 α╜úα╜┤α╝ïα╜åα╜╝α╜ªα╝ïα╜óα╛Æα╛▒α╜úα╝ïα╜óα╛úα╜ÿα╝ïα╜óα╛Æα╛▒α╜úα╝ïα╜éα╜▓α╜ªα╝ïα╜éα╜₧α╜▓α╝ïα╜ûα╜Öα╜┤α╜éα╜ªα╝ïα╜áα╜ûα╜æα╝ïα╜ûα╝ï α╜ªα╛Æα╛▓α╜┤α╜ûα╝ïα╜ªα╛íα╜║α╝ïα╜áα╜æα╜▓α╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜óα╛Öα╜▓α╜äα╝ïα╜ñα╜╝α╜ªα╝ïα╜¿α╜▓α╜ôα╝ïα╜ÿα╜▓α╝ïα╜æα╜äα╝ïα╜áα╝ïα╜ôα╜▓α╝ïα╜ªα╝ïα╜üα╜╝α╜äα╜ªα╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜ôα╜äα╝ïα╜öα╝ïα╜ªα╜äα╜ªα╝ïα╜óα╛Æα╛▒α╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜åα╜╝α╜ªα╝ïα╜úα╜┤α╜éα╜ªα╝ïα╜áα╜éα╜╝α╝ïα╜ûα╜Öα╜┤α╜éα╜ªα╝ïα╜öα╜áα╜▓α╝ïα╜óα╛ƒα╜éα╜ªα╝ïα╜ÿα╜Üα╜ôα╝ïα╜¿α╜▓α╜ôα╝ì',
        traditions: 'α╜óα╛Öα╜▓α╜äα╝ïα╜ÿα╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ªα╝ïα╜Çα╛▒α╜▓α╜ªα╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜úα╜┤α╝ïα╜áα╜ûα╜éα╝ïα╜áα╜╝α╜äα╝ïα╜ûα╜áα╜▓α╝ïα╜óα╛⌐α╝ïα╜ûα╜áα╜▓α╝ïα╜ûα╜ªα╛│α╜ûα╝ïα╜ûα╛▒α╝ïα╜Üα╜┤α╝ïα╜ªα╛▓α╜┤α╜äα╝ïα╜ªα╛Éα╛▒α╜╝α╜ûα╝ïα╜áα╜ûα╜æα╜¥α╝ïα╜¿α╜▓α╜ôα╝ï α╜æα╜║α╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜óα╛Öα╜▓α╜äα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜öα╜║α╝ïα╜åα╝ïα╜æα╜äα╝ïα╜óα╜▓α╜äα╝ïα╜ûα╜ñα╜┤α╜ªα╝ïα╜Üα╜┤α╝ïα╜íα╜╝α╜æα╝ì',
        hours: 'α╜₧α╜╝α╜éα╜ªα╝ïα╜öα╝ï 7:00 - α╜æα╜éα╜╝α╜äα╝ïα╜æα╜éα╝ï 5:00',
        location: 'α╜íα╜┤α╜éα╝ïα╜ªα╜╝α╜ÿα╝ï α╜ôα╜┤α╜ûα╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿ',
        attractions: 'α╜óα╛Öα╜▓α╜äα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜öα╜║α╝ïα╜åα╝ï α╜úα╜╝α╝ïα╜óα╛Æα╛▒α╜┤α╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜éα╜úα╝ïα╜àα╜ôα╝ïα╜ëα╜▓α╜æα╝ï α╜óα╜▓α╝ïα╜óα╛Æα╛▒α╜┤α╜éα╜ªα╝ïα╜úα╜ÿα╝ïα╜ü'
      },
      ralang: {
        name: 'α╜óα╝ïα╜úα╜äα╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜ö',
        description: 'α╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜åα╜ÿα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜╝α╜ôα╝ïα╜úα╜┤α╝ïα╜éα╛▓α╜éα╜ªα╝ïα╜àα╜ô',
        history: '1768 α╜úα╜┤α╝ïα╜éα╜₧α╜▓α╝ïα╜ûα╜Öα╜┤α╜éα╜ªα╝ïα╜áα╜ûα╜æα╝ïα╜ûα╝ï α╜óα╝ïα╜úα╜äα╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜áα╜æα╜▓α╝ïα╜úα╜╝α╝ïα╜óα╜║α╜áα╜▓α╝ïα╜ªα╛ñα╜äα╝ïα╜úα╛╖α╝ïα╜ûα╜ªα╜╝α╜úα╝ïα╜æα╜┤α╜ªα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜æα╜äα╝ïα╜ªα╛▓α╜╝α╜úα╝ïα╜óα╛Æα╛▒α╜┤α╜ôα╝ïα╜áα╜åα╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜╝α╜ôα╝ïα╜úα╜┤α╝ïα╜éα╛▓α╜éα╜ªα╝ïα╜àα╜ôα╝ïα╜¿α╜▓α╜ôα╝ì',
        traditions: 'α╜ûα╜Çα╜áα╝ïα╜ûα╜óα╛Æα╛▒α╜┤α╜æα╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ªα╝ïα╜æα╜äα╝ïα╜úα╛╖α╜ôα╝ïα╜æα╜┤α╝ïα╜ºα╝ïα╜úα╜ÿα╝ïα╜àα╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜₧α╜úα╝ïα╜áα╜åα╜ÿα╝ïα╜æα╜┤α╜ªα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜æα╜äα╝ïα╜éα╜äα╜ªα╝ïα╜æα╜Çα╜óα╝ïα╜öα╜┤α╜ôα╝ïα╜ªα╜┤α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜ûα╜óα╛⌐α╜▓α╝ïα╜ÿα╜Éα╜╝α╜äα╝ïα╜áα╜ûα╜æα╝ïα╜ÿα╜▓α╝ïα╜æα╜┤α╜ªα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ì',
        hours: 'α╜₧α╜╝α╜éα╜ªα╝ïα╜öα╝ï 6:00 - α╜æα╜éα╜╝α╜äα╝ïα╜æα╜éα╝ï 6:00',
        location: 'α╜óα╝ïα╜ûα╜äα╝ïα╜úα╝ï α╜úα╛╖α╜╝α╝ïα╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿ',
        attractions: 'α╜áα╜åα╜ÿα╝ïα╜₧α╜ûα╜ªα╝ïα╜ªα╝ï α╜æα╜┤α╜ªα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜₧α╜▓α╜äα╝ïα╜üα╝ï α╜óα╜▓α╝ïα╜úα╛ƒα╝ïα╜₧α╜▓α╜û'
      }
    },
    experiences: {
      meditation: 'α╜óα╜┤α╜ÿα╝ïα╜Éα╜║α╜éα╝ïα╜ôα╜äα╝ïα╜úα╜┤α╝ïα╜ûα╜ªα╜ÿα╝ïα╜éα╜Åα╜ôα╝ïα╜üα╛▓α╜╝α╜ÿα╝ïα╜ªα╛Æα╛▓α╜▓α╜ú',
      philosophy: 'α╜ôα╜äα╝ïα╜öα╝ïα╜ªα╜äα╜ªα╝ïα╜óα╛Æα╛▒α╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜úα╛ƒα╝ïα╜éα╛▓α╜┤α╜ûα╝ïα╜ªα╛│α╜╝α╜ûα╝ïα╜üα╛▓α╜▓α╜æ',
      homestay: 'α╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜üα╛▒α╜▓α╜ÿα╝ïα╜æα╜┤α╝ïα╜ªα╛íα╜╝α╜æα╝ïα╜ÿα╛▒α╜╝α╜äα╝ïα╜Üα╜╝α╜ó',
      crafts: 'α╜úα╜éα╝ïα╜ûα╜ƒα╜╝α╜áα╜▓α╝ïα╜ÿα╝ïα╜ôα╜▓α╝ïα╜áα╜üα╜╝α╜óα╝ïα╜úα╜╝'
    },
    traditions: {
      nyingma: {
        title: 'α╜óα╛Öα╜▓α╜äα╝ïα╜ÿα╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ª',
        description: 'α╜ûα╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜ôα╜äα╝ïα╜öα╝ïα╜ªα╜äα╜ªα╝ïα╜óα╛Æα╛▒α╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜åα╜╝α╜ªα╝ïα╜úα╜┤α╜éα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜ªα╛│α╜╝α╜ûα╝ïα╜éα╛▓α╛¡α╝ïα╜óα╛Öα╜▓α╜äα╝ïα╜ñα╜╝α╜ªα╝ï α╜ûα╜ªα╜ÿα╝ïα╜éα╜Åα╜ôα╝ïα╜æα╜äα╝ïα╜óα╛Æα╛▒α╜┤α╜æα╝ïα╜ªα╛íα╜║α╜áα╜▓α╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╝ïα╜úα╜┤α╝ïα╜éα╜Öα╜╝α╝ïα╜ûα╜╝α╜óα╝ïα╜ûα╜Åα╜╝α╜ôα╝ïα╜æα╜╝α╝ì α╜ªα╜▓α╝ïα╜Çα╜▓α╜ÿα╝ïα╜éα╛▒α╜▓α╝ïα╜æα╜éα╜╝α╜ôα╝ïα╜öα╝ïα╜ÿα╜äα╝ïα╜ñα╜╝α╜ªα╝ïα╜Çα╛▒α╜▓α╜ªα╝ïα╜áα╝ïα╜ôα╜▓α╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ªα╝ïα╜áα╜æα╜▓α╝ïα╜óα╛ùα╜║α╜ªα╝ïα╜áα╜ûα╛▓α╜äα╝ïα╜áα╜ûα╜æα╜¥α╝ïα╜¿α╜▓α╜ôα╝ì'
      },
      kagyu: {
        title: 'α╜ûα╜Çα╜áα╝ïα╜ûα╜óα╛Æα╛▒α╜┤α╜æα╝ïα╜éα╜Åα╜ôα╝ïα╜Üα╜▓α╜éα╜ª',
        description: 'α╜ûα╜ªα╜ÿα╝ïα╜éα╜Åα╜ôα╝ïα╜æα╜äα╝ïα╜æα╜éα╜║α╝ïα╜ûα╜áα╜▓α╝ïα╜ûα╜ñα╜║α╜ªα╝ïα╜éα╜ëα╜║α╜ôα╝ïα╜úα╜ªα╝ïα╜ªα╛│α╜╝α╜ûα╝ïα╜òα╛▓α╜┤α╜éα╝ïα╜úα╜┤α╝ïα╜üα╝ïα╜éα╛▒α╜┤α╜óα╝ïα╜ªα╛▓α╜╝α╜úα╝ïα╜óα╛Æα╛▒α╜┤α╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜úα╜ÿα╝ïα╜úα╜┤α╝ïα╜ûα╜ªα╛│α╜ûα╝ïα╜ûα╛▒α╝ïα╜óα╛Æα╛▒α╜┤α╜æα╝ïα╜ªα╛ñα╛▓α╜╝α╜æα╝ïα╜áα╜ûα╜æα╝ïα╜ôα╜▓α╝ïα╜úα╜┤α╝ïα╜éα╜Öα╜╝α╝ïα╜ûα╜╝α╜óα╝ïα╜ûα╜Åα╜╝α╜ôα╝ïα╜ÿα╜▓α╝ïα╜éα╜▓α╝ïα╜æα╜╝α╜ôα╝ïα╜úα╜┤α╝ïα╜éα╛▓α╜éα╜ªα╝ïα╜àα╜ôα╝ì'
      },
      festivals: {
        title: 'α╜æα╜ÿα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜┤α╜ªα╝ïα╜ªα╛ƒα╜╝α╜ô',
        description: 'α╜ªα╛▓α╜╝α╜úα╝ïα╜óα╛Æα╛▒α╜┤α╜ôα╝ïα╜áα╜åα╜ÿα╝ï α╜éα╜ªα╜╝α╜úα╝ïα╜áα╜æα╜║α╜ûα╜ªα╝ï α╜æα╜║α╝ïα╜úα╜ªα╝ïα╜ªα╛ñα╛▒α╜▓α╝ïα╜Üα╜╝α╜éα╜ªα╝ïα╜Çα╛▒α╜▓α╝ïα╜æα╜éα╜áα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜æα╜äα╝ïα╜úα╛╖α╜ôα╝ïα╜æα╜┤α╝ïα╜üα╝ïα╜æα╜╝α╜éα╝ïα╜ªα╛úα╝ïα╜Üα╜╝α╜éα╜ªα╝ïα╜àα╜ôα╝ïα╜éα╛▒α╜▓α╝ïα╜ôα╜äα╝ïα╜öα╜áα╜▓α╝ïα╜æα╜┤α╜ªα╝ïα╜ªα╛ƒα╜╝α╜ôα╝ïα╜Üα╜┤α╝ïα╜éα╜▓α╝ïα╜ÿα╛▒α╜╝α╜äα╝ïα╜Üα╜╝α╜óα╝ïα╜úα╜║α╜ôα╝ì'
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
      price: 'Γé╣2,500', 
      duration: '3 days',
      image: 'meditation.webp',
      description: 'Deep meditation retreat with experienced monks'
    },
    { 
      id: 'philosophy', 
      name: t.experiences.philosophy, 
      price: 'Γé╣1,800', 
      duration: '2 days',
      image: 'class.jpeg',
      description: 'Learn Buddhist philosophy and teachings'
    },
    { 
      id: 'homestay', 
      name: t.experiences.homestay, 
      price: 'Γé╣3,200', 
      duration: '5 days',
      image: 'homestay.jpeg',
      description: 'Live with monks and experience daily monastery life'
    },
    { 
      id: 'crafts', 
      name: t.experiences.crafts, 
      price: 'Γé╣800', 
      duration: '1 day',
      image: 'wheel.jpeg',
      description: 'Create traditional prayer wheels with local artisans'
    }
  ];
  

  const handleJourneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!journeyForm.startingPoint || !journeyForm.primaryMonastery || !journeyForm.duration || !journeyForm.spiritualFocus) {
      alert(currentLanguage === 'English' ? 'Please fill all fields' : 
            currentLanguage === 'αñ╣αñ┐αñéαñªαÑÇ' ? 'αñòαÑâαñ¬αñ»αñ╛ αñ╕αñ¡αÑÇ αñ½αñ╝αÑÇαñ▓αÑìαñí αñ¡αñ░αÑçαñé' :
            currentLanguage === 'αñ¿αÑçαñ¬αñ╛αñ▓αÑÇ' ? 'αñòαÑâαñ¬αñ»αñ╛ αñ╕αñ¼αÑê αñ½αñ┐αñ▓αÑìαñíαñ╣αñ░αÑé αñ¡αñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì' :
            'α╜üα╝ïα╜ªα╛Éα╜╝α╜äα╝ïα╜éα╝ïα╜óα╝ïα╜ûα╜Çα╜äα╝ïα╜éα╜ôα╜ä');
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

    const focusKey = (form.spiritualFocus === 'Meditation' || form.spiritualFocus === 'αñºαÑìαñ»αñ╛αñ¿') ? 'Meditation' :
                     (form.spiritualFocus === 'Philosophy' || form.spiritualFocus === 'αñªαñ░αÑìαñ╢αñ¿') ? 'Philosophy' :
                     (form.spiritualFocus === 'Culture' || form.spiritualFocus === 'αñ╕αñéαñ╕αÑìαñòαÑâαññαñ┐') ? 'Culture' : 'Pilgrimage';

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
      title: currentLanguage === 'English' ? `${days}-Day Sacred ${form.spiritualFocus} Voyage` : `${days} αñªαñ┐αñ╡αñ╕αÑÇαñ» αñ¬αñ╡αñ┐αññαÑìαñ░ ${form.spiritualFocus} αñ»αñ╛αññαÑìαñ░αñ╛`,
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
        totalCost: `${experience?.price.replace('Γé╣', '')} ├ù ${bookingData.participants}`
      });
    } catch (error) {
      console.error('Booking failed', error);
      showNotification('Booking failed. Please try again.', 'info');
      return;
    }

    showNotification(currentLanguage === 'English' ? 'Booking confirmed! We will contact you soon.' : 
          currentLanguage === 'αñ╣αñ┐αñéαñªαÑÇ' ? 'αñ¼αÑüαñòαñ┐αñéαñù αñ¬αÑüαñ╖αÑìαñƒ! αñ╣αñ« αñ£αñ▓αÑìαñª αñ╣αÑÇ αñåαñ¬αñ╕αÑç αñ╕αñéαñ¬αñ░αÑìαñò αñòαñ░αÑçαñéαñùαÑçαÑñ' :
          currentLanguage === 'αñ¿αÑçαñ¬αñ╛αñ▓αÑÇ' ? 'αñ¼αÑüαñòαñ┐αñÖ αñ¬αÑüαñ╖αÑìαñƒαñ┐ αñ¡αñ»αÑï! αñ╣αñ╛αñ«αÑÇ αñÜαñ╛αñüαñíαÑê αññαñ¬αñ╛αñêαñéαñ▓αñ╛αñê αñ╕αñ«αÑìαñ¬αñ░αÑìαñò αñùαñ░αÑìαñ¿αÑçαñ¢αÑîαñéαÑñ' :
          'α╜ªα╛Æα╛▓α╜▓α╜éα╝ïα╜áα╜çα╜┤α╜éα╝ïα╜äα╜║α╜ªα╝ïα╜öα╝ïα╜ûα╜ƒα╜╝α╝ïα╜íα╜▓! α╜äα╝ïα╜ûα╜àα╜ªα╝ïα╜Çα╛▒α╜▓α╜ªα╝ïα╜ÿα╝ïα╜áα╜éα╛▒α╜äα╜ªα╝ïα╜öα╜óα╝ïα╜üα╛▒α╜╝α╜æα╝ïα╜æα╜äα╝ïα╜áα╜ûα╛▓α╜║α╜úα╝ïα╜ûα╝ïα╜áα╜ûα╜æα╝ïα╜áα╜╝α╜äα╝ïα╝ì');
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
                <option value="English">≡ƒç¼≡ƒçº English</option>
                <option value="αñ╣αñ┐αñéαñªαÑÇ">≡ƒç«≡ƒç│ αñ╣αñ┐αñéαñªαÑÇ</option>
                <option value="αñ¿αÑçαñ¬αñ╛αñ▓αÑÇ">≡ƒç│≡ƒç╡ αñ¿αÑçαñ¬αñ╛αñ▓αÑÇ</option>
                <option value="α╜áα╜ûα╛▓α╜┤α╜éα╝ïα╜ü">≡ƒÅö∩╕Å α╜áα╜ûα╛▓α╜┤α╜éα╝ïα╜ü</option>
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
                <li>ΓÇó {t.monasteries.dubdi.name}</li>
                <li>ΓÇó {t.monasteries.tashiding.name}</li>
                <li>ΓÇó {t.monasteries.enchey.name}</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-2xl font-bold mb-4">{t.traditions.kagyu.title}</h4>
              <p className="opacity-90 mb-4">
                {t.traditions.kagyu.description}
              </p>
              <ul className="text-sm opacity-80 space-y-1">
                <li>ΓÇó {t.monasteries.rumtek.name}</li>
                <li>ΓÇó {t.monasteries.ralang.name}</li>
                 <li>ΓÇó {t.monasteries.namchi.name}</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-2xl font-bold mb-4">{t.traditions.festivals.title}</h4>
              <p className="opacity-90 mb-4">
                {t.traditions.festivals.description}
              </p>
              <ul className="text-sm opacity-80 space-y-1">
                <li>ΓÇó Losar (Tibetan New Year)</li>
                <li>ΓÇó Saga Dawa Festival</li>
                <li>ΓÇó Bumchu Ceremony</li>
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
      <p className="text-gray-600 mt-2 text-lg">Innovators ΓÇó Dreamers ΓÇó Builders</p>
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
        showNotification(currentLanguage === 'English' ? 'Personalize your itinerary here!' : 'αñ»αñ╣αñ╛αñü αñàαñ¬αñ¿αÑÇ αñ»αñ╛αññαÑìαñ░αñ╛ αñòαñ╛αñ░αÑìαñ»αñòαÑìαñ░αñ« αñòαÑï αñàαñ¿αÑüαñòαÑéαñ▓αñ┐αññ αñòαñ░αÑçαñé!');
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
      DonΓÇÖt fill this out if you're human: <input name="bot-field" />
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
                        if (day.focus?.includes('Meditation') || day.focus?.includes('αñºαÑìαñ»αñ╛αñ¿')) Icon = Clock;
                        else if (day.focus?.includes('Philosophy') || day.focus?.includes('αñªαñ░αÑìαñ╢αñ¿')) Icon = BookOpen;
                        else if (day.focus?.includes('Culture') || day.focus?.includes('αñ╕αñéαñ╕αÑìαñòαÑâαññαñ┐')) Icon = Music;
                        else if (day.focus?.includes('Pilgrimage') || day.focus?.includes('αññαÑÇαñ░αÑìαñÑαñ»αñ╛αññαÑìαñ░αñ╛')) Icon = MapPin;
                        
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
                   currentLanguage === 'αñ╣αñ┐αñéαñªαÑÇ' ? 'αñ»αñ╣ αñ»αñ╛αññαÑìαñ░αñ╛ αñòαñ╛αñ░αÑìαñ»αñòαÑìαñ░αñ« αñåαñ¬αñòαÑÇ αñ¬αÑìαñ░αñ╛αñÑαñ«αñ┐αñòαññαñ╛αñôαñé αñòαÑç αñåαñºαñ╛αñ░ αñ¬αñ░ αñàαñ¿αÑüαñòαÑéαñ▓αñ┐αññ αñ╣αÑêαÑñ αñàαñ¬αñ¿αÑÇ αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛ αñ¼αÑüαñò αñòαñ░αñ¿αÑç αñòαÑç αñ▓αñ┐αñÅ αñ╣αñ«αñ╕αÑç αñ╕αñéαñ¬αñ░αÑìαñò αñòαñ░αÑçαñé!' :
                   currentLanguage === 'αñ¿αÑçαñ¬αñ╛αñ▓αÑÇ' ? 'αñ»αÑï αñ»αñ╛αññαÑìαñ░αñ╛ αñòαñ╛αñ░αÑìαñ»αñòαÑìαñ░αñ« αññαñ¬αñ╛αñêαñéαñòαÑï αñ¬αÑìαñ░αñ╛αñÑαñ«αñ┐αñòαññαñ╛αñ╣αñ░αÑéαñòαÑï αñåαñºαñ╛αñ░αñ«αñ╛ αñàαñ¿αÑüαñòαÑéαñ▓αñ┐αññ αñ¢αÑñ αññαñ¬αñ╛αñêαñéαñòαÑï αñåαñºαÑìαñ»αñ╛αññαÑìαñ«αñ┐αñò αñ»αñ╛αññαÑìαñ░αñ╛ αñ¼αÑüαñò αñùαñ░αÑìαñ¿ αñ╣αñ╛αñ«αÑÇαñ▓αñ╛αñê αñ╕αñ«αÑìαñ¬αñ░αÑìαñò αñùαñ░αÑìαñ¿αÑüαñ╣αÑïαñ╕αÑì!' :
                   'α╜áα╝ïα╜ôα╜▓α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜úα╜ªα╝ïα╜óα╜▓α╜ÿα╝ïα╜áα╜æα╜▓α╝ïα╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜æα╜éα╜áα╝ïα╜áα╜æα╜╝α╜æα╝ïα╜úα╜┤α╝ïα╜éα╜₧α╜▓α╝ïα╜ûα╜₧α╜éα╝ïα╜ªα╛ƒα╜║α╝ïα╜ûα╜ƒα╜╝α╝ïα╜íα╜╝α╜æα╝ì α╜üα╛▒α╜╝α╜æα╝ïα╜Çα╛▒α╜▓α╝ïα╜ªα╛ñα╛▒α╜╝α╜æα╝ïα╜öα╜áα╜▓α╝ïα╜áα╜éα╛▓α╜┤α╜úα╝ïα╜ûα╜ªα╛Éα╛▒α╜╝α╜æα╝ïα╜ªα╛Æα╛▓α╜▓α╜éα╝ïα╜áα╜çα╜┤α╜éα╝ïα╜áα╜ûα╜æα╝ïα╜ôα╜▓α╝ïα╜úα╜┤α╝ïα╜äα╝ïα╜ûα╜àα╜ªα╝ïα╜æα╜äα╝ïα╜áα╜ûα╛▓α╜║α╜úα╝ïα╜ûα╝ïα╜áα╜ûα╜æ!'}
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
                          {experience.price} ├ù {bookingData.participants}
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
