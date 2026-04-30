const checkAdmin = (req, res, next) => {
  if (req.userRole !== "Admin") {
    return res
      .status(403)
      .json({ message: "Only admins can perform this action" });
  }
  next();
};

module.exports = checkAdmin;
