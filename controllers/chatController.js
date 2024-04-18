let jwt = require("jsonwebtoken");
let dotenv = require("dotenv");
const { addChat, getChat } = require("../models/User");
dotenv.config();

let chatPage = async function (req, res) {
  const token = req.query.i;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    let chats = await getChat();
    chats.forEach((chat) => {
      chat.date = formatDate(chat.date);
    });
    if (token)
      return res
        .status(200)
        .render("chat", { cururl: req.url, chats, user: user.name });
  } catch (err) {
    res.send(`Please login in to continue <a href='login'> login</a>`);
  }
};

let chatcontroller = async function (req, res) {
  const token1 = req.query.i;
  const text = req.body.text;

  // try {
  const user = jwt.verify(token1, process.env.JWT_SECRET);
  let chat = {
    text,
    user,
    date: new Date(),
  };

  await addChat(chat);
  let chats = await getChat();
  chats.forEach((chat) => {
    chat.date = formatDate(chat.date);
  });

  if (token1)
    return res
      .status(200)
      .render("chat", { cururl: req.url, chats, user: user.name });
  // } catch (e) {
  res.send(`Please login in to continue <a href='login'> login</a>`);
  // }
};

function formatDate(date) {
  let now = new Date(date);
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return formattedTime;
}

module.exports = { chatPage, chatcontroller };
