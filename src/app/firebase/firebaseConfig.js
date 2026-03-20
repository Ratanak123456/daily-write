import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAZ1OC2pY6arR5KMH__uC79I3OybTHzMnA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "react-js-ed3c0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "react-js-ed3c0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "react-js-ed3c0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "563623102624",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:563623102624:web:a19576c96f608f673ea1c5",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ZZNGHV4QSJ",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics is optional and only available in supported browser environments.
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}
