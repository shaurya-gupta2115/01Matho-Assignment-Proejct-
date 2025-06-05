# MathonGo Chapter Performance Dashboard API

## Some keys like .env file is accessible and redisClient url is also accessible just for evaluation - After this it will be all private(secretely kept :) )
This is a sample backend for MathonGo's internship selection task. It provides RESTful APIs to manage and analyze chapter-level performance data using Node.js, Express, MongoDB, and Redis.

# Live link - (Render) for backend deployment 
  - https://zero1matho-assignment-proejct.onrender.com


# Postman Testing Link for API 
  - https://api.postman.com/collections/42892443-9d16e8e4-0602-45b2-822a-022c7fffab4c?access_key=PMAT-01JX125Q2WPA1AJJYZ890CJ6YP

  - https://.postman.co/workspace/DevTinder~d2cdce5d-684e-4474-9288-b3141d99de03/collection/42892443-9d16e8e4-0602-45b2-822a-022c7fffab4c?action=share&creator=42892443&active-environment=42892443-5c262e6a-37c3-4fb9-83ea-3589c1e716ff

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
- MONGO_URI="*******************************************************************"
- JWT_SECRET=supersecretjwt
- ADMIN_USERNAME=******
- ADMIN_PASSWORD=pass*******
- PORT=****
- ADMIN_TOKEN=***********

- FOR ADMIN - Cookies will store the admin token for chapter uploading functioning
  - Content-Type : application/json
  - {"username": "******","password": "***********"}

- POST BY ADMIN 
  - [{"subject": "Math","chapter": "Quadratic Equations","class": "10","unit": "3","yearWiseQuestionCount": { "2022": 10, "2023": 5 },"questionSolved": 8,"status": "In Progress","isWeakChapter": true}]
  - output
    - {"successCount": 101,"failedCount": 0,"failed": []
}



- FOR GETTING CHAPTERS
 - http://localhost:5001/api/v1/chapters/6841dc6994417fedff3c75d5     can be called OR 
 - https://zero1matho-assignment-proejct.onrender.com/api/v1/chapters/6841ec127156cc624f340a45


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
