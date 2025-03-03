# NestJS Practice Project

## 📌 Project Overview

This project is built using the **NestJS** framework to explore its fundamental concepts, architectural approach, and key features. The outcome of this project is a pseudo-application that supports:

- **User registration and verification**
- **Role-based access control (RBAC) using guards**
- **Authorization via JWT**
- **Data validation using pipes and class-validator**
- **Static file handling**
- **Swagger API documentation**

---

## 🚀 Tech Stack

- **NestJS** – Backend framework
- **TypeScript** – Language
- **Sequelize & PostgreSQL** – Database ORM and DB
- **JWT** – Authentication
- **Swagger** – API Documentation
- **Docker** – Containerization
- **Multer** – File uploads

---

## 🛠 Features

### 🔹 Authentication & Authorization

- JWT-based authentication
- Role-based access control using custom decorators and guards

### 🔹 User Management

- Register, verify users
- Assign roles dynamically (Admin feature)
- Ban/unban users

### 🔹 API Documentation

- Swagger UI setup at `/api/docs`

### 🔹 Static File Handling

- Uploaded files are stored in a `static/` directory

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/petrakowww/nestjs-backend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.development.env` file based on `.env.example` and configure:

```env
APP_PORT=5000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Project

#### Using Node.js

```sh
npm run start
```

#### Using Docker

```sh
docker-compose up --build
```

---

## 📖 API Documentation

Once the server is running, access the Swagger documentation at:

> The documentation is short and incomplete, tested only for review

📌 **http://localhost:5000/api/docs**

---

## 🔐 Role-based Access Control

> You add the roles yourself through the database

- **USER**: Can register and access limited routes
- **ADMIN**: Can assign roles and ban users

#### Example of Role Guard Usage:

```ts
@Roles('ADMIN')
@UseGuards(RolesGuard)
@Get('/admin')
public getAdminPanel() {
  return "Admin access granted";
}
```

---

## 🛠 Development & Debugging

- Enable debugging with:

```sh
npm run start:debug
```

- Logs and errors are displayed in the terminal.

---

This project is for educational purposes.