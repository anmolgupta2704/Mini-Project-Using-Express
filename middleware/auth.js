module.exports = (req, res, next) => {
  const username = req.params.username;

  let role = "USER";
  if (username === "admin") {
    role = "ADMIN";
  }

  req.user = {
    username,
    role,
  };

  next();
};
