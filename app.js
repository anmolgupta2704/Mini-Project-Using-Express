const express = require("express");
const path = require("path");
const auth = require("./middleware/auth");

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("login");
});


app.get("/login/:username", auth, (req, res) => {
  const { username, role } = req.user;

  if (role === "ADMIN") {
    return res.render("admin", { username });
  }

  return res.render("user", { username });
});


app.use((req, res) => {
  res.status(404).render("404");
});

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
