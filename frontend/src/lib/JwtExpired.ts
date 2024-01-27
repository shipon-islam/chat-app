import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
  if (!token) return true;
  const jwtExpireTime = jwtDecode(token).exp;
  const currentTime = Date.now() / 1000;
  const isExpired = jwtExpireTime && jwtExpireTime < currentTime;
  return isExpired;
};
