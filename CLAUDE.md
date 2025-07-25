# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (or `pnpm dev`)
- **Build**: `npm run build`
- **Preview production build**: `npm run preview`
- **Type checking**: `npm run check`
- **Type checking (watch mode)**: `npm run check:watch`
- **Format code**: `npm run format`
- **Lint code**: `npm run lint`

## Project Architecture

This is a SvelteKit application for Macro Exotics, a luxury car and yacht rental service in Miami.

### Tech Stack
- **Frontend**: Svelte 5 with SvelteKit
- **Styling**: TailwindCSS with custom Miami Vice-inspired color scheme
- **UI Components**: Flowbite Svelte
- **Email**: Nodemailer for contact forms
- **Node version**: 20.x

### Project Structure

#### Core Application Files
- `src/routes/+layout.svelte` - Main layout with navigation, theme toggle, and responsive design
- `src/routes/+page.svelte` - Home page with intersection observer animations
- `src/routes/+page.server.ts` - Server-side data loading with caching for featured vehicles/yachts

#### Key Features
- **Theme System**: Light/dark mode toggle with localStorage persistence (`src/lib/stores/theme.ts`)
- **Vehicle/Yacht Management**: Dual content system for both cars and yachts
- **Email Service**: Contact form integration using Gmail SMTP (`src/lib/email/emailService.ts`)
- **Caching**: 5-minute cache for featured content to reduce API calls
- **Responsive Design**: Mobile-first with hamburger menu and intersection observer animations

#### Component Organization
- `src/lib/assets/components/` - Shared UI components (Footer, Navigation, buttons)
- `src/lib/assets/components/Home/` - Home page specific components (Hero, VehicleCarousel, etc.)
- `src/lib/components/` - Reusable business logic components
- `src/lib/stores/` - Svelte stores for global state management

#### Data & Types
- `src/lib/types.ts` - Comprehensive TypeScript definitions for User, Vehicle, Yacht, and related interfaces
- `src/lib/data/faq.ts` - FAQ content data
- `src/lib/constants/Pricing.ts` - Pricing configuration

#### Routes Structure
- `/` - Home page with featured vehicles/yachts
- `/vehicles` & `/vehicle/[id]` - Vehicle listings and details
- `/yachts` & `/yacht/[id]` - Yacht listings and details
- `/contact` - Contact form
- `/pricing` - VIP pricing (development only)
- `/api/email/contact/` - Email submission endpoint

### Development Notes

#### Environment Variables
- `EMAIL_USER` - Gmail SMTP username
- `EMAIL_PASSWORD` - Gmail app-specific password

#### Theme Colors
The application uses a Miami Vice-inspired color palette:
- Miami Blue: `#0bd3d3` (bg-[#0bd3d3])
- Custom gradients: `miami-gradient`, `miami-dark`, `miami-glow`, etc.
- Primary colors: light pink (`#f890e7`), dark (`#1C1C1C`), accent purple (`#513954`)

#### Key Development Patterns
- **Intersection Observer**: Used for scroll-triggered animations on home page
- **Server-side Caching**: Featured content cached for 5 minutes to reduce API load
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures
- **Responsive Navigation**: Collapsible mobile menu with theme-aware styling

#### Important Files for Modifications
- Vehicle/yacht data fetching: `src/routes/+page.server.ts`
- Navigation and layout: `src/routes/+layout.svelte`
- Theme management: `src/lib/stores/theme.ts`
- Type definitions: `src/lib/types.ts`
- Email functionality: `src/lib/email/emailService.ts`

### API Integration
The application fetches data from an external API (`apiUrl` from `src/lib/index.ts`) and includes vehicle type filtering to separate cars from yachts. Yacht data is transformed to include a `specs` object for display purposes.