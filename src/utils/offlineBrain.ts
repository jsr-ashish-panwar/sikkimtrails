export const offlineBrain = {
  knowledge: [
    {
      keywords: ['food', 'eat', 'dish', 'cuisine', 'momo', 'thukpa'],
      answer: "🍲 **Sikkim Food Guide**:\n\n• **Momos**: The king of snacks! Steamed dumplings filled with veg or meat.\n• **Thukpa**: Soul-warming noodle soup with local greens.\n• **Phagshapa**: A traditional pork stew with radish and dry chilies.\n• **Gundruk**: Fermented leafy greens, unique to the region.\n• **Sael Roti**: Traditional ring-shaped bread, often served during festivals.\n\nDon't forget to visit the **Temi Tea Garden** for some authentic Sikkim tea!"
    },
    {
      keywords: ['monastery', 'monasteries', 'temple', 'sacred', 'buddhist'],
      answer: "📍 **Top Monasteries to Visit**:\n\n• **Rumtek Monastery**: The largest in Sikkim and seat of the Karmapa.\n• **Enchey Monastery**: Located above Gangtok, blessed by Lama Drupthob Karpo.\n• **Tashiding Monastery**: Known for the 'Bhumchu' (holy water) festival.\n• **Namchi (Samdruptse)**: Home to the 135ft Guru Rinpoche statue.\n• **Dubdi Monastery**: The oldest monastery in Sikkim, near Yuksom.\n\nMost monasteries are open from 6:00 AM to 6:00 PM. Please maintain silence and respect tradition."
    },
    {
      keywords: ['permit', 'rap', 'pap', 'id', 'document'],
      answer: "⚠️ **Permit Alert (RAP/PAP)**:\n\nSikkim is a border state. You need **Restricted Area Permits (RAP)** or **Protected Area Permits (PAP)** for:\n• **Tsomgo Lake & Nathu La**\n• **North Sikkim (Lachen, Lachung, Gurudongmar)**\n• **Trekking in high-altitude zones**\n\nHow to get them: Provide 2 passport photos and ID proof (Voter ID/Passport/Driving License) to a registered travel agent 24 hours in advance."
    },
    {
      keywords: ['package', 'tour', 'price', 'book', 'trip', 'itinerary'],
      answer: "🏔️ **Our Tour Packages**:\n\nWe offer curated experiences ranging from 3-day spiritual retreats to 7-day adventure trails. You can view our available packages by clicking the 'Tour Packages' chip or checking the Packages section! [SHOW_PACKAGES]"
    },
    {
      keywords: ['emergency', 'help', 'lost', 'police', 'hospital', 'doctor'],
      answer: "🆘 **Emergency Contacts**:\n\n• **Tourist Police**: 1097\n• **Police Control Room**: 100\n• **Ambulance**: 102\n• **Women Helpline**: 1091\n\nPlease stay calm and stay in a public area. I can show you the emergency panel here: [SHOW_EMERGENCY]"
    },
    {
      keywords: ['weather', 'best time', 'visit', 'season'],
      answer: "🌤️ **Best Time to Visit**:\n\n• **March to June**: Perfect weather for sightseeing and flowers.\n• **September to November**: Clear views of Kanchenjunga after the monsoon.\n• **December to February**: Heavy snow in North Sikkim—great for snow lovers!\n\nAvoid July-August due to heavy monsoon landslides."
    },
    {
      keywords: ['hello', 'hi', 'namaste', 'greeting'],
      answer: "Namaste! I am Saarthi, your spiritual guide to Sikkim. I can help you with information about **Monasteries**, **Local Food**, **Permits**, or **Tour Packages**. What are you looking for today?"
    }
  ],
  
  getFallback: (query: string) => {
    const q = query.toLowerCase();
    for (const item of offlineBrain.knowledge) {
      if (item.keywords.some(k => q.includes(k))) {
        return item.answer;
      }
    }
    return "Namaste! I'm currently operating in low-connectivity mode in the Himalayas. I have deep knowledge about **Sikkim's Food**, **Monasteries**, **Permits**, and **Tours**. Feel free to ask about these!";
  }
};
