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

### Back end infrastructure
- `../macroexotics-customer-dashboard`- The back end server for this app
- `../macroexotics-customer-dashboard`- We will reference files /macroexotics-customer-dashboard this repository
- `../macroexotics-customer-dashboard/src/lib/components` Back end Components

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
- `/contact` - Contact form with server-side validation
- `/faq` - Frequently asked questions
- `/pricing` - VIP pricing (development only)
- `/privacy` - Privacy policy
- `/login` - Authentication page (uses custom layout)
- `/api/email/contact/` - Email submission endpoint
- `/api/stripe/` - Payment processing endpoints (checkout, payment intent, verification)
- `/api/admin/cleanup-vehicles/` - Admin utility for vehicle management

### Development Notes

#### Environment Variables
- `EMAIL_USER` - Gmail SMTP username
- `EMAIL_PASSWORD` - Gmail app-specific password

#### Theme Colors
The application uses a Miami Vice-inspired color palette defined in `tailwind.config.js`:
- **Primary colors**: light pink (`#f890e7`), dark (`#1C1C1C`), accent purple (`#513954`)
- **Miami palette**: bright blue (`#08D3D3`), hot pink (`#ff0080`), teal (`#00ffff`), deep purple (`#6a0dad`)
- **Custom gradients**: `miami-gradient`, `miami-dark`, `miami-glow`, `miami-sunset`, `miami-night`
- **Dark mode**: Uses Tailwind's class-based dark mode switching

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
The application fetches data from an external API with environment-based URL configuration:
- **Development**: `http://localhost:5174/api`
- **Production**: `https://my.macroexotics.com/api`
- **Vehicle type filtering**: Separates cars from yachts in data processing
- **Data transformation**: Yacht data includes `specs` object for display purposes
- **Authentication**: Integrates with dashboard at `my.macroexotics.com` for user login

### Payment Integration
- **Stripe**: Payment processing with checkout sessions and payment intents
- **Payment flows**: Success/cancel redirect pages for completed transactions