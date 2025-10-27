![App Icon](https://raw.githubusercontent.com/SamNewhouse/pineapple-cake/main/assets/icon.png)

# 🍰 Pineapple Cake

A React Native mobile game built with Expo, designed as the frontend for the Pineapple Donut backend—collect, trade, and manage virtual items in a playful game ecosystem.

---

## 📱 About

Pineapple Cake lets users:

- **Scan items** (barcodes + physical items) with device camera, using advanced scan probability logic and anti-repeat safety
- **Collect items** in their inventory, with hydrated metadata, rarity, and state consistency
- **Trade with other players** _(feature in progress)_
- **Authenticate securely (Google/JWT)_
- Seamless sync with Pineapple Donut serverless backend (AWS Lambda/DynamoDB)

---

## 🛠️ Tech Stack

- **Framework:** React Native (0.81.4), Expo SDK 54
- **Language:** TypeScript 5.9.3
- **State:** Context API
- **HTTP:** Axios
- **Auth:** JWT token
- **Camera:** Expo Camera (+ new probability/scan engine)
- **Storage:** AsyncStorage

---

## 📂 Project Structure

src/
├── assets/              # Images, icons, and static assets
│   └── items/           # Item-specific images (sprites, etc.)
├── context/             # React Context providers for global state (Game, StaticData, Auth, etc.)
├── core/                # Core utils: api/, auth/, storage/, scan.ts (scan logic), logging, etc.
│   └── api/             # API communication modules (players, items, trades, etc.)
├── presentation/
│   ├── 1-atoms/         # Base UI (Button, Input, Camera, Loading)
│   ├── 2-molecules/     # Composed UI (ResultView, filtered lists, etc.)
│   ├── 3-organisms/     # Larger UI (forms, preloaders)
│   ├── 4-layouts/       # Page layouts (AuthGuard, MainLayout, etc.)
│   └── 5-screens/       # Main screens (Inventory, Login, etc.)
└── types/               # Shared TypeScript types (Player, Item, etc.)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

git clone https://github.com/SamNewhouse/pineapple-cake.git
cd pineapple-cake
npm install

1. **Environment:** Create a `.env` and set backend API URL:
   API_URL=https://your-backend-url.com
   STAGE=development

2. **Run App:**
   npm start          # Launch Expo Dev Server
   npm run android    # Android emulator/device
   npm run ios        # iOS Simulator/device
   npm run web        # Web browser

3. **Formatting Code:**
   npm run format

---

## 📱 Features

- **Advanced Camera Scanning:** Barcode/item scan logic; probabilistic unlock, anti-repeat, fallback handling
- **Collectable System:** Hydrated item details, rarity, caching & state sync
- **Trading:** Offer/request/trade items with others _(in progress)_
- **Google Authentication**
- **Cross-Platform:** iOS, Android, Web (Expo)
- **Offline Support:** Local caching via AsyncStorage
- **ItemCard UI:** Refined with icons, layout tweaks

---

## 🔧 Configuration

- `app.json` — Expo config (icon, name, splash, etc.)
- `eas.json` — Expo build services config
- `.env` — API endpoint/env


## 📦 Build & Deploy

Build with Expo EAS:
eas build --platform all

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Author

**Sam Newhouse**

I'm just bored

- Website: www.samnewhouse.co.uk
- GitHub: @SamNewhouse
