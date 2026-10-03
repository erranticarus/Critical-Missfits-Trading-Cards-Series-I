# 🎴 MavScript Universe - Legendary Trading Cards

**A React-powered interactive trading card collection featuring hybrid 3D tilt tracking, click-to-flip animations, holographic effects, and 100% original artwork.**

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:5173/trading-cards-react/`
   - Hover over cards to see dynamic 3D tilt tracking
   - Click cards to flip and reveal stats!

### Build for Production

```bash
npm run build
```

The static site will be in the `build/` folder, ready to deploy or turn in.

---

## 📁 Project Structure

```structure
TradingCards/
├── public/
│   ├── assets/              # Original artwork (9 PNG files)
│   │   ├── bunny-hoodie.png
│   │   ├── galaxy-girl.png
│   │   ├── mechanic-crew.png
│   │   ├── dog-love.png
│   │   ├── stitch-cute.png
│   │   ├── dragon-rider.png
│   │   ├── viking-chicken.png
│   │   ├── fear-loathing.png
│   │   └── glow-sticks.png
│   └── index.html
├── src/
│   ├── App.js               # Main app + design justification
│   ├── App.css              # Global styles
│   ├── Card.js              # Card component with tilt/flip
│   ├── Card.css             # Card-specific styles
│   ├── data.js              # All 9 card data
│   └── index.js             # React entry point
├── assets/                  # Duplicate for static deployment
├── build/                   # Production build output
└── README.md
```

---

## 🎨 Design Features

1. **Original Artwork (100% Tier)**
   - All 9 character illustrations are 100% original
   - Hand-drawn in Procreate with unique artistic style
   - Exceeds 5-6 card requirement

2. **Vector Graphics (SVG)**
   - Custom IDE-themed frames built inline with `<rect>`, `<circle>`, `<path>`
   - Scalable borders that remain crisp at any resolution
   - Pastel color palette dynamically injected per character

3. **Raster Graphics (PNG)**
   - Complex character art with organic shading and brush textures
   - Millions of color variations and photographic detail
   - Efficient file compression for web performance

4. **Hybrid 3D Interaction System**
   - **Tilt Tracking on Hover:** 5×5 invisible grid (25 zones) detects mouse position for real-time 3D tilt using `rotateX` and `rotateY`
   - **Click-to-Flip:** Four different flip directions based on character personality:
     - `rotateY(180deg)` - Standard horizontal flip
     - `rotateX(180deg)` - Vertical flip
     - `rotate3d(1,1,0,180deg)` - Diagonal spin
     - `rotate3d(-1,1,0,180deg)` - Inverted diagonal chaos

5. **Mouse-Tracking Holographic Foil Effect**
   - Rainbow shimmer overlay using `mix-blend-mode: color-dodge`
   - Radial gradient spotlight follows mouse cursor in real-time
   - React `onMouseMove` handler tracks position and updates inline styles
   - Dual-gradient system: moving spotlight + animated rainbow sweep
   - Smooth `0.1s` transitions for responsive tracking
   - Z-index layered between art and frame for premium TCG aesthetic

6. **Additional Enhancements**
   - Staggered floating animations across all 9 cards
   - Dynamic glow effects on hover
   - Responsive grid layout
   - Pastel color-coded frames by role

---

## ⚡ Modern Tech Stack

Built with **Vite** - the modern, lightning-fast build tool for React:

- **10-100x faster** than Create React App
- Instant hot module replacement (HMR)
- Optimized production builds with Rollup
- Zero vulnerabilities with latest dependencies

## 🧠 Technical Architecture

### Layering System (z-index)

```structure
Layer 1 (z-index: 1)   → CSS Gradient Background
Layer 2 (z-index: 2)   → Raster Character Art (PNG)
Layer 3 (z-index: 3) → Holographic Foil Overlay
Layer 4 (z-index: 4)   → Vector Frame (SVG)
```

### Why This Works

- **Vectors on Top:** Ensures crisp UI elements (borders, text) never blur
- **Holo Foil Between:** Creates premium card effect with blend mode magic
- **Rasters in Middle:** Complex artwork benefits from compressed PNG format
- **Gradients on Bottom:** Provides depth without additional HTTP requests

### Tilt Tracking Implementation

Each card has a 5×5 grid of invisible zones. The CSS `:has()` pseudo-class detects which zone is being hovered and applies the corresponding 3D transform:

```css
.card-container:has(.tilt-zone.tilt-1:hover) .card-inner {
  transform: rotateX(20deg) rotateY(-10deg);
}
```

This creates a realistic "holding a physical card" effect with smooth transitions.

### Mouse-Tracking Holographic Effect

The holographic shine follows your cursor using React state management:

```javascript
const [holoPosition, setHoloPosition] = useState({ x: 50, y: 50 });

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  setHoloPosition({ x, y });
};
```

The position is then used to update a radial gradient in real-time:

```css
radial-gradient(circle at 50% 50%, ...) /* follows mouse */
```

This creates a dynamic light spot that moves with your cursor, simulating real holographic card reflection.

---

## 🎨 Pastel Color Palette

Each card has a unique pastel frame color:

- **#a8e6ff** - Pastel Sky Blue (The Founder - Innovation)
- **#d4a5ff** - Pastel Lavender (The Architect - Cosmic Vision)
- **#b0c4d4** - Pastel Steel Blue (The Crew - Industrial)
- **#ffb3d9** - Pastel Rose Pink (Brindle Buddy - Loyalty)
- **#ff99cc** - Pastel Hot Pink (Experiment 626 - Chaos)
- **#ffb399** - Pastel Coral (Dragon Rider - Power)
- **#ffe5a3** - Pastel Golden Yellow (Chicken Keeper - Reliability)
- **#a8e6b3** - Pastel Mint Green (The Gonzo Devs - Debugging)
- **#e0b3ff** - Pastel Lilac (Neon Raver - UI/UX)

---

## 🛠️ Customization Guide

### Adding New Cards

1. Add your PNG artwork to `public/assets/`
2. Open `src/data.js` and add a new card object:

```javascript
{
  id: 10,
  name: "Your Character",
  role: "Your Role",
  image: "./assets/your-image.png",
  frameColor: "#yourColor",
  flipType: "flip-standard", // or flip-vertical, flip-diagonal, flip-invert
  stats: { stat1: 100, stat2: "Value" },
  desc: "Your character's lore text"
}
```

### Changing Flip Animations

Edit the `flipType` property in `data.js`:

- `flip-standard` - Classic horizontal door flip
- `flip-vertical` - Heavy garage door flip
- `flip-diagonal` - Disorienting diagonal spin
- `flip-invert` - Chaotic inverted flip

### Adjusting Tilt Sensitivity

In `Card.css`, modify the tilt transform values:

```css
.card-container:has(.tilt-zone.tilt-1:hover) .card-inner {
  transform: rotateX(20deg) rotateY(-10deg); /* Adjust these degrees */
}
```

---

## 🚢 Deployment

### Static Site Build

The project is configured for static deployment with relative paths:

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Test the build locally:**
   - Open `build/index.html` directly in a browser
   - All assets should load correctly

3. **Deploy:**
   - Upload the entire `build/` folder to any web server
   - Or turn in the `build/` folder as a ZIP file

### Deployment Options

- **GitHub Pages:** Upload `build/` folder contents
- **Netlify/Vercel:** Drag and drop `build/` folder
- **Local Server:** Turn in `build/` folder for grading

---

## 🏆 Credits

**Design & Development:** MavScript.blu
**Artwork:** 100% Original Illustrations (Procreate)
**Tech Stack:** Vite 6 + React 18, CSS3 3D Transforms, SVG, :has() Pseudo-class
**License:** Educational Project © 2025

---

## 🐛 Troubleshooting

### Images Not Showing?

- Verify file names match exactly (case-sensitive)
- Images must be in `public/assets/` for dev server
- Build process copies them to `build/assets/`
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Cards Not Tilting?

- Tilt requires `:has()` pseudo-class (modern browsers only)
- Works in Chrome/Edge 105+, Firefox 121+, Safari 15.4+
- Hover slowly across card to see effect

### Cards Not Flipping?

- Click anywhere on the card surface
- Check that `Card.js` has `onClick={handleClick}`
- Verify `.flipped` class is toggling in DevTools

### Build Not Working Offline?

- Check `package.json` has `"homepage": "."`
- All image paths in `data.js` should use `./assets/` not `/assets/`
- Rebuild with `npm run build`

---

**Ready to deploy your Legendary collection!** 🎴✨
