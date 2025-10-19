![App Icon](https://raw.githubusercontent.com/SamNewhouse/pineapple-cake/main/assets/icon.png)

# 🍰 Pineapple Cake

A React Native mobile app built with Expo, designed as the frontend for the Pineapple Donut backend—collect, trade, and manage virtual items in a playful game ecosystem.

## 📱 About

Pineapple Cake lets users:

- **Scan items** with the device camera  
- **Collect items** in their inventory  
- **Trade with other players**  _TODO_
- **Authenticate securely**

Seamlessly connects to the Pineapple Donut serverless backend (AWS Lambda/DynamoDB).

## 🛠️ Tech Stack

- **Framework:** React Native (0.81.4) · Expo SDK 54
- **Language:** TypeScript 5.9.3  
- **State:** Context API  
- **HTTP:** Axios  
- **Auth:** JWT token
- **Camera:** Expo Camera  
- **Storage:** AsyncStorage

## 📂 Project Structure

```bash
src/
├── assets/                # Images, icons, and other static assets
│   └── items/             # Item-specific images (e.g., item sprites)
├── context/               # React Context providers for global state
├── core/                  # Core utilities and infrastructure (API, auth, storage, etc.)
│   ├── api/               # API communication modules
│   ├── (other core utils) # Logging, variables, storage, etc.
├── presentation/          # All UI presentation logic and components
│   ├── 1-atoms/           # Base UI elements (Button, Input, etc.)
│   ├── 2-molecules/       # Composed UI elements (lists, result views, etc.)
│   ├── 3-organisms/       # Larger composed UI (preloaders, forms)
│   ├── 4-layouts/         # Page layouts and guards
│   └── 5-screens/         # Main application screens (pages)
└── types/                 # TypeScript type definitions shared across app
```

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

1. **Environment:**  
   Create a `.env` file and set your backend API URL:  

```
API_URL=https://your-backend-url.com
STAGE=development
```

2. **Run App:**

```

npm start          \# Launch Expo Dev Server
npm run android    \# Android emulator/device
npm run ios        \# iOS Simulator/device
npm run web        \# Web browser

```

3. **Formatting Code:**

```bash
npm run format
```

## 📱 Features

- **Camera Scanning:** Scan physical items and barcodes
- **Collectable System:** Manage collection and item details
- **Trading:** Offer/request/trade items with others
- **Google Authentication:** Secure sign-in
- **Cross-Platform:** iOS, Android, Web
- **Offline Support:** Local caching via AsyncStorage

## 🔧 Configuration

- `app.json` — Expo config (icon, name, splash, etc.)
- `eas.json` — Expo build services config
- `.env` — API endpoint and environment variables

## 📦 Build & Deploy

Build with Expo EAS:

```bash
eas build --platform all
```

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Sam Newhouse**

- Website: [www.samnewhouse.co.uk](https://www.samnewhouse.co.uk)
- GitHub: [@SamNewhouse](https://github.com/SamNewhouse)
