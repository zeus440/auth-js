# Auth.js - A Simple and Secure User Authentication System 🔒

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white)

Welcome to the **Auth.js** repository! This project provides a secure and straightforward user authentication system using modern technologies like Node.js, Express, MongoDB, bcrypt, and JWT. It includes essential features such as user registration, login, and protected profile routes, making it an excellent starter template for your next web application.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Middleware](#middleware)
7. [Security](#security)
8. [Contributing](#contributing)
9. [License](#license)
10. [Releases](#releases)

## Features

- **User Registration**: Users can create an account with secure password hashing.
- **User Login**: Secure login functionality using JWT for token-based authentication.
- **Protected Routes**: Access control for user profiles and other sensitive routes.
- **Simple Setup**: Quick and easy to set up for any Node.js application.
- **RESTful API**: Built as a REST API, making it easy to integrate with front-end frameworks.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing user data.
- **bcrypt**: A library to help hash passwords securely.
- **JWT (JSON Web Tokens)**: For securely transmitting information between parties.

## Installation

To get started with Auth.js, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zeus440/auth-js.git
   cd auth-js
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**: Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret key:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

Your application should now be running on `http://localhost:3000`.

## Usage

After setting up the application, you can use the following API endpoints for user authentication:

### User Registration

- **Endpoint**: `POST /api/register`
- **Body**:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

### User Login

- **Endpoint**: `POST /api/login`
- **Body**:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

### Get User Profile

- **Endpoint**: `GET /api/profile`
- **Headers**: 
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```

## API Endpoints

### Registration Endpoint

- **Method**: `POST`
- **Path**: `/api/register`
- **Description**: Registers a new user.
- **Response**:
  - **Success**: `201 Created`
  - **Error**: `400 Bad Request`

### Login Endpoint

- **Method**: `POST`
- **Path**: `/api/login`
- **Description**: Authenticates a user and returns a JWT.
- **Response**:
  - **Success**: `200 OK`
  - **Error**: `401 Unauthorized`

### Profile Endpoint

- **Method**: `GET`
- **Path**: `/api/profile`
- **Description**: Returns user profile information.
- **Response**:
  - **Success**: `200 OK`
  - **Error**: `401 Unauthorized`

## Middleware

Auth.js includes middleware to protect routes and validate JWTs. The middleware checks for a valid token in the `Authorization` header. If the token is valid, the request proceeds; otherwise, it returns a `401 Unauthorized` response.

### Example Middleware

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access denied');
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};
```

## Security

Security is a priority in Auth.js. The application uses bcrypt to hash passwords before storing them in the database. This ensures that even if the database is compromised, user passwords remain secure.

### Password Hashing Example

```javascript
const bcrypt = require('bcrypt');

const hashedPassword = await bcrypt.hash(password, 10);
```

## Contributing

We welcome contributions to Auth.js! If you have suggestions for improvements or want to add features, please fork the repository and submit a pull request. Make sure to follow the coding standards and write tests for any new functionality.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Releases

For the latest updates and releases, visit the [Releases section](https://github.com/zeus440/auth-js/releases). Here, you can download the latest version and check for any important changes.

## Conclusion

Auth.js provides a robust foundation for building user authentication systems in your web applications. With its straightforward setup and essential features, you can focus on building your application without worrying about the complexities of authentication.

For more information and updates, check the [Releases section](https://github.com/zeus440/auth-js/releases).