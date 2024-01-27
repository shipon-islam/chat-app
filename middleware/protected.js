const { verifyToken } = require("../lib/jsonwebtoken");

const protected = async (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization?.startsWith("Bearer")
    ? authorization.split(" ")[1]
    : null;
  if (!token) {
    next("you are not athenticated because you don't have token!");
  }
  let decodedToken = verifyToken(token);
  req.user = { id: decodedToken.id };

  next();
};
module.exports = {
  protected,
};
