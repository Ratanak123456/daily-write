import secureLocalStorage from "react-secure-storage";

// Keys for local storage
const ACCESS_TOKEN_KEY = "access-token";
const REFRESH_TOKEN_KEY = "refresh-token";

// Store tokens
export const storeAccessToken = (accessToken) => {
  if (accessToken) {
    secureLocalStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
};

export const storeRefreshToken = (refreshToken) => {
  if (refreshToken) {
    secureLocalStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

// Get tokens
export const getDecryptedAccessToken = () => {
  return secureLocalStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getDecryptedRefreshToken = () => {
  return secureLocalStorage.getItem(REFRESH_TOKEN_KEY);
};

// Clear tokens (Logout)
export const clearTokens = () => {
  secureLocalStorage.removeItem(ACCESS_TOKEN_KEY);
  secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
};
