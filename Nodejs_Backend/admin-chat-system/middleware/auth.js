module.exports = function authAdmin(req, res, next) {
  const role = req.body?.role;

  if (role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};
