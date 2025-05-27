# 🔐 Secure Authentication System with Node.js

## 📝 Description

This project is a user login and registration system focused on secure authentication.
User passwords are hashed using bcrypt, and JSON Web Tokens (JWT) are used to manage session authentication.

## ⚙️ Technologies Used

- Node.js + Express – Server and route handling
- bcrypt.js – Secure password hashing
- jsonwebtoken (JWT) – Token generation and verification
- dotenv – Environment variable management
- MongoDB – NoSQL database
- helmet.js – Enhances security via HTTP headers

## 🔐 Security-Focused Features

### ✅ User Registration

- Users submit an email and password
- The password is hashed with bcrypt before being stored in the database

### 🔑 Login

- Users provide their login credentials
- The system compares the submitted password hash with the stored hash
- If valid, a signed JWT is generated and returned to the user

### 🔒 Protected Routes

- Some routes require a valid JWT token
- A middleware verifies the token's signature before granting access

### 🛡️ Hardening Measures

- IP blocking after multiple failed login attempts
- Rate limiting to prevent brute-force attacks
- Helmet.js to secure HTTP headers against common vulnerabilities
