# Neha's Kitchen

## Run locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

## Configure admin Google sign-in

Admin access uses Firebase Authentication with Google as the sign-in provider. The app allows only `vishalmugutrao@gmail.com` and `nehamugutrao@gmail.com`; all other Google accounts are signed out.

1. Create or select a Firebase project and register a web app.
2. In Firebase Console, enable **Authentication → Sign-in method → Google**.
3. Add the deployed site host (and `localhost` for local development) to **Authentication → Settings → Authorized domains**.
4. Copy the web app's API key, auth domain, project ID, and app ID into `.env.local` using the variable names in `.env.example`.
5. For GitHub Pages deployments, add repository Actions secrets named `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID`. The deploy workflow passes these to the Vite build.

Without Firebase configuration, the storefront remains available but admin sign-in is disabled.

Admin orders are currently stored in each browser's local storage; Google sign-in does not sync orders between devices. If order data is moved to a backend, authorize these same accounts in backend security rules as well—client-side checks alone do not secure backend data.

## Scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run lint` — run ESLint
