import { AES, enc } from "crypto-js";
import secureLocalStorage from "react-secure-storage";

// Keys for local storage
const ACCESS_TOKEN_KEY = "access-token";
const REFRESH_TOKEN_KEY = "refresh-token";
const ACCESS_TOKEN_EXPIRY_KEY = "access-token-expiry";
const REFRESH_TOKEN_EXPIRY_KEY = "refresh-token-expiry";
const ENCRYPT_KEY = "secure-storage";

// Token expiry times in milliseconds
const ACCESS_TOKEN_EXPIRY = 3600000; // 1 hour
const REFRESH_TOKEN_EXPIRY = 2592000000; // 30 days

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

// Store tokens with expiry times
export const storeAccessToken = (accessToken) => {
  if (accessToken && isStorageAvailable()) {
    const encrypted = encryptToken(accessToken);
    secureLocalStorage.setItem(ACCESS_TOKEN_KEY, encrypted);
    // Store expiry time
    const expiryTime = Date.now() + ACCESS_TOKEN_EXPIRY;
    secureLocalStorage.setItem(ACCESS_TOKEN_EXPIRY_KEY, expiryTime.toString());
  }
};

export const storeRefreshToken = (refreshToken) => {
  if (refreshToken && isStorageAvailable()) {
    const encrypted = encryptToken(refreshToken);
    secureLocalStorage.setItem(REFRESH_TOKEN_KEY, encrypted);
    // Store expiry time
    const expiryTime = Date.now() + REFRESH_TOKEN_EXPIRY;
    secureLocalStorage.setItem(REFRESH_TOKEN_EXPIRY_KEY, expiryTime.toString());
  }
};

// Check if token is expired
const isTokenExpired = (expiryKey) => {
    if (!isStorageAvailable()) return true;
    try {
        const expiryStr = secureLocalStorage.getItem(expiryKey);
        if (!expiryStr) return true;
        const expiryTime = parseInt(expiryStr, 10);
        return Date.now() >= expiryTime;
    } catch (e) {
        return true;
    }
};

// Check if access token is expired
export const isAccessTokenExpired = () => {
    return isTokenExpired(ACCESS_TOKEN_EXPIRY_KEY);
};

// Check if refresh token is expired
export const isRefreshTokenExpired = () => {
    return isTokenExpired(REFRESH_TOKEN_EXPIRY_KEY);
};

// Get tokens
export const getDecryptedAccessToken = () => {
  if (!isStorageAvailable()) return null;
  // Check if expired first
  if (isAccessTokenExpired()) {
      return null;
  }
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
  // Check if expired first
  if (isRefreshTokenExpired()) {
      return null;
  }
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
    secureLocalStorage.removeItem(ACCESS_TOKEN_EXPIRY_KEY);
    secureLocalStorage.removeItem(REFRESH_TOKEN_EXPIRY_KEY);
  }
};

// Refresh access token using refresh token
export const refreshAccessToken = async () => {
    const refreshToken = getDecryptedRefreshToken();

    if (!refreshToken) {
        console.warn("No refresh token available");
        clearTokens();
        return null;
    }

    if (isRefreshTokenExpired()) {
        console.warn("Refresh token expired");
        clearTokens();
        return null;
    }

    try {
        const baseUrl = "https://blog-api.bykh.org/api/v100";
        const response = await fetch(`${baseUrl}/auth/me`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.warn("Refresh token invalid or expired");
                clearTokens();
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Token refresh response:", data);

        // Store new tokens
        if (data.data?.accessToken) {
            storeAccessToken(data.data.accessToken);
        }
        if (data.data?.refreshToken) {
            storeRefreshToken(data.data.refreshToken);
        }

        return data.data?.accessToken || null;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        clearTokens();
        return null;
    }
};

// Backward compatibility (optional)
export const encrtypedToken = encryptToken;
export const decryptedAccessToken = decryptToken;
