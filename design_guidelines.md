# Premium Ride Booking App - Design Guidelines

## Design Approach
**Reference-Based Strategy**: Drawing inspiration from Uber's sophisticated dark interface and Ola's clean, trustworthy aesthetic. The design prioritizes instant recognition, seamless flow, and confidence-building visual cues essential for ride-booking platforms.

**Core Design Principles**:
- Trust through clarity: Every interaction communicates safety and reliability
- Speed perception: Visual feedback makes actions feel instantaneous
- Spatial awareness: Maps and location always take visual priority
- Progressive disclosure: Information revealed contextually as needed

---

## Color Palette

### Dark Mode (Primary Theme - Uber-inspired)
- **Background Layers**: 
  - Base: 220 15% 8% (deep navy-black)
  - Elevated: 220 12% 12% (cards, modals)
  - Subtle: 220 10% 16% (hover states)
- **Primary Brand**: 145 85% 45% (vibrant teal-green for CTAs, success states)
- **Accent**: 215 100% 60% (electric blue for links, driver icons)
- **Text**: 
  - Primary: 0 0% 98%
  - Secondary: 220 8% 65%
  - Muted: 220 6% 45%
- **Semantic Colors**:
  - Success (ride confirmed): 145 85% 45%
  - Warning (searching): 45 95% 55% (amber)
  - Danger (cancel): 0 75% 55%

### Light Mode (Ola-inspired Clean Theme)
- **Background Layers**:
  - Base: 0 0% 100%
  - Elevated: 210 15% 98%
  - Subtle: 210 12% 95%
- **Primary Brand**: 155 65% 45% (trustworthy green)
- **Accent**: 220 90% 50% (professional blue)
- **Text**:
  - Primary: 220 20% 12%
  - Secondary: 220 12% 35%
  - Muted: 220 8% 55%

---

## Typography

**Font Stack**:
- Primary: 'Inter' (CDN) - UI, buttons, navigation
- Display: 'Cal Sans' or 'Inter' at 600+ weight - hero headlines, pricing

**Scale** (mobile → desktop):
- Hero Display: text-5xl → text-7xl (font-semibold)
- Page Headings: text-2xl → text-4xl (font-semibold)
- Section Titles: text-xl → text-2xl (font-medium)
- Body: text-base → text-lg (font-normal)
- Captions: text-sm → text-base (font-medium)
- Micro (labels): text-xs (font-medium, uppercase tracking-wide)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20**
- Tight grouping: p-2, gap-2
- Component padding: p-4 to p-6
- Section spacing: py-12 to py-20
- Large breakpoints: py-16 to py-24

**Grid Structure**:
- Container: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Cards: rounded-2xl with shadow-lg shadow-black/5 (dark) or shadow-black/10 (light)
- Map containers: Full bleed (w-full h-screen) with overlay controls

**Responsive Breakpoints**:
- Mobile first: stack everything vertically
- md (768px): Two-column layouts for forms/features
- lg (1024px): Three-column grids, side-by-side dashboards

---

## Component Library

### Navigation
- **Sticky navbar**: backdrop-blur-xl bg-background/80 with border-b border-white/10
- Logo: 32px height
- Menu items: text-sm font-medium with hover:text-primary transition
- Mobile: Slide-in drawer with Framer Motion (x: -100%)

### Buttons
- **Primary CTA**: bg-primary text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition
- **Secondary**: border-2 border-primary text-primary bg-transparent hover:bg-primary/10
- **Ghost (on images)**: backdrop-blur-md bg-white/20 border border-white/30 text-white (no hover effects)
- **Floating Mobile**: Fixed bottom-6 right-6, rounded-full with shadow-2xl

### Cards
- **Ride Type Cards**: rounded-2xl p-6 border-2 border-transparent hover:border-primary transition-all
- **Driver Cards**: Grid layout with avatar (56px rounded-full), name, rating stars, vehicle info
- **History Cards**: Timeline-style with left border accent, date badge, fare highlighted

### Forms & Inputs
- **Location Inputs**: Large text-lg p-4, rounded-xl with location icon prefix
- **Floating Labels**: Animated label that moves up on focus
- **Autocomplete Dropdowns**: Absolute positioned with shadow-2xl, max-h-60 overflow-auto

### Map Integration
- **Pickup/Drop Markers**: Custom styled with brand colors, pulse animation on active
- **Driver Icon**: Animated car icon (rotated based on direction), smooth position transitions
- **Route Polyline**: Dashed stroke in primary color with 60% opacity

### Status Indicators
- **Progress Bar**: Stepped progress (4 steps: Searching → Found → En Route → Arrived)
- **Pulse Animations**: ring-4 ring-primary/20 animate-pulse on searching state
- **Toast Notifications**: Slide in from top-right, auto-dismiss 4s, with status icon

### Data Display
- **Dashboard Cards**: Grid of stat cards with large numbers (text-4xl), label, and trend indicator
- **Pricing Table**: Clean rows with ride type, base fare, per km, total - hover:bg-subtle
- **Transaction List**: Alternating row colors, amount in font-semibold

---

## Animation Strategy (Framer Motion)

**Use Sparingly** - Only enhance, never distract:

**Page Transitions**:
- initial: { opacity: 0, y: 20 }
- animate: { opacity: 1, y: 0 }
- transition: { duration: 0.4, ease: "easeOut" }

**Map Interactions**:
- Driver movement: Smooth position interpolation over 2-3s
- Marker pulse: scale: [1, 1.15, 1] with repeat: Infinity, duration: 2

**Status Updates**:
- Status cards: Slide in from left (x: -50) with stagger children 0.1s
- Success confirmation: Scale up (1.05) with spring physics

**Critical Rule**: No animations longer than 0.6s, avoid continuous animations except for loading states

---

## Images & Visual Assets

### Required Images:
1. **Landing Hero**: Full-width (1920x800) cityscape with overlay gradient (from transparent to background), cars in motion blur effect
2. **Auth Pages**: Split-screen with illustration (600x800) showing happy riders/drivers - use abstract geometric style
3. **Driver Avatars**: Circular 56px, realistic diverse faces (use placeholder services)
4. **Vehicle Icons**: SVG icons for Mini/Prime/SUV (from Lucide or custom)
5. **Empty States**: Friendly illustrations for "no rides yet" scenarios

### Icon Library:
- **Primary**: Lucide React (map-pin, car, user, wallet, clock, star)
- Load via: `lucide-react` npm package
- Size consistency: 20px for inline, 24px for buttons, 32px+ for features

---

## Dark Mode Implementation

**Toggle**: Floating switch in navbar, persists choice to localStorage
- Sun/Moon icon with rotate animation on toggle
- Class-based approach: `.dark` on root element
- All colors defined with HSL for seamless theme switching
- Form inputs: Maintain dark background with lighter borders in dark mode

---

## Mobile Optimization

- **Touch Targets**: Minimum 44px height for all interactive elements
- **Bottom Navigation**: Fixed bar with 4-5 key actions (Home, Ride, Wallet, Profile)
- **Gesture Hints**: Subtle chevron indicators for swipeable content
- **Map Controls**: Larger buttons (48px) positioned in thumb-friendly zones
- **Modals**: Full-screen on mobile with slide-up animation, partial overlay on desktop

---

**Quality Benchmark**: Every screen should feel production-ready - no placeholder text, comprehensive data states (loading, empty, error, success), and pixel-perfect alignment. This isn't a prototype; it's a portfolio piece.