# RideNow - Premium Ride Booking Platform

## Overview

RideNow is a full-stack ride-booking application inspired by Uber and Ola's design principles. The platform connects riders with drivers, offering real-time ride tracking, wallet management, and comprehensive driver dashboards. Built with React, TypeScript, Express, and PostgreSQL, it provides a seamless experience for both riders and drivers with features like ride history, live tracking, multiple ride types, and integrated payment systems.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool for fast development and optimized production builds
- Wouter for lightweight client-side routing
- TanStack Query for server state management and caching

**UI/Component System**
- shadcn/ui components built on Radix UI primitives for accessibility
- Tailwind CSS for utility-first styling with custom design tokens
- Dark/light theme support with persistent theme storage
- Framer Motion for smooth animations and page transitions
- Custom design system following Uber's dark interface and Ola's clean aesthetic

**State Management**
- React Query for server state with custom query client configuration
- Local component state with React hooks
- Theme context for global theme management
- Custom authentication hook (`useAuth`) for user session handling

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Custom middleware for request logging and error handling
- Session-based authentication with secure cookie management
- RESTful API endpoints under `/api` namespace

**Authentication System**
- Replit OpenID Connect (OIDC) integration for authentication
- Passport.js strategy for OAuth flow
- PostgreSQL session store using `connect-pg-simple`
- User session management with automatic token refresh

**Database Layer**
- Drizzle ORM for type-safe database queries
- Neon PostgreSQL serverless database
- WebSocket support for real-time database connections
- Schema-first approach with TypeScript type generation

**Data Models**
- Users: Supports both rider and driver user types with profile information
- Drivers: Extended driver details including vehicle information and ratings
- Rides: Complete ride lifecycle tracking with status management
- Wallets: Digital wallet system for payments and balance management
- Sessions: Secure session storage for authentication

### Design System

**Color Palette**
- Dark mode (primary): Deep navy-black backgrounds with vibrant teal-green accents
- Light mode: Clean white backgrounds with trustworthy green and professional blue
- Semantic colors for success, warning, and danger states
- CSS variables for dynamic theming

**Typography**
- Inter font family for UI elements and body text
- Responsive font sizing with mobile-first approach
- Consistent font weights for hierarchy (300-800)

**Component Patterns**
- Compound component patterns for complex UI elements
- Controlled/uncontrolled component flexibility
- Accessible components following WAI-ARIA guidelines
- Skeleton loaders with shimmer effects for loading states

### File Structure

**Monorepo Organization**
- `/client`: Frontend React application
  - `/src/components`: Reusable UI components
  - `/src/pages`: Route-based page components
  - `/src/lib`: Utilities, theme provider, query client
  - `/src/hooks`: Custom React hooks
- `/server`: Backend Express application
  - Authentication logic and session management
  - Route handlers and middleware
  - Database connection setup
- `/shared`: Shared TypeScript types and database schema
- `/migrations`: Drizzle database migrations

### Key Features

**Rider Features**
- Multi-location autocomplete for pickup/drop selection
- Multiple ride types (Mini, Prime, SUV) with dynamic pricing
- Real-time ride tracking with map visualization
- Digital wallet for cashless payments
- Ride history with ratings and receipts
- 24/7 support system

**Driver Features**
- Driver dashboard with earnings analytics
- Ride request management (accept/reject)
- Active ride tracking and navigation
- Performance metrics (ratings, acceptance rate)
- Weekly earnings visualization

**Real-time Features**
- Live ride status updates (searching → found → on-way → arrived)
- Driver location tracking on interactive maps
- Automatic status progression with toast notifications

## External Dependencies

### Third-Party Services

**Authentication**
- Replit OIDC for user authentication and authorization
- OAuth 2.0 flow with token management

**Database**
- Neon Serverless PostgreSQL for scalable data storage
- WebSocket connections for real-time database operations

### External Libraries

**Frontend**
- Leaflet for interactive map rendering and visualization
- date-fns for date formatting and manipulation
- Framer Motion for animations and transitions
- React Hook Form with Zod for form validation
- Radix UI for accessible component primitives

**Backend**
- drizzle-orm and drizzle-kit for database management
- express-session for session handling
- passport and openid-client for authentication
- memoizee for response caching

**Development Tools**
- Vite plugins for Replit integration (cartographer, dev banner)
- TypeScript for type safety across the stack
- ESBuild for server-side bundling

### Asset Management
- Static image assets stored in `/attached_assets/generated_images`
- Vite alias configuration for simplified imports (@, @shared, @assets)