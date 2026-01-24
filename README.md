# 🛒 VPS-eKart — Angular Frontend

Frontend application for VPS-eKart, a full-stack e-commerce system built using the MEAN stack.  
This repository contains the Angular UI layer. The backend API is maintained in a separate repository.

The complete end-to-end system (UI + API) is designed and developed by me.

--------------------------------------------------

## 🌐 Live Application

Primary Deployment (GitHub Pages):  
https://vps6003.github.io/e-comm-store---frontend-webapp/

Secondary Deployment (Render):  
https://vps-ekart.onrender.com/#/home

--------------------------------------------------

## 🚀 Tech Stack

Framework: Angular (Latest)  
Language: TypeScript  
Styling: SCSS / Tailwind CSS  
State Handling: Angular Signals  
API Communication: Angular HttpClient (REST)  
Authentication: JWT-based authentication  
Architecture Approach: Feature modular structure (currently evolving toward enterprise pattern)

--------------------------------------------------

## ✨ Features

AUTHENTICATION
- User Registration  
- Login / Logout  
- JWT token handling via HTTP Interceptor  
- Role-based access (Admin / Customer)  
- Route Guards for protected pages  

PRODUCT SYSTEM
- Product listing with backend pagination  
- Product details view  
- Category & Brand filtering  
- Search functionality  

CART
- Add to cart  
- Update quantity  
- Remove items  
- Dynamic cart total calculation  

WISHLIST
- Add products to wishlist  
- Remove from wishlist  
- Persisted per user  

CHECKOUT
- Checkout flow  
- Order summary before placing order  
- Cart validation before order placement  

ORDERS
- Place order  
- Order history page  
- View past orders  

USER PROFILE
- User profile page  
- View account details  

ADMIN PANEL
- Add / Edit Products  
- Manage Categories  
- Manage Brands  
- Role-restricted routes  

RESPONSIVE DESIGN
- Fully responsive UI  
- Optimized for mobile, tablet, and desktop screens  

--------------------------------------------------

## 🔌 Backend API

Backend is developed in a separate repository using:

- Node.js  
- Express  
- MongoDB  
- JWT Authentication  
- Role-Based Access Control  

Backend Repo: (Add your backend repository link here)

--------------------------------------------------

## ⚙️ Setup Instructions

1. Clone Repository

git clone https://github.com/vps6003/e-comm-store---frontend-webapp.git  
cd webapp

2. Install Dependencies

npm install

3. Configure Environment

File: src/environments/environment.ts

export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:3000/api"
};

4. Run Application

ng serve

Open in browser:  
http://localhost:4200

--------------------------------------------------

## 🔒 Frontend Auth Flow

1. User logs in → API returns JWT  
2. Token stored (localStorage / memory based on config)  
3. HTTP Interceptor attaches token to requests  
4. Route Guards protect private routes  
5. Role check restricts admin routes  

--------------------------------------------------

## 🧠 Engineering Notes

This project focuses on:

- Practical Angular application structure  
- JWT authentication integration  
- Role-based authorization  
- Reusable components and services  
- Migration toward scalable enterprise frontend architecture  

--------------------------------------------------

## 📌 Future Enhancements

- Refresh token handling  
- Detailed error logging  
- Optimized loaders and UI states  
- Switch from Node backend services to Java backend services with optimized responses  
- Payment gateway integration  
- Architecture refactor into strict enterprise pattern  
- Unit & E2E tests  

--------------------------------------------------

## 👨‍💻 Author

Vaibhav Prakash Saraf  
Full-Stack Developer | MEAN Stack | System Design Learner
