# TravelMind — Backend API

The backend service for TravelMind, an AI-powered travel planning web application. Built with Node.js, Express, and MongoDB.

🌐 **Live API:** https://travelmind-api.onrender.com

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT (JSON Web Tokens) |
| Password Hashing | bcryptjs |
| Itinerary Generation | Smart template engine |
| Deployment | Render |

---

## 📁 Project Structure

```
travelmind/
├── models/
│   ├── User.js          # User schema (username, email, password)
│   └── Trip.js          # Trip schema (destination, dates, budget, itinerary)
├── routes/
│   ├── auth.js          # Register and login endpoints
│   ├── trips.js         # Save, fetch, delete trip endpoints
│   └── ai.js            # Smart itinerary generator
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── .env                 # Environment variables (not committed)
├── server.js            # Entry point
└── package.json
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Trips
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/trips/save` | Save a new trip | ✅ |
| GET | `/api/trips/mytrips` | Get all trips for logged-in user | ✅ |
| DELETE | `/api/trips/:id` | Delete a trip by ID | ✅ |

### AI Itinerary Generator
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/ai/generate` | Generate day-by-day itinerary | ✅ |

---

## 🔐 Authentication Flow

1. User registers → password hashed with bcrypt → saved to MongoDB
2. User logs in → JWT token generated and returned
3. Protected routes require `Authorization: Bearer <token>` header
4. Token expires in 7 days

---

## 🤖 Itinerary Generator

The `/api/ai/generate` endpoint accepts:
```json
{
  "destination": "Goa",
  "startDate": "2026-07-01",
  "endDate": "2026-07-05",
  "budget": 15000,
  "travelers": "2",
  "interests": ["Beaches", "Food", "Nightlife"]
}
```

And returns a complete itinerary including:
- Day-by-day activities (morning, afternoon, evening)
- Recommended stays with prices
- Transport options
- Full budget breakdown

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/GayathriDeshaveni/travelmind.git
cd travelmind

# 2. Install dependencies
npm install

# 3. Create .env file
touch .env
```

Add these to `.env`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

```bash
# 4. Start the server
node server.js
```

Server runs at `http://localhost:5000`

---

## 🌍 Deployment

Deployed on **Render** (free tier):
- Auto-deploys on every push to `main` branch
- Environment variables configured in Render dashboard
- MongoDB Atlas for cloud database

---

## 👩‍💻 Author

**Gayathri Deshaveni**
- GitHub: [@GayathriDeshaveni](https://github.com/GayathriDeshaveni)
- Frontend: [travelmind-frontend.vercel.app](https://travelmind-frontend.vercel.app)
