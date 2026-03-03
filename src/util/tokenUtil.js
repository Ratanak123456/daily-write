import { AES, enc } from "crypto-js";
import secureLocalStorage from "react-secure-storage";

// Keys for local storage
const ACCESS_TOKEN_KEY = "access-token";
const REFRESH_TOKEN_KEY = "refresh-token";
const ENCRYPT_KEY = "secure-storage";

// Helper to check if storage is available
const isStorageAvailable = () => {
    try {
        const test = '__storage_test__';
        secureLocalStorage.setItem(test, test);
        secureLocalStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
};

// Helper to encrypt a token
export const encryptToken = (token) => {
  if (!token) return null;
  return AES.encrypt(token, ENCRYPT_KEY).toString();
};

// Helper to decrypt a token
export const decryptToken = (encryptedToken) => {
  if (!encryptedToken) return null;
  try {
    const decrypted = AES.decrypt(encryptedToken, ENCRYPT_KEY);
    const result = decrypted.toString(enc.Utf8);
    // Return null if decryption result is empty or invalid
    return result && result.length > 0 ? result : null;
  } catch (e) {
    console.warn("Token decryption failed:", e);
    return null;
  }
};

// Store tokens
export const storeAccessToken = (accessToken) => {
  if (accessToken && isStorageAvailable()) {
    const encrypted = encryptToken(accessToken);
    secureLocalStorage.setItem(ACCESS_TOKEN_KEY, encrypted);
  }
};

export const storeRefreshToken = (refreshToken) => {
  if (refreshToken && isStorageAvailable()) {
    const encrypted = encryptToken(refreshToken);
    secureLocalStorage.setItem(REFRESH_TOKEN_KEY, encrypted);
  }
};

// Get tokens
export const getDecryptedAccessToken = () => {
  if (!isStorageAvailable()) return null;
  try {
    const encrypted = secureLocalStorage.getItem(ACCESS_TOKEN_KEY);
    return decryptToken(encrypted);
  } catch (e) {
    console.warn("Failed to get access token:", e);
    return null;
  }
};

export const getDecryptedRefreshToken = () => {
  if (!isStorageAvailable()) return null;
  try {
    const encrypted = secureLocalStorage.getItem(REFRESH_TOKEN_KEY);
    return decryptToken(encrypted);
  } catch (e) {
    console.warn("Failed to get refresh token:", e);
    return null;
  }
};

// Clear tokens (Logout)
export const clearTokens = () => {
  if (isStorageAvailable()) {
    secureLocalStorage.removeItem(ACCESS_TOKEN_KEY);
    secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

// Backward compatibility (optional)
export const encrtypedToken = encryptToken;
export const decryptedAccessToken = decryptToken;
