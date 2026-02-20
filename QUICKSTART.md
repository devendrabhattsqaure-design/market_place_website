# 🚀 Quick Start Guide

Get the MarketHub application running in minutes!

## ⚡ 5-Minute Setup

### 1. Clone/Download the Project
```bash
# Navigate to your project directory
cd /path/to/markethubd
```

### 2. Copy Environment File
```bash
# Copy the example environment file
cp .env.example .env.local
```

### 3. Edit Environment Variables
```bash
# Open .env.local and update these essential variables:
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/markethub
FRONTEND_URL=http://localhost:3000
JWT_SECRET=change_this_to_a_secure_random_key_32_chars_min
```

### 4. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm install
# or
pnpm install
```

### 5. Start MongoDB
```bash
# Option A: Local MongoDB
mongod

# Option B: Use MongoDB Atlas (Cloud)
# Update MONGODB_URI in .env.local with your connection string
```

### 6. Start the Application
```bash
# Terminal 1 - Backend (Port 5000)
cd backend
npm start

# Terminal 2 - Frontend (Port 3000)
npm run dev
```

✅ **Done!** Access the application at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

---

## 📋 Complete Setup Steps

### Step 1: Prerequisites Check
- ✅ Node.js v16+ installed
- ✅ MongoDB running locally or MongoDB Atlas account
- ✅ npm/pnpm installed

### Step 2: Environment Setup
```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Output: a1b2c3d4e5f6... (copy this)
```

### Step 3: Configuration
Edit `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/markethub
JWT_SECRET=paste_the_generated_secret_here
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000
```

### Step 4: Install and Run
```bash
# Install dependencies
npm install

# Terminal 1: Start Backend
cd backend && npm start
# Expected output: "Server running on port 5000"

# Terminal 2: Start Frontend
npm run dev
# Expected output: "Ready in xxxx ms"
```

### Step 5: Verify Connection
Open browser and visit:
```
http://localhost:3000
```

If you see the homepage, you're connected! ✅

---

## 🔌 Testing the API Connection

### Using cURL
```bash
# Test backend health check
curl http://localhost:5000/health

# Expected response:
# {"status":"ok","timestamp":"2024-02-20T...","uptime":123.456}
```

### Using Frontend
Navigate to any protected page (Dashboard, Cart, etc.) and check browser console for network requests to `http://localhost:5000/api/*`

---

## 🐛 Common Issues & Solutions

### Issue: "MongoDB Connection Refused"
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
1. Start MongoDB: `mongod`
2. Or update `MONGODB_URI` to use MongoDB Atlas
3. Check MongoDB service: `brew services list`

### Issue: "Port 5000 Already in Use"
```bash
# Kill the process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Issue: "CORS Error in Console"
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Verify `FRONTEND_URL` matches your frontend URL in `.env.local`
- Backend must be running on `http://localhost:5000`

### Issue: "Cannot GET /api/..."
```
404 Not Found
```

**Solution:**
- Backend server is not running
- Check backend is listening on port 5000
- Verify API endpoint exists

---

## 📁 Project File Structure

```
markethubd/
├── backend/              # Node.js/Express backend (JavaScript)
│   ├── config/          # Configuration
│   ├── middleware/      # Middleware files
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── models/          # Mongoose models
│   ├── utils/           # Utilities
│   ├── index.js         # Entry point
│   └── server.js        # Server setup
│
├── app/                 # Next.js frontend
│   ├── page.tsx        # Home page
│   ├── login/          # Login pages
│   ├── dashboard/      # Dashboard
│   └── layout.tsx      # Root layout
│
├── components/          # React components
├── lib/                 # Frontend utilities
├── .env.local          # Environment variables (create this)
├── .env.example        # Example env file
├── package.json        # Dependencies
└── README.md           # Full documentation
```

---

## 🎯 Key Endpoints for Testing

### Authentication
```
POST   http://localhost:5000/api/auth/signup
POST   http://localhost:5000/api/auth/login
GET    http://localhost:5000/api/auth/me          (with token)
```

### Products
```
GET    http://localhost:5000/api/products
GET    http://localhost:5000/api/products/:id
POST   http://localhost:5000/api/products         (business only)
```

### Cart
```
GET    http://localhost:5000/api/cart             (with token)
POST   http://localhost:5000/api/cart             (with token)
```

---

## 🧪 Making Your First API Call

### In Frontend Component
```jsx
'use client';

import { useEffect, useState } from 'react';

export default function TestAPI() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    // Test backend connection
    fetch('http://localhost:5000/health')
      .then(res => res.json())
      .then(data => setStatus(`Connected: ${data.status}`))
      .catch(err => setStatus(`Error: ${err.message}`));
  }, []);

  return <div>{status}</div>;
}
```

### Via cURL (Terminal)
```bash
# Test health endpoint
curl http://localhost:5000/health

# Create a user account
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123",
    "confirmPassword": "Password123",
    "name": "John Doe",
    "phone": "9876543210",
    "role": "buyer"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123"
  }'
```

---

## 🚀 Production Deployment

### Before Deploying:
1. [ ] Update `.env.local` with production values
2. [ ] Set `NODE_ENV=production`
3. [ ] Use MongoDB Atlas for database
4. [ ] Set `FRONTEND_URL` to your domain
5. [ ] Use strong JWT_SECRET (32+ characters)
6. [ ] Enable HTTPS for all connections

### Deploy Backend
```bash
# On your server
npm install
npm run build (if applicable)
npm start
```

### Deploy Frontend
```bash
# Build Next.js
npm run build

# Start production server
npm start
```

---

## 📚 Additional Resources

- **Full Documentation**: See `README.md`
- **API Endpoints**: See `README.md` -> API Endpoints section
- **Environment Setup**: See `README.md` -> Environment Configuration

---

## 💡 Tips

- Use `npm run dev` for hot-reload during development
- Check browser DevTools > Network tab to see API calls
- Use Postman or Insomnia for API testing
- Keep `.env.local` secure and never commit it
- Generate strong secrets with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## 🆘 Need Help?

1. Check the **Troubleshooting** section in `README.md`
2. Review error messages in terminal and browser console
3. Ensure all services (MongoDB, Backend, Frontend) are running
4. Verify environment variables are set correctly

---

**Happy Coding!** 🎉

If you encounter any issues, refer to the full documentation in `README.md`.
