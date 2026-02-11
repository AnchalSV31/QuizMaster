# Quiz Backend - Spring Boot REST API

Complete backend implementation for the Quiz Management System with JWT authentication, MySQL database, and role-based access control.

## 🏗️ Tech Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MySQL
- **Security**: Spring Security + JWT
- **ORM**: Spring Data JPA / Hibernate
- **Build Tool**: Maven

## 📋 Prerequisites

Before running the backend, ensure you have:

1. **Java 17** or higher installed
   ```bash
   java -version
   ```

2. **Maven 3.6+** installed
   ```bash
   mvn -version
   ```

3. **MySQL 8.0+** installed and running
   ```bash
   mysql --version
   ```

## 🚀 Setup Instructions

### Step 1: Database Setup

1. **Start MySQL Server**
   ```bash
   # On Windows
   net start MySQL80
   
   # On Mac/Linux
   sudo systemctl start mysql
   ```

2. **Create Database** (Optional - Spring Boot will auto-create)
   ```sql
   mysql -u root -p
   CREATE DATABASE quiz_db;
   EXIT;
   ```

### Step 2: Configure Application Properties

The `application.properties` file is already configured with default settings:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quiz_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
```

**Update these values** if your MySQL configuration is different:
- Change `root` username/password to match your MySQL credentials
- Change database name if desired

### Step 3: Build the Project

```bash
cd quiz-backend
mvn clean install
```

This will:
- Download all dependencies
- Compile the code
- Run tests
- Create the JAR file

### Step 4: Run the Application

```bash
mvn spring-boot:run
```

Or run the JAR directly:
```bash
java -jar target/quiz-backend-1.0.0.jar
```

The server will start on **http://localhost:8080**

### Step 5: Verify Installation

Check if the server is running:
```bash
curl http://localhost:8080/api/auth/login
```

You should see an error response (because no credentials were provided), which confirms the server is running.

## 📁 Project Structure

```
quiz-backend/
├── src/
│   ├── main/
│   │   ├── java/com/quiz/backend/
│   │   │   ├── QuizBackendApplication.java    # Main application
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java         # Security configuration
│   │   │   │   └── CorsConfig.java             # CORS configuration
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java         # Authentication endpoints
│   │   │   │   ├── QuizController.java         # Quiz CRUD operations
│   │   │   │   └── ResultController.java       # Result management
│   │   │   ├── dto/
│   │   │   │   ├── LoginRequest.java           # Login payload
│   │   │   │   ├── SignupRequest.java          # Signup payload
│   │   │   │   ├── JwtResponse.java            # JWT response
│   │   │   │   └── QuizAttemptRequest.java     # Quiz attempt payload
│   │   │   ├── model/
│   │   │   │   ├── User.java                   # User entity
│   │   │   │   ├── Quiz.java                   # Quiz entity
│   │   │   │   ├── Question.java               # Question entity
│   │   │   │   └── Result.java                 # Result entity
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java         # User data access
│   │   │   │   ├── QuizRepository.java         # Quiz data access
│   │   │   │   ├── QuestionRepository.java     # Question data access
│   │   │   │   └── ResultRepository.java       # Result data access
│   │   │   ├── security/
│   │   │   │   ├── JwtTokenProvider.java       # JWT generation/validation
│   │   │   │   ├── JwtAuthenticationFilter.java # JWT filter
│   │   │   │   └── UserDetailsServiceImpl.java # User details service
│   │   │   └── service/
│   │   │       ├── AuthService.java            # Authentication logic
│   │   │       ├── QuizService.java            # Quiz business logic
│   │   │       └── ResultService.java          # Result business logic
│   │   └── resources/
│   │       └── application.properties           # Application config
└── pom.xml                                      # Maven dependencies
```

## 🔐 API Endpoints

### Authentication APIs

#### 1. Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "STUDENT"  // or "ADMIN"
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "STUDENT"
}
```

### Quiz APIs (Requires Authentication)

#### 3. Get All Active Quizzes
```http
GET /api/quizzes
Authorization: Bearer <token>
```

#### 4. Get Quiz by ID
```http
GET /api/quizzes/{id}
Authorization: Bearer <token>
```

#### 5. Create Quiz (Admin Only)
```http
POST /api/quizzes
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "JavaScript Basics",
  "description": "Test your JS knowledge",
  "category": "Programming",
  "difficulty": "Easy",
  "durationMinutes": 10,
  "isActive": true,
  "questions": [
    {
      "question": "What is JavaScript?",
      "option1": "Programming Language",
      "option2": "Database",
      "option3": "OS",
      "option4": "Framework",
      "correctAnswer": 0
    }
  ]
}
```

#### 6. Update Quiz (Admin Only)
```http
PUT /api/quizzes/{id}
Authorization: Bearer <admin-token>
```

#### 7. Delete Quiz (Admin Only)
```http
DELETE /api/quizzes/{id}
Authorization: Bearer <admin-token>
```

### Result APIs

#### 8. Submit Quiz Attempt (Student Only)
```http
POST /api/results
Authorization: Bearer <student-token>
Content-Type: application/json

{
  "quizId": 1,
  "answers": {
    "1": 0,  // questionId: selectedAnswer
    "2": 2,
    "3": 1
  },
  "timeTaken": 450  // seconds
}
```

#### 9. Get Student Results (Student Only)
```http
GET /api/results/student
Authorization: Bearer <student-token>
```

#### 10. Get All Results (Admin Only)
```http
GET /api/results/all
Authorization: Bearer <admin-token>
```

#### 11. Get Results by Quiz ID (Admin Only)
```http
GET /api/results/quiz/{quizId}
Authorization: Bearer <admin-token>
```

## 🔒 Security Features

1. **JWT Authentication**: Stateless token-based auth
2. **Password Encryption**: BCrypt hashing
3. **Role-Based Access Control**: STUDENT and ADMIN roles
4. **CORS Configuration**: Allows React frontend
5. **Session Management**: Stateless (no sessions)

## 🗄️ Database Schema

### Users Table
```sql
users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('STUDENT', 'ADMIN') NOT NULL,
  created_at DATETIME
)
```

### Quizzes Table
```sql
quizzes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(255),
  difficulty VARCHAR(50),
  duration_minutes INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME,
  updated_at DATETIME
)
```

### Questions Table
```sql
questions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  quiz_id BIGINT NOT NULL,
  question TEXT NOT NULL,
  option1 VARCHAR(255) NOT NULL,
  option2 VARCHAR(255) NOT NULL,
  option3 VARCHAR(255) NOT NULL,
  option4 VARCHAR(255) NOT NULL,
  correct_answer INT NOT NULL,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
)
```

### Results Table
```sql
results (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  quiz_id BIGINT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  correct_answers INT NOT NULL,
  time_taken INT,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
)
```

## 🧪 Testing the APIs

Use Postman, curl, or any API client:

### 1. Create a User
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "email": "student@test.com",
    "password": "password123",
    "role": "STUDENT"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@test.com",
    "password": "password123"
  }'
```

### 3. Get Quizzes (use token from login)
```bash
curl -X GET http://localhost:8080/api/quizzes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🐛 Troubleshooting

### Issue: Port 8080 already in use
**Solution**: Change port in `application.properties`:
```properties
server.port=8081
```

### Issue: Cannot connect to MySQL
**Solutions**:
1. Verify MySQL is running: `sudo systemctl status mysql`
2. Check credentials in `application.properties`
3. Ensure database exists or `createDatabaseIfNotExist=true` is set

### Issue: JWT Token validation failed
**Solutions**:
1. Ensure token is sent in Authorization header: `Bearer <token>`
2. Check if token has expired (24 hours by default)
3. Login again to get a fresh token

### Issue: Access Denied
**Solution**: Check user role matches endpoint requirements
- Admin endpoints require ADMIN role
- Student endpoints require STUDENT role

## 📝 Notes

- JWT tokens expire after 24 hours (configurable in `application.properties`)
- Database tables are auto-created on first run
- CORS is configured for ports 3000 and 5173 (React/Vite)
- All passwords are encrypted using BCrypt

## 🚀 Next Steps

1. Start the backend server
2. Connect the React frontend (see frontend documentation)
3. Test the complete flow

---

**Backend is now ready! Proceed to frontend integration.**
