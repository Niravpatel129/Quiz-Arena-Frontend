# Build and Run Instructions

## Prerequisites

- Node.js 18 or newer
- npm
- Expo/EAS tooling as needed for native builds
- Android Studio for Android native execution and/or Xcode on macOS for iOS execution
- Environment variables and service credentials required by the app

## Install

```bash
git clone https://github.com/Niravpatel129/Quiz-Arena-Frontend.git
cd Quiz-Arena-Frontend
npm install
```

## Start the Expo app

```bash
npm start
```

## Run on a platform

Android:

```bash
npm run android
```

iOS:

```bash
npm run ios
```

Web:

```bash
npm run web
```

## Build installable apps with EAS

Android:

```bash
npm run build-android
```

iOS:

```bash
npm run build-ios
```

Local native builds are also available through `npm run build-android-local` and `npm run build-ios-local`.