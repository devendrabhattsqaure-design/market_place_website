# 🔗 Frontend-Backend API Connection Guide

Complete guide on how to connect your Next.js frontend with the Node.js/Express backend API.

---

## 📌 Overview

- **Backend**: Runs on `http://localhost:5000`
- **Frontend**: Runs on `http://localhost:3000`
- **Communication**: HTTP requests (fetch API / Axios)
- **Authentication**: JWT tokens in Authorization header

---

## 1️⃣ Environment Setup

### Backend Environment Variables
File: `.env.local`
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/markethub
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
```

### Frontend Environment Variables
File: `.env.local` (same file)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=MarketHub
```

**Note:** Variables starting with `NEXT_PUBLIC_` are accessible in the browser!

---

## 2️⃣ Create API Client Utility

### Option A: Using Fetch API (Recommended)

Create `lib/api-client.ts`:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') {
    this.baseUrl = baseUrl;
  }

  private getAuthHeader(): Record<string, string> {
    if (typeof window === 'undefined') {
      // Server-side rendering - no token
      return {};
    }

    const token = localStorage.getItem('authToken');
    if (!token) return {};

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader(),
          ...options.headers,
        },
        credentials: 'include', // For cookies
      });

      const data: ApiResponse<T> = await response.json();

      // Handle token expiration
      if (response.status === 401 && data.message.includes('expired')) {
        this.refreshToken();
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        message: 'Network error',
        error: error instanceof Error ? error.message : 'Unknown error',
        statusCode: 0,
      };
    }
  }

  // GET Request
  async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST Request
  async post<T = any>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // PUT Request
  async put<T = any>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  // PATCH Request
  async patch<T = any>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  // DELETE Request
  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Refresh Token
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        this.logout();
        return false;
      }

      const response = await fetch(`${this.baseUrl}/api/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data: any = await response.json();

      if (data.success && data.data?.token) {
        localStorage.setItem('authToken', data.data.token);
        return true;
      } else {
        this.logout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.logout();
      return false;
    }
  }

  // Clear auth and redirect to login
  private logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
```

### Option B: Using Axios

Install Axios:
```bash
npm install axios
```

Create `lib/api-axios.ts`:

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor - add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
          { refreshToken }
        );

        const newToken = response.data.data.token;
        localStorage.setItem('authToken', newToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 3️⃣ Making API Calls in Components

### Example 1: Login Component

```typescript
'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'buyer' | 'business';
  };
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post<LoginResponse>('/api/auth/login', {
        email,
        password,
      });

      if (response.success && response.data) {
        // Store tokens
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Example 2: Products List Component

```typescript
'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
}

interface ApiResponse {
  success: boolean;
  data: {
    data: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get<any>(
          '/api/products?page=1&limit=20'
        );

        if (response.success && response.data) {
          setProducts(response.data.data);
        } else {
          setError(response.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError('An error occurred while fetching products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border rounded-lg p-4">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">₹{product.price}</span>
            <span className="text-sm text-gray-500">
              Stock: {product.stock}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Add to Cart (Protected Route)

```typescript
'use client';

import { apiClient } from '@/lib/api-client';

interface CartItem {
  productId: string;
  quantity: number;
}

async function addToCart(productId: string, quantity: number = 1) {
  try {
    const response = await apiClient.post('/api/cart', {
      productId,
      quantity,
    });

    if (response.success) {
      alert('Added to cart successfully!');
      return response.data;
    } else {
      alert(response.message || 'Failed to add to cart');
    }
  } catch (error) {
    alert('An error occurred');
    console.error(error);
  }
}

export default function AddToCartButton({ productId }: { productId: string }) {
  return (
    <button
      onClick={() => addToCart(productId)}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      Add to Cart
    </button>
  );
}
```

---

## 4️⃣ Common API Patterns

### GET with Query Parameters

```typescript
// Fetch products with filters
const response = await apiClient.get('/api/products', {
  params: {
    page: 1,
    limit: 20,
    category: 'Electronics',
    minPrice: 100,
    maxPrice: 5000,
  },
});

// Using string concatenation
const response = await apiClient.get(
  '/api/products?page=1&limit=20&category=Electronics'
);
```

### POST with JSON Body

```typescript
const response = await apiClient.post('/api/auth/login', {
  email: 'user@example.com',
  password: 'password123',
});
```

### PUT to Update Resource

```typescript
const response = await apiClient.put('/api/users/userId123', {
  name: 'New Name',
  phone: '9876543210',
});
```

### DELETE Resource

```typescript
const response = await apiClient.delete('/api/products/productId123');
```

---

## 5️⃣ Error Handling

### Global Error Handler Hook

```typescript
// hooks/useApi.ts
import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async <T = any,>(
      endpoint: string,
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
      body?: any
    ) => {
      setLoading(true);
      setError(null);

      try {
        let response;

        switch (method) {
          case 'GET':
            response = await apiClient.get<T>(endpoint);
            break;
          case 'POST':
            response = await apiClient.post<T>(endpoint, body);
            break;
          case 'PUT':
            response = await apiClient.put<T>(endpoint, body);
            break;
          case 'DELETE':
            response = await apiClient.delete<T>(endpoint);
            break;
        }

        if (!response.success) {
          setError(response.message || 'An error occurred');
          return null;
        }

        return response.data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { request, loading, error };
}
```

### Usage in Component

```typescript
export default function MyComponent() {
  const { request, loading, error } = useApi();

  const handleFetch = async () => {
    const data = await request('/api/products', 'GET');
    if (data) {
      console.log('Products:', data);
    }
  };

  return (
    <div>
      <button onClick={handleFetch} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Products'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
```

---

## 6️⃣ Authentication Flow

### Step 1: Login (Get Tokens)
```
POST /api/auth/login
Body: { email, password }
Response: { token, refreshToken, user }
```

### Step 2: Store Tokens
```javascript
localStorage.setItem('authToken', response.token);
localStorage.setItem('refreshToken', response.refreshToken);
```

### Step 3: Send Token in Protected Requests
```javascript
headers: {
  Authorization: `Bearer ${authToken}`
}
```

### Step 4: Handle Token Expiration
```javascript
// If 401 error, refresh token
POST /api/auth/refresh-token
Body: { refreshToken }
Response: { token, refreshToken }
```

### Step 5: Logout
```javascript
localStorage.removeItem('authToken');
localStorage.removeItem('refreshToken');
window.location.href = '/login';
```

---

## 7️⃣ Testing with Postman/Insomnia

### Collection Template

```json
{
  "info": {
    "name": "MarketHub API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "http://localhost:5000/api/auth/login",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"email\": \"user@example.com\", \"password\": \"Password123\"}"
            }
          }
        }
      ]
    },
    {
      "name": "Products",
      "item": [
        {
          "name": "Get All Products",
          "request": {
            "method": "GET",
            "url": "http://localhost:5000/api/products"
          }
        }
      ]
    }
  ]
}
```

---

## 8️⃣ Debugging Tips

### Enable Request/Response Logging

```typescript
// In your API client
console.log('Request:', method, endpoint, body);
console.log('Response:', response);
```

### Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Make API call
4. Click on the request to see:
   - Headers
   - Request body
   - Response
   - Status code

### Check Local Storage

```javascript
// In console
localStorage.getItem('authToken');
localStorage.getItem('refreshToken');
```

---

## ✅ Checklist for API Connection

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Environment variables configured (`.env.local`)
- [ ] API client utility created
- [ ] CORS headers configured in backend
- [ ] JWT token management implemented
- [ ] Error handling implemented
- [ ] API calls tested in browser console
- [ ] Network requests visible in DevTools

---

## 🔗 Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product details |
| POST | `/api/cart` | Add to cart (protected) |
| GET | `/api/orders` | Get user orders (protected) |

---

For more details, see `README.md` and `QUICKSTART.md`.
