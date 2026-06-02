# LaunchBoard Next.js Architecture

LaunchBoard is a modern Next.js architecture case study focused on building a clean, database-backed launch management dashboard with strong frontend architecture and real full-stack boundaries.

The goal of this project is not to build a toy CRUD app. The goal is to demonstrate how a serious App Router project can be structured with clear server/client boundaries, feature-based architecture, database access, authentication, authorization, validation, and testable logic.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start PostgreSQL with Docker

```bash
docker compose up -d
```

This starts a local PostgreSQL database for development.

### 3. Create the environment file

```bash
cp .env.example .env
```

Then update the values in `.env`.

Required variables:

```env
DATABASE_URL="postgresql://launchboard:launchboard@localhost:5432/launchboard?schema=public"

AUTH_SECRET="replace-me"
AUTH_GITHUB_ID="replace-me"
AUTH_GITHUB_SECRET="replace-me"
AUTH_URL="http://localhost:3000"

SEED_USER_EMAIL="demo@launchboard.local"
SEED_USER_NAME="Demo User"
```

Generate an Auth.js secret:

```bash
npx auth secret
```

### 4. Create a GitHub OAuth App

Create a GitHub OAuth App and use these local development values:

```txt
Homepage URL:
http://localhost:3000

Authorization callback URL:
http://localhost:3000/api/auth/callback/github
```

Then copy the generated credentials into `.env`:

```env
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

Do not commit `.env`.

### 5. Run database migrations

```bash
npm run db:migrate
```

This applies the Prisma schema to the local PostgreSQL database.

### 6. Seed development data

```bash
npm run db:seed
```

This creates a configurable demo user and demo launch records.

### 7. Start the development server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

### 8. Open Prisma Studio

```bash
npm run db:studio
```

This opens the database tables in the browser.

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run test:run
npm run db:migrate
npm run db:seed
npm run db:studio
```

## What This Project Demonstrates

This project demonstrates:

* Next.js App Router route groups and nested layouts
* React Server Components for server-side data loading
* Server Actions for database mutations
* Prisma with PostgreSQL
* Auth.js / NextAuth with GitHub OAuth
* Protected dashboard routes
* User-owned data access boundaries
* Zod validation for server-side form input
* Zustand for small client-side UI state
* Reusable UI primitives
* Feature-based project structure
* Vitest coverage for validation and pure business logic

## Tech Stack

### Frontend

* Next.js App Router
* React
* TypeScript
* Tailwind CSS
* React Server Components
* Client Components where interactivity is required
* Zustand for small client-side UI state

### Backend-adjacent / Full-stack Boundaries

* Server Actions
* Prisma ORM
* PostgreSQL
* Auth.js / NextAuth
* Prisma Adapter
* Zod validation
* Docker for local PostgreSQL

### Testing

* Vitest
* jsdom
* React Testing Library
* Pure helper and schema tests

## Core Features

### Public Marketing Page

A public landing page available at:

```txt
/
```

### Authentication

GitHub OAuth authentication is handled through Auth.js / NextAuth.

Auth routes are handled through:

```txt
/api/auth/[...nextauth]
```

The login page is available at:

```txt
/login
```

### Protected Dashboard

The dashboard area is protected on the server. Users who are not signed in are redirected to the login page.

Protected dashboard routes:

```txt
/dashboard
/dashboard/launches
/dashboard/launches/new
/dashboard/launches/[id]
/dashboard/account
```

### Launch Management

Signed-in users can:

* View their own launches
* Create a launch
* View launch details
* Delete their own launch records
* Filter launches by search, status, and priority

Launch records are scoped to the signed-in user. Users cannot access or mutate launch records that do not belong to them.

### Account Overview

The account page shows the current server-side session user context:

```txt
/dashboard/account
```

This page demonstrates how the protected dashboard reads the authenticated user on the server.

## Route Map

```txt
/                                  Public marketing page
/login                             GitHub sign-in page
/dashboard                         Protected dashboard overview
/dashboard/launches                User-owned launch list
/dashboard/launches/new            Create launch form
/dashboard/launches/[id]           Launch detail page
/dashboard/account                 Signed-in account overview
/api/auth/[...nextauth]            Auth.js route handler
```

## Project Structure

```txt
src/
  app/
    (marketing)/
      page.tsx

    (auth)/
      login/
        page.tsx

    (dashboard)/
      dashboard/
        account/
          page.tsx
        launches/
          [id]/
            page.tsx
          new/
            page.tsx
          page.tsx
        layout.tsx
        loading.tsx
        page.tsx

    api/
      auth/
        [...nextauth]/
          route.ts

    globals.css
    layout.tsx
    not-found.tsx

  components/
    layout/
      dashboard-header.tsx
      dashboard-sidebar.tsx

    ui/
      badge.tsx
      button.tsx
      card.tsx

  features/
    launches/
      actions/
        create-launch.ts
        create-launch-state.ts
        delete-launch.ts

      components/
        create-launch-form.tsx
        delete-launch-button.tsx
        launch-empty-state.tsx
        launch-list.tsx
        launches-board.tsx

      data/
        get-launches.ts

      schemas/
        create-launch-schema.ts

      types/
        launch.ts

      utils/
        filter-launches.ts
        launch-status.ts

  generated/
    prisma/

  lib/
    auth/
      auth.ts
      get-current-user.ts

    db/
      prisma.ts

    errors/
    validation/
    utils/
      cn.ts

  store/
    launch-filters-store.ts

  types/
    next-auth.d.ts

prisma/
  migrations/
  schema.prisma
  seed.ts
```

## Architecture Rules

### 1. The App Layer Owns Routing

The `src/app` directory is used for:

* Routes
* Layouts
* Loading states
* Route groups
* Server page entry points
* Auth route handlers

Business logic should not be dumped directly into route files.

### 2. Feature Logic Lives in `features`

Launch-related code is grouped under:

```txt
src/features/launches
```

This keeps the domain logic close together:

* Actions
* Components
* Data access
* Schemas
* Types
* Utilities

### 3. Server Components Are the Default

Pages and layouts stay as Server Components unless client interactivity is required.

Server Components are used for:

* Reading the current user
* Fetching launch data
* Protecting routes
* Composing page-level UI

### 4. Client Components Are Used Only When Needed

Client Components are used for:

* Forms using `useActionState`
* Search and filter controls
* Zustand-powered UI state
* Interactive user input

### 5. Database Access Stays on the Server

Prisma is only used in server-side modules.

The Prisma client is created in:

```txt
src/lib/db/prisma.ts
```

The file imports `server-only` to prevent accidental client-side usage.

### 6. Validation Happens on the Server

The create launch flow validates `FormData` using Zod inside the Server Action before writing to the database.

### 7. Authorization Happens on the Server

The project does not rely on hiding UI buttons for security.

Launch ownership is checked server-side when reading or mutating launch records.

Example boundary:

```txt
current user id + launch id
  ↓
find launch where id and ownerId match
  ↓
allow or return notFound
```

## Data Flow

### Reading Launches

```txt
Dashboard route
  ↓
requireCurrentUser()
  ↓
getLaunches(user.id)
  ↓
Prisma
  ↓
PostgreSQL
  ↓
map database records to UI-safe Launch type
  ↓
render UI
```

### Creating a Launch

```txt
Create launch form
  ↓
Server Action
  ↓
Zod validation
  ↓
requireCurrentUser()
  ↓
Prisma create
  ↓
PostgreSQL
  ↓
revalidate dashboard/list routes
  ↓
redirect to launch detail page
```

### Deleting a Launch

```txt
Delete form submit
  ↓
Server Action
  ↓
requireCurrentUser()
  ↓
check launch ownership
  ↓
Prisma delete
  ↓
revalidate dashboard/list routes
  ↓
redirect to launch list
```

## Server and Client Boundary

This project intentionally separates server-owned data from client-owned UI state.

### Server-owned data

Examples:

* Current user session
* Launch records
* Ownership checks
* Database writes
* Authorization

These stay on the server.

### Client-owned UI state

Examples:

* Search query
* Status filter
* Priority filter

These are managed with Zustand.

This prevents the client store from becoming a second source of truth for database data.

## Prisma

The Prisma schema is located at:

```txt
prisma/schema.prisma
```

The Prisma config is located at:

```txt
prisma.config.ts
```

The generated Prisma Client is output to:

```txt
src/generated/prisma
```

## Seed Data

The seed script creates a configurable demo user and demo launch records.

Default seed user:

```txt
demo@launchboard.local
```

The seed user can be changed locally through:

```env
SEED_USER_EMAIL="your-local-demo-email"
SEED_USER_NAME="Your Demo Name"
```

The repository keeps the seed generic and safe for GitHub.

## Testing

This project uses Vitest for unit and logic tests.

Covered areas include:

* Zod validation schema
* Launch status helpers
* Launch filtering logic

Run tests:

```bash
npm run test:run
```

Full final check:

```bash
npm run lint
npm run build
npm run test:run
```

## Why Zustand Is Used

Zustand is used only for small client-side UI state.

In this project it manages:

* Search query
* Status filter
* Priority filter

It does not store database records as the source of truth.

Launch data still comes from the server through Prisma and React Server Components.

## Why Zod Is Used

Zod is used to validate untrusted form input before writing to the database.

The create launch form sends `FormData` to a Server Action. The Server Action validates that data with Zod before Prisma creates a record.

This keeps the validation boundary on the server.

## Why Auth.js Is Used

Auth.js provides:

* GitHub OAuth login
* Database-backed sessions
* Prisma Adapter integration
* Server-side session access
* Protected dashboard routes

The dashboard layout requires a current user before rendering protected content.

## Authorization Strategy

Authentication answers:

```txt
Who is the user?
```

Authorization answers:

```txt
Can this user access this resource?
```

This project enforces ownership on the server.

Examples:

* Launch lists are filtered by `ownerId`
* Launch detail pages require both `id` and `ownerId`
* Delete actions verify ownership before deleting

The app intentionally returns `notFound()` when a user tries to access a launch they do not own.

## Final Project Goal

LaunchBoard is a frontend-led full-stack architecture case study.

It shows how a frontend-focused engineer can structure a modern Next.js application with:

* Clean routing
* Strong UI structure
* Server-side database access
* Authentication
* Authorization
* Validation
* Client-side UI state
* Tests
* Maintainable architecture boundaries

The emphasis is not only on building features, but on building them in a way that is understandable, maintainable, and presentable as a serious architecture project.
