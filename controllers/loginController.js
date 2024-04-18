const { getUser } = require("../models/User");
const db = require("../utils/db");
const doteve = require("dotenv");
const jwt = require("jsonwebtoken");
doteve.config();

let loginpage = function (req, res) {
  const { success, error } = req.query;
  res.status(200).render("login", { success, error });
};

let loginauth = async (req, res, next) => {
  const { email, pass } = req.body;
  let user = await getUser(email);
  let success, error;

  if (!user) {
    error = "user not exist";
    res.redirect(`/login?${error ? `error=${error}` : ""}`);
    return;
  }
  if (user.password === pass) {
    let loggedUser = {
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(loggedUser, process.env.JWT_SECRET);
    return res.redirect(`/chat/?i=${token}`);
  }

  error = "incorrect password";
  res.redirect(`/login?${error ? `error=${error}` : ""}`);
};

module.exports = { loginpage, loginauth };
