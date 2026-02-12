# 🧠 QuizMaster – Full Stack Quiz Platform

QuizMaster is a production-ready java full stack web application that allows students to attempt timed quizzes and admins to manage quiz content securely.

---

## 🚀 Live Demo

Frontend: https://quizmasterwe.netlify.app  
Backend API: https://quizmaster-x3mq.onrender.com  

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- JWT Authentication
- Netlify Deployment

### Backend
- Java 17
- Spring Boot 3
- Spring Security
- JWT Authentication
- Spring Data JPA
- REST APIs
- Docker
- Render Deployment

### Database
- PostgreSQL (Render Cloud)

---

## 🔐 Features

- User Registration & Login
- JWT-based Authentication
- Role-Based Authorization (Admin / Student)
- Quiz Management (Admin)
- Quiz Attempt & Result Tracking (Student)
- Secure API Endpoints
- Cloud Deployment
- CORS Configuration for cross-origin access

---

## ⏳ Timed Quiz Feature

- Each quiz includes a predefined time limit
- Countdown timer displayed to students
- Automatic submission on time expiry
- Results evaluated and stored instantly
- Simulates real-world online examination systems

---

## 📦 Project Structure

```
QuizMaster/
│
├── frontend/        # React application
├── backend/         # Spring Boot API
└── README.md
```

---

## 🔧 Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://quizmaster-x3mq.onrender.com/api
```

### Backend (Render Environment Variables)
```
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
JWT_SECRET=
PORT=
```

---

## 🌍 Deployment Architecture

Netlify (Frontend)  
⬇  
Render (Spring Boot Backend - Dockerized)  
⬇  
Render PostgreSQL Database  

---

## 🛠️ How to Run Locally

### Backend
```
cd backend
mvn clean install
java -jar target/quiz-backend-1.0.0.jar
```

### Frontend
```
cd frontend
npm install
npm run dev
```

---

## 💡 What I Learned

- Full stack integration
- Spring Security & JWT
- Docker containerization
- Cloud deployment (Render & Netlify)
- CORS configuration
- Environment variable management
- Production debugging

---
