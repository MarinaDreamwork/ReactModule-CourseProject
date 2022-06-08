const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refreshToken';
const EXPIRES_DATE = 'jwt-expires';

function setTokens({ expiresIn = 3600, idToken, refreshToken }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_DATE, expiresDate);
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

export const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate
};
