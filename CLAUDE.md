# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Backend for Eyeline Optica: an eyewear e-commerce store (frames, lenses, contact lenses, accessories) combined with a clinic system (doctors, schedules, appointments, prescriptions, Agora video calls). Express 5 + TypeScript + Mongoose (MongoDB), Socket.IO for realtime, SSLCommerz for payments, Cloudinary for images.

## Commands

```
npm run build      # tsc → dist/
npm run start      # node dist/server.js
npm run dev        # ts-node-dev --respawn dist/server.js
npm run lint       # eslint src/**/*.ts
npm run lint:fix
npm run format     # prettier on src/
```

Note: `npm run dev` points at `dist/server.js` (compiled output), not `src/` — run `npm run build` first, and rebuild to pick up source changes. There is no test suite (`npm test` exits with an error).

Runtime config comes from `.env` (DB_URL, PORT, JWT_SECRET, Cloudinary, SSLCommerz, Agora, SMS keys). All env access goes through `src/app/config/index.ts` — add new env vars there, never read `process.env` directly elsewhere.

## Architecture

**Bootstrap:** `src/server.ts` connects Mongoose, wraps the Express app (`src/app.ts`) in an HTTP server, and initializes Socket.IO via the `socketService` singleton. Cron jobs in `src/app/jobs/` are registered by side-effect imports in `server.ts` — a new job needs both the file and the import.

**Routing:** All routes mount under `/api/v1/` via `src/app/routes/index.ts`, which holds an `allRoutes` array mapping paths to module routers. A new module is not reachable until it's added to this array.

**Module pattern:** Each feature lives in `src/modules/<name>/` with the files:
- `.route.ts` — Express router; applies multer, image-combining middleware, `validateRequest(zodSchema)`, then controller
- `.controller.ts` — thin: wraps handlers in `catchAsync`, delegates to service, replies via `sendResponse(res, { statusCode, success, message, data })`
- `.service.ts` — all business logic and DB access; exports a `xService` object
- `.model.ts`, `.validation.ts` (Zod), `.type.ts`/`.types.ts`

**Error handling:** Throw `AppError(statusCode, message)` from anywhere; `catchAsync` forwards to `globalErrorHandler` (`src/app/middleware/globalErrorHandler.ts`), which normalizes Zod, Mongoose cast/validation, and duplicate-key errors via handlers in `src/app/errors/`.

**Image uploads:** Multipart requests carry the JSON payload as a string in a `data` field alongside files. Multer (`src/app/middleware/multer.ts`) writes files to disk, then a `combineImagesWith...` middleware (there are several variants for frames, carts, etc.) parses `req.body.data`, uploads files to Cloudinary, merges the secure URLs into `req.body`, and deletes the temp files — so by the time `validateRequest` and the controller run, `req.body` is plain JSON with image URLs.

**List queries:** `QueryBuilder` and `NewQueryBuilder` in `src/app/middleware/` are chainable helpers for `searchTerm`/filter/sort/paginate/field-select over Mongoose queries. `NewQueryBuilder.filter()` applies a `createdAt` date-range filter that defaults to the current month when `startDate`/`endDate` are absent — be aware of this when results seem to be missing.

**Auth:** JWT bearer tokens. `protect` in `src/app/middleware/auth.ts` verifies the token, looks the user up in `RegistrationModel`, and requires its `access` flag to be true. `protectPromo` is a separate guard tied to cart ownership.

**Payments (SSLCommerz):** Two parallel flows — `/ssl` for product sales and `/ssl-appointment` for doctor appointments — each with success/fail/cancel callback endpoints that mutate the sale/appointment record and redirect to hardcoded `eyelineoptica.com` frontend URLs.

**Realtime:** `src/modules/socket-service/socket.service.ts` is a singleton exposing `socketService.broadcastNewOrder(payload)` (emits `new_order_notification`) and a live-user-count broadcast. Import the singleton rather than creating new Socket.IO instances.

**CORS caveat:** Allowed origins are hardcoded in two places — `src/app.ts` (Express CORS) and `socket.service.ts` (Socket.IO CORS). A new frontend origin must be added to both.
