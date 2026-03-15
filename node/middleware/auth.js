const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === "pswd1234") {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
