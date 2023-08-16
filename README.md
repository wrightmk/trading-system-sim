# Trading System Simulator

## Introduction

The Trading System simulator is a simple platform designed to allow users to create an account and then send and receive virtual currency.

## Technologies

- **Tech Stack**:
  - **Frontend**: React.js
  - **Backend**: Express.js
  - **Database**: PostgreSQL (Chosen for ACID-compliant transactions)
  - **SQL Query Builder**: Knex.js
  - **Testing**: Jest
- **Containerization**: Docker
- **Folder Structure**: The structure is modular, separating concerns and making the codebase easier to navigate.

## Getting Started

### Prerequisites

- Node.js v18
- Docker & Docker Compose
- A .env file in the root directory with the necessary environment variables (see env.example)
- Brew\* (only for local development)
- Postgresql 14\* (only for local development)

## Development Using Docker (Recommended)

1. Make sure .env is copied over/configured from .env.example
2. Clone the repository: `git clone https://github.com/your-repo-link/trading-system-sim.git`
3. Navigate to the project directory: `cd trading-system-sim`
4. If you ran local development first
   a. Change into Server directory: `cd server`
   b. Remove node_modules: `rm -rf node_modules`
   c. Remove package-lock.json: `rm -rf package-lock.json`
   d. Switch back to root: `cd ..`
5. Build the Docker services: `docker-compose build`
6. Start the Docker services: `docker-compose up`
7. Once the services are up, the backend should be accessible at <http://localhost:3001> and the frontend at <http://localhost:3000>.

### Testing

Tests are written using Jest. To run tests, use the command: `docker exec -it trading-system-sim-server-1 npm test`.

## Local Development (Without Docker)

### System

1. Start Postgresql 14 `brew services start postgresql` or run manually (`/usr/local/opt/postgresql@14/bin/postgres -D /usr/local/var/postgres`)
2. Make sure to set `USING_DOCKER` flag in .env to false

### Server

1. Create development and testing database with `npm run create-db`
2. `cd server`
3. `npm run knex:migrate:latest`
4. `npm i`
5. `npm start`

### Client

1. `cd client`
2. `npm i`
3. `npm start`

### Testing

Tests are written using Jest. To run tests, use the command: `npm run test`.

## Database Schema

The system uses two tables:

1. **Users**: Stores user details.

- `id`: Unique identifier.
- `username`: User's chosen name.
- `password_hash`: Hashed password for security.
- `balance`: Current balance of token.

2. **Transactions**: Logs all transactions.

- `id`: Unique identifier.
- `sender_id`: Reference to the user sending token.
- `receiver_id`: Reference to the user receiving token.
- `amount`: Amount of token being transferred.
- `timestamp`: When the transaction occurred.

## Frontend Guide

The frontend is built using React.js and styled with TailwindCSS. The main pages/components include:

- `Login Page`: Allows users to log in.
- `Registration Page`: Allows new users to register.
- `User Page`: Displays user's balance and allow users to send funds if logged in.

## API Reference

### Auth

#### POST `/auth/login`

**Description:** Authenticate a user and return a JWT token.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Sample 200 Response:**

```json
{
  "token": "your-jwt-token"
}
```

### Users

#### POST `/users`

**Description:** Register a new user.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Sample 201 Response:**

```json
{
  "token": "your-jwt-token"
}
```

#### GET `/users/:id`

**Description:** Retrieve details of a user.

**Parameters:**

- **`id`**: The ID of the user.

**Sample 200 Response:**

```json
{
  "id": 1,
  "username": "sampleUser",
  "balance": 1000
}
```

### Transactions

#### POST `/transactions`

**Description:** Create a new transaction.
**Authentication:**
Set the bearer token in the `Authorization` header. You can obtain this token by logging in.

**Request Body:**

```json
{
  "senderId": 1,
  "receiverId": 2,
  "amount": 100
}
```

**Sample 201 Response:**

```json
{
  "transactionId": 1,
  "senderId": 1,
  "receiverId": 2,
  "amount": 100
}
```

### Error Handling

In case of an error, the API will return a response in the following format:

```json
{
  "message": "Error message here",
  "error": "Detailed error information (if available)"
}
```
