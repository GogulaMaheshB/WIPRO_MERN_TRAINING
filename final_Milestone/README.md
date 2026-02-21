# Setup Instructions

# Backend Setup

Navigate to backend folder:

cd backend

Install dependencies:

npm install express cors express-validator dotenv
npm install mocha chai supertest

Create a .env file inside the backend folder and add:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fittrack

Start the backend server:

node server.js

Backend runs at:

http://localhost:5000


# Frontend Setup

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm start

Frontend runs at:

http://localhost:3000


# List of APIs
 #Create Program

POST http://localhost:5000/api/programs

Request Body:

{
  "programId": "FTP001",
  "name": "Beginner Full Body Workout",
  "category": "Strength Training",
  "level": "Beginner",
  "price": 1999
}

# Get All Programs

GET http://localhost:5000/api/programs


# Enroll in Program

POST http://localhost:5000/api/enroll

Request Body:

{
  "userId": "USR101",
  "programId": "FTP001"
}

Possible Responses:

201 – Enrollment successful

400 – Already enrolled

404 – User or Program not found

500 – Server error