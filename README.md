# MarketHub - Full-Stack E-commerce Platform

A modern full-stack marketplace application built with Next.js (Frontend) and Node.js/Express (Backend), featuring buyer and business seller functionalities with MongoDB integration.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Connecting Frontend and Backend](#connecting-frontend-and-backend)
- [API Endpoints](#api-endpoints)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Database Schema](#database-schema)
- [Troubleshooting](#troubleshooting)

---

## 📁 Project Structure

```
project-root/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Configuration files
│   │   ├── constants.js    # Application constants
│   │   ├── database.js     # MongoDB connection
│   │   └── environment.js  # Environment variables
│   ├── middleware/         # Custom middleware
│   │   ├── auth.middleware.js      # JWT authentication
│   │   ├── errorHandler.js         # Error handling
│   │   ├── logging.js              # Request logging
│   │   └── validation.js           # Input validation
│   ├── routes/            # API route handlers
│   ├── controllers/       # Business logic
│   ├── models/           # Mongoose schemas
│   ├── utils/            # Utility functions
│   │   ├── jwt.js        # JWT token management
│   │   ├── helpers.js    # Helper functions
│   │   ├── validators.js # Validation schemas
│   │   └── whatsapp.js   # WhatsApp integration
│   ├── types/            # Type definitions & errors
│   ├── index.js          # Backend entry point
│   └── server.js         # Express server setup
│
├── app/                     # Next.js frontend (App Router)
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout
│   ├── login/              # Login pages
│   ├── signup/             # Signup pages
│   ├── dashboard/          # Dashboard pages
│   ├── buyer/              # Buyer routes
│   ├── globals.css         # Global styles
│   └── api/               # Optional API routes
│
├── components/              # Reusable React components
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── layout/             # Layout components
│   ├── product/            # Product components
│   └── business/           # Business components
│
├── context/                 # React context providers
│   └── CartContext.tsx     # Shopping cart state
│
├── lib/                     # Utility functions
│   ├── auth.ts            # Authentication helpers
│   ├── utils.ts           # General utilities
│   └── whatsappUtils.ts   # WhatsApp helpers
│
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.mjs         # Next.js configuration
```

---

## 🔧 Prerequisites

### Required Software
- **Node.js**: v16.0.0 or higher
- **npm** or **pnpm**: Package manager
- **MongoDB**: Local or cloud instance (MongoDB Atlas)
- **Git**: Version control (optional)

### Accounts & Services
- MongoDB Atlas account (for cloud database)
- Optional: WhatsApp Business API credentials

---

## 🚀 Backend Setup

### Step 1: Install Backend Dependencies

```bash
# Navigate to project root
cd /path/to/project

# Install all dependencies (includes backend)
npm install
# or
pnpm install
```

### Step 2: Create Environment Variables

Create a `.env.local` file in the project root:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/markethub
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/markethub

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRE=30d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Backend API URL
API_URL=http://localhost:5000

# Optional: Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@markethub.com

# Optional: WhatsApp Configuration
WHATSAPP_API_URL=https://api.whatsapp.com/send

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads
```

### Step 3: Start MongoDB

**Local MongoDB:**
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
mongod
```

**Using MongoDB Atlas (Cloud):**
- Create a cluster at mongodb.com/cloud/atlas
- Get your connection string
- Update `MONGODB_URI` in `.env.local`

### Step 4: Start the Backend Server

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm run start
```

The backend will start on `http://localhost:5000`

---

## 🎨 Frontend Setup

The frontend is built with Next.js 16 and is already configured in the same project.

### Step 1: Install Frontend Dependencies

Already done in the backend setup. All dependencies are in `package.json`.

### Step 2: Configure Environment Variables

Add to your `.env.local` file (same file as backend):

```env
# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=MarketHub
```

Note: Variables starting with `NEXT_PUBLIC_` are exposed to the browser.

### Step 3: Start the Frontend

```bash
# Development mode
npm run dev

# The frontend will run on http://localhost:3000
```

---

## 🔗 Connecting Frontend and Backend

### 1. API Base URL Configuration

#### In Frontend Files

Update your API calls to use the environment variable:

```typescript
// lib/api.ts or similar
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // For cookies/auth
    });
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return response.json();
  },
};
```

#### Example API Call in Component

```typescript
'use client';

import { useState } from 'react';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();
      
      if (data.success) {
        // Store token (in localStorage or httpOnly cookie)
        localStorage.setItem('authToken', data.data.token);
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### 2. CORS Configuration

The backend is already configured with CORS. Make sure:

1. Backend `FRONTEND_URL` matches your frontend URL:
   ```
   FRONTEND_URL=http://localhost:3000
   ```

2. Requests from frontend include proper headers:
   ```javascript
   headers: {
     'Content-Type': 'application/json',
   }
   ```

### 3. Authentication Token Management

#### Storing the Token

```typescript
// After successful login
const response = await fetch('/api/auth/login', {...});
const data = await response.json();

if (data.success) {
  localStorage.setItem('authToken', data.data.token);
  localStorage.setItem('refreshToken', data.data.refreshToken);
}
```

#### Sending Token in Requests

```typescript
// Add token to protected routes
const token = localStorage.getItem('authToken');

const response = await fetch('/api/protected-endpoint', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  credentials: 'include',
});
```

#### Create an API Utility

```typescript
// lib/api-client.ts
export class ApiClient {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  private getAuthHeader() {
    const token = localStorage.getItem('authToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
      credentials: 'include',
    });

    const data = await response.json();

    // Handle token refresh if needed
    if (response.status === 401) {
      // Try to refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        // Call refresh endpoint
      }
    }

    return data;
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
```

---

## 📡 API Endpoints

### Authentication Routes

```
POST   /api/auth/signup          - Register new user
POST   /api/auth/login           - Login user
POST   /api/auth/logout          - Logout user
POST   /api/auth/refresh-token   - Refresh access token
GET    /api/auth/me              - Get current user (protected)
```

### User Routes

```
GET    /api/users/:id            - Get user profile
PUT    /api/users/:id            - Update user profile
GET    /api/users/:id/dashboard  - Get user dashboard (protected)
```

### Product Routes

```
GET    /api/products             - Get all products
GET    /api/products/:id         - Get product details
POST   /api/products             - Create product (business only)
PUT    /api/products/:id         - Update product (protected)
DELETE /api/products/:id         - Delete product (protected)
```

### Cart Routes

```
GET    /api/cart                 - Get user cart (protected)
POST   /api/cart                 - Add item to cart (protected)
PUT    /api/cart/:itemId         - Update cart item (protected)
DELETE /api/cart/:itemId         - Remove from cart (protected)
```

### Order Routes

```
GET    /api/orders               - Get user orders (protected)
POST   /api/orders               - Create order (protected)
GET    /api/orders/:id           - Get order details (protected)
PUT    /api/orders/:id           - Update order status (protected)
```

### Review Routes

```
GET    /api/reviews/:productId   - Get product reviews
POST   /api/reviews              - Create review (protected)
PUT    /api/reviews/:id          - Update review (protected)
DELETE /api/reviews/:id          - Delete review (protected)
```

### Contact Routes

```
POST   /api/contact              - Submit contact form
GET    /api/contact              - Get contact messages (admin)
```

### Feedback Routes

```
POST   /api/feedback             - Submit feedback
GET    /api/feedback             - Get feedback (admin)
```

---

## 🔐 Environment Configuration

### Development vs Production

**Development (.env.local)**
```env
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000
JWT_SECRET=dev_secret_key_change_this
```

**Production (.env.production)**
```env
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
API_URL=https://api.yourdomain.com
JWT_SECRET=generate_a_strong_secret_key
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

### Security Best Practices

1. **Never commit `.env.local` or sensitive files**
   ```bash
   # Add to .gitignore
   .env.local
   .env.*.local
   uploads/
   node_modules/
   dist/
   .next/
   ```

2. **Use strong JWT secrets** (at least 32 characters)
   ```bash
   # Generate a strong secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Update environment variables for production:**
   - Use environment variable management service
   - Enable HTTPS for all API calls
   - Set secure CORS origins

---

## ▶️ Running the Application

### Option 1: Run Both Frontend and Backend

**Terminal 1 (Backend):**
```bash
npm run dev:backend
# Or manually:
cd backend && npm start
```

**Terminal 2 (Frontend):**
```bash
npm run dev:frontend
# Or manually:
npm run dev
```

### Option 2: Single Command

Create a `package.json` script:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm start",
    "dev:frontend": "next dev"
  }
}
```

Then run:
```bash
npm run dev
```

### Option 3: Docker (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: markethub

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      MONGODB_URI: mongodb://mongodb:27017/markethub
      NODE_ENV: development

  frontend:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:5000
```

Run with:
```bash
docker-compose up
```

---

## 🗄️ Database Schema

### Collections Overview

- **Users**: User accounts (buyers and businesses)
- **Products**: Product listings
- **Cart**: Shopping cart items
- **Orders**: Customer orders
- **Reviews**: Product reviews and ratings
- **Feedback**: User feedback and suggestions
- **Contact**: Contact form submissions

### Sample MongoDB Queries

```javascript
// Get all products with price filter
db.products.find({ price: { $gte: 100, $lte: 5000 } });

// Get user orders
db.orders.find({ userId: ObjectId("...") });

// Get product reviews
db.reviews.aggregate([
  { $match: { productId: ObjectId("...") } },
  { $group: { _id: null, avgRating: { $avg: "$rating" } } }
]);
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env.local`
- Verify MongoDB service status: `brew services list`

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Verify `FRONTEND_URL` in backend `.env.local` matches your frontend URL
- Check backend server is running on correct port
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`

### Authentication Issues

```
401 Unauthorized - Invalid token
```

**Solution:**
- Check token is stored correctly in localStorage
- Verify token is sent in Authorization header
- Check JWT_SECRET matches between login and protected routes
- Verify token hasn't expired

### API Call Timeout

```
Error: timeout of 5000ms exceeded
```

**Solution:**
- Check backend server is running
- Verify API endpoint exists
- Check network connectivity
- Increase fetch timeout in API client

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Guide](https://jwt.io/introduction)
- [REST API Best Practices](https://restfulapi.net/)

---

## 📝 Notes

- The backend uses **JavaScript (Node.js)** instead of TypeScript for development simplicity
- All environment variables are centralized in `backend/config/environment.js`
- The frontend is built with **Next.js 16** using the App Router
- Authentication uses **JWT tokens** for stateless authentication
- Database uses **MongoDB** for flexible document storage
- API responses follow a consistent JSON structure

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

**Last Updated:** February 2026
**Version:** 1.0.0
#   m a r k e t _ p l a c e _ w e b s i t e  
 