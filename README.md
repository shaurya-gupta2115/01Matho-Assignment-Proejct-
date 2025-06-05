# MathonGo Chapter Performance Dashboard API

# Some keys like .env file is accessible and redisClient url is also accessible just for evaluation - After this it will be all private(secretely kept :) )
This is a sample backend for MathonGo's internship selection task. It provides RESTful APIs to manage and analyze chapter-level performance data using Node.js, Express, MongoDB, and Redis.

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Redis (for caching & rate-limiting)

---

## 📦 Features

- ✅ Upload chapter data via JSON (admin-only)
- ✅ Fetch chapters with filters & pagination
- ✅ Redis caching for performance
- ✅ Redis rate-limiting (30 req/min/IP)
- ✅ RESTful API design

---

## 🚀 Getting Started

### 1. Clone the repo & install dependencies
```bash
git clone https://github.com/shaurya-gupta2115/01Matho-Assignment-Proejct-.git
cd 01Matho-Assignment-Proejct-
npm install
```

### 2. Setup `.env`  - AFTER EVALUATION EVERYTHING WILL BE PRIVATE
- MONGO_URI="mongodb+srv://devtinder:devtinder@cluster0.ggrv0.mongodb.net/"
- JWT_SECRET=supersecretjwt
- ADMIN_USERNAME=admin
- ADMIN_PASSWORD=password123
- PORT=5001
- ADMIN_TOKEN=admintoken123

- FOR ADMIN - Cookies will store the admin token for chapter uploading functioning
  - Content-Type : application/json
  - {"username": "admin","password": "password123}

- POST BY ADMIN 
  - [{"subject": "Math","chapter": "Quadratic Equations","class": "10","unit": "3","yearWiseQuestionCount": { "2022": 10, "2023": 5 },"questionSolved": 8,"status": "In Progress","isWeakChapter": true}]
  - output
    - {"successCount": 1,"failedCount": 0,"failed": []
}

- FOR GETTING CHAPTERS
 - http://localhost:5001/api/v1/chapters/6841dc6994417fedff3c75d5 CAN BE CALLED


### 3. Run the server
```bash
npm run dev
```
---

## API Reference

### GET /api/v1/chapters
- Query Params:
  - `class`, `unit`, `subject`, `status`, `weakChapters`
  - `page`, `limit`

### GET /api/v1/chapters/:id
- Returns a single chapter

### POST /api/v1/chapters
- Upload chapters (as JSON array)
- Requires header: `x-admin-token: mysecrettoken`

## Deployment
- EC2 (for bonus points)

---

## Rate Limiting

- Max 30 requests per minute per IP using Redis
