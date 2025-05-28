# 🔐 AuthJS - Secure Authentication System

## 📝 Description

**AuthJS** is a robust authentication system built with Node.js, focused on security, modularity, and real-world best practices. It handles user registration, login, token-based session authentication, and email verification.

## ⚙️ Technologies Used

- Node.js + Express – Server and route handling
- bcrypt.js – Secure password hashing
- jsonwebtoken (JWT) – Token generation and verification
- dotenv – Environment variable management
- MongoDB – NoSQL database
- helmet.js – Enhances security via HTTP headers
- nodemailer – Email verification service

## 🚀 Features

### ✅ User Registration

- Email and password submission
- Passwords are hashed with `bcrypt` before storage
- Automatically generates a unique email verification token
- Sends verification email to the user via `nodemailer`

### 📧 Email Verification

- On registration, user receives a verification email
- The email contains a secure token link
- User must click the link to activate their account
- Only verified users can log in

### 🔑 Login

- Secure password comparison using bcrypt
- Only verified accounts are allowed to log in
- Upon success, a JWT is generated and returned

### 🔒 Protected Routes

- Some routes require a valid JWT token
- A middleware verifies the token's signature before granting access

### 🛡️ Hardening Measures

- Helmet.js for secure HTTP headers
- Rate Limiting to prevent brute-force login attempts
- IP Blocking after multiple failed login attempts (configurable)
- Strict field validation to avoid injection or malformed payloads

## 📄 License

This project is open-source under the MIT license.
