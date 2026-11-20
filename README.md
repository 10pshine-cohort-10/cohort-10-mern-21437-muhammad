# Notes App — MERN Cohort 10 Assignment

A full-stack notes application built with the MERN-style stack (Node/Express backend, React frontend, SQL database). This repo is being built incrementally across feature branches, starting with Auth, a Notes Dashboard, a Rich Text Note Editor, and an optional Profile screen.

## Project Structure

```
.
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── config/       # env, logger, database connection
│   │   ├── routes/       # route definitions
│   │   ├── controllers/  # request handlers
│   │   ├── services/     # business logic
│   │   ├── models/       # data access layer
│   │   ├── middleware/   # error handling, logging, etc.
│   │   ├── utils/        # shared helpers (e.g. AppError)
│   │   ├── app.js        # Express app setup
│   │   └── server.js     # server entry point
│   └── tests/            # Mocha/Chai test suite
│
└── frontend/             # React (Vite) client
    └── src/
        ├── components/   # reusable UI components
        ├── pages/        # top-level screens/routes
        ├── services/     # API client calls
        ├── hooks/        # custom React hooks
        └── utils/        # shared helpers/constants
```

## Git Branching Strategy

- **`main`** — production-ready code only. Protected; merged into via PR from `develop`.
- **`develop`** — integration branch where completed features land before a release to `main`.
- **`feature/<frontend|backend>/<name>`** — new functionality, branched from `develop` (e.g. `feature/backend/auth-routes`, `feature/frontend/notes-dashboard`).
- **`bugfix/<frontend|backend>/<name>`** — bug fixes, branched from `develop` (e.g. `bugfix/backend/health-check-crash`).

Workflow: branch off `develop` → open a PR back into `develop` → periodically merge `develop` into `main` for releases.

## Local Setup

### Backend

```bash
cd backend
cp .env.example .env    # fill in DB credentials, etc.
npm install
npm run dev              # starts the API with nodemon on PORT (default 5000)
```

Useful scripts: `npm start` (production start), `npm test` (Mocha/Chai), `npm run lint` (ESLint), `npm run typecheck` (TypeScript checking JSDoc-annotated `.js` files, no emit).

Health check: `GET http://localhost:5000/api/health`

### Frontend

```bash
cd frontend
cp .env.example .env     # set VITE_API_BASE_URL if different from default
npm install
npm run dev               # starts Vite dev server on http://localhost:3000
```

Useful scripts: `npm run build` (production build), `npm test` (Jest), `npm run lint` (ESLint), `npm run typecheck` (TypeScript checking JSDoc-annotated `.js`/`.jsx` files, no emit).

### Requirements

- Node.js 18+
- A PostgreSQL instance for the backend, configured via `backend/.env` (`DB_CLIENT=postgres`). `DB_CLIENT` is reserved for future MySQL support but is not implemented yet — any other value fails fast at startup.

## Type Safety

The project stays in plain JavaScript (matching the original setup) rather than converting to `.ts`/`.tsx`. Both `backend` and `frontend` instead use TypeScript in "check JS" mode (`allowJs` + `checkJs`, `tsc --noEmit` via `npm run typecheck`) against JSDoc type annotations on key modules (config, middleware, controllers, hooks, services). This satisfies real type checking without touching `start`/`dev`/`test`/`build`. A full `.ts` conversion is still possible later if the team wants stricter guarantees — see the summary note for this change for the trade-offs.
