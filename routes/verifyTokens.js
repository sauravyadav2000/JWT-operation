const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(400).send("access denied");
  }

  try {
    const verified = jwt.verify(token, "thisispractice");
    req.user = verified;
    next();
  } catch (e) {
    res.status(401).send("Invalid_Token");
  }
}

module.exports = auth;
