require("dotenv").config();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const NODE_ENV = process.env.NODE_ENV;
const CLOUDNARY_CLOUD_NM = process.env.CLOUDNARY_CLOUD_NM;
const CLOUDNARY_API_KEY = process.env.CLOUDNARY_API_KEY;
const CLOUDNARY_SECRET = process.env.CLOUDNARY_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

module.exports = {
  PORT,
  DB_URL,
  NODE_ENV,
  CLOUDNARY_CLOUD_NM,
  CLOUDNARY_API_KEY,
  CLOUDNARY_SECRET,
  JWT_SECRET,
  JWT_EXPIRE,
};
