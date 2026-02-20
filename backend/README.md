# MarketHub Backend API

Complete REST API backend for the MarketHub B2B marketplace built with Node.js, Express, and MongoDB.

## Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── database.ts        # MongoDB connection setup
│   ├── environment.ts     # Environment variables
│   └── constants.ts       # Application constants
├── models/                # MongoDB Mongoose schemas
│   ├── User.ts           # User model (buyers & sellers)
│   ├── Product.ts        # Product listings
│   ├── Cart.ts           # Shopping carts
│   ├── Order.ts          # Orders/transactions
│   ├── Feedback.ts       # User feedback
│   ├── Contact.ts        # Contact form submissions
│   ├── Review.ts         # Product reviews
│   └── Category.ts       # Product categories
├── controllers/          # Route handlers
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   ├── product.controller.ts
│   ├── cart.controller.ts
│   ├── order.controller.ts
│   ├── feedback.controller.ts
│   ├── contact.controller.ts
│   └── review.controller.ts
├── routes/              # API route definitions
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   ├── product.routes.ts
│   ├── cart.routes.ts
│   ├── order.routes.ts
│   ├── feedback.routes.ts
│   ├── contact.routes.ts
│   └── review.routes.ts
├── middleware/          # Express middleware
│   ├── auth.middleware.ts       # JWT authentication
│   ├── errorHandler.ts          # Global error handling
│   ├── validation.ts            # Input validation
│   └── logging.ts               # Request/error logging
├── utils/              # Utility functions
│   ├── helpers.ts       # General helpers
│   ├── validators.ts    # Validation schemas
│   ├── jwt.ts           # JWT token utilities
│   └── whatsapp.ts      # WhatsApp integration
├── types/              # TypeScript interfaces
│   ├── index.ts         # Global types
│   └── errors.ts        # Error types
├── server.ts           # Server configuration
├── index.ts            # Entry point
├── .env.example        # Environment template
└── README.md           # This file
```

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration (database, JWT secret, etc)

## Configuration

### Environment Variables

See `.env.example` for all available configuration options:

- **NODE_ENV**: development, production, test
- **PORT**: Server port (default: 5000)
- **MONGODB_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT tokens
- **FRONTEND_URL**: Frontend URL for CORS
- **SMTP_***: Email configuration

## Database Models

### User Model
- Email, password (hashed), name, phone
- Role-based (buyer/business/admin)
- Business details for sellers (category, description, WhatsApp)
- Bank details for payments
- Verification status and ratings

### Product Model
- Business ownership reference
- Full details: name, description, category, price
- Discount and pricing details
- Stock and inventory tracking
- Images and specifications
- Ratings and review count

### Cart Model
- Per-business shopping carts (buyer -> business)
- Items with product references and quantities
- Pricing calculations (subtotal, tax, discount, total)
- Expiration tracking (30 days TTL)

### Order Model
- Complete order details from cart
- Order items with pricing
- Shipping address and tracking
- Payment information and status
- Order status timeline (pending -> delivered)

### Feedback Model
- Context-based feedback (product/cart/contact/general/order)
- Star ratings (1-5)
- User feedback and admin responses
- Status tracking (read/resolved)

### Contact Model
- Contact form submissions
- Name, email, phone, subject, message
- Status tracking (new/reviewed/resolved)
- Admin response capability

### Review Model
- Product reviews with ratings
- Verified purchase indicator
- Helpful/unhelpful count
- Images support
- Approval workflow

### Category Model
- Product categories
- Display order and status
- Parent category support
- Product count tracking

## API Endpoints

### Authentication
```
POST   /api/auth/register              # Register new user
POST   /api/auth/login                 # User login
POST   /api/auth/refresh-token         # Refresh access token
POST   /api/auth/logout                # User logout
GET    /api/auth/verify-email/:token   # Verify email
POST   /api/auth/forgot-password       # Request password reset
POST   /api/auth/reset-password/:token # Reset password
```

### Users
```
GET    /api/users/:userId              # Get user profile
GET    /api/users/profile              # Get current user (protected)
PUT    /api/users/profile              # Update profile
POST   /api/users/change-password      # Change password
GET    /api/users/business/:businessId # Get business profile
GET    /api/users/business/:businessId/stats # Business stats
```

### Products
```
GET    /api/products                    # Get all products (paginated)
GET    /api/products/search             # Search products
GET    /api/products/featured           # Get featured products
GET    /api/products/:productId         # Get product details
GET    /api/products/business/:businessId # Get business products
POST   /api/products                    # Create product (business only)
PUT    /api/products/:productId         # Update product
DELETE /api/products/:productId         # Delete product
POST   /api/products/:productId/images  # Upload product images
PUT    /api/products/bulk               # Bulk update products
```

### Cart
```
GET    /api/cart                        # Get all user carts
GET    /api/cart/:businessId            # Get cart for business
POST   /api/cart/:businessId/items      # Add to cart
PUT    /api/cart/:businessId/items/:productId # Update item quantity
DELETE /api/cart/:businessId/items/:productId # Remove from cart
DELETE /api/cart/:businessId            # Clear cart
POST   /api/cart/:businessId/apply-coupon # Apply discount
POST   /api/cart/:businessId/calculate  # Calculate totals
```

### Orders
```
POST   /api/orders                      # Create order
GET    /api/orders                      # Get user orders
GET    /api/orders/:orderId             # Get order details
GET    /api/orders/business/:businessId # Get business orders
PUT    /api/orders/:orderId/status      # Update order status
PUT    /api/orders/:orderId/cancel      # Cancel order
PUT    /api/orders/:orderId/tracking    # Update tracking
POST   /api/orders/:orderId/refund      # Process refund
GET    /api/orders/stats/summary        # Order statistics
GET    /api/orders/export               # Export orders
```

### Feedback
```
POST   /api/feedback                    # Submit feedback
GET    /api/feedback                    # Get all feedback (admin)
GET    /api/feedback/user/me            # Get user feedback
GET    /api/feedback/context/:context   # Get feedback by context
GET    /api/feedback/stats              # Feedback statistics
PUT    /api/feedback/:feedbackId/read   # Mark as read
PUT    /api/feedback/:feedbackId/resolve # Mark as resolved
PUT    /api/feedback/:feedbackId/response # Add admin response
```

### Contact
```
POST   /api/contact                     # Submit contact form
GET    /api/contact                     # Get all contacts (admin)
GET    /api/contact/:contactId          # Get contact details
PUT    /api/contact/:contactId/status   # Update status
PUT    /api/contact/:contactId/response # Add response
DELETE /api/contact/:contactId          # Delete contact
GET    /api/contact/stats               # Contact statistics
GET    /api/contact/export              # Export contacts
```

### Reviews
```
GET    /api/reviews/product/:productId  # Get product reviews
GET    /api/reviews/product/:productId/summary # Rating summary
POST   /api/reviews                     # Create review
GET    /api/reviews/user/:userId        # Get user reviews
PUT    /api/reviews/:reviewId           # Update review
DELETE /api/reviews/:reviewId           # Delete review
POST   /api/reviews/:reviewId/helpful   # Mark as helpful
```

## Technologies

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **TypeScript** - Type safety
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Compression** - Response compression

## Development

### Start development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Run tests
```bash
npm test
```

### Lint code
```bash
npm run lint
```

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (RBAC)
- Input validation and sanitization
- MongoDB injection prevention
- CORS configuration
- Security headers (Helmet)
- Rate limiting ready
- SQL/NoSQL injection protection

## Error Handling

Custom error classes for different scenarios:
- AppError (base)
- ValidationError
- AuthenticationError
- AuthorizationError
- NotFoundError
- DuplicateError
- DatabaseError
- PaymentError
- FileUploadError
- IntegrationError

## Logging

Structured logging with:
- Request logging
- Error logging
- Performance monitoring
- Query logging
- Context tracking

## Next Steps

1. Implement controller methods
2. Add service layer for business logic
3. Implement caching (Redis)
4. Add email notifications
5. Implement payment processing
6. Add file upload handling
7. Setup webhooks for WhatsApp
8. Add comprehensive testing
9. Setup CI/CD pipeline
10. Deploy to production

## License

MIT
