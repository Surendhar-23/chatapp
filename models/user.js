const db = require("../utils/db");
let getUser = async function (email) {
  let database = await db.getDatabase();
  let collection = await database.collection("users");
  let user = await collection.findOne({ email });
  return user;
};

let addUser = async function (user) {
  let database = await db.getDatabase();
  let collection = await database.collection("users");
  collection.insertOne(user);
};

let addChat = async function (chat) {
  let database = await db.getDatabase();
  let collection = await database.collection("chats");
  await collection.insertOne(chat);
};

let getChat = async function (chat) {
  let database = await db.getDatabase();
  let collection = await database.collection("chats");
  let cursor = await collection.find();
  let chats = cursor.toArray();
  return chats;
};

module.exports = { getUser, addUser, addChat, getChat };
