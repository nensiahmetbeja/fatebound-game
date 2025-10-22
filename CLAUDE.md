# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FATEBOUND is a cinematic landing page for an upcoming dark fantasy RPG by Tika Studios. The page features a countdown timer to the teaser launch on November 24, 2025, email collection for community signups, and atmospheric visual effects.

**Tech Stack:** Next.js 14 with TypeScript, CSS Modules, React Hooks

**Target Launch Date:** November 24, 2025 (hardcoded in pages/index.tsx:16)

## Development Commands

```bash
# Development
npm run dev           # Start dev server at http://localhost:3000
npm install          # Install dependencies

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint (extends next/core-web-vitals)
```

## Architecture

### Page Structure
- **Single-page application** with no routing beyond the main landing page
- All functionality contained in `pages/index.tsx` (~300 lines)
- Global styles in `styles/globals.css`, component styles in `styles/Home.module.css`

### Key Features & Implementation

**1. Countdown Timer (pages/index.tsx:18-39)**
- Uses `setInterval` with 1-second updates
- Calculates days/hours/minutes/seconds to November 24, 2025
- Auto-stops when target date is reached

**2. Email Collection (pages/index.tsx:74-116)**
- Stores emails in `localStorage` under key `fatebound_emails`
- No backend/API integration (simulated with `setTimeout`)
- Basic email regex validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Prevents duplicate emails

**3. Particle Animation System (pages/index.tsx:41-72)**
- Dynamically creates 80 particle `<div>` elements on mount
- Particles have random sizes (0.5-4.5px), positions, and animation delays
- Box shadows for atmospheric glow effects
- Rendered into `<div id="particles">` container

### State Management
All state is local React state in the main component:
- `timeLeft`: Countdown timer state
- `email`: Form input value
- `message` / `messageType`: Form feedback messages

### Styling Approach
- **CSS Modules** for component-scoped styles
- **Color scheme:** Dark red primary (#8B0000), gold accents (#d4af37), dark browns (#512922, #6b3a2a)
- **Fonts:** Cinzel (serif) for title, Montserrat (sans-serif) for UI (loaded from Google Fonts)
- **Design inspiration:** A Plague Tale, Clair Obscur, Hellblade

### TypeScript Configuration
- Path alias `@/*` maps to project root (tsconfig.json:22-24)
- Strict mode enabled
- Target ES5 for broad browser compatibility

## Important Constants & Data

- **Target date:** `new Date('2025-11-24T00:00:00Z')` (pages/index.tsx:16)
- **localStorage key:** `fatebound_emails` (pages/index.tsx:99)
- **Particle count:** 80 particles (pages/index.tsx:47)
- **Tika Studios logo URL:** https://tikastudios.al/wp-content/uploads/2025/04/Tika-Studios.png
- **Meta OG image:** https://fatebound-game.vercel.app/og-image.png

## Deployment

Configured for Vercel deployment (vercel.json uses @vercel/next builder). The site is deployed at https://fatebound-game.vercel.app/

## Key Files

- `pages/index.tsx` - Main landing page component with all functionality
- `pages/_app.tsx` - Minimal Next.js app wrapper
- `styles/Home.module.css` - Component styles (particle effects, countdown, form)
- `styles/globals.css` - Global styles and resets
- `package.json` - Dependencies and scripts
