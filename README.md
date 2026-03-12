# 🍕 Foodie-Dash: Full-Stack Food Delivery Backend

A production-grade backend system for a multi-vendor food delivery platform, built with Node.js, Express, and MongoDB.

## 🚀 Live Links
- **API Documentation:** [Postman Link](https://documenter.getpostman.com/view/51558579/2sBXigKY7S)
- **Base URL:** `https://your-food-app-link.onrender.com`

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Security:** JWT, BcryptJS
- **Media:** Cloudinary, Multer

## ✨ Key Features & Business Logic
- **RBAC (Role Based Access Control):** Granular access for Admin (Manage Users/Stores), Restaurant (Manage Menu/Orders), and Users (Place Orders).
- **Advanced Search & Filtering:** Implemented MongoDB regex search for restaurants and food items.
- **Order Management:** State-machine logic to track order status (Placed -> Preparing -> Out for Delivery -> Delivered).
- **Secure Authentication:** Cookie-based JWT sessions with refresh token logic.

## 📈 Optimization for Performance
- **Indexing:** Used MongoDB indexing on `category` and `price` fields to reduce query response time.
- **Error Handling:** Centralized global error-handling middleware for consistent API responses.
- **Validation:** Strict schema validation using Mongoose to ensure data integrity.

## 🛠️ Installation & Setup
1. Clone the repo: `git clone https://github.com/Vishnuvarshnay/resturant.git`
2. Install dependencies: `npm install`
3. Set up `.env` with `MONGODB_URI`, `JWT_SECRET`, and `CLOUDINARY_API_KEY`.
4. Start the server: `nodemon server.js`
