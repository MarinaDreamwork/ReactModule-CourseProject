const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refreshToken';
const EXPIRES_DATE = 'jwt-expires';
const USERID_KEY = 'user-local-id';

function setTokens({ expiresIn = 3600, idToken, localId, refreshToken }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_DATE, expiresDate);
  localStorage.setItem(USERID_KEY, localId);
};

function getUserId() {
  return localStorage.getItem(USERID_KEY);
};

function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
};

function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
};

function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_DATE);
};

function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_DATE);
  localStorage.removeItem(USERID_KEY);
};

export const localStorageService = {
  getUserId,
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  removeAuthData
};
