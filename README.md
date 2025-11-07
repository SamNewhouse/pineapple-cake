# 🍰 Pineapple Cake

A React Native mobile game built with Expo, designed as the frontend for the Pineapple Donut backend—collect, trade, and manage virtual items in a playful game ecosystem.

***

## 📱 About

Pineapple Cake is a mobile game where you scan real-world barcodes and objects to discover and grow your collection of unique virtual items.

**Main Features:**

- **Scan Items:** Unlock new collectibles using your phone’s camera, blending real and virtual exploration.
- **Collect Items:** Build your personal inventory of rare, fun, and varied virtual items.
- **Profile Customisation (Coming soon):** Personalize your profile with unique username, icon, bio and more.
- **Trading (Coming Soon):** Connect with other players to exchange, complete, and expand your collection.

Pineapple Cake is for anyone who enjoys collecting, discovering new items, and sharing or trading with others in a playful digital world.

***

## 🛠️ Tech Stack

- **Framework:** React Native (0.81+), Expo SDK 54
- **Language:** TypeScript 5.x
- **State Management:**  
  - **Redux Toolkit** — robust, scalable global state (inventory, scans, player, etc.)
  - **redux-persist** — persistent state across reloads/offline (items, player, scan history, etc.)
- **HTTP:** Axios
- **Auth:** JWT token
- **Camera:** Expo Camera (advanced scan probability, anti-repeat logic)
- **Storage:** AsyncStorage (used as redux-persist storage engine)
- **UI Architecture:** Atomic design (atoms → molecules → organisms → screens/layouts)

## 📂 Project Structure

```bash
src/
├── assets/                # Static images, icons, sprites
│   └── items/             # Item-specific images
├── config/                # Theme, global variables
├── core/                  # Core utilities and business logic
│   ├── api/               # API calls (auth, items, players, trades, etc.)
│   └── functions/         # Core functions (auth, items, scan logic, etc.)
├── lib/                   # Low-level helpers (http requests, logging, storage)
├── presentation/          # UI components, organized by atomic design
│   ├── 1-atoms/           # Base components (Button, Camera, Loading, etc.)
│   ├── 2-molecules/       # Composed components (ItemCard, ResultView)
│   ├── 3-organisms/       # Feature blocks (ItemsList)
│   ├── 4-layouts/         # Layout wrappers (AppInitializer, MainLayout)
│   └── 5-screens/         # Screen views (Inventory, Scan, Profile, etc.)
├── store/                 # Redux slices and store setup (items, player, scan, etc.)
├── types/                 # Shared TypeScript types/interfaces
└── utils/                 # Color, number, and time helpers
```


***

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
git clone https://github.com/SamNewhouse/pineapple-cake.git
cd pineapple-cake
npm install
```

1. **Environment:** Create a `.env` and set backend API URL:

```
API_URL=https://your-backend-url.com
STAGE=development
```

2. **Run App:**

```
npm start          # Launch Expo Dev Server
npm run android    # Android emulator/device
npm run ios        # iOS Simulator/device
npm run web        # Web browser
```

3. **Formatting Code:**

```
npm run format
```


***

## 🔧 Configuration

- `app.json` — Expo config (icon, name, splash, etc.)
- `eas.json` — Expo build services config
- `.env` — API endpoints/env

***

## 📦 Build \& Deploy

Build with Expo EAS:

```bash
eas build --platform all
```


***

## 📄 License

This project is private and proprietary.

***

## 👨‍💻 Author

**Sam Newhouse**

- Website: [www.samnewhouse.co.uk](https://www.samnewhouse.co.uk)
- GitHub: [SamNewhouse (Sam Newhouse)](https://github.com/SamNewhouse)
