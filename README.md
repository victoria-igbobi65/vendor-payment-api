# Vendor Payment API

A RESTful API for managing vendors and payments, built with:

- Node.js + Express
- PostgreSQL
- Prisma ORM
- Zod validation
- JWT-based authentication

---

## 🛠 Tech Stack

- Node.js (Express.js)
- PostgreSQL
- Prisma ORM
- Passport.js (JWT strategy)
- Zod (for validation)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/vendor-payment-api.git
cd vendor-payment-api
```

2. Install dependencies

```bash
npm install
```

2. Set up environment variables
   Copy the example file

```bash
cp .env.example .env
```

4. Run migrations and generate Prisma client

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Start the server

```bash
npm run dev
```
