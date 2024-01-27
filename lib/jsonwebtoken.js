const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("../envVariable");

const generateToken = (id) => {
  const token = jwt.sign({ id: id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};
const verifyToken = (existToken) => {
  const decoded = jwt.verify(existToken, JWT_SECRET);
  return decoded;
};

module.exports = {
  generateToken,
  verifyToken,
};
