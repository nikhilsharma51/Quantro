# Quantro

Quantro is an unfinished trading journal and performance dashboard concept. It is intended to help traders record trades and review performance metrics such as profit and loss (P&L), win/loss counts, and returns through a dashboard interface.

> **Project status: Incomplete / Discontinued**  
> This repository is preserved as a snapshot of work in progress. It is not a production-ready application, and some screens and integrations are unfinished.

## Overview

The repository is split into a React frontend and a Node.js/Express backend:

- **Dashboard UI:** a trading overview with chart and summary components, trade table, and trade modal.
- **Authentication:** signup, login, logout, and a current-user endpoint using JWT-based authentication and cookies.
- **Trade API:** endpoints intended to create, list, update, delete, and summarize a user's trades.
- **Trade metrics:** calculations for P&L and related performance summaries.
- **Account settings:** a basic account screen; some actions are local-only or placeholders.

Some frontend dashboard data still comes from local mock data, and several pages (including Calendar and Stats) are placeholders. The frontend and backend should therefore not be assumed to be fully integrated.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Zustand for client-side state
- Axios for HTTP requests
- Recharts for charts
- Tailwind CSS and component-level CSS

### Backend

- Node.js and Express
- MongoDB with Mongoose for user accounts
- PostgreSQL with Sequelize for trade records
- JWT for authentication
- bcrypt for password hashing
- `cookie-parser`, `cors`, and `dotenv`

## Repository Structure

```text
Quantro/
├── client/
│   ├── src/
│   │   ├── components/    # Shared UI, dashboard widgets, and layout
│   │   ├── context/       # Authentication context
│   │   ├── data/          # Mock trade data
│   │   ├── pages/         # Landing, dashboard, login, account, etc.
│   │   ├── routes/        # Protected route handling
│   │   ├── services/      # API client
│   │   ├── store/         # Zustand application state
│   │   └── utils/         # Date filters and trade calculations
│   └── package.json
└── server/
    ├── config/             # Database connections
    ├── controllers/        # Authentication and trade handlers
    ├── middlewares/        # Authentication and trade validation
    ├── models/             # User and trade models
    ├── routes/              # API routes
    ├── server.js
    └── package.json
```

## Local Setup

The instructions below describe the intended development setup. Because the project is incomplete, successful startup and end-to-end functionality are not guaranteed.

### Prerequisites

- Node.js and npm
- MongoDB
- PostgreSQL

### 1. Configure the backend

In `server/`, create a `.env` file with at least the following values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/quantro
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_ORIGIN=http://localhost:5173
```

The current PostgreSQL connection is configured directly in `server/config/Postgres.js` rather than read from an environment variable. Configure it safely before running the backend; do not commit database credentials to source control.

Install dependencies and start the API:

```bash
cd server
npm install
npm run dev
```

The backend is configured to use `http://localhost:5000` by default.

### 2. Start the frontend

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

Vite normally serves the frontend at `http://localhost:5173`. To use a different API address, create `client/.env` and set:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Routes

The backend defines the following routes. They are documented here as implemented route definitions, not as a guarantee that every route works end to end.

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register a user | Public |
| `POST` | `/api/auth/login` | Log in | Public |
| `POST` | `/api/auth/logout` | Clear the authentication cookie | Authenticated |
| `GET` | `/api/auth/me` | Get the current user | Authenticated |
| `GET` | `/api/trades` | List trades, with optional date filters | Authenticated |
| `POST` | `/api/trades` | Create a trade | Authenticated |
| `GET` | `/api/trades/stats` | Get trade statistics | Authenticated |
| `PUT` | `/api/trades/:id` | Update a trade | Authenticated |
| `DELETE` | `/api/trades/:id` | Delete a trade | Authenticated |
| `GET` | `/api/health` | Basic health response | Public |

## Known Limitations

- The project is unfinished and has no configured automated test suite.
- The dashboard uses mock trade data in its client-side store; persistence and UI/API integration are incomplete.
- Calendar and Stats pages are placeholders.
- Account profile updates and password changes are not fully implemented.
- The backend uses both MongoDB and PostgreSQL, which adds setup complexity; the database configuration and integration need further review.
- Trade calculations and UI behavior need validation, especially for short positions, open trades, and incomplete records.
- The health endpoint reports fixed database status text rather than verifying the current connection state.
- The code has not been audited or verified as production-ready.

## Security Note

Before running or publishing this project, inspect the repository history and configuration for exposed credentials. The current source contains a hard-coded PostgreSQL connection string. If those credentials were real or were ever used, rotate them and move secrets into environment variables. Removing a secret from the latest file does not remove it from Git history.

## Disclaimer

Quantro is a software project for recording and reviewing trading activity. It does not execute trades, provide investment advice, or guarantee the accuracy of financial calculations. Do not use it to make financial decisions without independently verifying its calculations and data handling.
