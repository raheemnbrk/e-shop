# E-Shop

A full-stack e-commerce platform with a Next.js frontend and an Express.js backend. The application supports customer accounts, seller applications, product management, carts, checkout, orders, reviews, coupons, administration, email notifications, and Stripe payments.

## Stack

### Frontend

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS
- TanStack React Query
- Zustand
- Zod and React Hook Form
- Sonner notifications

### Backend

- Express 5 and TypeScript
- Prisma ORM
- PostgreSQL with Neon
- Redis
- Stripe Checkout and webhooks
- Resend email delivery
- Cloudinary image storage
- Passport Google OAuth

## Project Structure

```text
.
├── backend/    Express API, Prisma schema, migrations, and business logic
└── frontend/   Next.js application, components, pages, hooks, and API clients
```

The backend API is mounted under `/api`.

## Requirements

- Node.js 20 or newer
- npm
- PostgreSQL or a Neon PostgreSQL database
- Redis for rate limiting and related services
- Stripe test account for local payments
- Cloudinary account for image uploads
- Resend account for email delivery
- Google OAuth credentials if Google sign-in is enabled

## Installation

Install dependencies in both applications:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Environment Variables

Create `backend/.env`:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

NODE_ENV="development"
PORT=5000
CLIENT_URL="http://localhost:3000"
BACKEND_URL="http://localhost:5000"

ACCESS_TOKEN_SECRET="replace-with-a-long-random-secret"
REFRESH_TOKEN_SECRET="replace-with-a-long-random-secret"
ADMIN_EMAILS="admin@example.com"

REDIS_URL="redis://localhost:6379"

RESEND_API_KEY="re_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GOOGLE_REDIRECT_URI="http://localhost:5000/api/auth/google/callback"
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL="http://localhost:5000"
```

Do not commit `.env` or `.env.local`. Keep API keys, database credentials, OAuth secrets, and Stripe keys private.

## Database Setup

Generate the Prisma client and apply migrations:

```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

For a deployment environment, use:

```bash
npx prisma migrate deploy
```

## Running Locally

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The API runs at [http://localhost:5000](http://localhost:5000).

## Stripe Local Development

Online checkout creates a hosted Stripe Checkout Session. The backend success endpoint updates a successfully paid order and redirects the customer back to the frontend.

For local webhook testing, install the Stripe CLI and forward events to the backend:

```bash
stripe listen --forward-to localhost:5000/api/webhooks/stripe
```

Copy the displayed webhook signing secret into `STRIPE_WEBHOOK_SECRET`. Use Stripe test card `4242 4242 4242 4242`, any future expiry date, and any CVC when testing a successful payment.

Never use a client-side success redirect as proof of payment. The backend should verify the Stripe session or webhook event before marking an order as paid.

## Available Scripts

### Frontend

```bash
npm run dev      # Start the Next.js development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run ESLint
```

### Backend

```bash
npm run dev      # Start the API with ts-node and nodemon
npm run build    # Generate Prisma client and compile TypeScript
npm run start    # Start the compiled API
```

## Main Features

- Customer registration, login, OTP verification, password reset, and Google OAuth
- Product browsing, category filtering, search, reviews, and pagination
- Cart management and address management
- Cash-on-delivery and Stripe online checkout
- Customer order history and order details
- Seller applications, seller dashboards, products, orders, and customer views
- Admin dashboards for users, sellers, products, categories, coupons, orders, and statistics
- Email notifications for orders and seller application decisions
- Cloudinary-hosted product and seller images

## API Areas

The backend exposes route groups including:

- `/api/auth`
- `/api/user`
- `/api/seller`
- `/api/admin`
- `/api/product`
- `/api/category`
- `/api/review`
- `/api/cart`
- `/api/orders`
- `/api/coupon`
- `/api/stats`

Authentication uses access and refresh tokens. Protected routes require a valid authenticated session, and administrative or seller routes also enforce role authorization.

## Production Notes

- Set `CLIENT_URL` and `BACKEND_URL` to deployed HTTPS URLs.
- Configure the production Stripe webhook endpoint and signing secret.
- Use production Stripe keys only in the server environment.
- Run `npx prisma migrate deploy` during deployment.
- Build and start the backend and frontend separately.
- Configure Redis, Cloudinary, Resend, OAuth, and database access for the deployment environment.
