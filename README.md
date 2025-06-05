# MathonGo Chapter Performance Dashboard API

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
git clone <your-repo-url>
cd mathongo-dashboard
npm install
```

### 2. Setup `.env`
```env
PORT=5001
MONGO_URI=<your_mongo_uri>
REDIS_URL=<your_redis_uri>
ADMIN_TOKEN=mysecrettoken
```

### 3. Run the server
```bash
npm run dev
```

---

## 📘 API Reference

### GET /api/v1/chapters
- Query Params:
  - `class`, `unit`, `subject`, `status`, `weakChapters`
  - `page`, `limit`

### GET /api/v1/chapters/:id
- Returns a single chapter

### POST /api/v1/chapters
- Upload chapters (as JSON array)
- Requires header: `x-admin-token: mysecrettoken`

---

## ⚙️ Deployment

Can be deployed to:
- Render (recommended)
- Railway
- EC2 (for bonus points)

---

## 🔐 Rate Limiting

- Max 30 requests per minute per IP using Redis

---

## 🤝 Contributing

Open for internal use and evaluation only.

---

## 📄 License

MIT
