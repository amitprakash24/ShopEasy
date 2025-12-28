
# 🛒 ShopEasy – Full Stack E-commerce Application

ShopEasy is a **full-stack e-commerce demo project** built using **React**, **Node.js (Express)**, and **MongoDB**.  
It includes a **customer-facing store**, an **admin panel**, authentication, product management, cart functionality, and image uploads.

---

## 🚀 Features

### 👤 User
- User Signup & Login (JWT Authentication)
- Browse products by category
- Add / Remove items from cart
- View cart & checkout (demo)
- Responsive UI

### 🛠 Admin
- Add new products
- Upload product images
- View & remove products

### 🔐 Security
- Password hashing using **bcryptjs**
- Protected routes using **JWT tokens**

---

## 🏗 Tech Stack

### Frontend
- React
- React Context API
- React Router DOM
- CSS (Responsive Grid Layout)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer (Image Upload)

---

## 🧩 Project Architecture

```
Client (React)
   |
   | REST API
   ↓
Server (Express)
   |
   ↓
MongoDB Atlas
```

Images are stored locally and served via Express.

---

## 📁 Project Structure

```
E-commerce/
│
├── backend/
│   ├── index.js
│   ├── models/
│   └── uploads/images/
│
├── frontend/ 
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── Context/
|       └── CSS/
|
|     
|── admin/
│   
│
└── README.md
```

---

## 🔗 Backend API Endpoints

### Authentication
- `POST /signup` – Register user
- `POST /login` – Login user

### Products
- `POST /upload` – Upload product image
- `POST /addproduct` – Add product
- `GET /allproducts` – Get all products
- `POST /removeproduct` – Delete product

### Cart (Protected)
- `POST /addtocart`
- `POST /removefromcart`
- `GET /getcart`

> Use header: `auth-token: <JWT_TOKEN>`

---

## 🧪 Data Models

### Product
```json
{
  "id": Number,
  "name": String,
  "image": String,
  "category": String,
  "new_price": Number,
  "old_price": Number,
  "available": Boolean,
  "date": Date
}
```

### User
```json
{
  "name": String,
  "email": String,
  "password": String,
  "cart": Object
}
```

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
PORT=4000
```

---

## ▶️ Run Project Locally

### Backend
```bash
cd backend
npm install
node index.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🧪 Testing Checklist

- MongoDB connected successfully
- Signup → Login → Receive JWT token
- Add product via Admin
- Upload image with form-data key: `image`
- Add items to cart
- Check frontend console & network tab

---

## 🛠 Known Fixes / Improvements

- Fixed `allProducts.map()` crash using defensive checks
- Auto-generated product ID logic added
- Image upload directory validation
- Fixed controlled input state issues
- Added missing `bcryptjs` dependency

---

## 📌 Future Enhancements

- Payment Gateway Integration
- Order persistence
- Product reviews & ratings
- Pagination & sorting
- Cloud image storage (Cloudinary)

---

## 👨‍💻 Author

**Amit Prakash Yadav**  
GitHub: [amitprakash24](https://github.com/amitprakash24)

---

⭐ If you like this project, give it a star!
