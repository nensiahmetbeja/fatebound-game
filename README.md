# FATEBOUND Landing Page

A cinematic, anticipation-driven landing page for the upcoming 2D teaser of the dark fantasy RPG **FATEBOUND**, developed by **TIKA STUDIOS**.

## Features

- **Cinematic Design**: Dark medieval atmosphere with mystical lighting effects
- **Countdown Timer**: Real-time countdown to November 24, 2025
- **Particle Animation**: Subtle smoke/particle effects for atmosphere
- **Email Collection**: Community signup with localStorage persistence
- **Responsive Design**: Optimized for mobile and desktop
- **Social Media Ready**: Proper meta tags for sharing

## Tech Stack

- **Next.js 14** - React framework with TypeScript
- **CSS Modules** - Scoped styling
- **React Hooks** - State management and effects
- **Responsive Design** - Mobile-first approach

## Design Elements

- **Color Scheme**: Primary dark red (`#8B0000`) with gold accents (`#d4af37`)
- **Typography**: Cinzel (serif) for FATEBOUND title, Montserrat (sans-serif) for UI
- **Atmosphere**: Inspired by A Plague Tale, Clair Obscur, Hellblade
- **Animations**: Fade-ins, particle effects, hover interactions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd fatebound-game
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

Or use Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
fatebound-game/
├── pages/
│   ├── index.tsx          # Main landing page
│   └── _app.tsx          # App wrapper
├── styles/
│   └── Home.module.css   # Component styles
├── public/               # Static assets
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── README.md            # This file
```

## Features Breakdown

### Countdown Timer
- Calculates time remaining until November 24, 2025
- Updates every second using React hooks
- Responsive design for all screen sizes

### Email Collection
- Validates email format
- Stores emails in localStorage
- Success/error messaging
- Loading states

### Animations
- Staggered fade-in effects
- Particle system background
- Hover effects and transitions
- Scroll-based animations

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Optimized typography scaling
- Touch-friendly interactions

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance

- Optimized images and assets
- Minimal JavaScript footprint
- CSS animations using GPU acceleration
- Efficient particle system
- Next.js optimizations

## License

© 2025 Tika Studios – All Rights Reserved