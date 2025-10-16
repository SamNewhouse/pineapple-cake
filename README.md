# 🍰 Pineapple Cake

A React Native mobile application built with Expo and UI Kitten, designed as the frontend client for a gamified item collection and trading system.

## 📱 About

Pineapple Cake is a cross-platform mobile app that allows users to:

- Scan items using device camera
- Collect and manage virtual items
- Trade items with other players
- Authenticate securely with Google integration

## 🛠️ Tech Stack

- **Framework**: React Native 0.81.4 with Expo SDK 54
- **UI Library**: UI Kitten (Eva Design System)
- **Language**: TypeScript 5.9.3
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Authentication**: Expo Auth Session (Google OAuth)
- **Camera**: Expo Camera
- **Storage**: AsyncStorage

## 📂 Project Structure

```
src/
├── api/          # API communication layer
├── components/   # Reusable UI components
├── context/      # React Context providers
├── core/         # Core utilities and configurations
├── screens/      # Screen components
├── styling/      # Theme and styling configurations
└── types/        # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SamNewhouse/pineapple-cake.git
cd pineapple-cake
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your backend API URL and other configuration

### Development

Start the development server:

```bash
npm start
```

Platform-specific commands:

```bash
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
```

### Code Formatting

Format code with Prettier:

```bash
npm run format
```

## 📱 Features

- **Camera Scanning**: Use device camera to scan physical items
- **Item Collection**: View and manage collected items
- **Trading System**: Create, accept, and manage trades with other players
- **Google Authentication**: Secure login with Google OAuth
- **Cross-Platform**: Runs on iOS, Android, and Web
- **Offline Support**: AsyncStorage for local data persistence

## 🔧 Configuration

The app is configured through:

- `app.json` - Expo app configuration
- `eas.json` - Expo Application Services configuration
- `.env` - Environment variables (create locally)
  `STAGE=`

## 📦 Build & Deploy

Build for production:

```bash
eas build --platform all
```

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Sam Newhouse**

- Website: [www.samnewhouse.co.uk](https://www.samnewhouse.co.uk)
- GitHub: [@SamNewhouse](https://github.com/SamNewhouse)
