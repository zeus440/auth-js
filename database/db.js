const { MongoClient } = require("mongodb");

require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let database;
let collection;

async function connectToDatabase() {
  try {
    database = client.db("auth_db");
    collection = database.collection("users");

    console.log("✅ MongoDB connected!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

function getDatabase() {
  return { database, collection };
}

module.exports = { connectToDatabase, getDatabase };
