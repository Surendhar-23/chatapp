const { getUser, addUser } = require("../models/User");

let signuppage = (req, res, next) => {
  res.status(200).render("signup", { error: req.query.error });
};

let signupauth = async (req, res, next) => {
  let message = "";
  const { name, email, pass, confpass } = req.body;

  if (!email.includes("@")) message += "Email invalid ";

  if (pass !== confpass) message += "password does not match";

  if (message != "") return res.redirect(`/signup/?error=${message}`);

  let existuser = await getUser(email);

  console.log(existuser);
  if (existuser) return res.redirect(`/signup/?error=user exist Already`);

  let user = { name, email, password: pass };
  try {
    addUser(user);
    return res.redirect(`/login/?success=Account created successfully`);
  } catch (err) {
    console.log(err);
    return res.redirect(`/signup/?error=something went wrong`);
  }
};

module.exports = { signuppage, signupauth };
