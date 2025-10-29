# Dust-Rose 2077 UI

A futuristic post-apocalyptic combat robot control system interface set in Jaipur, India, year 2077. Built for scavenger crews during high-pressure robot battles.

## Features

### 🎮 Core Modules

- **Robot Control & Monitoring** (`/robot`)
  - Interactive 3D robot model viewer (Three.js)
  - Real-time damage highlighting for critical components
  - Status bars for Battery, Armor, Weapon Heat, and Stability
  - Boost Mode button with power-level warnings
  
- **Resource & Upgrade Management** (`/inventory`)
  - Inventory tab with part cards
  - Upgrades section with compatibility warnings
  - Black Market with illegal mod indicators
  - Part durability and weight tracking

- **Tournament Tracking & History** (`/history`)
  - Battle replay viewer with surveillance-style interface
  - Upcoming matches calendar
  - Notoriety Meter showing Authority surveillance levels
  - Battle history with win/loss tracking

- **Comms & Alerts** (`/comms`)
  - Crew radio panel with static effects
  - Authority broadcast alerts (blocks UI until acknowledged)
  - System alerts and warnings
  - Sarcastic AI assistant messages

### 🎨 Visual Features

- **Diegetic UI Design**: Interface feels like part of the device
- **Gritty Aesthetics**: Rusted metal frames, neon green/orange accents
- **Glitch Effects**: Corruption animations tied to damage and Authority surveillance
- **Dynamic Animations**: Framer Motion powered transitions
- **Real-time Feedback**: Visual indicators for critical states

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **Styling**: TailwindCSS with custom theme
- **Animations**: Framer Motion
- **State Management**: Zustand
- **3D Model**: Spline (integration ready - model ID: d4f1ffbe-49f3-4d06-892d-0c5941da4337)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── RobotViewer.tsx # 3D robot model viewer
│   ├── StatusBars.tsx  # Status indicators
│   ├── BoostModeButton.tsx
│   ├── InventoryTabs.tsx
│   ├── NotorietyMeter.tsx
│   ├── ReplayViewer.tsx
│   ├── AlertsPanel.tsx
│   └── GlitchLayer.tsx # Visual effects
├── store/
│   └── useStore.ts     # Zustand state management
├── robot/              # Robot control page
├── inventory/          # Inventory page
├── history/            # Tournament/history page
├── comms/              # Communications page
└── globals.css         # Global styles and theme
```

## Color Theme

- **Background**: `#0a0a0a` (Dust-Rose BG)
- **Metal**: `#2a2520` (Rusted metal frames)
- **Neon Green**: `#00ff88` (Primary accent)
- **Burnt Orange**: `#ff6b35` (Warning/secondary)
- **Red**: `#ff0044` (Critical alerts)
- **Hologram**: `#00ffff` (Authority broadcasts)

## Features in Detail

### Robot Control
- Real-time monitoring of robot components
- Visual damage indicators with critical state highlighting
- Boost Mode activation with power drain warnings
- Interactive 3D model (currently using Three.js fallback, Spline integration ready)

### Inventory System
- Three-tab interface: Inventory, Upgrades, Black Market
- Part cards with durability, weight, and compatibility info
- Illegal mod detection with visual corruption effects
- Compatibility warnings for incompatible parts

### Notoriety System
- Authority surveillance meter (0-100%)
- Visual feedback based on surveillance level
- Glitch effects when surveillance is high
- Dynamic UI corruption warnings

### Alert System
- Crew radio with static effects
- Authority broadcasts that block UI until acknowledged
- System warnings for critical states
- Sarcastic AI messages ("Error 404: Morale not found")

## Known Issues

- Build may have SSR warnings with Three.js (doesn't affect dev mode)
- Spline 3D model integration needs package resolution (fallback Three.js model works)
- Some animations may need performance optimization for lower-end devices

## Future Enhancements

- Full Spline 3D model integration
- Sound effects and audio feedback
- More interactive repair sequences
- Additional battle replay features
- Crew member management
- Trading system integration

## License

MIT License - Feel free to use this as a template for your own projects!

## Credits

- Design inspired by post-apocalyptic cyberpunk aesthetics
- Built with React, Next.js, and Three.js
- Spline model: https://community.spline.design/file/d4f1ffbe-49f3-4d06-892d-0c5941da4337

---

**"Error 404: Morale not found"** - Dust-Rose 2077 AI Assistant

