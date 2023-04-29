require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const page_controller = require("./pagination/offset");
const cursor_controller = require("./pagination/cursor");

const app = express();
const url = process.env.MONGO_URL;

const main = async () => {
  try {
    const client = new MongoClient(url);
    const dbName = process.env.DB_NAME;
    await client.connect();
    const db = client.db(dbName);

    // http://localhost:3000/api/offset/1
    app.get("/api/offset/:page", page_controller);

    // http://localhost:3000/api/cursor/1
    app.get("/api/cursor/:page", cursor_controller);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

main();
