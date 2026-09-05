# Courtly — Sports Facility Booking App

A mobile app for browsing sports facilities and booking courts, built with Expo + React Native + TypeScript, integrating with a pre-built NestJS REST API.

## Tech Stack

- **Expo SDK** (managed workflow) + **Expo Router** (file-based navigation)
- **TypeScript**
- **NativeWind** (Tailwind CSS for React Native) — for styling
- **TanStack Query** — data fetching, caching, and background refetching
- **Zustand** — auth state management
- **React Hook Form + Zod** — form handling and validation
- **Axios** — HTTP client with request/response interceptors

### Why these choices

- **Expo Router** was chosen over React Navigation directly because file-based routing keeps the navigation structure predictable and easy to reason about as the app grows (auth group, tabs group, and dynamic routes for facility/booking details).
- **TanStack Query** removes the need for manual loading/error/refetch state in every screen — used extensively for facility list (infinite pagination), availability, and bookings.
- **Zustand** was chosen over Context API for auth state because it avoids unnecessary re-renders and keeps token access simple across the Axios interceptor, which lives outside the React component tree.
- **React Hook Form + Zod** gives type-safe, declarative form validation shared between the form UI and the API payload types (payload types are inferred directly from Zod schemas).

## Project Structure

```
src/
├── app/                      # Expo Router screens (routing only)
│   ├── _layout.tsx           # Root layout, QueryClientProvider, auth redirect logic
│   ├── (auth)/                # Login & Register screens
│   ├── (tabs)/                 # Home (facility list), My Bookings
│   ├── facility/[id].tsx        # Facility detail
│   ├── booking/[facilityId].tsx  # Create a new booking
│   └── bookings/[id].tsx          # View an existing booking's detail
├── features/                  # Domain logic grouped by feature
│   ├── auth/                   # Login/Register forms, schema, API, hooks
│   ├── facilities/               # Facility list, detail, filters
│   ├── bookings/                  # Availability, booking flow, my bookings
│   └── metadata/                   # Sports & cities dropdown data
├── components/ui/               # Reusable generic components (Skeleton, LogoutButton)
├── lib/apiClient.ts               # Axios instance with auth interceptor
├── store/authStore.ts              # Zustand auth store (token, user, login/logout)
├── types/                            # Shared global types (pagination, API errors)
├── utils/                              # formatPrice, formatDate, getApiErrorMessage
└── hooks/                                # useDebounce
```

## Expo Modules Used

The task requires at least 2–3 Expo SDK modules beyond core React Native. This app uses:

| Module                   | Where it's used                                                                | Why                                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **expo-secure-store**    | `authStore.ts`                                                                 | Stores the JWT access token in the device's encrypted storage (Keychain on iOS, Keystore on Android) instead of plain AsyncStorage, so the token persists securely across app restarts.           |
| **expo-image**           | Facility cards, facility detail header, booking cards                          | Provides automatic image caching, placeholder handling, and better memory performance than the core `Image` component — important since the app renders many facility photos in scrollable lists. |
| **expo-haptics**         | Filter selection, slot selection, booking confirmation, cancel booking, logout | Adds tactile feedback on key interactions (selecting a time slot, confirming a booking, logging out) to make the app feel more responsive.                                                        |
| **expo-linear-gradient** | Facility detail header image overlay                                           | Creates a smooth gradient over the header photo so the facility name and rating remain readable regardless of the image's brightness.                                                             |
| **expo-router**          | App-wide navigation                                                            | File-based routing for auth flow, tabs, and dynamic detail/booking screens.                                                                                                                       |

## Features Implemented

- ✅ **Authentication** — Register, Login, JWT stored securely, auto-attached to protected requests, auto-redirect on 401/expired token, Logout.
- ✅ **Facility List** — Paginated (infinite scroll), search by name, filter by sport and city (both fetched dynamically from `GET /v1/sports` and `GET /v1/cities`), skeleton loading states, broken image fallback, pull-to-refresh.
- ✅ **Facility Detail** — Description, address, amenities, available sports, list of courts with pricing, entry point to booking.
- ✅ **Availability & Booking** — Date picker (next 14 days), per-court hourly slots (07:00–22:00) with available/booked indication, animated bottom-sheet booking confirmation with swipe-to-dismiss, booking creation with error handling (e.g. slot taken by another user).
- ✅ **My Bookings** — Tabs for Upcoming / Past / Cancelled, booking card with facility, court, date, time, status, and reference code, full booking detail with price breakdown, cancel booking with confirmation dialog.

## Known Issues / Notes for Reviewer

- The `GET /v1/facilities` endpoint supports `page` and `limit` query parameters for pagination, but these are **not documented in Swagger** — this was discovered by testing directly against the API. Pagination is implemented using `useInfiniteQuery` based on the `pagination` object returned in the response.
- `avatarUrl` in the user object is currently always `null` from the API (no upload endpoint exists), so no avatar upload UI was built — this is intentional, not an oversight.
- The booking detail route is `bookings/[id].tsx` (plural) while the create-booking route is `booking/[facilityId].tsx` (singular) — this is intentional, as Expo Router does not support two different dynamic segment names within the same folder level.

## Getting Started

### Prerequisites

- Node.js LTS
- Expo CLI (`npx expo`)
- Android device or emulator with Expo Go installed (for development), or the built APK (for final testing)

### Installation

```bash
git clone <repo-url>
cd courtly
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
EXPO_PUBLIC_API_BASE_URL=https://courtly-api.hyge.web.id
```

### Running the app

```bash
npx expo start
```

Scan the QR code with Expo Go (Android) or press `a` to open in an Android emulator.

> **Note:** if your device and computer are on a restricted network (e.g. office/campus Wi-Fi with client isolation), use `npx expo start --tunnel`, or connect both devices to the same mobile hotspot.

### Installing the APK

The production Android APK is committed at `releases/courtly-android.apk` in this repository. To install it on an Android device:

1. Transfer the `.apk` file to the device (via USB, cloud storage, or direct download link from the repo).
2. On the device, enable **"Install from unknown sources"** for the file manager or browser used to open the APK.
3. Tap the APK file and follow the installation prompts.

## Testing Notes

Tested on: Android 16, POCO F6
