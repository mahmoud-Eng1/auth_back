# Authentication API

A secure RESTful Authentication API built with Node.js, Express.js, and MongoDB.

## Features

* User Registration
* User Login
* JWT Authentication
* Access Token & Refresh Token Authentication
* Password Hashing with bcrypt
* Email Verification
* Protected Routes
* Input Validation
* Secure Cookie Support
* Role-Based Authorization
* Security Middleware (Helmet, CORS)

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* Joi

## Authentication Flow

1. User logs in with email and password.
2. Server generates:

   * Access Token (short-lived)
   * Refresh Token (long-lived)
3. Access Token is used to access protected resources.
4. When the Access Token expires, the client sends the Refresh Token to obtain a new Access Token.
5. User can logout which invalidates the Refresh Token.

## Installation

```bash
git clone https://github.com/mahmoud-Eng1/auth_back.git
cd api
npm install
```


```env
PORT=5000

DB_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d


```

## Running the Project

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint                           | Description               |
| ------ | ---------------------------------- | ------------------------- |
| POST   | /register               | Register User             |
| POST   | /login                 | Login User                |
| POST   | /refresh-token         | Generate New Access Token |
| POST   | /logout                | Logout User               |

## Security Features

* JWT Authentication
* Access Token & Refresh Token Strategy
* Password Hashing using bcrypt
* HTTP Security Headers with Helmet
* HTTP Parameter Pollution Protection (HPP)
* CORS Protection
* Secure Cookies Support

## License

MIT License
