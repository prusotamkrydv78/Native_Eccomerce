# 🚀 eCommerce Mobile API Documentation

A lean, high-performance, and purely token-based backend optimized for Mobile Apps.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (Express)
- **Database**: MongoDB (Mongoose)
- **Security**: JWT (Access + Refresh Tokens)
- **Documentation**: Swagger UI

---

## 🏃 Quick Start

1. **Setup Environment**:  
   Create a `.env` file using `.env.example`.
2. **Install & Run**:
   ```bash
   npm install
   npm run dev
   ```
3. **Seed Admin Data**:
   ```bash
   npm run data:import
   ```
   _Default Admin: `admin@example.com` / `password123`_

---

## 🔑 Authentication (purely Mobile)

Unlike web apps, this API does NOT use cookies. Both tokens are returned in the response body.

### 1. Register / Login

**POST** `/api/auth/login`

- **Request**: `{ "email": "...", "password": "..." }`
- **Response**:
  ```json
  {
    "accessToken": "...",
    "refreshToken": "...",
    "user": { ... }
  }
  ```
- **Action**: Store both tokens safely (Keychain/Secure Storage).

### 2. Refresh Token

**POST** `/api/auth/refresh`

- **Request**: `{ "refreshToken": "..." }`
- **Response**: `{ "accessToken": "..." }`

---

## 📦 Key Modules

### 🛒 Products & Categories

- **GET** `/api/products` - List with search/filter/pagination.
- **GET** `/api/categories` - Fetch the hierarchy.
- **POST** `/api/products/:id/reviews` - Rate products.

### 🛍️ Cart & Wishlist

- **GET** `/api/cart` - View items.
- **POST** `/api/cart` - Add/Update items.
- **POST** `/api/wishlist/:productId` - Toggle items.

### 💳 Orders & Payments

- **POST** `/api/orders` - Create order (Atomic inventory check).
- **POST** `/api/payments/create-intent` - Mock payment process.
- **POST** `/api/payments/verify` - Confirm success.

---

## 🛡️ Best Practices for Mobile Developers

1. **Authorization**: Always include the Access Token in your headers:  
   `Authorization: Bearer <accessToken>`
2. **Handle 401**: If an API call fails with 401 (Unauthorized), trigger the refresh token flow automatically.
3. **Pagination**: Use `pageNumber` and `pageSize` query params on the product list.

---

## 📖 Live API Explorer

When the server is running, visit:  
👉 [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
