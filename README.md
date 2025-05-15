# Store Desk – E-commerce Admin Panel

A minimal full-stack e-commerce web application with an admin panel to manage products. Built using:

- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Deployment**: Vercel

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js & npm installed
- PostgreSQL installed and running
- Git installed

---

### 🖥️ Frontend (React + Tailwind CSS)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend locally:
   ```bash
   npm run dev
   ```
4. Set up environment variables:
   Create a `.env` file in the `Frontend` folder with the following content:

   ```
   VITE_BACKEND_URL=http://localhost:3000
   ```
5. App will be available at `http://localhost:5173`

---

### ⚙️ Backend (Express + PostgreSQL)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` folder with the following content:

   ```
   PORT=3000
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<your_db_name>
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Backend runs on `http://localhost:5000`

---

## ✅ What's Working

- ✅ **Add Product Form** with 12+ fields and validations
- ✅ **Product Listing Page** styled like Amazon (clean UI)
- ✅ **Responsive Design** using Tailwind CSS
- ✅ **REST API** for product CRUD operations
- ✅ **PostgreSQL Integration** for product data
- ✅ **Deployment on Google Cloud Run**
- ✅ **Connected frontend and backend**

---

## 🗂️ Project Structure

```
Store-Desk/
├── frontend/          # React + Vite + Tailwind
├── backend/           # Node.js + Express + PostgreSQL
├── README.md
```

---


## 🛒 Features Implemented

### Product Form with Validation

- Add new products using a user-friendly form
- Input validation includes:
  - Required fields
  - Proper number formats

### Product List with Search

- Displays all submitted products in a structured list


### API Integration

- All product data is stored and retrieved via RESTful APIs
- Backend built using Node.js, Express, and PostgreSQL


---

## 📬 Contact

For issues or feedback, open an issue on the [GitHub repo](https://github.com/Laxmikant3/Store-desk).
