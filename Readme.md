# 🛒 SnapMart – Fullstack Grocery Store App

SnapMart is a MERN stack-based grocery e-commerce application featuring user authentication, product management, cart operations, and customer interaction.

---

## 🌐 Tech Stack

| Layer     | Tech Used                                      |
|-----------|------------------------------------------------|
| Frontend  | React.js, Tailwind CSS, React Router, Heroicons, Headless UI |
| Backend   | Node.js, Express.js, MongoDB (Mongoose)        |
| Auth      | JWT, bcrypt, OTP (email verification)          |
| UI        | Tailwind CSS, responsive design                |
| Others    | Vite, Postman, CORS, dotenv                    |

---

## 🧑‍💻 Developer

- **Name:** Rahul Gaire  
- **Email:** support@snapmart.com  

---

## 📦 Project Structure

```
snapmart/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### 📁 1. Clone Repository

```bash
git clone https://github.com/yourusername/snapmart.git
cd snapmart
```

### 📦 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 🖥️ 3. Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## 🔐 User Authentication APIs

| Method | Endpoint                    | Description            |
|--------|-----------------------------|------------------------|
| POST   | `/auth/user/login`          | Log in a user          |
| POST   | `/auth/user/register`       | Register a new user    |
| POST   | `/auth/user/logout`         | Log out the user       |
| POST   | `/auth/user/verify-otp`     | Verify OTP             |
| GET    | `/auth/user/profile`        | Get user profile       |

---

## 👤 User Profile APIs

| Method | Endpoint                      | Description                  |
|--------|-------------------------------|------------------------------|
| GET    | `/auth/user/profile`          | Get user profile             |
| PATCH  | `/auth/user/profile`          | Update user profile          |
| DELETE | `/auth/user/profile/:id`      | Delete user profile by ID    |

---

## 🛍️ Product APIs

| Method | Endpoint                     | Description                   |
|--------|------------------------------|-------------------------------|
| GET    | `/api/products`              | Get all products              |
| GET    | `/api/products/:id`          | Get product by ID             |
| POST   | `/api/products`              | Create a new product          |
| PUT    | `/api/products/:id`          | Update product by ID          |
| DELETE | `/api/products/:id`          | Delete product by ID          |

---

## 🛒 Cart APIs

| Method | Endpoint                 | Description                 |
|--------|--------------------------|-----------------------------|
| POST   | `/api/cart/add`          | Add item to cart            |
| POST   | `/api/cart/remove`       | Remove item from cart       |
| POST   | `/api/cart/update`       | Update cart item quantity   |
| GET    | `/api/cart`              | Fetch all cart items        |

---

## 💬 Product Comments APIs

| Method | Endpoint                            | Description                         |
|--------|-------------------------------------|-------------------------------------|
| POST   | `/api/comments/`                    | Add a comment to a product          |
| GET    | `/api/comments/:productId`          | Get comments for a specific product |
| DELETE | `/api/comments/:commentId`          | Delete a comment by its ID          |

---
## 🧑‍💻 Developer

- **Name:** Rahul Gaire  
- **Email:** gairerahul334@gmail.com  

---
## 📄 License

This project is licensed under the **MIT License**.
