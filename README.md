# Quiz Arena Frontend

Quiz Arena Frontend is the cross-platform mobile client for Quiz Arena, a trivia and quiz application built with Expo and React Native. The app supports mobile gameplay experiences, app-store delivery workflows, real-time interactions, analytics/monitoring, and reusable mobile UI patterns.

The repository contains production-style mobile app code for iOS and Android, including build/submit scripts and native capability integrations.

## Core capabilities

- Mobile trivia/quiz gameplay experience
- Expo-based iOS and Android application
- App-store-oriented build and submit workflows
- Real-time features through socket communication
- Error monitoring through Sentry
- Advertising/monetization integration support
- Push notification and native app capabilities
- Image and media handling
- Storybook support for UI development
- Reusable mobile components and screens

## Tech stack

- Expo
- React Native
- TypeScript / JavaScript
- Expo Router
- Sentry
- Socket.io client
- React Native Google Mobile Ads
- Storybook
- Native mobile APIs through Expo packages

## Repository structure

Common areas include:

- `app/` - routed mobile screens
- `components/` - reusable UI components
- `hooks/` - shared mobile logic
- `assets/` - static images and app assets
- `.storybook/` - component development setup where present
- `scripts/` - build/release automation where present

Exact folder names may vary as the application evolves.

## Getting started

### Prerequisites

- Node.js
- npm
- Expo CLI / EAS CLI as needed
- Xcode for iOS builds
- Android Studio for Android builds

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run start
```

### Run on iOS

```bash
npm run ios
```

### Run on Android

```bash
npm run android
```

### Run Storybook

```bash
npm run storybook
```

If script names change, use `package.json` as the source of truth.

## Build and release

The project includes mobile build and submit scripts for Expo/EAS workflows.

Typical release flow:

```bash
npm run build
npm run submit
```

Validate the exact platform-specific scripts in `package.json` before release.

## Environment configuration

Create a local environment file for development configuration. Do not commit secrets.

Typical configuration includes:

- API base URL
- Sentry DSN
- Ad network identifiers
- App Store / Play Store configuration
- Socket server URL
- Environment name

## App Store

Quiz Arena has been distributed through the App Store. Use app-store metadata and screenshots separately from this repository when preparing public submissions or buyer-facing materials.

## Code quality notes

The project demonstrates a real mobile product codebase with native deployment scripts, real-time communication, app monitoring, monetization support, Storybook UI workflows, and reusable Expo/React Native architecture.

## Security notes

Do not commit `.env` files, app-store credentials, signing certificates, keystores, API keys, ad network secrets, or generated build artifacts.
