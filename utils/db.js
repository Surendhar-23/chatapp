const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
async function getDatabase() {
  try {
    const client = await mongoClient.connect("mongodb://localhost:27017");
    let database = await client.db("chatapp");
    if (database) console.log("Connected to DB");
    else console.log("Not connect extrablished");
    return database;
  } catch (err) {
    console.log("something went wrong" + err);
  }
}

module.exports = { getDatabase, ObjectId };
