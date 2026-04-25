# ServiceMan 2.0 API Documentation

## Overview

ServiceMan 2.0 is a service marketplace API that connects customers with skilled artisans. The API provides authentication, user management, and job booking functionality.

**Base URL:** `http://localhost:3000/api`

---

## Authentication Endpoints

### 1. User Registration

**Endpoint:** `POST /api/auth/signup`

Creates a new user account (customer or artisan).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address (unique) |
| `password` | string | Yes | User's password (min 6 characters) |
| `firstName` | string | No | User's first name |
| `lastName` | string | No | User's last name |
| `phoneNumber` | string | No | User's phone number |
| `role` | enum | Yes | `CUSTOMER`, `ARTISAN`, or `ADMIN` |
| `category` | string | No | Artisan's trade category (required if `role` is `ARTISAN`) |

**Request Example:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "role": "CUSTOMER"
}
```

**Response (201 Created):**
```json
{
  "message": "User created successfully",
  "user": {
    "email": "john@example.com",
    "role": "CUSTOMER"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Errors:**
- `400` — Missing required fields or email already in use
- `500` — Internal server error

---

### 2. User Login

**Endpoint:** `POST /api/auth/login`

Authenticates a user and returns a JWT token.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address |
| `password` | string | Yes | User's password |

**Request Example:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "cuid123...",
    "email": "john@example.com",
    "role": "CUSTOMER",
    "firstName": "John"
  }
}
```

**Cookie:** A `token` cookie is set with the following properties:
- `httpOnly: true`
- `secure: true` (production only)
- `sameSite: "lax"`
- `maxAge: 24 hours`

**Errors:**
- `400` — Email and password are required
- `401` — Invalid credentials
- `500` — Internal server error

---

## Data Models

### User

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (cuid) | Unique identifier |
| `email` | string | User's email (unique) |
| `passwordHash` | string | Bcrypt hashed password |
| `firstName` | string? | User's first name |
| `lastName` | string? | User's last name |
| `phoneNumber` | string? | Phone number |
| `role` | enum | `CUSTOMER`, `ARTISAN`, or `ADMIN` |
| `createdAt` | datetime | Account creation timestamp |
| `updatedAt` | datetime | Last update timestamp |

### Artisan

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (cuid) | Unique identifier |
| `bio` | string? | Artisan's biography |
| `category` | string | Trade category (e.g., "Plumbing", "Electrical") |
| `portfolioUrl` | string? | Link to portfolio |
| `isVerified` | boolean | Verification status (default: false) |
| `userId` | string | Foreign key to User |

### Job

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (cuid) | Unique identifier |
| `description` | string | Job description |
| `status` | enum | `PENDING`, `ACTIVE`, `COMPLETED`, `CANCELLED` |
| `price` | float | Job price |
| `customerId` | string | Foreign key to User |
| `artisanId` | string | Foreign key to Artisan |
| `createdAt` | datetime | Creation timestamp |
| `updatedAt` | datetime | Last update timestamp |

### Review

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (cuid) | Unique identifier |
| `rating` | integer | Rating (1-5) |
| `comment` | string? | Review comment |
| `jobId` | string | Foreign key to Job (unique) |
| `createdAt` | datetime | Creation timestamp |

### Payment

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (cuid) | Unique identifier |
| `amount` | float | Payment amount |
| `status` | string | Payment status |
| `paystackPaymentId` | string? | Paystack transaction ID |
| `jobId` | string | Foreign key to Job (unique) |
| `createdAt` | datetime | Creation timestamp |

---

## Authentication

All protected endpoints require a JWT token stored in the `token` cookie.

### Token Structure

```json
{
  "userId": "cuid123...",
  "email": "user@example.com",
  "role": "CUSTOMER"
}
```

**Token Expiry:** 24 hours

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing |

---

## Tech Stack

- **Runtime:** Next.js 16.2.4
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 7.7.0
- **Auth:** JWT (jose) + bcrypt
- **Language:** TypeScript

---

## Future Endpoints (Not Implemented)

- `GET /api/users` — List all users (admin only)
- `GET /api/artisans` — List all artisans
- `GET /api/artisans/:id` — Get artisan profile
- `PUT /api/artisans/:id` — Update artisan profile
- `POST /api/jobs` — Create a new job
- `GET /api/jobs` — List jobs
- `GET /api/jobs/:id` — Get job details
- `PUT /api/jobs/:id` — Update job status
- `POST /api/reviews` — Create a review
- `POST /api/payments` — Process payment


https://.postman.co/workspace/My-Workspace~9479c3c5-cd62-42cd-86e4-a50e4bb54d6e/collection/38031131-22ddc0fd-5e34-450f-9acd-67d0775d935c?action=share&creator=38031131