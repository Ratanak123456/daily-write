import { AES, enc } from "crypto-js";
import secureLocalStorage from "react-secure-storage";

// Keys for local storage
const ACCESS_TOKEN_KEY = "access-token";
const REFRESH_TOKEN_KEY = "refresh-token";
const ENCRYPT_KEY = "secure-storage";

// Helper to encrypt a token
export const encryptToken = (token) => {
  if (!token) return null;
  return AES.encrypt(token, ENCRYPT_KEY).toString();
};

// Helper to decrypt a token
export const decryptToken = (encryptedToken) => {
  if (!encryptedToken) return null;
  const decrypted = AES.decrypt(encryptedToken, ENCRYPT_KEY);
  return decrypted.toString(enc.Utf8);
};

// Store tokens
export const storeAccessToken = (accessToken) => {
  if (accessToken) {
    const encrypted = encryptToken(accessToken);
    secureLocalStorage.setItem(ACCESS_TOKEN_KEY, encrypted);
  }
};

export const storeRefreshToken = (refreshToken) => {
  if (refreshToken) {
    const encrypted = encryptToken(refreshToken);
    secureLocalStorage.setItem(REFRESH_TOKEN_KEY, encrypted);
  }
};

// Get tokens
export const getDecryptedAccessToken = () => {
  const encrypted = secureLocalStorage.getItem(ACCESS_TOKEN_KEY);
  return decryptToken(encrypted);
};

export const getDecryptedRefreshToken = () => {
  const encrypted = secureLocalStorage.getItem(REFRESH_TOKEN_KEY);
  return decryptToken(encrypted);
};

// Clear tokens (Logout)
export const clearTokens = () => {
  secureLocalStorage.removeItem(ACCESS_TOKEN_KEY);
  secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Backward compatibility (optional)
export const encrtypedToken = encryptToken;
export const decryptedAccessToken = decryptToken;
