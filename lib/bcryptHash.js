const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};
const comparePassword = async (password, encriptedPassword) => {
  const compared = await bcrypt.compare(password, encriptedPassword);
  return compared;
};
module.exports = {
  hashPassword,
  comparePassword,
};
