# Firebase Google Login Setup (DailyWrite)

This guide explains everything needed to make Google login work with Firebase in this project.

## 1) What is already connected in code

The app is already wired for Firebase Google login in these files:

- [src/app/firebase.js](src/app/firebase.js)
- [src/pages/Auth.jsx](src/pages/Auth.jsx)
- [src/components/Button/Google.jsx](src/components/Button/Google.jsx)
- [.env.example](.env.example)

Flow used by the app:

1. User clicks Continue with Google.
2. Firebase popup opens (`signInWithPopup`).
3. App gets Firebase ID token.
4. If `VITE_FIREBASE_AUTH_EXCHANGE_URL` exists, app sends ID token to backend for app tokens.
5. Tokens are stored and user is redirected to home.

---

## 2) Firebase Console setup

### Step A: Enable Google provider

1. Open Firebase Console.
2. Go to Authentication.
3. Open Sign-in method.
4. Enable Google.
5. Save.

### Step B: Add Web App and copy config

1. Go to Project settings (gear icon).
2. In General tab, scroll to Your apps.
3. Add Web app if not added yet.
4. Copy Firebase SDK config values.

You need these values:

- apiKey
- authDomain
- projectId
- storageBucket
- messagingSenderId
- appId

### Step C: Authorized domains

In Authentication settings, add domains:

- localhost
- 127.0.0.1
- your production domain (when deployed)

If domain is missing, popup login can fail.

---

## 3) Create local environment file

1. In project root, create `.env`.
2. Copy from [.env.example](.env.example).
3. Fill values from Firebase.

Example:

```env
VITE_BASE_URL=http://localhost:8080/api/v1

VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=dailywrite-8d795.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=dailywrite-8d795
VITE_FIREBASE_STORAGE_BUCKET=dailywrite-8d795.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID

# Optional (recommended when backend controls sessions)
VITE_FIREBASE_AUTH_EXCHANGE_URL=http://localhost:8080/api/v1/auth/firebase/google
```

Notes:

- `VITE_FIREBASE_AUTH_EXCHANGE_URL` is optional.
- If omitted, app stores Firebase token directly.
- If provided, backend should return app `accessToken` (and optionally `refreshToken`).

---

## 4) Backend exchange endpoint (optional but recommended)

If you use backend session/JWT control, create endpoint similar to:

- POST `/auth/firebase/google`
- Request body:

```json
{
  "idToken": "FIREBASE_ID_TOKEN"
}
```

Backend should:

1. Verify Firebase ID token using Firebase Admin SDK.
2. Find or create user in your DB.
3. Return app tokens:

```json
{
  "data": {
    "accessToken": "APP_ACCESS_TOKEN",
    "refreshToken": "APP_REFRESH_TOKEN"
  }
}
```

The frontend already supports this response shape.

---

## 5) Run and test

1. Restart dev server after editing `.env`.
2. Open `/auth`.
3. Click Continue with Google.
4. Complete popup sign-in.
5. Confirm redirect to `/`.
6. Open `/profile` to confirm protected routes work.

---

## 6) Troubleshooting

### Error: Missing Firebase env

Cause: one or more required env vars not set.
Fix: fill all required `VITE_FIREBASE_*` fields in `.env`, then restart Vite.

### Error: popup blocked

Cause: browser blocked popup.
Fix: allow popups for your localhost/domain and retry.

### Error: auth/unauthorized-domain

Cause: current domain not in Firebase authorized domains.
Fix: add domain in Firebase Authentication settings.

### Error: token exchange failed

Cause: `VITE_FIREBASE_AUTH_EXCHANGE_URL` is set but backend endpoint failed.
Fix:

- verify endpoint URL
- verify backend expects `{ idToken }`
- verify backend returns `data.accessToken`

### Login works but protected pages redirect to /auth

Cause: app refresh token not stored in expected format.
Fix:

- ensure backend returns refresh token
- or ensure frontend fallback stores token in refresh slot (already implemented)

---

## 7) Security notes

- Never commit real `.env` secrets.
- Keep Firebase Admin SDK only on backend (never in frontend).
- Prefer backend token exchange for production apps.

---

## 8) Quick checklist

- Google provider enabled in Firebase.
- Authorized domains added.
- `.env` created and values filled.
- Dev server restarted.
- Google popup opens and login redirects correctly.
- Protected routes accessible after login.
