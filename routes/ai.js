const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/generate', auth, async (req, res) => {
  try {
    const { destination, startDate, endDate, budget, travelers, interests } = req.body;
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const perDay = Math.round(Number(budget) / days);
    const interestList = interests.length > 0 ? interests : ['Sightseeing'];

    const activities = {
      '🏖️ Beaches': ['Visit the main beach and enjoy the waves', 'Try water sports — jet skiing, parasailing', 'Explore hidden coves and scenic spots', 'Beach bonfire and seafood dinner'],
      '🍜 Food & Cuisine': ['Visit the local food market for breakfast', 'Take a street food tour', 'Try the signature local dish at a famous restaurant', 'Attend a cooking class'],
      '🌙 Nightlife': ['Explore the nightlife district', 'Visit a rooftop bar with city views', 'Attend a live music event', 'Try the famous local cocktails'],
      '🧗 Adventure': ['Go trekking or hiking', 'Try rock climbing or zip-lining', 'River rafting or kayaking', 'Explore caves or hidden trails'],
      '🏛️ Culture & Arts': ['Visit the main museum', 'Explore art galleries', 'Attend a cultural performance', 'Visit heritage monuments'],
      '🌿 Nature & Hiking': ['Morning nature walk', 'Visit national park or wildlife sanctuary', 'Bird watching tour', 'Sunset hike to a viewpoint'],
      '🏛️ History': ['Visit the old city area', 'Explore ancient temples or forts', 'Guided heritage walk', 'Visit the history museum'],
      '📸 Photography': ['Golden hour shoot at iconic landmark', 'Street photography in the old market', 'Visit the most photogenic viewpoint', 'Sunset photography session'],
      '🛍️ Shopping': ['Explore the local bazaar', 'Visit the main shopping street', 'Buy local handicrafts and souvenirs', 'Visit the weekend flea market'],
      '🧘 Wellness & Spa': ['Morning yoga session', 'Traditional massage and spa treatment', 'Meditation at a peaceful spot', 'Ayurvedic treatment session'],
      '🎵 Music & Festivals': ['Attend a local music performance', 'Visit a cultural festival', 'Explore the music scene', 'Watch traditional dance performance'],
      '🐘 Wildlife & Safari': ['Early morning safari', 'Visit the wildlife sanctuary', 'Bird watching tour', 'Nature reserve walk'],
      '💑 Romantic Getaway': ['Sunset boat ride', 'Candlelit dinner at a scenic restaurant', 'Couple spa session', 'Private beach picnic'],
      '👨‍👩‍👧 Family Friendly': ['Visit the amusement or theme park', 'Interactive museum or science center', 'Family boat ride', 'Visit the zoo or aquarium'],
    };

    const getActivities = (day) => {
      const acts = [];
      interestList.forEach(interest => {
        if (activities[interest]) {
          acts.push(activities[interest][day % activities[interest].length]);
        }
      });
      if (acts.length === 0) acts.push('Explore local attractions', 'Visit popular landmarks', 'Try local cuisine');
      return acts.slice(0, 3);
    };

    const hotels = {
      budget: { name: 'Budget Guesthouse / Hostel', price: Math.round(perDay * 0.2) },
      mid: { name: '3-Star Hotel', price: Math.round(perDay * 0.35) },
      premium: { name: '4-Star Resort', price: Math.round(perDay * 0.5) },
    };

    const hotelTier = perDay < 1500 ? 'budget' : perDay < 3000 ? 'mid' : 'premium';
    const hotel = hotels[hotelTier];

    let itinerary = `✈️ ${days}-DAY TRIP TO ${destination.toUpperCase()}\n`;
    itinerary += `👥 Travelers: ${travelers} | 💰 Budget: ₹${Number(budget).toLocaleString()}\n`;
    itinerary += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    for (let i = 1; i <= days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i - 1);
      const dateStr = date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
      const acts = getActivities(i - 1);

      itinerary += `📅 DAY ${i} — ${dateStr}\n`;
      itinerary += `🌅 Morning: ${acts[0] || 'Explore local area'}\n`;
      itinerary += `☀️ Afternoon: ${acts[1] || 'Visit popular attractions'}\n`;
      itinerary += `🌙 Evening: ${acts[2] || 'Try local cuisine and relax'}\n`;
      itinerary += `\n`;
    }

    itinerary += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    itinerary += `🏨 RECOMMENDED STAY\n`;
    itinerary += `${hotel.name} — ≈ ₹${hotel.price.toLocaleString()}/night\n`;
    itinerary += `Total accommodation: ≈ ₹${(hotel.price * days).toLocaleString()}\n\n`;

    itinerary += `🚗 TRANSPORT\n`;
    itinerary += `• Local auto/cab: ₹300–500/day\n`;
    itinerary += `• Scooter rental: ₹250–400/day\n`;
    itinerary += `• Intercity travel: ₹500–2,000 (depending on distance)\n\n`;

    itinerary += `💰 BUDGET BREAKDOWN\n`;
    const accommodation = hotel.price * days;
    const transport = Math.round(perDay * 0.15) * days;
    const food = Math.round(perDay * 0.25) * days;
    const activities_cost = Number(budget) - accommodation - transport - food;

    itinerary += `🏨 Accommodation: ₹${accommodation.toLocaleString()}\n`;
    itinerary += `🍽️ Food & Dining: ₹${food.toLocaleString()}\n`;
    itinerary += `🚗 Transport: ₹${transport.toLocaleString()}\n`;
    itinerary += `🎯 Activities & Shopping: ₹${Math.max(activities_cost, 0).toLocaleString()}\n`;
    itinerary += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    itinerary += `✅ TOTAL: ₹${Number(budget).toLocaleString()}`;

    res.json({ itinerary });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to generate itinerary' });
  }
});

module.exports = router;