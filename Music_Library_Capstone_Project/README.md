# Maahi Music Library

## Features

User & Admin Authentication (JWT)
Data Stored in MONGODB
Admin can Upload / Edit / Delete Songs
Song Visibility Control (Hide / Show)
Mini Floating Player
Playlist Management
Language-wise Song Sections
Real-time Notification (Socket.io)
Single Admin Session Control
Responsive Design (Mobile + Desktop)
Component & API Testing (Mocha, Chai, Supertest)

## Tech Stack

Frontend:

1-React
2-React Router DOM
3-Formik + Yup
4-Socket.io Client
5-React Icons

Backend:

1-Node.js
2-Express.js
3-MongoDB + Mongoose
4-JWT Authentication
5-Multer (File Upload)
6-Socket.io
7-bcryptjs

Testing:

1-Mocha
2-Chai
3-Supertest

### Installation
# backend
mkdir backend
cd  backend
npm init-y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer socket.io
npm install --save-dev mocha chai supertest nodemon
npm run dev

# frontend
npx create-react-app "frontend"
cd frontend
npm install react-router-dom socket.io-client react-icons formik yup
npm start