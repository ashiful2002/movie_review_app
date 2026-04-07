# MMDB Frontend 🎬
**Server Repo Link:** [MMDB Server Repository](https://github.com/ashiful2002/movie_review_server)
## Overview

MMDB is a modern movie review web application where users can
explore movies, read and write reviews, and unlock premium features
through Stripe-powered subscriptions.

This frontend application provides a smooth and interactive UI for
browsing movies, managing reviews, and handling secure payments.

The app communicates with the backend via REST APIs for authentication,
movie data, reviews, and payment processing.

---

## 🚀 Tech Stack

- Next.js (app router)
- Tailwind CSS
- React Hook Form + Zod (Form validation)
- Stripe (Payment Gateway Integration)

---

## ✨ Features

### 🌐 Public Features

- View homepage with featured and trending movies
- Browse all movies
- Search and filter movies (genre, rating, year)
- View movie details (poster, rating, description)
- Read public reviews

---

### 👤 User Features

- User registration & login (JWT auth)
- Write, edit, and delete reviews
- Rate movies
- Add movies to watchlist
- Manage profile

---

### 💎 Premium Features (Stripe Integrated)

- Secure subscription via Stripe Checkout
- Unlock premium content
- Access exclusive movie reviews
- Ad-free experience (optional)
- Priority access to new features

---

### 🛠 Admin Features

- Admin dashboard
- Manage users
- Manage movies (add, update, delete)
- Moderate reviews
- Monitor payments & subscriptions

---

## 💳 Stripe Payment Flow

1.  User clicks **Subscribe**
2.  Redirect to Stripe Checkout
3.  Successful payment → redirect to app
4.  Backend verifies payment via webhook
5.  User gets **premium access**

---

## 🧭 Frontend Routes

### Public Routes

- `/` --- Home
- `/movies` --- Browse movies
- `/movies/:id` --- Movie details
- `/login` --- Login
- `/register` --- Register

---

### User Routes

- `/profile`
- `/watchlist`
- `/reviews`
- `/subscription`

---

### Admin Routes

- `/admin`
- `/admin/movies`
- `/admin/users`
- `/admin/reviews`
- `/admin/payments`

---

## 📁 Folder Structure

    src/
     ├── components/
     ├── pages/ or app/
     ├── services/
     ├── hooks/
     ├── context/
     ├── utils/
     ├── assets/

---

## ⚙️ Running the Project

### 1. Install dependencies

    npm install

### 2. Run development server

    npm run dev

### 3. Open in browser

    http://localhost:3000

---

## 🔐 Environment Variables

Example `.env.local`

    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key

---

## 🎯 Responsibilities of Frontend

- Build responsive UI
- Handle user interactions
- Integrate Stripe payment flow
- Manage authentication state
- Communicate with backend APIs
- Provide smooth UX for movie browsing & reviews

---

## 📌 Future Improvements

- AI-based movie recommendations
- Social features (follow users)
- Advanced analytics dashboard
- Mobile app version

---

## 🧑‍💻 Author

Developed as part of a full-stack project with modern web technologies.
